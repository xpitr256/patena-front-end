<template>
    <table class="table table-responsive" >
        <thead>
        <tr>
            <th v-for="key in columns.split(',')">{{key}}</th>
         </tr>
        </thead>
        <tbody>
            <tr v-for="row in rows">
                <design-result-history-row v-bind:row=row ></design-result-history-row>
               <!-- <td v-for="key in columns.split(',')">
                    {{row[key]}}
                 <DesignResultHistoryRow pos="2" after="ABCDE" before="AKCDE" score="131.1"></DesignResultHistoryRow>
                </td>-->
            </tr>
        </tbody>

    </table>
</template>

<script>
    import DesignResultHistoryRow from "./DesignResultHistoryRow";
    export default {
        name: "DesignResultHistory",
        components: {DesignResultHistoryRow},
        props:["columns","rows"]
    }
</script>

<style scoped>

</style>