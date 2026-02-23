import { ref } from 'vue'
import { defineStore } from 'pinia'

// TypeScript interface to enforce types
export interface LeaderboardEntry {
    id: number
    player: string
    score: number
}

export const useLeaderboardStore = defineStore('leaderboard', () => {
    const entries = ref<LeaderboardEntry[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    // Promise to fetch data from the leaderboard
    // When the loading is true, the LeaderboardPage will show a spinning (loading) icon
    async function fetchLeaderboard() {
        loading.value = true
        error.value = null
        try {
            const res = await fetch('http://localhost:3000/api/leaderboard')
            if (!res.ok) throw new Error('Failed to fetch leaderboard.')
            entries.value = await res.json()
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Unknown error'
        } finally {
            loading.value = false
        }
    }

    // Promise to submit data to the leaderboard
    // This time, we pass an object to the fetch, to determine
    // how the fetch will occur   
    async function submitScore(player: string, score: number) {
        try {
            const res = await fetch('http://localhost:3000/api/leaderboard', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ player, score }),
            })
            if (!res.ok) throw new Error('Failed to submit score.')
            await fetchLeaderboard() // Refresh the leaderboard after submitting
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Unknown error'
        }
    }

    // Sort functions
    function sortByScore() {
        entries.value = [...entries.value].sort((a, b) => b.score - a.score)
    }

    function sortByName() {
        entries.value = [...entries.value].sort((a, b) => a.player.localeCompare(b.player))
    }

    return { entries, loading, error, fetchLeaderboard, submitScore, sortByScore, sortByName }
})
