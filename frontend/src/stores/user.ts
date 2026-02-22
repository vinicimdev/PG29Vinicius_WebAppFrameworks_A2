import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface UserName {
    first: string
    last: string
}

export interface User {
    id: string
    studentId: string
    name: UserName
    email: string
    role: string
}

export const useUserStore = defineStore('user', () => {
    const user = ref<User | null>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)

    const isLoggedIn = computed(() => user.value !== null)
    const isAdmin = computed(() => user.value?.role === 'admin')

    // Full display name: "John Smith" or just "John" if no last name
    const displayName = computed(() => {
        if (!user.value) return ''
        const { first, last } = user.value.name
        return last ? `${first} ${last}` : first
    })

    async function login(email: string, firstName: string, lastName?: string) {
        loading.value = true
        error.value = null
        try {
            const params = new URLSearchParams({ email })
            if (firstName) params.append('firstName', firstName)
            if (lastName) params.append('lastName', lastName)

            const res = await fetch(`http://localhost:3000/api/login?${params}`)
            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.error || 'Login failed.')
            }
            user.value = await res.json()
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Unknown error'
        } finally {
            loading.value = false
        }
    }

    function logout() {
        user.value = null
        error.value = null
    }

    return { user, loading, error, isLoggedIn, isAdmin, displayName, login, logout }
})