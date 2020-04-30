<template>
    <table class="table table-responsive" >
        <thead>
        <tr>
            <th v-for="key in this.columns.split(',')" style="text-align: center;">{{key}}</th>
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
        props: {
            mutationsHistory: Array,
        },
        data(){
            return {
                columns: "Pos,Before, ,After,Score",
                rows : []
            }
        },
        created() {
            let i;
             for(i=0; i<this.mutationsHistory.length-1; i++){
                    this.rows.push({Pos:this.mutationsHistory[i+1].mutated_position,
                        Before:this.mutationsHistory[i].mutated_sequence,
                        After:this.mutationsHistory[i+1].mutated_sequence,
                        Score:this.mutationsHistory[i+1].score_after_mutation})
            }

        },
    }
</script>

<style scoped>

</style>