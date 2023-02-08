<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
// TODO: replace relative paths with @ root paths
import { useStore } from "../store";
import Problem from "../components/Problem.vue";
import { MathfieldElement } from "mathlive";
import ProblemData from "../problem-data";
import GameBar from "../components/GameBar.vue";
import router from "../router";
import Timer from "../timer";

const store = useStore();

onMounted(() => {
    if (store.problems.length == 0) {
        store.generateProblems();
    }

    currentProblemIndex.value = -1;
    timer.time = 120;
    next();

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

const score = ref(0);
const streak = ref(0);

let timer = reactive(new Timer());

watch(timer, () => {
    if (timer.time <= 0) {
        end();
    }
});

const mathfield = ref<MathfieldElement>();

const currentProblemIndex = ref(0);
const currentProblem = computed(() => {
    return store.problems[currentProblemIndex.value];
});
const isCorrect = ref(false);
const isRevealed = ref(false);

function end() {
    router.push("/results");
}

function next() {
    if (!mathfield.value) {
        return;
    }

    currentProblemIndex.value++;
    isRevealed.value = false;
    mathfield.value.value = "";

    if (currentProblemIndex.value >= store.problems.length) {
        end();
    } else {
        mathfield.value.disabled = false;
        if (!mathfield.value.hasFocus()) {
            mathfield.value.focus();
        }
    }

    timer.start();
}

function keyup(event: KeyboardEvent) {
    if (event.key == "Enter") {
        if (event.target == mathfield.value) {
            if (isRevealed.value) {
                next();
            } else if (mathfield.value.value.trim() != "") {
                // if not empty, submit
                submit();
            }
        }
    }
}

function onCorrect(dt: number) {
    score.value = Math.round(currentProblem.value.calculateScore(dt));
    score.value += 10 * streak.value;
    streak.value++;
}

function onIncorrect() {
    streak.value = 0;
}

function submit() {
    if (!mathfield.value) {
        return;
    }

    const problem = currentProblem.value;
    const input = mathfield.value.value;
    let dt = timer.stop();
    isCorrect.value = problem.checkAnswer(input);
    isCorrect.value ? onCorrect(dt) : onIncorrect();
    isRevealed.value = true;
    mathfield.value.disabled = true;
    mathfield.value.focus();
}
</script>

<template>
    <div>
        <game-bar :score="score" :streak="streak" :time="timer.time" />
        <div class="game">
            <h2 v-if="currentProblem">{{ currentProblem.instruction }}</h2>
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
        </div>
    </div>
</template>

<style scoped>
.game {
    box-shadow: 1px 1px 8px #00000055;
    padding: 4em;
}

.game span.katex-display,
.game span.katex-display > .katex {
    text-align: left;
}

.answer {
    width: 100%;
    color: white;
    padding: 1.2em;
    border-radius: 4px;
    margin-top: 8px;
    box-sizing: border-box;
    font-weight: 500;
    font-size: 20px;
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
