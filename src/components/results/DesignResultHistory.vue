<template>
    <table class="table table-responsive" >
        <thead>
        <tr>
            <th class="a" scope="col">Pos</th>
            <th class="a" scope="col">Before mutation</th>
            <th class="a" scope="col"></th>
            <th class="a" scope="col">After mutation</th>
            <th class="a" scope="col">Score</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <!-- Put Here DesignResultRow-->
            <!--<td>2</td>
            <td>
                <span class="btn btn-orange btn-circle">C</span>
                <span class="btn btn-brown btn-circle-xl">W</span>
                <span class="btn btn-orange btn-circle">R</span>
                <span class="btn btn-orange btn-circle">T</span>
                <span class="btn btn-orange btn-circle">C</span>
                <span class="btn btn-orange btn-circle">W</span>
                <span class="btn btn-orange btn-circle">R</span>
                <span class="btn btn-orange btn-circle">T</span>
            </td>
            <td>&#10148;</td>
            <td>
                <span class="btn btn-orange btn-circle">C</span>
                <span class="btn btn-warning btn-circle-xl">S</span>
                <span class="btn btn-orange btn-circle">R</span>
                <span class="btn btn-orange btn-circle">T</span>
                <span class="btn btn-orange btn-circle">C</span>
                <span class="btn btn-orange btn-circle">W</span>
                <span class="btn btn-orange btn-circle">R</span>
                <span class="btn btn-orange btn-circle">T</span>
            </td>
            <td class="a">131.0</td>-->
        </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        name: "DesignResultHistory"
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