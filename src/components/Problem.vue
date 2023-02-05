<script setup lang="ts">
import { defineProps, ref } from "vue";
import { useStore } from "../store";

const store = useStore();

const props = defineProps({
    question: String,
    answer: String,
});

const isRevealed = ref(false);

function reveal() {
    isRevealed.value = true;
}
</script>

<template>
    <div>
        <span v-katex="question">
        </span>
    </div>
    <div v-if="isRevealed">
        <span v-katex="answer">
        </span>
    </div>
</template>

<style scoped>
div.question {

}
</style>
