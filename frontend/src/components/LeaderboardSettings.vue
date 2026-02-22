<template>
    <div class="buttons">
        <button @click="handleSortByScore" class="score-sort-button">Score</button>
        <button @click="handleSortByName" class="name-sort-button">Name</button>
        <button @click="handleRefresh" class="refresh-button">Refresh</button>
    </div>
</template>
<script setup lang ="ts">

    const emit = defineEmits<{
        sortByScore: []
        sortByName: []
        refresh: []
    }>()
    
    const handleSortByScore = () => {
        emit('sortByScore')
    }

    const handleSortByName = () => {
        emit('sortByName')
    }

    const handleRefresh = () => {
        emit('refresh')
    }
</script>

<style scoped>
    .buttons {
        display: flex;
        gap: 10px;
        padding: 20px;
        justify-content: start;
    }

    .score-sort-button,
    .name-sort-button,
    .refresh-button {
        padding: 10px 20px;
        font-size: 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
        color: white;
        font-family: 'Arial', 'Helvetica', sans-serif;
    }

    .score-sort-button {
        background-color: #9fc3cc;
        color: #dbeeed;
    }

    .score-sort-button:hover {
        background-color: #b8e3e4;
        color: #dbeeed;
        transform: translateY(-2px);
    }

    .name-sort-button {
        background-color: #9fc3cc;
        color: #dbeeed;
    }

    .name-sort-button:hover {
        background-color: #b8e3e4;
        color: #dbeeed;
        transform: translateY(-2px);
    }

    .refresh-button {
        background-color: #9fc3cc;
        color: #dbeeed;
    }

    .refresh-button:hover {
        background-color: #b8e3e4;
        color: #dbeeed;
        transform: translateY(-2px);
    }
</style>