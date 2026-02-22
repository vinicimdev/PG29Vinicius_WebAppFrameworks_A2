<template>
    <div class="contact-page">
        <h1>Contact Us</h1>

        <div v-if="submitted" class="success-banner">
             Message sent! We'll get back to you soon.
            <button @click="resetForm">Send another message</button>
        </div>

        <form v-else @submit.prevent="handleSubmit">
            <div class="field">
                <label>Name <span class="required">*</span></label>
                <input
                    v-model="name"
                    type="text"
                    placeholder="Your name..."
                    :class="{ 'input-error': errors.name }"
                />
                <span v-if="errors.name" class="error-text">{{ errors.name }}</span>
            </div>

            <div class="field">
                <label>Email <span class="required">*</span></label>
                <input
                    v-model="email"
                    type="text"
                    placeholder="your@email.com"
                    :class="{ 'input-error': errors.email }"
                />
                <span v-if="errors.email" class="error-text">{{ errors.email }}</span>
            </div>

            <div class="field">
                <label>Message <span class="required">*</span></label>
                <textarea
                    v-model="message"
                    placeholder="Type your message..."
                    :class="{ 'input-error': errors.message }"
                ></textarea>
                <span v-if="errors.message" class="error-text">{{ errors.message }}</span>
            </div>

            <div v-if="serverError" class="error-banner"> {{ serverError }}</div>

            <button type="submit" :disabled="loading">
                <span v-if="loading">Sending...</span>
                <span v-else>Send Message</span>
            </button>
        </form>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import { useUserStore } from '../stores/user'

    const userStore = useUserStore()

    const name = ref('')
    const email = ref('')
    const message = ref('')
    const loading = ref(false)
    const submitted = ref(false)
    const serverError = ref('')
    const errors = ref({ name: '', email: '', message: '' })

    onMounted(() => {
        if (userStore.isLoggedIn) {
            name.value = userStore.displayName
            email.value = userStore.user!.email
        }
    })

    function validate() {
        errors.value = { name: '', email: '', message: '' }
        let valid = true
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!name.value.trim()) {
            errors.value.name = 'Name is required.'
            valid = false
        }
        if (!email.value.trim()) {
            errors.value.email = 'Email is required.'
            valid = false
        } else if (!emailRegex.test(email.value)) {
            errors.value.email = 'Please enter a valid email address.'
            valid = false
        }
        if (!message.value.trim()) {
            errors.value.message = 'Message is required.'
            valid = false
        } else if (message.value.trim().length < 10) {
            errors.value.message = 'Message must be at least 10 characters.'
            valid = false
        }
        return valid
    }

    async function handleSubmit() {
        if (!validate()) return
        loading.value = true
        serverError.value = ''
        try {
            const res = await fetch('http://localhost:3000/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name.value, email: email.value, message: message.value }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Failed to send message.')
            submitted.value = true
        } catch (err) {
            serverError.value = err instanceof Error ? err.message : 'Unknown error'
        } finally {
            loading.value = false
        }
    }

    function resetForm() {
        submitted.value = false
        name.value = userStore.isLoggedIn ? userStore.displayName : ''
        email.value = userStore.isLoggedIn ? userStore.user!.email : ''
        message.value = ''
        errors.value = { name: '', email: '', message: '' }
        serverError.value = ''
    }
</script>

<style scoped>
    .contact-page {
        padding: 40px 20px;
        max-width: 600px;
        margin: 0 auto;
    }

    h1 {
        text-align: center;
        color: #9fc3cc;
        font-size: 36px;
        margin-bottom: 30px;
        font-family: 'Arial', 'Helvetica', sans-serif;
    }

    .success-banner {
        background-color: #e8f5e9;
        border: 1px solid #81c784;
        border-radius: 8px;
        padding: 24px;
        text-align: center;
        color: #2e7d32;
        font-family: 'Arial', 'Helvetica', sans-serif;
        font-size: 16px;
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .success-banner button {
        padding: 10px 20px;
        border: 1px solid #2e7d32;
        border-radius: 4px;
        background: transparent;
        color: #2e7d32;
        cursor: pointer;
        font-weight: 600;
        font-family: 'Arial', 'Helvetica', sans-serif;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 20px;
        background-color: #dbeeed;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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

    .required { color: #e57373; }

    input, textarea {
        padding: 12px;
        font-size: 16px;
        border: 2px solid #9fc3cc;
        border-radius: 4px;
        font-family: 'Arial', 'Helvetica', sans-serif;
        transition: all 0.3s ease;
        background-color: #ffffff;
        color: #333;
    }

    input:focus, textarea:focus {
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

    textarea {
        resize: vertical;
        min-height: 150px;
    }

    .error-banner {
        background-color: #fdecea;
        border: 1px solid #e57373;
        border-radius: 6px;
        padding: 12px;
        font-size: 14px;
        color: #c62828;
        font-family: 'Arial', 'Helvetica', sans-serif;
    }

    button[type="submit"] {
        padding: 14px 20px;
        font-size: 16px;
        font-weight: 600;
        border: none;
        border-radius: 4px;
        background-color: #9fc3cc;
        color: white;
        cursor: pointer;
        transition: all 0.3s ease;
        font-family: 'Arial', 'Helvetica', sans-serif;
    }

    button[type="submit"]:hover:not(:disabled) {
        background-color: #5a9aaa;
        transform: translateY(-2px);
    }

    button[type="submit"]:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
</style>