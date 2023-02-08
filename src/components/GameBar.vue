<script setup lang="ts">
import { defineProps } from "vue";
import router from "../router";

const props = defineProps({
    score: Number,
    streak: Number,
});

function exit() {
    router.back();
}
</script>

<template>
    <div class="game-bar">
        <div class="left">
            <button class="icon" @click="exit">
                <bootstrap-icon icon="box-arrow-left" />
            </button>
        </div>
        <div class="center">
            <div class="score">
                {{ score }} points
            </div>
        </div>
        <div class="right">
            <div
                :class="{
                    streak: true,
                    active: streak > 0,
                }"
            >
                <bootstrap-icon icon="fire" />
                {{ streak }}
            </div>
        </div>
    </div>
</template>

<style>
.game-bar {
    display: flex;
    font-weight: 700;
}

.game-bar > div {
    flex: 1;
    font-size: 24px;
    height: 100%;
    display: flex;
    align-items: center;
    align-self: center;
}

.game-bar > div.center {
    justify-content: center;
}

.game-bar > div.right {
    justify-content: right;
}


.game-bar > div.left {
    text-align: left;
}

.streak.active {
    color: var(--red);
}
</style>
