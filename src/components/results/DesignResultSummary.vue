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
                <Sequence  Aminoacids="ACDKSPKWTG"></Sequence>
            </td>
            <td>&#10148;</td>
            <td>
                <Sequence  Aminoacids="BCCABCCAKK"></Sequence>
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