# PG29Vinicius_WebAppFrameworks_A2

## Overview

I used the first assignment as a base for this project. The frontend was made using Vue, Pinia, Vite and TypeScript. The backend was made using Node, Express and TypeScript. The Databases were made with MySQL (for the leaderboard) and MongoDB (for the user data). The app consists of a clicker game where the user can click to get
score and submit it to a leaderboard, and send contact messages also.

## Requirements to run the project

- Node.js
- MySQL
- MongoDB

---

## Running the App

### 1. Setting up MySQL

Open MySQL Workbench and connect to your local server. Then, run the file `backend/db-setup.sql`.
The file will create the `clicker_game` database and the `leaderboard` table, seeding it with sample data.

### 2. Setting up MongoDB

Install MongoDB and run it as a service. The backend will create the `clicker_game` database on the first use.

### 3. Backend

```bash
npm install
npm run dev
```

The server starts at http://localhost:3000.

**Environment variables:**
| Variable          | Default           |
|-------------------|-------------------|
| MYSQL_HOST        | localhost         |
| MYSQL_USER        | root              |
| MYSQL_PASSWORD    | (empty)           |
| MYSQL_DB          | clicker_game      |
| MONGO_URI         | mongodb://localhost:27017 |
| MONGO_DB          | clicker_game      |

### 4. Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at http://localhost:5173.

---

## API Endpoints

| Method | Path               | DB       | Description                              |
|--------|--------------------|----------|------------------------------------------|
| GET    | /api/ping          | —        | Health check                             |
| GET    | /api/leaderboard   | MySQL    | Get all scores sorted by score desc      |
| POST   | /api/leaderboard   | MySQL    | Add/update a player score                |
| POST   | /api/contact       | MongoDB  | Save a contact message                   |
| GET    | /api/login?email=  | MongoDB  | Get or create a user by email            |

---

## Tools

- **Pinia**: `useUserStore` (login/logout) and `useLeaderboardStore` (scores)
- **MySQL**: Leaderboard data, auto-seeded on first run
- **MongoDB**: User accounts and contact messages

## Known bugs and limitations

- Currently, the login system doesn't have any authentication. It only requires an email with no password, and no
validation to check if the email exists. 
- The score is not persistent. If you close the application, the current score will be lost.