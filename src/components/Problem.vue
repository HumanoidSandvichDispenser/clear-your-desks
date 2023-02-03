<script setup lang="ts">
import { defineProps } from "vue";
import { useStore } from "../store";

const store = useStore();

const props = defineProps({
    question: String,
});
</script>

<template>
    <div>
        <h1>{{ store.currentTime }}</h1>
        <span v-katex:auto>
            \(f(x) = {{ store.currentTime }}\)
        </span>
    </div>
</template>

<style scoped>
div.question {

}
</style>
