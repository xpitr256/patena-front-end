<template>
        <span v-bind:class="getAminoAcidClass()">
                {{ getName }}
        </span>
</template>

<script>
    export default {
        name: "Aminoacid",
        props: {
                name: String,
                showBig: Boolean,
                showAsFinal: Boolean,
                showAsSuccess: Boolean,
                showAsWarning: Boolean,
                hidden: Boolean
        },
        methods:{
                getAminoAcidClass: function() {
                        let aminoAcidClass = "btn";
                        let circleClass = "btn-circle";
                        let colorClass = "btn-initial";
                        if (this.showBig) {
                                circleClass = "btn-circle-xl";
                        }
                        if (this.showAsFinal) {
                                colorClass = "btn-final";
                        }
                        if (this.showAsSuccess) {
                                colorClass = "btn-success";
                        }
                        if (this.showAsWarning) {
                                colorClass = "btn-warning";
                        }
                        if (this.hidden) {
                                 return "display: none;";
                        }
                        return aminoAcidClass + ' ' + colorClass + ' ' + circleClass;
                }
        },
        async created() {
            this.getAminoAcidClass();
        },
            computed: {

                    getName: function () {

                            return this.hidden ? "" : this.name;
                    }
            }
    }
</script>

<style scoped>
        .btn-circle {
                width: 30px;
                height: 30px;
                padding: 6px 0px;
                border-radius: 15px;
                text-align: center;
                font-size: 12px;
                line-height: 1.42857;
                cursor: default;
        }
        .btn-initial {
                background-color: #efefef;
                border-style: solid;
                border-color: #bbbbbb;
        }

        .btn-initial:hover{
                background-color: #e2e2e2;
        }

        .btn-final {
                background-color: #D3D3D3;
                border-style: solid;
                border-color: #bbbbbb;
        }

        .btn-final:hover{
                background-color: #C0C0C0;
        }
        .btn-circle-xl {
                width: 35px;
                height: 35px;
                padding: 6px 0px;
                border-radius: 35px;
                text-align: center;
                font-size: 16px;
                line-height: 1.33;
                cursor: default;
        }
        .a {
                text-align: center;
        }
</style>