<template>
    <table class="leaderboard-table">
        <thead>
            <tr>
                <th>Position</th>
                <th>Player</th>
                <th>Score</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in data" :key="index">
                <td> {{  index + 1 }}</td>
                <td> {{ item.player }}</td>
                <td> {{ item.score }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue'

    interface LeaderboardItem {
        player: string
        score: number
    }

    const leaderboardData = ref<LeaderboardItem[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    const fetchLeaderboard = async () => {
        loading.value = true
        error.value = null

        try {
            const res = await fetch('http://localhost:3000/api/leaderboard-summary')

            if (!res.ok) {
                throw new Error('Error fetching data from the server.')
            }

            const data = await res.json()
            leaderboardData.value = data
        }
        catch (err) {
            error.value = err instanceof Error ? err.message : 'Unknown error'
        } finally {
            loading.value = false
        }
    }

    defineProps<{
        data: LeaderboardItem[]
    }>()

    onMounted(() => {
        fetchLeaderboard()
    })
</script>

<style scoped>
    table {
        width: 100%;
    }

    .leaderboard-table {
        border-collapse: collapse;
        background-color: #ffffff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        overflow: hidden;
    }

    .leaderboard-table thead {
        background-color: #9fc3cc;
        color: #dbeeed;
    }

    .leaderboard-table th {
        padding: 12px;
        text-align: center;
        font-weight: 600;
        font-family: 'Arial', 'Helvetica', sans-serif;
    }

    .leaderboard-table tbody tr {
        background-color: #dbeeed;
        transition: all 0.3s ease;
    }

    .leaderboard-table td {
        padding: 12px;
        border-bottom: 1px solid #b8e3e4;
        color: #333333;
        text-align: center;
    }

    .leaderboard-table tbody tr:hover {
        background-color: #ffffff;
    }

    .leaderboard-table tbody tr:last-child td {
        border-bottom: none;
    }
</style>