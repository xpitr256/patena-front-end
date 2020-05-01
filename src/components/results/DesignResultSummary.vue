<template>
    <table class="table table-responsive">
        <thead>
        <tr>
            <th class="a" scope="col">{{$t("views.components.results.DesignResultSummary.headers.Initial")}} (Score: {{initialScore}})</th>
            <th class="a" scope="col"> </th>
            <th class="a" scope="col">{{$t("views.components.results.DesignResultSummary.headers.Final")}} (Score: {{finalScore}})</th>
            <th class="a" scope="col">{{$t("views.components.results.DesignResultSummary.headers.Copy")}}</th>
            <th class="a" scope="col">{{$t("views.components.results.DesignResultSummary.headers.Length")}}</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>
                <Sequence :sequence=initialSequence :show-big="true"></Sequence>
            </td>
            <td>
                <span style="font-size:20pt;"><i class="fas fa-long-arrow-alt-right"></i></span>
            </td>
            <td>
                <Sequence :sequence=finalSequence :show-big="true" :show-as-final="true"></Sequence>
            </td>
            <td class="a">
                <button type="button"
                        class="clip clip-demo"
                        @click="getSequenceCopy"><i
                        class="fas fa-copy"></i></button>
            </td>
            <td class="a" style="font-size:18px;">
                {{length}}
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script>
    import Aminoacid from "./Aminoacid";
    import Sequence from "./Sequence";
    import FastaService from "../../services/FastaService";

    export default {
        name: "DesignResultSummary",
        props:[
            "initialSequence",
            "finalSequence",
            "initialScore",
            "finalScore"
        ],
        components: {
            Sequence,
            Aminoacid
        },
        methods: {
            getSequenceCopy: function() {
                let sequencesCopied = this.getSequencesCopied();
                navigator.clipboard.writeText(sequencesCopied);

            },
            getSequencesCopied: function(){
                return "initial Sequence: "+this.initialSequence+"\n"+"final Sequence: "+this.finalSequence;
            }
        },
        computed: {
            length: function () {
                return FastaService.getSequenceLengthFrom(this.initialSequence);
            }
        }
    }





</script>

<style scoped>
    .a {
        text-align: center;
    }
    .clip-demo {
        font-size: 95%;
        padding: .5em;
        display: flex;
        line-height: normal;
        width: auto;
        margin: auto;
        margin-bottom: 2em;
        border: 1px solid #ccc;
        border-radius: 2px;
    }

    .button-demo {
        float: right;
        overflow: hidden;
    }


</style>