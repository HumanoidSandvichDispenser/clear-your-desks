<script setup lang="ts">
import { ref } from "vue";
import { useSkillsStore } from "../store/skills";
import Desmos from "desmos";
//import SkillList from "../components/SkillList.vue";

const skills = useSkillsStore();

const calculator = ref<HTMLDivElement>();
let desmos: any = undefined;

function graphRetCurve(k: number) {
    let expr = `y=e^{-${k}x}`;
    graph(expr);
}

function graph(eq: string) {
    if (desmos == undefined) {
        desmos = Desmos.GraphingCalculator(calculator.value);
    }

    desmos.setExpression({ id: "graph1", latex: eq });
    calculator.value?.scrollIntoView({ behavior: "smooth" });
}
</script>

<template>
    <div class="stats">
        <div class="skill-list">
            <table cellspacing="16">
                <th>Topic</th>
                <th>Retention Curve</th>
                <th>Rating</th>
                <tr v-for="skill in skills.current">
                    <td>{{ skill.name }}</td>
                    <td><span v-katex="`e^{${-skill.k.toFixed(3)}x}`" /></td>
                    <td
                        :class="{
                            'score-cell': true,
                            positive: skill.score > 0,
                            negative: skill.score < 0,
                        }"
                    >
                        {{ skill.score }}
                    </td>
                    <td>
                        <button class="accent" @click="graphRetCurve(skill.k)">
                            Graph
                        </button>
                    </td>
                </tr>
            </table>
        </div>
        <h1>How is retention calculated?</h1>
        <p v-katex:auto>
            The retention curve is given by the function \(r(t) = e^{-kt}\),
            where \(t\) is the time, which in this case is time in hours.
        </p>
        <p v-katex:auto>
            Each topic or skill has a score which is determined based on the
            time it takes to complete a problem and how often it is correct or
            missed. This rating \(r\) then determines the value of \(k\)
            through an inverse tangent \(\tan^{-1}\) function as it has a range
            of \((-\frac{\pi}{2}, \frac{\pi}{2})\), which will help us ensure
            the retention curve will only decay.
        </p>
        <p v-katex:auto>
            This can be clamped into the interval \((0, 2)\) by multiplying by
            \(\frac{2}{\pi}\) and adding \(1\), giving our final equation:
        </p>
        <p v-katex:auto>
            \(k(r) = -\frac{2}{\pi}\tan^{-1}(r) + 1\)
            <button
                @click="graph('k(r) = -\\frac{2}{\\pi}\\tan^{-1}(r) + 1')"
                class="accent side"
            >
                Graph this
            </button>
        </p>
        <div class="desmos" ref="calculator">

        </div>
    </div>
</template>

<style scoped>
.desmos {
    width: 100%;
    height: 512px;
}

.skill-list table {
    margin: 0 auto;
}

.stats p {
    font-size: 20px;
    padding: 8px;
}

button.side {
    margin-left: 16px;
}

td.score-cell.positive {
    color: var(--dgreen);
}

td.score-cell.negative {
    color: var(--red);
}
</style>
