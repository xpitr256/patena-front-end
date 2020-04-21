<template>
        <tbody>
                <th  v-for="(value,index) in Aminoacids" style="border-top:0px; padding: 2px">
                        <Aminoacid :class="{'btn-final-changed btn-circle-xl':!isBefore && (index+1).toString()===Pos && !isNotChange,
                                            'btn-brown btn-circle-xl': isBefore & (index+1).toString()===Pos && !isNotChange,
                                            'btn-circle-xl': isInitial && isNotChange,
                                            'btn-final btn-circle-xl':!isInitial && isNotChange}" v-bind:name=value></Aminoacid>
                </th>
        </tbody>
</template>


<script>
    import Aminoacid from "./Aminoacid";
    export default {
        name: "Sequence",
        components: {Aminoacid},
        props:["Aminoacids","Pos","isBefore","isInitial","isNotChange"],
    }
</script>

<style scoped>

</style>