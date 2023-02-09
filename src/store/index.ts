import { defineStore } from "pinia";
import { computed, ref } from "vue";
import GeometryProblem from "../problems/geometry-problem";
import ParticleMotionProblem from "../problems/particle-motion-problem";
import ProblemData from "../problems/problem-data";
import { UserResponse } from "../problems/response";
import TrigProblem from "../problems/trig-problem";
import { shuffle } from "../utils";

export const useStore = defineStore("store", () => {
    const selectedMode = ref("practice");

    const selectedSkills = ref<string[]>([]);

    const problems = ref<ProblemData[]>([]);

    const responses = ref<UserResponse[]>([]);

    const score = ref(0);

    function generateProblems() {
        responses.value = [];
        problems.value = [];
        problems.value = problems.value
            .concat(GeometryProblem.generate(5) ?? [])
            .concat(TrigProblem.generate(5) ?? [])
            .concat(ParticleMotionProblem.generate(5) ?? []);
        console.log(problems.value);
        problems.value = shuffle<ProblemData>(problems.value);
        console.log(problems.value);
        problems.value = problems.value.slice(0, 10);
    }

    return {
        selectedMode,
        selectedSkills,
        problems,
        responses,
        score,
        generateProblems,
        //maxTime,
        //currentTime,
        //isRunning,
        //start,
        //stop,
    }
});
