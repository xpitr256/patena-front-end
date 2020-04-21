<template>
    <table class="table table-responsive" >
        <thead>
        <tr>
            <th class="a" scope="col">Sequence initial</th>
            <th class="a" scope="col"></th>
            <th class="a" scope="col">Sequence final</th>
            <th class="a" scope="col">Length</th>
            <th class="a" scope="col">Mode</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>
                <!--
               <Aminoacid class="btn btn-orange btn-circle" name-aminoacid="X"
                ></Aminoacid>-->
                <!-- Put here component Sequence -->
                <Sequence v-bind:is-initial="true" v-bind:is-not-change="true" Aminoacids="ACDKSPKWTG"></Sequence>
            </td>
            <td>&#10148;</td>
            <td>
                <Sequence v-bind:is-initial="false" v-bind:is-not-change="true" Aminoacids="BCCABCCAKK"></Sequence>
                <!-- Put here component Sequence -->
            </td>
            <td class="a">{{ lenght }}</td>
            <td class="a">Design</td>
        </tr>
        </tbody>
    </table>
</template>

<script>
    import Aminoacid from "./Aminoacid";
    import Sequence from "./Sequence";
    export default {
        name: "DesignResultSummary",
        props:["lenght"],
        components: {Sequence, Aminoacid}
    }
</script>

<style scoped>
    .a {
        text-align: center;
    }

</style>