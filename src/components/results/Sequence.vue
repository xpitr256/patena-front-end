<template>
        <div>
                <span v-if="showTruncated && showExtensionInitial()"> ...</span>
                <Aminoacid v-for="aminoAcid in aminoAcids"
                           v-bind:name=aminoAcid.value
                           :show-big=aminoAcid.showBig
                           :show-as-warning=aminoAcid.showAsWarning
                           :show-as-success=aminoAcid.showAsSuccess
                           :show-as-final=aminoAcid.showAsFinal
                           :hidden=aminoAcid.hidden
                ></Aminoacid>
                <span v-if="showTruncated && showExtensionFinal()"> ...</span>
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
                showAsFinal: Boolean,
                showTruncated:Boolean
        },
        data: function() {
            return {
                    aminoAcids: [],
                    hiddenPositions : [],
                    windowRadius : 4
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
                },
                getLength: function () {
                    return this.sequence.length;
                }, showAsTruncate: function (position) {
                            const pivot = this.getPivot();
                            const length = this.getLength();
                            const min = pivot - this.windowRadius;
                            const max = pivot + this.windowRadius;
                            //TODO: add case length less than size window
                            if (pivot > length-this.windowRadius-1 ) {
                                    this.hiddenPositions=this.loadFirstAsHidden(this.windowRadius, length);
                                    return this.hiddenPositions && this.hiddenPositions.includes(position);
                            } else {
                                    if (pivot <= this.windowRadius) {
                                            this.hiddenPositions=this.loadLastAsHidden(this.windowRadius, length);
                                            return this.hiddenPositions && this.hiddenPositions.includes(position);
                                    }
                            }

                            if (min >= 0 && max < length && (position < min || position > max)) {
                                    this.hiddenPositions.push(position);
                                    return true;
                            }
                            return false;

                    },
                    getPivot(){
                        return this.successPositions && this.successPositions.length > 0 ? this.successPositions[0] : this.warningPositions[0];
                    },
                    loadFirstAsHidden (radius, length){
                        let firstHiddenPositions = []
                            for (let i = 0; i < length-2*radius-1; i++) {
                                    firstHiddenPositions.push(i)
                            }
                            return firstHiddenPositions;
                    },
                    loadLastAsHidden (radius, length){
                            let lastHiddenPositions = []
                            for (let i = 2*radius+1; i < length; i++) {
                                    lastHiddenPositions.push(i)
                            }
                            return lastHiddenPositions;
                    },
                    showExtensionInitial(){
                    const pivot = this.getPivot();
                        return pivot >= this.windowRadius
                    },
                    showExtensionFinal(){
                        const pivot = this.getPivot();
                        return  pivot < this.getLength()-this.windowRadius-1;
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
                                    hidden: this.showTruncated ? this.showAsTruncate(index) : false,
                                    showAsFinal: this.showAsFinal
                            }
                    });


                }
    }
</script>

<style scoped>

</style>