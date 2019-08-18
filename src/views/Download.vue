<template>
    <div class="container wrapper">
        <h1 class="display-4">{{ $t("views.download.title") }}</h1>
        <div class="card" style="width: 18rem;">
            <img src="./../assets/amino.png" alt="Amino" class="card-img-top" >
            <div class="card-body">
                <h5 class="card-title">{{$t('views.download.subtitle')}}</h5>
                <p class="card-text">{{$t('views.download.report')}}</p>
                <a href="#" class="btn btn-primary">{{$t('views.download.btDownload')}}</a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Download"
    }
</script>

<style scoped>

</style>
