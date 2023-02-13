<script setup lang="ts">
import Icon from "../assets/Icon.svg";
</script>

<template>
    <div class="title">
        <div>
            <img :src="Icon" class="title-image" />
        </div>
        <div class="title-text">
            <div>clear your desks</div>
            <div class="subtitle">except for a pencil</div>
        </div>
    </div>
</template>

<style>
.title {
    display: flex;
    flex-direction: row;
    column-gap: 8px;
    flex-shrink: 0;
}

img.title-image {
    height: 56px;
    width: 56px;
}

.title-text {
    font-size: 24px;
    text-align: left;
    font-weight: 700;
    padding: 4px;
}

.title-text > .subtitle {
    font-weight: 500;
    color: var(--fg2);
}
</style>
