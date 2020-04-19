<template>
        <tbody>
                <th  v-for="value in Aminoacids" style="border-top:0px; padding: 2px">
                        <Aminoacid  v-bind:name=value></Aminoacid>
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

</style>