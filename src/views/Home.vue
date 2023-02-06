<script setup lang="ts">
import { ref } from "vue";
import { useSkillsStore } from "../store/skills";


const selectedMode = ref("practice");

const skills = useSkillsStore();
const selectedSkills = ref<string[]>([]);

function toggleTopic(topic: string) {
    let idx = selectedSkills.value.indexOf(topic);
    if (idx > -1) {
        selectedSkills.value.splice(idx, 1);
    } else {
        selectedSkills.value.push(topic);
    }
}
</script>

<template>
    <div class="selection-buttons">
        <button
            :class="{
                selection: true,
                enabled: selectedMode == 'practice'
            }"
            @click="selectedMode = 'practice'"
        >
            Practice
            <p>Standard memory quiz practice</p>
        </button>
        <button
            :class="{
                selection: true,
                enabled: selectedMode == 'score-attack'
            }"
            @click="selectedMode = 'score-attack'"
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
                enabled: selectedSkills.includes(skill.name)
            }"
            @click="toggleTopic(skill.name)"
        >
            {{ skill.name }}
            <p class="subtext">
                {{ skill.retentionPercentage }}
            </p>
        </button>
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
