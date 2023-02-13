<script setup lang="ts">
import { useSkillsStore } from "../store/skills";

const skills = useSkillsStore();
</script>

<template>
    <div class="skill-list">
        <table>
            <th>Topic</th>
            <th>Retention Curve</th>
            <th>Rating</th>
            <tr v-for="skill in skills.current">
                <td>{{ skill.name }}</td>
                <td><span v-katex="`e^{${-skill.k.toFixed(3)}x}`" /></td>
                <td>{{ skill.score }}</td>
            </tr>
        </table>
    </div>
</template>

<style>
.skill-list table {
    margin: 0 auto;
}
</style>
