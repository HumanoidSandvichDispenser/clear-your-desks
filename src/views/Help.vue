<script setup lang="ts">
import HelpMenu from "../components/HelpMenu.vue";
</script>

<template>
    <div class="help">
        <h1>Help</h1>
        <p>
            The left column shows the LaTeX representation, the middle column
            shows what should be typed in the math editor, and the right column
            shows what would be rendered.
        </p>
        <help-menu />
    </div>
</template>

<style scoped>
.help p {
    text-align: left;
    font-size: 18px;
}
</style>
