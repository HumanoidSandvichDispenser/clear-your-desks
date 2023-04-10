import { defineStore } from "pinia";
import { computed, ref } from "vue";
import GeometryProblem from "../problems/geometry-problem";
import LimitProblem from "../problems/limit-problem";
import ParticleMotionProblem from "../problems/particle-motion-problem";
import ProblemData from "../problems/problem-data";
import { UserResponse } from "../problems/response";
import TrigIdentityProblem from "../problems/trig-identity-problem";
import TrigProblem from "../problems/trig-problem";
import DifferentiationProblem from "../problems/differentiation-problem";
import IntegrationProblem from "../problems/integration-problem";
import { shuffle } from "../utils";
import { useSkillsStore } from "./skills";
import Skill from "../skill";

export const useStore = defineStore("store", () => {
    const selectedMode = ref("score-attack");

    const selectedSkills = ref<string[]>([]);

    const problems = ref<ProblemData[]>([]);

    const responses = ref<UserResponse[]>([]);

    const score = ref(0);

    const isSupaLidlMode = ref(false);

    const questionCount = ref(10);

    const timePerQuestion = ref(12);

    function generateProblems() {
        const skills = useSkillsStore();
        let selectedSkillObjects: Skill[];
        if (selectedSkills.value.length == 0) {
            // if we have not selected skills then they are all selected by
            // default
            selectedSkillObjects = Array.from(skills.current);
        } else {
            selectedSkillObjects = skills.available.filter((skill) =>
                selectedSkills.value.includes(skill.name));
        }
        responses.value = [];
        problems.value = [];
        selectedSkillObjects.forEach(skill => {
            // probably a bad idea to generate so many unused questions for
            // each topic but whatever
            let generatedProblems = skill
                .problem?.generate(questionCount.value);
            if (generatedProblems) {
                problems.value = problems.value.concat(generatedProblems);
            }
        });
        problems.value = shuffle<ProblemData>(problems.value);
        problems.value = problems.value.slice(0, questionCount.value);
    }

    return {
        selectedMode,
        selectedSkills,
        problems,
        responses,
        score,
        questionCount,
        timePerQuestion,
        generateProblems,
        isSupaLidlMode,
        //maxTime,
        //currentTime,
        //isRunning,
        //start,
        //stop,
    }
});
