<template>
    <nav class="header-container">
        <div class="nav-links">
            <router-link to="/">Home</router-link>
            <router-link to="/about">About</router-link>
            <router-link to="/leaderboard">Leaderboard</router-link>
            <router-link to="/contact">Contact</router-link>
        </div>

        <div class="user-area">
            <template v-if="userStore.isLoggedIn">
                <span class="user-info">
                     {{ userStore.displayName }}
                    <span class="role-badge">{{ userStore.user!.role }}</span>
                </span>
                <button class="logout-btn" @click="userStore.logout()">Logout</button>
            </template>
            <template v-else>
                <router-link to="/login" class="login-link">Login</router-link>
            </template>
        </div>
    </nav>
</template>

<script setup lang="ts">
    import { RouterLink } from 'vue-router'
    import { useUserStore } from '../stores/user'

    const userStore = useUserStore()
</script>

<style scoped>
    .header-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 40px;
        background-color: #dbeeed;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .nav-links {
        display: flex;
        gap: 30px;
        align-items: center;
    }

    a {
        font-size: 18px;
        font-weight: 700;
        color: #9fc3cc;
        text-decoration: none;
        padding: 8px 12px;
        border-bottom: 3px solid transparent;
        transition: all 0.3s ease;
        font-family: 'Arial', 'Helvetica', sans-serif;
    }

    a:hover, a.router-link-active {
        color: #5a9aaa;
        border-bottom: 3px solid #5a9aaa;
    }

    .user-area {
        display: flex;
        align-items: center;
        gap: 12px;
        font-family: 'Arial', 'Helvetica', sans-serif;
    }

    .user-info {
        font-size: 15px;
        color: #333;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .role-badge {
        background-color: #9fc3cc;
        color: white;
        font-size: 11px;
        padding: 2px 8px;
        border-radius: 12px;
        font-weight: 600;
        text-transform: uppercase;
    }

    .logout-btn {
        padding: 6px 16px;
        font-size: 14px;
        font-weight: 600;
        border: 2px solid #9fc3cc;
        border-radius: 4px;
        background-color: transparent;
        color: #9fc3cc;
        cursor: pointer;
        transition: all 0.3s ease;
        font-family: 'Arial', 'Helvetica', sans-serif;
    }

    .logout-btn:hover {
        background-color: #9fc3cc;
        color: white;
    }

    .login-link {
        border: 2px solid #9fc3cc !important;
        border-bottom: 2px solid #9fc3cc !important;
        border-radius: 4px;
        padding: 6px 16px !important;
    }

    .login-link:hover {
        background-color: #9fc3cc;
        color: white !important;
    }
</style>