<template>
    <div class="landing-page">
        <div class="hero">
            <h1>Vini's Clicker Game</h1>

            <template v-if="userStore.isLoggedIn">
                <p>Welcome back, <strong>{{ userStore.displayName }}</strong>! </p>
            </template>
            <template v-else>
                <p>CLIIIIIIIIICK! <router-link to="/login">Login</router-link> to save your score.</p>
            </template>
        </div>

        <CounterWidget />
        <LeaderboardSummary />
    </div>
</template>

<script setup lang="ts">
    import CounterWidget from "../components/CounterWidget.vue"
    import LeaderboardSummary from "../components/LeaderboardSummary.vue"
    import { useUserStore } from '../stores/user'

    const userStore = useUserStore()
</script>

<style scoped>
    .landing-page {
        text-align: center;
        padding: 40px 20px;
        background-color: #ffffff;
    }

    .hero {
        margin-bottom: 40px;
    }

    h1 {
        font-size: 48px;
        color: #9fc3cc;
        margin-bottom: 10px;
        font-family: 'Arial', 'Helvetica', sans-serif;
        font-weight: 700;
    }

    p {
        font-size: 20px;
        color: #333;
        font-family: 'Arial', 'Helvetica', sans-serif;
    }

    a {
        color: #9fc3cc;
        font-weight: 700;
        text-decoration: none;
    }

    a:hover {
        color: #5a9aaa;
        text-decoration: underline;
    }
</style>