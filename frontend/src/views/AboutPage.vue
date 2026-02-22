<template>
    <div class="about-page">
        <h1>About this game</h1>
        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
            anim id est laborum."</p>

        <!--Probably should add widgets :)-->
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
    .about-page {
        text-align: center;
        padding: 60px 20px;
        background-color: #ffffff;
        min-height: calc(100vh - 200px);
    }

    .about-page h1 {
        font-size: 48px;
        color: #9fc3cc;
        margin-bottom: 20px;
        font-family: 'Arial', 'Helvetica', sans-serif;
        font-weight: 700;
    }

    .about-page p {
        font-size: 20px;
        color: #333333;
        max-width: 600px;
        margin: 0 auto;
        line-height: 1.6;
        font-family: 'Arial', 'Helvetica', sans-serif;
    }
</style>
