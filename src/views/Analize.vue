<template>
    <div class="container wrapper">
        <h1 class="display-4">{{ $t("views.analyze.title") }}</h1>
        <form class="mt-4">
            <div class="form-row">
                <div class="form-group col-md-6">
                    <input type="text" class="form-control" id="inputFile"
                           :placeholder="$t('views.analyze.placeholder')">
                </div>
                <div class="form-group col-md-6">
                    <button type="submit" class="btn btn-primary">{{ $t("views.analyze.btSearch") }}</button>
                </div>
                <hr class="my-4">
                <div class="form-group col-md-6">
                    <label for="inputEmail">Email</label>
                    <input type="email" class="form-control" id="inputEmail" placeholder="Email" >
                </div>
            </div>
            <br>
            <button type="button" class="btn btn-primary btn-lg">{{ $t("views.analyze.btAnalyze") }}</button>
        </form>
    </div>
</template>

<script>
    export default {

    }
</script>

