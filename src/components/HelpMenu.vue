<template>
    <table class="help" cellspacing="16">
        <th>LaTeX</th>
        <th>Math Editor</th>
        <th>Renders As</th>
        <tr>
            <td><code>a^b</code></td>
            <td><code>a^b</code></td>
            <td><span v-katex:display="'a^b'" /></td>
        </tr>
        <tr>
            <td><code>a_b</code></td>
            <td><code>a_b</code></td>
            <td><span v-katex:display="'a_b'" /></td>
        </tr>
        <tr>
            <td><code>\pi</code></td>
            <td><code>pi</code></td>
            <td><span v-katex:display="'\\pi'" /></td>
        </tr>
        <tr>
            <td><code>\int</code></td>
            <td><code>int</code></td>
            <td><span v-katex:display="'\\int'" /></td>
        </tr>
        <tr>
            <td><code>\int_a^b</code></td>
            <td><code>int_a^b</code></td>
            <td><span v-katex:display="'\\int_a^b'" /></td>
        </tr>
        <tr>
            <td><code>\frac{a}{b}</code></td>
            <td><code>a/b</code></td>
            <td><span v-katex:display="'\\frac{a}{b}'" /></td>
        </tr>
        <tr>
            <td><code>\sqrt{x}</code></td>
            <td><code>sqrt x</code></td>
            <td><span v-katex:display="'\\sqrt{x}'" /></td>
        </tr>
        <tr>
            <td><code>\textrm{DNE}</code></td>
            <td><code>DNE</code></td>
            <td><span v-katex:display="'\\textrm{DNE}'" /></td>
        </tr>
        <tr>
            <td><code>\textrm{undefined}</code></td>
            <td><code>undefined</code></td>
            <td><span v-katex:display="'\\textrm{undefined}'" /></td>
        </tr>
    </table>
</template>

<style scoped>
table {
    margin: auto;
}
</style>
