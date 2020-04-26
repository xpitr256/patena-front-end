<template>
        <div>
                <Aminoacid v-for="aminoAcid in aminoAcids"
                        v-bind:name=aminoAcid.value
                        :show-big=aminoAcid.showBig
                        :show-as-warning=aminoAcid.showAsWarning
                        :show-as-success=aminoAcid.showAsSuccess
                        :show-as-final=aminoAcid.showAsFinal
                ></Aminoacid>
        </div>
</template>


<script>
    import Aminoacid from "./Aminoacid";
    export default {
        name: "Sequence",
        components: {
                Aminoacid
        },
        props: {
                sequence: String,
                warningPositions: Array,
                successPositions: Array,
                showBig: Boolean,
                showAsFinal: Boolean
        },
        data: function() {
            return {
                    aminoAcids: []
            }
        },
            methods: {
                isBigAminoAcid: function (position) {
                        return this.showBig || this.showAsWarning(position) || this.showAsSuccess(position);
                },
                showAsWarning: function(position) {
                        return this.warningPositions && this.warningPositions.includes(position);
                },
                showAsSuccess: function(position) {
                    return this.successPositions && this.successPositions.includes(position);
                }
            },
         created() {
                const sequencesAsList = this.sequence.split('');
                this.aminoAcids = sequencesAsList.map((aminoAcid, index) => {
                        return {
                                value: aminoAcid,
                                showBig: this.isBigAminoAcid(index),
                                showAsWarning: this.showAsWarning(index),
                                showAsSuccess: this.showAsSuccess(index),
                                showAsFinal: this.showAsFinal
                        }
                });
        },
    }
</script>

<style scoped>

</style>