import { defineStore } from "pinia";
import { ref } from "vue";

export const useStore = defineStore("store", () => {
    const maxTime = ref(120);

    const currentTime = ref(120);

    const isRunning = ref(false);

    let runningTimeout: NodeJS.Timer;

    function start() {
        currentTime.value = maxTime.value;
        isRunning.value = true;
        runningTimeout = setInterval(() => {
            currentTime.value -= 1;
        }, 1000);
    }

    function stop() {
        isRunning.value = false;
        if (runningTimeout) {
            clearInterval(runningTimeout);
        }
    }

    return {
        maxTime,
        currentTime,
        isRunning,
        start,
        stop,
    }
});
