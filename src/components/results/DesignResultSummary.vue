<template>
    <table class="table table-responsive">
        <thead>
        <tr>
            <th class="a" scope="col">Initial sequence (Score: {{initialScore}})</th>
            <th class="a" scope="col"></th>
            <th class="a" scope="col">Final sequence (Score: {{finalScore}})</th>
            <th class="a" scope="col">Copy</th>
            <th class="a" scope="col">Length</th>
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
                <button  class="btn btn-outline-primary" @click="getSequenceCopy"><i class="fas fa-copy"></i></button>
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
                return "initialSequence: "+this.initialSequence+"\n"+"finalSequence: "+this.finalSequence;
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

</style>