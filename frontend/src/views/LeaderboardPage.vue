<template>
    <div class="leaderboard-page">
        <h1>Leaderboard</h1>

        <!-- Loading state -->
        <div v-if="leaderboardStore.loading" class="loading">
            <div class="spinner"></div>
            <p>Loading scores...</p>
        </div>

        <!-- Error state -->
        <div v-else-if="leaderboardStore.error" class="error-banner">
             {{ leaderboardStore.error }}
            <button @click="leaderboardStore.fetchLeaderboard()">Try again</button>
        </div>

        <!-- Content -->
        <template v-else>
            <LeaderboardSettings
                @sort-by-score="leaderboardStore.sortByScore()"
                @sort-by-name="leaderboardStore.sortByName()"
                @refresh="leaderboardStore.fetchLeaderboard()"
            />

            <LeaderboardTable :data="leaderboardStore.entries" />

            <!-- Submit score — only shown when logged in -->
            <div v-if="userStore.isLoggedIn" class="submit-score">
                <h2>Submit your score</h2>
                <p>Your current score: <strong>{{ counterStore.count }}</strong></p>
                <button class="submit-btn" @click="handleSubmit" :disabled="submitting">
                    {{ submitting ? 'Submitting...' : 'Submit Score' }}
                </button>
                <p v-if="submitMsg" class="submit-msg">{{ submitMsg }}</p>
            </div>

            <div v-else class="login-prompt">
                <p> <router-link to="/login">Login</router-link> to submit your score!</p>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import LeaderboardTable from '../components/LeaderboardTable.vue'
    import LeaderboardSettings from '../components/LeaderboardSettings.vue'
    import { useLeaderboardStore } from '../stores/leaderboard'
    import { useUserStore } from '../stores/user'
    import { useCounterStore } from '../stores/counter'

    const leaderboardStore = useLeaderboardStore()
    const userStore = useUserStore()
    const counterStore = useCounterStore()

    const submitting = ref(false)
    const submitMsg = ref('')

    async function handleSubmit() {
        submitting.value = true
        submitMsg.value = ''
        await leaderboardStore.submitScore(userStore.displayName, counterStore.count)
        submitMsg.value = leaderboardStore.error
            ? ` ${leaderboardStore.error}`
            : ' Score submitted!'
        submitting.value = false
    }

    onMounted(() => {
        leaderboardStore.fetchLeaderboard()
    })
</script>

<style scoped>
    .leaderboard-page {
        text-align: center;
        padding: 40px 20px;
        max-width: 900px;
        margin: 0 auto;
    }

    h1 {
        font-size: 48px;
        color: #9fc3cc;
        margin-bottom: 30px;
        font-family: 'Arial', 'Helvetica', sans-serif;
        font-weight: 700;
    }

    .loading {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        padding: 60px;
        color: #9fc3cc;
        font-family: 'Arial', 'Helvetica', sans-serif;
    }

    .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #dbeeed;
        border-top-color: #9fc3cc;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
    }

    @keyframes spin { to { transform: rotate(360deg); } }

    .error-banner {
        background-color: #fdecea;
        border: 1px solid #e57373;
        border-radius: 8px;
        padding: 20px;
        color: #c62828;
        font-family: 'Arial', 'Helvetica', sans-serif;
        display: flex;
        align-items: center;
        gap: 16px;
        justify-content: center;
    }

    .error-banner button {
        padding: 8px 16px;
        border: 1px solid #c62828;
        border-radius: 4px;
        background: transparent;
        color: #c62828;
        cursor: pointer;
        font-weight: 600;
    }

    .submit-btn {
        padding: 10px 24px;
        font-size: 16px;
        font-weight: 700;
        border: none;
        border-radius: 6px;
        background-color: #9fc3cc;
        color: white;
        cursor: pointer;
        transition: all 0.3s ease;
        font-family: 'Arial', 'Helvetica', sans-serif;
        margin-top: 12px;
    }

    .submit-btn:hover:not(:disabled) {
        background-color: #5a9aaa;
        transform: translateY(-2px);
    }

    .submit-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .submit-score {
        margin-top: 40px;
        background-color: #dbeeed;
        border-radius: 8px;
        padding: 24px;
        text-align: left;
    }

    .submit-score h2 {
        font-size: 20px;
        color: #5a9aaa;
        margin-bottom: 16px;
        font-family: 'Arial', 'Helvetica', sans-serif;
    }

    .submit-row {
        display: flex;
        gap: 12px;
    }

    .submit-row input {
        flex: 1;
        padding: 10px 14px;
        font-size: 16px;
        border: 2px solid #9fc3cc;
        border-radius: 6px;
        font-family: 'Arial', 'Helvetica', sans-serif;
    }

    .submit-row input:focus {
        outline: none;
        border-color: #5a9aaa;
    }

    .submit-row button {
        padding: 10px 24px;
        font-size: 16px;
        font-weight: 700;
        border: none;
        border-radius: 6px;
        background-color: #9fc3cc;
        color: white;
        cursor: pointer;
        transition: all 0.3s ease;
        font-family: 'Arial', 'Helvetica', sans-serif;
    }

    .submit-row button:hover:not(:disabled) {
        background-color: #5a9aaa;
    }

    .submit-row button:disabled { opacity: 0.6; cursor: not-allowed; }

    .submit-msg {
        margin-top: 10px;
        font-size: 14px;
        font-family: 'Arial', 'Helvetica', sans-serif;
        color: #333;
    }

    .login-prompt {
        margin-top: 30px;
        font-family: 'Arial', 'Helvetica', sans-serif;
        color: #888;
    }

    .login-prompt a {
        color: #9fc3cc;
        font-weight: 700;
        text-decoration: none;
    }
</style>