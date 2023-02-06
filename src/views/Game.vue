<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Problem from "../components/Problem.vue";
import { useStore } from "../store";

const store = useStore();
const router = useRouter();

const problems = ref([]);

function stop() {
    store.stop();
}

function next() {
    if (store.problems.length == 0) {
        return;
    }

    currentProblemIndex.value++;

    if (currentProblemIndex.value >= store.problems.length) {
        stop();
    }

    currentProblemIndex.value %= store.problems.length;
}

function close() {
    router.push("/");
}

const currentProblemIndex = ref(0);

const currentProblem = computed(
    () => store.problems[currentProblemIndex.value]
);

onMounted(() => {
    if (!store.isRunning) {
        // we loaded the game view, but no game has started!
        store.start();
    }
});
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
    <button v-if="store.isRunning" @click="next">Next (testing)</button>
    <button v-else @click="close">Close</button>
</template>
