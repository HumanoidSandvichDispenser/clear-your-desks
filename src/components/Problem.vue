<script setup lang="ts">
import { defineProps, ref, computed } from "vue";
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

const questionLarge = computed(() => `\\large{${props.question}}`);
</script>

<template>
    <div>
        <span v-katex:display="questionLarge">
        </span>
    </div>
    <div v-if="isRevealed">
        <span v-katex="answer">
        </span>
    </div>
</template>

<style scoped>
div.question {
    font-size: 32px;
}
</style>
