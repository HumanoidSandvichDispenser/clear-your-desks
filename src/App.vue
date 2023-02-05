<script setup lang="ts">
import { useSkillsStore } from "./store/skills";

const skills = useSkillsStore();
skills.readFromLocalStorage();
console.log(skills.current);
</script>

<template>
    <router-view />
</template>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
}

.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
