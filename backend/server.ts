import 'dotenv/config'
import express, { type Request, type Response } from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import { MongoClient, type Db } from "mongodb";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// MySQL Setup
let mysqlPool: mysql.Pool;

async function initMySQL() {
    // Database and table are set up manually via the file db-setup.sql in MySQL Workbench
    // Here we just connect to the existing database
    // Here we check for default values in case the environment variables don't get loaded
    mysqlPool = mysql.createPool({
        host: process.env.MYSQL_HOST || "localhost",
        user: process.env.MYSQL_USER || "root",
        password: process.env.MYSQL_PASSWORD || "",
        database: process.env.MYSQL_DB || "clicker_game",
        waitForConnections: true,
        connectionLimit: 10,
    });

    // Test the connection
    await mysqlPool.execute("SELECT 1");
    console.log("MySQL: Ready.");
}

// MongoDB Setup
let mongoDB: Db;

async function initMongoDB() {
    const uri = process.env.MONGO_URI || "mongodb://localhost:27017";
    const client = new MongoClient(uri);
    await client.connect();
    mongoDB = client.db(process.env.MONGO_DB || "clicker_game");
    console.log("MongoDB: Ready.");
}

// Health Check
app.get("/api/ping", (_req: Request, res: Response) => {
    res.json({ message: "OK" });
});

// ─── GET /api/leaderboard
app.get("/api/leaderboard", async (_req: Request, res: Response) => {
    try {
        const [rows] = await mysqlPool.execute(
            "SELECT id, player, score FROM leaderboard ORDER BY score DESC"
        );
        res.json(rows);
    } catch (err) {
        console.error("MySQL error:", err);
        res.status(500).json({ error: "Failed to fetch leaderboard." });
    }
});

// POST /api/leaderboard
app.post("/api/leaderboard", async (req: Request, res: Response) => {
    const { player, score } = req.body;
    if (!player || score === undefined) {
        res.status(400).json({ error: "player and score are required." });
        return;
    }
    try {
        const [existing] = await mysqlPool.execute(
            "SELECT id, score FROM leaderboard WHERE player = ?",
            [player]
        );
        const rows = existing as any[];

        if (rows.length > 0) {
            if (score > rows[0].score) {
                await mysqlPool.execute(
                    "UPDATE leaderboard SET score = ? WHERE id = ?",
                    [score, rows[0].id]
                );
                res.json({ message: "Score updated!", player, score });
            } else {
                res.json({ message: "Existing score is higher, no update.", player, score: rows[0].score });
            }
        } else {
            await mysqlPool.execute(
                "INSERT INTO leaderboard (player, score) VALUES (?, ?)",
                [player, score]
            );
            res.status(201).json({ message: "Player added!", player, score });
        }
    } catch (err) {
        console.error("MySQL error:", err);
        res.status(500).json({ error: "Failed to update leaderboard." });
    }
});


// GET /api/contact
app.get("/api/contact", async (_req: Request, res: Response) => {
    try {
        const collection = mongoDB.collection("contacts");
        const contacts = await collection.find({}).toArray();
        res.json(contacts);
    } catch (err) {
        console.error("MongoDB error:", err);
        res.status(500).json({ error: "Failed to fetch contacts." });
    }
});

// POST /api/contact
app.post("/api/contact", async (req: Request, res: Response) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        res.status(400).json({ error: "name, email, and message are required." });
        return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        res.status(400).json({ error: "Invalid email address." });
        return;
    }
    try {
        const collection = mongoDB.collection("contacts");
        await collection.insertOne({ name, email, message, createdAt: new Date() });
        res.status(201).json({ message: "Message sent successfully!" });
    } catch (err) {
        console.error("MongoDB error:", err);
        res.status(500).json({ error: "Failed to save contact message." });
    }
});

// GET /api/login
app.get("/api/login", async (req: Request, res: Response) => {
    const { email, firstName, lastName } = req.query as {
        email?: string;
        firstName?: string;
        lastName?: string;
    };

    if (!email) {
        res.status(400).json({ error: "email query param is required." });
        return;
    }

    try {
        const collection = mongoDB.collection("users");
        let user = await collection.findOne({ email });

        if (!user) {
            const newUser = {
                studentId: `USR-${Date.now()}`,
                name: {
                    first: firstName,
                    last: lastName || "",
                },
                email,
                role: "player",
                createdAt: new Date(),
            };
            const result = await collection.insertOne(newUser);
            user = { _id: result.insertedId, ...newUser };
        }

        res.json({
            id: user._id,
            studentId: user.studentId,
            name: user.name,       
            email: user.email,
            role: user.role,
        });
    } catch (err) {
        console.error("MongoDB error:", err);
        res.status(500).json({ error: "Failed to fetch user." });
    }
});

// Start
async function start() {
    try {
        await initMySQL();
        await initMongoDB();
        app.listen(PORT, () => {
            console.log(`Backend running at http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("Failed to start server:", err);
        process.exit(1);
    }
}

start();