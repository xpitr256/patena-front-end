<template>
    <div class="container wrapper">
        <h1 class="display-4">{{ $t("views.contact.title") }}</h1>

        <form>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="inputName">{{ $t("views.contact.name") }}</label>
                    <input type="text" class="form-control" id="inputName"
                           :placeholder="$t('views.contact.name')">
                </div>
                <div class="form-group col-md-6">
                    <label for="inputEmail">Email</label>
                    <input type="email" class="form-control" id="inputEmail" placeholder="Email">
                </div>
            </div>

            <div class="form-row">
                <div class="form-group col">
                    <label for="message">{{ $t("views.contact.message") }}</label>
                    <textarea class="form-control" rows="5" id="message"></textarea>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">{{ $t("views.contact.send") }}</button>
            <hr class="my-4">
        </form>
    </div>
</template>

<script>
  export default {
  }
</script>

<style scoped>
</style>
