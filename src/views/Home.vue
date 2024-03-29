<script setup lang="ts">
import { ref, computed } from "vue";
import { useSkillsStore } from "../store/skills";
import { useRouter } from "vue-router";
import { useStore } from "../store";
import Links from "../components/Links.vue";

const router = useRouter();

const store = useStore();
const skills = useSkillsStore();

store.questionCount = 10;
store.timePerQuestion = 12;

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
}

function selectLowRetention() {
    store.selectedSkills.length = 0;
    skills.current.forEach((skill) => {
        let retention = skill.predictRetentionDecay();
        if (retention < 0.7) {
            store.selectedSkills.push(skill.name);
        }
    });
}
</script>

<template>
    <div class="home">
        <div class="selection-buttons">
            <button
                :class="{
                    selection: true,
                    enabled: store.selectedMode == 'practice'
                }"
                @click="store.selectedMode = 'practice'"
                disabled
            >
                Zen Mode
                <p>
                    coming soon
                    <img src="https://cdn.7tv.app/emote/603caa69faf3a00014dff0b1/1x.webp" />
                    when I feel like working on it
                </p>
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
        <div class="range-selection">
            <input type="range" v-model="store.questionCount" min="1" max="100">
            <span>{{ store.questionCount }} questions</span>
            <button
                v-if="store.questionCount != 10"
                @click="store.questionCount = 10"
            >
                Reset to default
            </button>
        </div>
        <div class="range-selection">
            <input type="range" v-model="store.timePerQuestion" min="1" max="30">
            <span>
                {{ store.timePerQuestion }} seconds per question
                ({{ store.questionCount * store.timePerQuestion }} seconds total)
            </span>
            <button
                v-if="store.timePerQuestion != 12"
                @click="store.timePerQuestion = 12"
            >
                Reset to default
            </button>
        </div>
        <hr>
        <h1
            class="notice"
            v-if="store.selectedSkills.length <= 0"
        >
            Select the topics to practice below.
        </h1>
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
        <div class="buttons">
            <button 
                class="start-button"
                @click="start"
                :disabled="store.selectedSkills.length <= 0"
            >
                Start
            </button>
            <button 
                class="secondary"
                @click="selectLowRetention"
            >
                Select low retention
            </button>
        </div>
    </div>
</template>

<style scoped>
.home {
    max-width: 768px;
    margin: auto;
    margin-top: 64px;
}

.range-selection {
    align-items: center;
    display: flex;
    vertical-align: middle;
}

.range-selection > * {
    padding: 8px;
}

.selection-buttons {
    display: flex;
    column-gap: 16px;
    row-gap: 16px;
    column-count: 3;
    flex-wrap: wrap;
}

.selection-buttons > button.selection {
    flex: 1;
}

.notice {
    font-size: 20px;
    font-weight: 500;
}

.buttons {
    display: flex;
    justify-content: center;
    column-gap: 16px;
}
</style>
