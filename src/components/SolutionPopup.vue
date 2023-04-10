<script setup lang="ts">
const props = defineProps({
    isRevealed: Boolean,
    isCorrect: Boolean,
    question: String,
    answer: String,
    response: String,
});
</script>

<template>
    <transition name="slide">
        <div
            :class="{
                'answer': true,
                [isCorrect ? 'correct' : 'incorrect']: true,
            }"
            v-if="isRevealed"
        >
            <h2 v-if="isCorrect">You are correct</h2>
            <h2 v-else>
                Correct solution:
                <span v-katex="answer"></span>
                <div class="latex-solution">
                    <div>
                        Question: {{ question }}
                    </div>
                    <div>
                        Expected Answer: {{ answer }}
                    </div>
                    <div>
                        Your response: {{ response }}.
                    </div>
                    <div>
                        File an issue on
                        <a href="https://github.com/humanoidsandvichdispenser/clear-your-desks/issues">the GitHub repository</a>
                        if your solution was not marked correct but should be accepted.
                    </div>
                </div>
            </h2>
        </div>
    </transition>
</template>

<style scoped>
.answer {
    position: absolute;
    left: 0;
    bottom: 0;
}

.answer .latex-solution {
    font-family: monospace;
    font-weight: 500;
    font-size: 16px;
    opacity: 0.5;
}

@keyframes slide {
    0% {
        transform: translateY(100%);
    }
    100% {
        transform: translateY(0);
    }
}

.slide-enter-active {
    animation: slide 200ms;
}

.slide-leave-active {
    animation: slide 200ms reverse;
}
</style>
