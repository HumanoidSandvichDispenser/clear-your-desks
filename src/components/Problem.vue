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
        <span v-katex="question">
        </span>
    </div>
</template>

<style scoped>
div.question {

}
</style>
