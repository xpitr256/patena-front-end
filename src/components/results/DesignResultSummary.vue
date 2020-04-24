<template>
    <table class="table table-responsive" >
        <thead>
        <tr>
            <th class="a" scope="col">Sequence initial</th>
            <th class="a" scope="col"></th>
            <th class="a" scope="col">Sequence final</th>
            <th class="a" scope="col">Copy</th>
            <th class="a" scope="col">Length</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>
                <Sequence v-bind:is-initial="true" v-bind:is-not-change="true" Aminoacids="ACDKSPKWTG"></Sequence>
            </td>
            <td>&#10148;</td>
            <td>
                <Sequence v-bind:is-initial="false" v-bind:is-not-change="true" Aminoacids="AKCKSPKWTG"></Sequence>
            </td>
            <td>
                <div class="h2 mb-0">
                    <button class="btn"><i class="fa fa-copy" style="font-size:24px; color:orange;"></i></button>
                </div>
            </td>
            <td class="a" style="font-size:18px;">{{lenght}}</td>
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