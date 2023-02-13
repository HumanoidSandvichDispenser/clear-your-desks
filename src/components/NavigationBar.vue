<script setup lang="ts">
import TitleVue from "./Title.vue";
import router from "../router";

const githubHomepage =
    "https://github.com/humanoidsandvichdispenser/clear-your-desks";

function goto(path: string) {

}

function gotoExternal(path: string) {
    const routeData = router.resolve({ name: path });
    window.open(routeData.href, "_blank");
}
</script>

<template>
    <div class="navigation-bar">
        <router-link to="/">
            <title-vue />
        </router-link>
        <div>
            <router-link to="/stats">
                <button
                    :class="{
                        selection: true,
                        tab: true,
                        enabled: router.currentRoute.value.name == 'Stats',
                    }"
                >
                    Stats
                </button>
            </router-link>
        </div>
        <div>
            <router-link to="/help">
                <button
                    :class="{
                        selection: true,
                        tab: true,
                        enabled: router.currentRoute.value.name == 'Help',
                    }"
                >
                    Help
                </button>
            </router-link>
        </div>
        <div>
            <a
                :href="githubHomepage"
                target="_blank"
            >
                <button class="selection tab">
                    GitHub
                </button>
            </a>
        </div>
        <div>
            <a
                :href="githubHomepage + '/issues'"
                target="_blank"
            >
                <button class="selection tab">
                    Report Bug
                </button>
            </a>
        </div>
    </div>
</template>

<style scoped>
.navigation-bar {
    display: flex;
    flex-direction: row;
    column-gap: 8px;
    width: 100%;
    padding: 8px;
    flex-shrink: 0;
}

.navigation-bar a,
.navigation-bar a:visited {
    text-decoration: none;
}

button.selection.tab {
    outline-color: transparent;
    text-transform: uppercase;
    text-align: center;
    font-weight: 800;
    width: 164px;
}
</style>
