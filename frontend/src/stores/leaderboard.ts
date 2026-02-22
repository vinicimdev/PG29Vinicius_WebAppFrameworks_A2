import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface LeaderboardEntry {
    id: number
    player: string
    score: number
}

export const useLeaderboardStore = defineStore('leaderboard', () => {
    const entries = ref<LeaderboardEntry[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

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

    async function submitScore(player: string, score: number) {
        try {
            const res = await fetch('http://localhost:3000/api/leaderboard', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ player, score }),
            })
            if (!res.ok) throw new Error('Failed to submit score.')
            await fetchLeaderboard() // refresh after submitting
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Unknown error'
        }
    }

    function sortByScore() {
        entries.value = [...entries.value].sort((a, b) => b.score - a.score)
    }

    function sortByName() {
        entries.value = [...entries.value].sort((a, b) => a.player.localeCompare(b.player))
    }

    return { entries, loading, error, fetchLeaderboard, submitScore, sortByScore, sortByName }
})
