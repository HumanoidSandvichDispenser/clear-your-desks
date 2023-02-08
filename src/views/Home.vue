<script setup lang="ts">
import { ref, computed } from "vue";
import { useSkillsStore } from "../store/skills";
import { useRouter } from "vue-router";
import { useStore } from "../store";

const router = useRouter();

const store = useStore();
const skills = useSkillsStore();

//const selectedSkills = ref<string[]>([]);

function toggleTopic(topic: string) {
    let idx = store.selectedSkills.indexOf(topic);
    if (idx > -1) {
        store.selectedSkills.splice(idx, 1);
    } else {
        store.selectedSkills.push(topic);
    }
}

function start() {
    router.push("/game/" + store.selectedMode);
    //store.start();
}
</script>

<template>
    <div>
        <div class="selection-buttons">
            <button
                :class="{
                    selection: true,
                    enabled: store.selectedMode == 'practice'
                }"
                @click="store.selectedMode = 'practice'"
            >
                Practice
                <p>Standard memory quiz practice</p>
            </button>
            <button
                :class="{
                    selection: true,
                    enabled: store.selectedMode == 'score-attack'
                }"
                @click="store.selectedMode = 'score-attack'"
            >
                Score Attack
                <p>Try to get the highest score possible</p>
            </button>
        </div>
        <hr>
        <div class="selection-buttons">
            <button
                v-for="skill in skills.current"
                :class="{
                    selection: true,
                    enabled: store.selectedSkills.includes(skill.name)
                }"
                @click="toggleTopic(skill.name)"
            >
                {{ skill.name }}
                <p class="subtext">
                    {{ skill.retentionPercentage }}
                </p>
            </button>
        </div>
        <button @click="start">Temporary start button</button>
    </div>
</template>

<style>
.selection-buttons {
    display: flex;
    column-gap: 16px;
    row-gap: 16px;
    max-width: 768px;
    column-count: 3;
    flex-wrap: wrap;
}

.selection-buttons > button.selection {
    flex: 1;
}

.selection-buttons > button.selection > p {
    margin-top: 1em;
}

.selection-buttons > button.selection > p.subtext {
    color: var(--fg1);
    font-size: 12px;
}

.selection-buttons > button.selection.enabled > p.subtext {
    color: var(--bg0);
}
</style>
