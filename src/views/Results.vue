<script setup lang="ts">
import { useStore } from "../store";

const store = useStore();
</script>

<template>
    <div>
        <table>
            <tr v-for="problem in store.problems">
                <td>
                    <span v-katex="problem.question" />
                </td>
                <td>
                    <span v-katex="problem.answer" />
                </td>
            </tr>
        </table>
    </div>
</template>

<style>

</style>
