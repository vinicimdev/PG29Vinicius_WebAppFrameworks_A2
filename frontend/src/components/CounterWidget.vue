<template>
    <section class="counter">
        <h2>Counter:</h2>
        <p>Count: {{ store.count }}</p>
        <p>Double: {{ store.doubleCount }}</p>

        <button @click="store.increment">Increment</button>
    </section>
</template>

<script setup lang="ts">
    import { useCounterStore } from "../stores/counter";

    const store = useCounterStore();
</script>

<style scoped>
    .counter {
        border: 2px solid #9fc3cc;
        border-radius: 12px;
        padding: 30px;
        margin: 40px auto;
        max-width: 500px;
        background-color: #dbeeed;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .counter h2 {
        font-size: 28px;
        color: #9fc3cc;
        margin-bottom: 20px;
        font-family: 'Arial', 'Helvetica', sans-serif;
        font-weight: 700;
    }

    .counter p {
        font-size: 18px;
        color: #333333;
        margin: 10px 0;
        font-family: 'Arial', 'Helvetica', sans-serif;
    }

    button {
        padding: 12px 24px;
        margin-top: 20px;
        cursor: pointer;
        font-size: 16px;
        font-weight: 600;
        background-color: #9fc3cc;
        color: #dbeeed;
        border: none;
        border-radius: 4px;
        transition: all 0.3s ease;
        font-family: 'Arial', 'Helvetica', sans-serif;
    }

    button:hover {
        background-color: #b8e3e4;
        transform: translateY(-2px);
    }
</style>