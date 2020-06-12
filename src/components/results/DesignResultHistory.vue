<template>
    <div>
    <div>
        <h2>{{ $t("views.components.results.DesignResultHistory.title") }}</h2>
    </div>
    <div>
    <table class="table " >
        <thead>
        <tr>
            <th style="text-align: center;">{{$t("views.components.results.DesignResultHistory.headers.Pos")}}</th>
            <th style="text-align: center;">{{$t("views.components.results.DesignResultHistory.headers.Before")}}</th>
            <th style="text-align: center;"> </th>
            <th style="text-align: center;">{{$t("views.components.results.DesignResultHistory.headers.After")}}</th>
            <th style="text-align: center;">{{$t("views.components.results.DesignResultHistory.headers.Score")}}</th>
         </tr>
        </thead>
                <design-result-history-row v-bind:rows="rows"></design-result-history-row>
    </table>
    </div>
    </div>
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