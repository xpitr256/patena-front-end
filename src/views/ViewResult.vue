<template>
    <div class="container wrapper">
        <h1 class="display-4">{{ $t("views.result.title") }}</h1>
        <form class="mt-4">
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="inputOrderNumber">{{ $t("views.result.label") }}</label>
                    <input type="text" class="form-control" id="inputOrderNumber"
                           v-bind:class="{'is-invalid': errors.has('inputOrderNumber')}"
                           v-validate="'required|min:36'"
                           name="inputOrderNumber"
                           :placeholder="$t('views.result.placeholder')">
                    <div class="invalid-feedback">
                        {{ errors.first('inputOrderNumber') }}
                    </div>
                    <small id="orderNumberHelp" class="form-text text-muted">{{ $t("views.result.help") }}</small>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">{{ $t("views.result.btSearch") }}</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: "ViewResult"
    }
</script>

<style scoped>

</style>
