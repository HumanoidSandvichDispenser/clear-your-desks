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

    function generateProblems() {
        const skills = useSkillsStore();
        let selectedSkillObjects: Skill[];
        if (selectedSkills.value.length == 0) {
            // if we have not selected skills then they are all selected by
            // default
            selectedSkillObjects = Array.from(skills.current);
        } else {
            /*
            selectedSkillObjects = selectedSkills.value.map((skill) =>
                skills.getSkill(skill));
            */
            selectedSkillObjects = skills.available.filter((skill) =>
                selectedSkills.value.includes(skill.name));
        }
        responses.value = [];
        problems.value = [];
        /*
        problems.value = problems.value
            //.concat(DifferentiationProblem.generate(5) ?? [])
            .concat(IntegrationProblem.generate(5) ?? [])
        */
        selectedSkillObjects.forEach(skill => {
            let generatedProblems = skill.problem?.generate(5);
            if (generatedProblems) {
                problems.value = problems.value.concat(generatedProblems);
            }
        });
        problems.value = shuffle<ProblemData>(problems.value);
        problems.value = problems.value.slice(0, 10);
    }

    return {
        selectedMode,
        selectedSkills,
        problems,
        responses,
        score,
        generateProblems,
        isSupaLidlMode,
        //maxTime,
        //currentTime,
        //isRunning,
        //start,
        //stop,
    }
});
