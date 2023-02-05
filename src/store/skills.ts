import { defineStore } from "pinia";
import { ref } from "vue";
import Skill from "../skill";

export const useSkillsStore = defineStore("skills", () => {
    const available: Skill[] = [
        new Skill("Trigonometry", 0),
        new Skill("Inverse Trigonometry", 0),
        new Skill("Limits", 0),
        new Skill("Special Limits", 0),
        new Skill("Differentiation", 0),
        new Skill("Differential Equations", 0),
        new Skill("Integration", 0),
        new Skill("Geometry", 0),
        new Skill("Physics", 0),
        new Skill("Parametrics & Polars", 0),
    ];

    const current = ref<Skill[]>([]);

    function readFromLocalStorage() {
        let json = window.localStorage.getItem("skills");

        try {
            current.value = JSON.parse(json ?? "[]");
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
    }

    function writeToLocalStorage() {
        // backup just in case
        window.localStorage.setItem("skills.bak",
            window.localStorage.getItem("skills") ?? "");

        let json = JSON.stringify(current.value);
        window.localStorage.setItem("skills", json);
    }

    return {
        available,
        current,
        readFromLocalStorage,
        writeToLocalStorage,
    }
});
