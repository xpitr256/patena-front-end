<template>
    <div>
        <td>{{row.Pos}}</td>
        <td><Sequence v-bind:aminoacids= row.Before></Sequence></td>
        <td><span  style="font-size:20pt;">&#10148;</span></td>
        <td><Sequence v-bind:aminoacids= row.After></Sequence></td>
        <td>{{row.Score}}</td>
    </div>
</template>

<script>
    import Sequence from "./Sequence";
    import Aminoacid from "./Aminoacid";
    export default {
        name: "DesignResultHistoryRow",
        components: {Aminoacid, Sequence},
        columns: "Pos,Before, ,After,Score",
        props:["pos","before","after","score","columns","row"]
    }
</script>

<style scoped>

</style>