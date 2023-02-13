<script setup lang="ts">
import { useSkillsStore } from "./store/skills";
import NavigationBar from "./components/NavigationBar.vue";
import router from "./router";
import SkillList from "./components/SkillList.vue";

const skills = useSkillsStore();
skills.readFromLocalStorage();
console.log(skills.current);
</script>

<template>
    <navigation-bar />
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

.root {
    width: 1024px;
    padding: 2rem;
}

main {
    width: 1024px;
    margin: 0 auto;
    text-align: center;
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
