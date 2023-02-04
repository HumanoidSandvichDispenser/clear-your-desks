<script setup lang="ts">
import { computed, ref } from "vue";
import Problem from "../components/Problem.vue";
import { useStore } from "../store";

const store = useStore();
</script>

<template>
    <div>
        <problem
            v-for="problem in store.problems"
            :question="problem.question"
        />
        <problem question="the quick brown fox jumps over the lazy dog" />
    </div>
    <div v-if="store.isRunning">
        {{ store.currentTime }} seconds left
    </div>
    <div v-else>
        Time limit: {{ store.maxTime }} seconds
    </div>
    <input type="range" v-model="store.maxTime" min="60" max="300" step="15" />
    <button v-if="store.isRunning" @click="store.stop">Stop</button>
    <button v-else @click="store.start">Start</button>
</template>
