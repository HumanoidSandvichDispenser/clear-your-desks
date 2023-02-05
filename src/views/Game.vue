<script setup lang="ts">
import { computed, ref } from "vue";
import Problem from "../components/Problem.vue";
import { useStore } from "../store";

const store = useStore();

const problems = ref([]);

function stop() {
    store.stop();
}

function next() {
    if (store.problems.length == 0) {
        return;
    }

    currentProblemIndex.value++;
    currentProblemIndex.value %= store.problems.length;
}

const currentProblemIndex = ref(0);

const currentProblem = computed(
    () => store.problems[currentProblemIndex.value]
);
</script>

<template>
    <div>
        <problem
            v-if="store.problems.length > 0"
            :question="currentProblem.question"
        />
    </div>
    <div v-if="store.isRunning">
        {{ store.currentTime }} seconds left
    </div>
    <div v-else>
        Time limit: {{ store.maxTime }} seconds
    </div>
</template>
