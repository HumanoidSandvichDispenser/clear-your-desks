import { defineStore } from "pinia";
import { computed, ref } from "vue";
import ParticleMotionProblem from "../problems/particle-motion-problem";
import ProblemData from "../problems/problem-data";
import TrigProblem from "../problems/trig-problem";

export const useStore = defineStore("store", () => {
    const selectedMode = ref("practice");

    const selectedSkills = ref<string[]>([]);

    const problems  = ref<ProblemData[]>([]);

    function generateProblems() {
        problems.value = ParticleMotionProblem.generate(10) ?? [];
    }

    return {
        selectedMode,
        selectedSkills,
        problems,
        generateProblems,
        //maxTime,
        //currentTime,
        //isRunning,
        //start,
        //stop,
    }
});
