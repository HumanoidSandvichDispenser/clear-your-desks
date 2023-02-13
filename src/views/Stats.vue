<script setup lang="ts">
import { useSkillsStore } from "../store/skills";
import SkillList from "../components/SkillList.vue";

const skills = useSkillsStore();
</script>

<template>
    <div class="stats">
        <skill-list />
    </div>
</template>
