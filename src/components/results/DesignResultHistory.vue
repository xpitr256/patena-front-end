<template>
    <table class="table table-responsive" >
        <thead>
        <tr>
            <th v-for="key in columns.split(',')" style="text-align: center;">{{key}}</th>
         </tr>
        </thead>
                <design-result-history-row v-bind:rows="rows"></design-result-history-row>
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