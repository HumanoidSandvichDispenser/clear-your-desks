<script setup lang="ts">
import { useSkillsStore } from "./store/skills";

const skills = useSkillsStore();
skills.readFromLocalStorage();
console.log(skills.current);
</script>

<template>
    <main class="view">
        <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>
    </main>
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

main {
    width: 768px;
}

.fade-enter-active,
.fade-leave-active {
    transition: 200ms ease all;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-to {
    opacity: 1;
}
</style>
