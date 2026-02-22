<template>
    <div class="leaderboard-summary">
        <h2>Top 3 Players</h2>

        <div v-if="leaderboardStore.loading" class="loading">
            <div class="spinner"></div>
        </div>

        <p v-else-if="leaderboardStore.error" class="error"> {{ leaderboardStore.error }}</p>

        <table v-else>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Player</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in top3" :key="item.id">
                    <td class="rank">{{ ['','',''][index] }}</td>
                    <td>{{ item.player }}</td>
                    <td>{{ item.score.toLocaleString() }}</td>
                </tr>
            </tbody>
        </table>

        <router-link to="/leaderboard" class="see-all">See full leaderboard </router-link>
    </div>
</template>

<script setup lang="ts">
    import { computed, onMounted } from 'vue'
    import { useLeaderboardStore } from '../stores/leaderboard'

    const leaderboardStore = useLeaderboardStore()

    const top3 = computed(() => leaderboardStore.entries.slice(0, 3))

    onMounted(() => {
        if (leaderboardStore.entries.length === 0) {
            leaderboardStore.fetchLeaderboard()
        }
    })
</script>

<style scoped>
    .leaderboard-summary {
        margin: 40px auto;
        padding: 30px 20px;
        max-width: 500px;
    }

    h2 {
        font-size: 28px;
        color: #9fc3cc;
        text-align: center;
        margin-bottom: 24px;
        font-family: 'Arial', 'Helvetica', sans-serif;
        font-weight: 700;
    }

    .loading {
        display: flex;
        justify-content: center;
        padding: 20px;
    }

    .spinner {
        width: 30px;
        height: 30px;
        border: 3px solid #dbeeed;
        border-top-color: #9fc3cc;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
    }

    @keyframes spin { to { transform: rotate(360deg); } }

    table {
        border-collapse: collapse;
        margin: auto;
        width: 100%;
        background-color: #ffffff;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        overflow: hidden;
    }

    thead { background-color: #9fc3cc; }

    th {
        padding: 12px;
        text-align: center;
        font-weight: 600;
        color: #dbeeed;
        font-family: 'Arial', 'Helvetica', sans-serif;
    }

    td {
        padding: 12px;
        border-bottom: 1px solid #b8e3e4;
        color: #333;
        text-align: center;
        font-family: 'Arial', 'Helvetica', sans-serif;
    }

    .rank { font-size: 20px; }

    tbody tr { background-color: #dbeeed; transition: all 0.3s ease; }
    tbody tr:hover { background-color: #ffffff; }
    tbody tr:last-child td { border-bottom: none; }

    .error {
        color: #c62828;
        text-align: center;
        font-weight: 600;
        font-family: 'Arial', 'Helvetica', sans-serif;
    }

    .see-all {
        display: block;
        text-align: center;
        margin-top: 16px;
        color: #9fc3cc;
        font-weight: 700;
        text-decoration: none;
        font-family: 'Arial', 'Helvetica', sans-serif;
    }

    .see-all:hover { color: #5a9aaa; text-decoration: underline; }
</style>