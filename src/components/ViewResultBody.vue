<template>
    <div class="jumbotron mt-5">
        <div class="container wrapper">
            <h1 class="display-4">{{ $t("views.result.title") }}</h1>

            <form>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="inputName">{{ $t("views.result.label") }}</label>
                        <input type="text" class="form-control" id="inputName"
                               :placeholder="$t('views.result.placeholder')">
                        <small id="orderNumberHelp" class="form-text text-muted">{{ $t("views.result.help") }}</small>
                    </div>
                    <hr class="my-4">
                </div>
                <button type="submit" class="btn btn-primary">{{ $t("views.result.btSearch") }}</button>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ViewResultBody"
    }
</script>

<style scoped>

</style>
