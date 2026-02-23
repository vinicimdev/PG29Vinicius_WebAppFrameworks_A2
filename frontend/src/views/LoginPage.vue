<template>
    <div class="login-page">
        <div class="login-card">
            <h1>Login</h1>
            <p class="subtitle">Enter your email to get started. No password needed!</p>

            <form @submit.prevent="handleLogin">
                <div class="name-row">
                    <div class="field">
                        <label>First Name <span class="required">*</span></label>
                        <input v-model="firstName" type="text" placeholder="John" />
                    </div>
                    <div class="field">
                        <label>Last Name <span class="optional">(optional)</span></label>
                        <input v-model="lastName" type="text" placeholder="Smith" />
                    </div>
                </div>

                <div class="field">
                    <label>Email <span class="required">*</span></label>
                    <input
                        v-model="email"
                        type="text"
                        placeholder="your@email.com"
                        :class="{ 'input-error': emailError }"
                    />
                    <span v-if="emailError" class="error-text">{{ emailError }}</span>
                </div>

                <div v-if="userStore.error" class="error-banner">
                    {{ userStore.error }}
                </div>

                <button type="submit" :disabled="userStore.loading">
                    <span v-if="userStore.loading">Logging in...</span>
                    <span v-else>Login</span>
                </button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    import { useUserStore } from '../stores/user'

    const router = useRouter()
    const userStore = useUserStore()

    const firstName = ref('')
    const firstNameError = ref('')
    const lastName = ref('')
    const email = ref('')
    const emailError = ref('')

    function validate() {
        emailError.value = ''
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!firstName.value.trim()) {
            firstNameError.value = 'First name is required.'
            return false
        }
        if (!email.value) {
            emailError.value = 'Email is required.'
            return false
        }
        if (!emailRegex.test(email.value)) {
            emailError.value = 'Please enter a valid email address.'
            return false
        }
        return true
    }

    async function handleLogin() {
        if (!validate()) return
        await userStore.login(
            email.value,
            firstName.value,
            lastName.value || undefined
        )
        if (userStore.isLoggedIn) {
            router.push('/')
        }
    }
</script>

<style scoped>
    .login-page {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: calc(100vh - 80px);
        padding: 40px 20px;
        background-color: #f5fafa;
    }

    .login-card {
        background: white;
        border-radius: 12px;
        padding: 40px;
        width: 100%;
        max-width: 460px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    h1 {
        text-align: center;
        color: #9fc3cc;
        font-size: 36px;
        margin-bottom: 8px;
        font-family: 'Arial', 'Helvetica', sans-serif;
    }

    .subtitle {
        text-align: center;
        color: #888;
        font-size: 14px;
        margin-bottom: 32px;
        font-family: 'Arial', 'Helvetica', sans-serif;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .name-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
    }

    .field {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    label {
        font-size: 14px;
        font-weight: 600;
        color: #555;
        font-family: 'Arial', 'Helvetica', sans-serif;
    }

    .optional { color: #aaa; font-weight: 400; }
    .required { color: #e57373; }

    input {
        padding: 12px;
        font-size: 16px;
        border: 2px solid #9fc3cc;
        border-radius: 6px;
        font-family: 'Arial', 'Helvetica', sans-serif;
        transition: all 0.3s ease;
        color: #333;
    }

    input:focus {
        outline: none;
        border-color: #5a9aaa;
        box-shadow: 0 0 8px rgba(90, 154, 170, 0.2);
    }

    .input-error { border-color: #e57373 !important; }

    .error-text {
        font-size: 13px;
        color: #e57373;
        font-family: 'Arial', 'Helvetica', sans-serif;
    }

    .error-banner {
        background-color: #fdecea;
        border: 1px solid #e57373;
        border-radius: 6px;
        padding: 10px 14px;
        font-size: 14px;
        color: #c62828;
        font-family: 'Arial', 'Helvetica', sans-serif;
    }

    button {
        padding: 14px;
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

    button:hover:not(:disabled) {
        background-color: #5a9aaa;
        transform: translateY(-2px);
    }

    button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
</style>