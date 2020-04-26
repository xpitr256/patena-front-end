<template>
    <tbody>
        <tr v-for="row in rows">
            <td>{{row.Pos}}</td>
            <td>
                <Sequence  v-bind:sequence=row.Before :warning-positions="[0,2,7]"></Sequence>
            </td>
            <td>
                <span style="font-size:20pt;"><i class="fas fa-long-arrow-alt-right"></i></span>
            </td>
            <td>
                <Sequence v-bind:sequence=row.After :success-positions="[0,2,7]"></Sequence></td>
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