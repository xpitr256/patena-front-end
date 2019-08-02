<template>
    <div class="container wrapper">
        <h1 class="display-4">{{ $t("views.contact.title") }}</h1>
        <div class="row">
            <div class="column">
                <div class="form-group">
                    <label for="inputName">{{ $t("views.contact.name") }}:</label>
                    <input type="email" class="form-control" id="inputName" aria-describedby="emailHelp" >
                </div>
            </div>
            <div class="columnSeparete"></div>
            <div class="column">
                <div class="form-group">
                    <label for="inputEmail">{{ $t("views.contact.mail") }}:</label>
                    <input type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" >
                </div>
            </div>
        </div>
        <br/>
        <div class="row" >
            <div class="form-group">
            <textarea class="form-control" v-model="message" cols="70" rows="10"></textarea>
            </div>
        </div>
        <br/>
        <div class="container">
            <a class="btn btn-primary btn-md" href="#" role="button">{{ $t("views.contact.send") }}</a>
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
        width: 25%;
    }
    .columnSeparete {
        float: left;
        width: 5%;
    }
</style>
