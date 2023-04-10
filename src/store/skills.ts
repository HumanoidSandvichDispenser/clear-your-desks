import { defineStore } from "pinia";
import { ref } from "vue";
import DifferentialEquationProblem from "../problems/differential-eq-problem";
import TrigDerivativeProblem from "../problems/trig-derivative-problem";
import DifferentiationProblem from "../problems/differentiation-problem";
import GeometryProblem from "../problems/geometry-problem";
import IntegrationProblem from "../problems/integration-problem";
import LimitProblem from "../problems/limit-problem";
import ParticleMotionProblem from "../problems/particle-motion-problem";
import TrigIdentityProblem from "../problems/trig-identity-problem";
import InverseTrigProblem from "../problems/inverse-trig-problem";
import TrigProblem from "../problems/trig-problem";
import Skill, { ISkill } from "../skill";
import PolarProblem from "../problems/polar-problem";
import MaclaurinProblem from "../problems/maclaurin-problem";
import MaclaurinNthTermProblem from "../problems/maclaurin-nth-term-problem";

export const useSkillsStore = defineStore("skills", () => {
    const available: Skill[] = [
        new Skill("Trigonometry", 0, undefined, TrigProblem),
        new Skill("Inverse Trigonometry", 0, undefined, InverseTrigProblem),
        new Skill("Trigonometric Identities", 0, undefined, TrigIdentityProblem),
        new Skill("Trigonometric Derivatives", 0, undefined, TrigDerivativeProblem),
        new Skill("Limits", 0, undefined, LimitProblem),
        new Skill("Differentiation", 0, undefined, DifferentiationProblem),
        new Skill("Integration", 0, undefined, IntegrationProblem),
        new Skill("Geometry", 0, undefined, GeometryProblem),
        new Skill("Particle Motion", 0, undefined, ParticleMotionProblem),
        new Skill("Maclaurin Series", 0, undefined, MaclaurinProblem),
        new Skill("Maclaurin Series (nth term)", 0, undefined, MaclaurinNthTermProblem),
        //new Skill("Differential Equations", 0, undefined, DifferentialEquationProblem),
        //new Skill("Polar Equations", 0, undefined, PolarProblem),
        //new Skill("Parametrics & Polars", 0),
    ];

    const current = ref<Skill[]>([]);

    function readFromLocalStorage() {
        let json = window.localStorage.getItem("skills");

        try {
            let skillInfo: Array<ISkill> = JSON.parse(json ?? "[]");
            current.value = skillInfo.map((info) => Skill.fromInfo(info));
        } catch (e) {
            current.value = [];
        }

        // remove skills that aren't available (removed in future updates or
        // user manually edited them)
        current.value = current.value.filter(skill =>
            available.find(s => skill.name == s.name));

        // add skills that are available but not stored.
        current.value = current.value.concat(available.filter(skill =>
            !current.value.find(s => skill.name == s.name)));

        current.value.forEach(skill => console.log(skill));
    }

    function writeToLocalStorage() {
        console.log("writing to local storage");
        console.log(current.value);
        // backup just in case
        window.localStorage.setItem("skills.bak",
            window.localStorage.getItem("skills") ?? "");

        let json = JSON.stringify(current.value);
        window.localStorage.setItem("skills", json);
    }

    function getSkill(name: string): Skill {
        let idx = current.value.findIndex((skill) => skill.name == name);
        if (idx > -1) {
            return current.value[idx];
        }
        throw new Error("Unknown skill " + name);
    }

    return {
        available,
        current,
        readFromLocalStorage,
        writeToLocalStorage,
        getSkill,
    }
});
