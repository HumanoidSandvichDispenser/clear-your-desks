import { defineStore } from "pinia";
import { computed, ref } from "vue";
import ProblemData from "../problem-data";
import TrigProblem from "../trig-problem";

export const useStore = defineStore("store", () => {
    const selectedMode = ref("practice");

    const selectedSkills = ref<string[]>([]);

    const problems  = ref<ProblemData[]>([]);

    const maxTime = ref(120);

    const currentTime = ref(120);

    const isRunning = ref(false);

    let runningTimeout: NodeJS.Timer;

    function start() {
        stop(); // stop in case we already started and then restart
        generateProblems();
        currentTime.value = maxTime.value;
        isRunning.value = true;
        runningTimeout = setInterval(() => {
            currentTime.value -= 1;
        }, 1000);
    }

    function generateProblems() {
        problems.value = TrigProblem.generate(10) ?? [];
    }

    function stop() {
        problems.value = [];
        isRunning.value = false;
        if (runningTimeout) {
            clearInterval(runningTimeout);
        }
    }

    return {
        selectedMode,
        selectedSkills,
        problems,
        maxTime,
        currentTime,
        isRunning,
        start,
        stop,
    }
});
