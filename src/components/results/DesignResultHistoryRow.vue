<template>
    <tbody>
        <tr v-for="row in rows">
        <td>{{row.Pos}}</td>
        <td><Sequence v-bind:pos=row.Pos  v-bind:is-before="true" v-bind:aminoacids= row.Before></Sequence></td>
        <td><span  style="font-size:20pt;">&#10148;</span></td>
        <td><Sequence v-bind:pos=row.Pos v-bind:is-before="false" v-bind:aminoacids= row.After></Sequence></td>
        <td>{{row.Score}}</td>
        </tr>
    </tbody>
</template>

<script>
    import Sequence from "./Sequence";
    import Aminoacid from "./Aminoacid";
    export default {
        name: "DesignResultHistoryRow",
        components: {Aminoacid, Sequence},
        columns: "Pos,Before, ,After,Score",
        props:["rows"]
    }
</script>

<style scoped>

</style>