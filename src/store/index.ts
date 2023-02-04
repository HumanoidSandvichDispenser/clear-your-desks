import { defineStore } from "pinia";
import { ref } from "vue";
import ProblemData from "../problem-data";
import TrigProblem from "../trig-problem";

export const useStore = defineStore("store", () => {
    const problems  = ref<ProblemData[]>([]);

    const maxTime = ref(120);

    const currentTime = ref(120);

    const isRunning = ref(false);

    let runningTimeout: NodeJS.Timer;

    function start() {
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
        isRunning.value = false;
        if (runningTimeout) {
            clearInterval(runningTimeout);
        }
    }

    return {
        problems,
        maxTime,
        currentTime,
        isRunning,
        start,
        stop,
    }
});
