<template>
    <table class="help-menu">
        <th>LaTeX</th>
        <th>Math</th>
        <th>Render</th>
        <tr>
            <td><code>\pi</code> or <code>pi</code></td>
            <td><span v-katex:display="'\\pi'" /></td>
        </tr>
        <tr>
            <td><code>\int</code> or <code>int</code></td>
            <td><span v-katex:display="'\\int'" /></td>
        </tr>
        <tr>
            <td><code>\int_{a}^{b}</code> or <code>int</code></td>
            <td><span v-katex:display="'\\int_a^b'" /></td>
        </tr>
        <tr>
            <td><code>\frac{}{}</code> or <code>/</code></td>
            <td><span v-katex:display="'\\frac{a}{b}'" /></td>
        </tr>
        <tr>
            <td><code>\sqrt{x}</code> or <code>sqrt</code></td>
            <td><span v-katex:display="'\\sqrt{x}'" /></td>
        </tr>
    </table>
</template>

<style scoped>
table.help-menu {
    margin: auto;
}
</style>
