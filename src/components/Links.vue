<script setup lang="ts">
import { useStore } from "../store";

const store = useStore();
</script>

<template>
    <div class="links">
        <a
            href="https://github.com/humanoidsandvichdispenser/clear-your-desks"
            class="link"
        >
            <bootstrap-icon icon="github" />
            Fork on GitHub
        </a>
        <a
            href="https://github.com/HumanoidSandvichDispenser/clear-your-desks/issues/new"
            class="link"
        >
            <bootstrap-icon icon="bug-fill" />
            <span v-if="store.isSupaLidlMode">SNITCH THE BUGS</span>
            <span v-else>File an issue</span>
        </a>
        <a
            href="https://github.com/HumanoidSandvichDispenser/clear-your-desks/discussions"
            class="link"
        >
            <bootstrap-icon icon="chat-left-fill" />
            <span v-if="store.isSupaLidlMode">💢 wen nub pley cyd, das a big problme</span>
            <span v-else>Discussions</span>
        </a>
    </div>
</template>

<style scoped>
.links {
    display: flex;
    padding-bottom: 16px;
    font-weight: 500;
    font-size: 18px;
    justify-content: center;
    column-gap: 1em;
}

.links a {
    text-decoration: none;
}

.links .bi {
    margin-right: 8px;
}
</style>
