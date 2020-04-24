<template>
        <span class="btn btn-initial btn-circle">{{ name }}</span>
</template>

<script>
    export default {
        name: "Aminoacid",
        props:["name"],
            data:{
                isActive: true,
                isSelectionBefore:false,
                isSelectionAfter:false
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

        .btn-final-changed {
                background-color: #2fcc70;
                border-style: solid;
                border-color: #bbbbbb;
        }

        .btn-final-changed:hover{
                background-color: #29b765;
        }


        .btn-yellow{
                background-color: #ffc107;
                border-style: solid;
                border-color: #ffc107;
        }

        .btn-yellow:hover{
                background-color: #e0a800;
                border-style: solid;
                border-color: #d39e00;
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