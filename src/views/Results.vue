<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "../store";

const store = useStore();

const responses = computed(() => store.responses);
</script>

<template>
    <div class="results">
        <div class="score-panel">
            <div>
                <strong>
                    <small>YOUR SCORE</small>
                </strong>
            </div>
            <div class="score">
                <large>{{ store.score }}</large>
            </div>
        </div>
        <table cellspacing="0">
            <th></th>
            <th>
                Question
            </th>
            <th>
                Solution
            </th>
            <th>
                Response
            </th>
            <th class="lower">
                <span v-katex="'\\Delta k'" />
            </th>
            <tr
                v-for="(problem, i) in store.problems"
                :class="{
                    correct: i < responses.length && responses[i].isCorrect,
                    incorrect: i < responses.length && !responses[i].isCorrect,
                    ['no-submission']: i >= responses.length,
                }"
            >
                <td>
                    <span
                        v-if="i < responses.length && responses[i].isCorrect"
                        class="correct"
                    >
                        <bootstrap-icon icon="check-lg" />
                    </span>
                    <span v-else class="incorrect">
                        <bootstrap-icon icon="x-lg" />
                    </span>
                </td>
                <td>
                    <span v-katex="problem.question" />
                </td>
                <td>
                    <span v-katex="problem.answer" />
                </td>
                <td>
                    <span
                        v-if="i < responses.length"
                        v-katex="responses[i].submission"
                    />
                </td>
                <td>
                    <span v-if="i < responses.length">
                        {{ responses[i].deltaK }}
                    </span>
                </td>
            </tr>
        </table>
        <router-link to="/">
            <button class="start-button">Continue</button>
        </router-link>
    </div>
</template>

<style scoped>
@keyframes slide {
    0% {
        height: 100vh;
    }
    100% {
        height: 256px;
    }
}

.results {
    font-size: 24px;
}

.results > table {
    margin: auto;
    border-radius: 4px;
    border-spacing: 0 8px;
}

.score-panel {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    animation: slide 1s;
    animation-delay: 1s;
    animation-fill-mode: forwards;
}

.score {
    font-size: 72px;
    font-weight: 700;
    padding: 48px;
}

th {
    text-transform: uppercase;
    font-size: 16px;
}

th.lower {
    text-transform: initial;
}

th, td {
    padding: 8px 16px;
}

span.correct {
    color: var(--green);
}

span.incorrect {
    color: var(--fg2);
}

tr.correct {
    background-color: var(--transparent-green);
}

tr.incorrect {
    background-color: var(--bg1);
}

tr.no-response {
    background-color: var(--bg1);
}
</style>
