<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
// TODO: replace relative paths with @ root paths
import { useStore } from "../store";
import Problem from "../components/Problem.vue";
import { MathfieldElement } from "mathlive";
import ProblemData from "../problem-data";

const store = useStore();

onMounted(() => {
    if (store.problems.length == 0) {
        store.generateProblems();
    }

    if (mathfield.value) {
        mathfield.value.setOptions({
            inlineShortcuts: {
                "pi": "\\pi",
                "sqrt": "\\sqrt",
                "infty": "\\infty",
                "int": "\\int",
                "undefined": "\\textrm{undefined}",
                "DNE": "\\textrm{DNE}",
                "sin": "\\sin",
                "cos": "\\cos",
                "tan": "\\tan",
                "csc": "\\csc",
                "sec": "\\sec",
                "cot": "\\cot",
            },
        });
    }
});

const mathfield = ref<MathfieldElement>();
const submitButton = ref<HTMLButtonElement>();

const currentProblemIndex = ref(0);
const currentProblem = computed(() => {
    return store.problems[currentProblemIndex.value];
});
const currentInstructions = computed(() => {
    if (currentProblem.value) {
        let problem = currentProblem.value.constructor as typeof ProblemData;
        return problem.instructions;
    }
    return "";
});

const isCorrect = ref(false);
const isRevealed = ref(false);

function next() {
    if (!mathfield.value) {
        return;
    }

    currentProblemIndex.value++;
    isRevealed.value = false;
    mathfield.value.value = "";

    if (currentProblemIndex.value >= store.problems.length) {
        throw new Error("not implemented");
    } else {
        mathfield.value.disabled = false;
        if (!mathfield.value.hasFocus()) {
            mathfield.value.focus();
        }
    }
}

function keyup(event: KeyboardEvent) {
    if (event.key == "Enter") {
        if (event.target == mathfield.value) {
            if (isRevealed.value) {
                next();
            } else {
                submit();
            }
        }
    }
}

function submit() {
    if (!mathfield.value) {
        return;
    }

    const problem = currentProblem.value;
    const input = mathfield.value.value;
    isCorrect.value = problem.checkAnswer(input);
    isRevealed.value = true;
    mathfield.value.disabled = true;
    mathfield.value.focus();
}
</script>

<template>
    <h2>{{ currentInstructions }}</h2>
    <div>
        <problem
            v-if="currentProblem"
            :question="currentProblem.question"
            :answer="currentProblem.answer"
        >
        </problem>
        <div class="entry">
            <math-field class="mathfield" ref="mathfield" @keyup="keyup">
            </math-field>
            <button class="accent" ref="submit-button" @click="submit">
                Submit
            </button>
        </div>
    </div>
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
            <span v-katex="currentProblem.answer"></span>
        </h2>
    </div>
</template>

<style scoped>
@keyframes shake {
    0% {
        transform: translateX(-10%);
    }
    10% {
        transform: translateX(10%);
    }
    20% {
        transform: translateX(-10%);
    }
    30% {
        transform: translateX(10%);
    }
    40% {
        transform: translateX(-10%);
    }
    50% {
        transform: translateX(10%);
    }
    60% {
        transform: translateX(-8%);
    }
    70% {
        transform: translateX(6%);
    }
    80% {
        transform: translateX(-4%);
    }
    90% {
        transform: translateX(2%);
    }
    100% {
        transform: translateX(0%);
    }
}

.answer {
    width: 100%;
    /*outline: 2px solid;*/
    color: white;
    padding: 1.2em;
    border-radius: 4px;
    margin-top: 8px;
    box-sizing: border-box;
    font-weight: 500;
    font-size: 20px;
    /*animation: 0.5 ease-in-out 0s infinite shake;*/
}

.answer.correct {
    background-color: var(--green);
}

.answer.incorrect {
    background-color: var(--red);
}

.entry {
    display: flex;
    column-gap: 8px;
}

.entry > .mathfield {
    border: 1px solid var(--fg0);
    border-radius: 4px;
    flex: 1;
    vertical-align: middle;
    padding: 0.6em;
    font-size: 18px;
}
</style>
