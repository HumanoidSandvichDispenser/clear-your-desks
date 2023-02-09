import { defineStore } from "pinia";
import { ref } from "vue";
import Skill, { ISkill } from "../skill";

export const useSkillsStore = defineStore("skills", () => {
    const available: Skill[] = [
        new Skill("Trigonometry", 0),
        new Skill("Inverse Trigonometry", 0),
        new Skill("Trigonometric Identities", 0),
        new Skill("Limits", 0),
        new Skill("Special Limits", 0),
        new Skill("Differentiation", 0),
        new Skill("Integration", 0),
        new Skill("Geometry", 0),
        new Skill("Particle Motion", 0),
        new Skill("Parametrics & Polars", 0),
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
