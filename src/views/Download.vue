<template>
    <div class="container wrapper">
        <h1 class="display-4">{{ $t("views.download.title") }}</h1>
        <div class="card" style="width: 18rem;">
            <img src="./../assets/amino.png" alt="Amino" class="card-img-top" >
            <div class="card-body">
                <h6 class="card-title">{{$t("views.download.report")}}</h6>
                <p class="card-text" ><small>{{ id }}</small></p>
                <a href="#" class="btn btn-primary">{{$t('views.download.btDownload')}}</a>
            </div>
        </div>
        <br>
        <a href="#" class="btn btn-primary" v-on:click="navigate()">Volver</a>
    </div>
</template>

<script>
    import router from '../router'
    export default {
        name: "Download",
        data () {
            return {
                id: 0
            }
        },
        created() {
            this.id = this.$route.params.id;
        },
        methods: {
            navigate() {
                router.go(-1);
            }
        }
    }
</script>

<style scoped>

</style>
