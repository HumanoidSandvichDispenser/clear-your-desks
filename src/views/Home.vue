<script setup lang="ts">
import { ref, computed } from "vue";
import { useSkillsStore } from "../store/skills";
import { useRouter } from "vue-router";
import { useStore } from "../store";
import TitleVue from "../components/Title.vue";
import Links from "../components/Links.vue";

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
        <title-vue />
        <links />
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
                <p>coming soon <img src="https://cdn.7tv.app/emote/603caa69faf3a00014dff0b1/1x.webp" /></p>
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
