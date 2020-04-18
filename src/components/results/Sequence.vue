<template>
        <tbody>
                <th  v-for="value in Aminoacids" style="border-top:0px; padding: 0px">
                        <Aminoacid class="btn btn-orange btn-circle" v-bind:name-aminoacid=value></Aminoacid>
                </th>
        </tbody>
</template>


<script>
    import Aminoacid from "./Aminoacid";
    export default {
        name: "Sequence",
        components: {Aminoacid},
        props:["Aminoacids"]
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
      }
    .btn-orange{
        background-color: orange;
        border-style: solid;
        border-color: black;
    }

    .btn-brown{
        background-color: #FF5733;
        border-style: solid;
        border-color: black;
    }
    .btn-circle-xl {
        width: 40px;
        height: 40px;
        padding: 8px 0px;
        border-radius: 35px;
        text-align: center;
        font-size: 18px;
        line-height: 1.33;
    }
    .a {
        text-align: center;
    }
</style>