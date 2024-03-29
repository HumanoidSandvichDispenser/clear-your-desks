<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
// TODO: replace relative paths with @ root paths
import { useStore } from "../store";
import { useSkillsStore } from "../store/skills";
import Problem from "../components/Problem.vue";
import { MathfieldElement } from "mathlive";
import ProblemData from "../problems/problem-data";
import GameBar from "../components/GameBar.vue";
import router from "../router";
import Timer from "../timer";
import SolutionPopup from "../components/SolutionPopup.vue";

import SuccessAudio1 from "../assets/success1.mp3";
import SuccessAudio2 from "../assets/success2.mp3";
import SuccessAudio3 from "../assets/success3.mp3";
import SuccessAudio4 from "../assets/success4.mp3";
import SuccessAudio5 from "../assets/success5.mp3";
import FailureAudio from "../assets/failure.mp3";

const store = useStore();
const skills = useSkillsStore();

const score = computed({
    get: (): number => store.score,
    set: (value: number) => store.score = value,
});
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
    console.log(skills.current);
    skills.writeToLocalStorage();
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
            continueGame();
        }
    }
}

function continueGame() {
    if (isRevealed.value) {
        next();
    } else if (mathfield.value?.value.trim() != "") {
        // if not empty, submit
        submit();
    }
}

function onCorrect(dt: number) {
    let reward = Math.round(currentProblem.value.calculateScore(dt));

    reward = Math.max(reward, 10);
    score.value += reward + (10 * streak.value);
    streak.value++;

    //let audioIndex = Math.min(streak.value, 5);
    let audio = new Audio();
    //audio.src = "src/assets/success" + audioIndex + ".mp3";
    if (streak.value == 1) {
        audio.src = SuccessAudio1;
    } else if (streak.value == 2) {
        audio.src = SuccessAudio2;
    } else if (streak.value == 3) {
        audio.src = SuccessAudio3;
    } else if (streak.value == 4) {
        audio.src = SuccessAudio4;
    } else if (streak.value >= 5) {
        audio.src = SuccessAudio5;
    }
    audio.play();
    audio.onended = () => {
        audio.remove();
    };
}

function onIncorrect() {
    streak.value = 0;
    //let audioIndex = Math.min(streak.value, 5);
    let audio = new Audio(FailureAudio);
    audio.play();
    audio.onended = () => {
        audio.remove();
    };
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

    // negative rating when answering too slow, positive for too fast.
    let rating = currentProblem.value.recallTime - dt;

    // if we're not correct in the first place, it will our rating will just be
    // how long it took to answer
    if (!isCorrect.value) {
        rating = -dt;
    }

    let skill = skills.getSkill(currentProblem.value.skillName);
    let k1 = skill.k;
    skill.retain(rating);
    let k2 = skill.k;
    console.log("Retaining");
    console.log("Rating: " + rating);
    console.log("New skill score: " + skill.score);

    store.responses.push({
        submission: input,
        isCorrect: isCorrect.value,
        rating,
        deltaK: Math.round((k2 - k1) * 100) / 100,
    });

    mathfield.value.disabled = true;
    mathfield.value.focus();
}

let isInitialized = false;

function init() {
    store.generateProblems();

    score.value = 0;
    currentProblemIndex.value = -1;
    timer.time = store.questionCount * store.timePerQuestion;
    next();

    if (mathfield.value) {
        mathfield.value.setOptions({
            inlineShortcuts: {
                "pi": "\\pi",
                "sqrt": "\\sqrt",
                "infty": "\\infty",
                "infinity": "\\infty",
                "int": "\\int",
                "undefined": "\\textrm{undefined}",
                "DNE": "\\textrm{DNE}",
                "dne": "\\textrm{DNE}",
                "ln": "\\ln",
                "log": "\\log",
                "sin": "\\sin",
                "cos": "\\cos",
                "tan": "\\tan",
                "csc": "\\csc",
                "sec": "\\sec",
                "cot": "\\cot",
                "theta": "\\theta",
            },
        });
    }

    isInitialized = true;
};

onMounted(() => init());

if (!isInitialized) {
    init();
}
</script>

<template>
    <div class="game">
        <game-bar :score="score" :streak="streak" :time="timer.time" />
        <div class="game-card">
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
                    <button
                        class="accent"
                        ref="submit-button"
                        @click="continueGame"
                    >
                        <span v-if="isRevealed">
                            Continue
                        </span>
                        <span v-else>
                            Submit
                        </span>
                    </button>
                </div>
            </div>
        </div>
        <solution-popup
            :is-revealed="isRevealed"
            :is-correct="isCorrect"
            :question="currentProblem?.question"
            :answer="currentProblem?.answer"
            :response="mathfield?.value"
        />
    </div>
</template>

<style scoped>
.game {
    max-width: 768px;
    margin: auto;
}

.game-card {
    box-shadow: 1px 1px 8px #00000055;
    padding: 4em;
}

.game-card span.katex-display,
.game-card span.katex-display > .katex {
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
