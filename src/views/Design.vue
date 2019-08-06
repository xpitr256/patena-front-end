<template>
    <div class="container wrapper">
        <h1 class="display-4">{{ $t("views.design.title") }}</h1>
        <form class="mt-4">
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="inputEmail">Email</label>
                    <input type="email" class="form-control" id="inputEmail" placeholder="Email">
                </div>
            </div>
        </form>
    </div>
</template>

<script>
  export default {
    name: "design"
  }
</script>

<style scoped>

</style>
