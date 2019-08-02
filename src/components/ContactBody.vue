<template>
    <div class="container wrapper">
        <h1 class="display-4">{{ $t("views.contact.title") }}</h1>
        <div class="row">
            <div class="flex-lg-column">
                <p>{{ $t("views.contact.name") }}:</p>
                <input v-model="message"  style="width:300px;">
            </div>
            <div class="column"></div>
            <div class="flex-lg-column">
                <p>{{ $t("views.contact.mail") }}:</p>
                <input v-model="message" style="width:300px;">
            </div>
        </div>
        <br/>
        <div class="row" >
            <div class="flex-lg-column">
            <textarea v-model="message" cols="70" rows="10"></textarea>
            </div>
        </div>
        <br/>
        <div class="container">
            <button style="align-self: normal">{{ $t("views.contact.send") }}</button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                text: ''
            }
        }
    }
</script>

<style scoped>
    h1 {
        font-variant: small-caps;
    }
    .column {
        float: left;
        width: 5%;
    }
</style>
