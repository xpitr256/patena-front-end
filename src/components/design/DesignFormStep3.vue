<template>
    <div class="mt-4">
        <h2 class="h-light">
            <span class="badge badge-secondary">2</span>
            What starting data do you have?
        </h2>

        <div class="button-wrap mt-4 ml-5 mb-4">
            <input class="hidden radio-label" v-model="nextStep" v-bind:value="4" type="radio" id="nothing-button"/>
            <label class="button-label" for="nothing-button">
                <span>Nothing</span>
            </label>
            <br />
            <input class="hidden radio-label" v-model="nextStep" v-bind:value="5" type="radio" id="sequence-button"/>
            <label class="button-label" for="sequence-button">
                <span>Initial Sequence</span>
            </label>

            <br />
            <input class="hidden radio-label" v-model="nextStep" v-bind:value="6" type="radio" id="flanking-button"/>
            <label class="button-label" for="flanking-button">
                <span>Flanking sequences</span>
            </label>

            <br />
            <input class="hidden radio-label" v-model="nextStep" v-bind:value="7" type="radio" id="sequence-flanking-button"/>
            <label class="button-label" for="sequence-flanking-button">
                <span>Initial Sequence and flanking sequences</span>
            </label>

        </div>


        <div class="d-flex">
            <div>
                <a href="#" class="btn btn-light" v-on:click="navigate()">
                    <i class="fas fa-chevron-left"></i> {{$t('views.getBack')}}
                </a>
            </div>
            <div class="ml-auto">
                <button class="btn btn-primary" @click="next" :disabled="nextStep === null">
                    Next <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>



    </div>
</template>

<script>

  export default {
    name: "DesignFormStep3",
    methods: {
      navigate() {
        this.$emit('goToNextStep',1);
      },
      next: function() {
        this.$emit('goToNextStep',this.nextStep);
      }
    },
    data: function () {
      return {
        nextStep: null
      }
    }
  }
</script>

<style scoped>
    @import url(https://fonts.googleapis.com/css?family=Lato:300,400,900);
    .button-wrap {
        position: relative;
        top: 50%;
    }
    @media (max-width: 40em) {
        .button-wrap {
            margin-top: -1.5em;
        }
    }

    .button-label {
        min-width: 100%;
        display: inline-block;
        padding: 1em 2em;
        margin: 0.5em;
        cursor: pointer;
        color: #292929;
        border-radius: 0.25em;
        background: #efefef;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2), inset 0 -3px 0 rgba(0, 0, 0, 0.22);
        transition: 0.3s;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .button-label span {
        font-size: 1.1em;
        font-family: "Lato", sans-serif;
    }
    .button-label:hover {
        background: #d6d6d6;
        color: #101010;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2), inset 0 -3px 0 rgba(0, 0, 0, 0.32);
    }
    .button-label:active {
        -webkit-transform: translateY(2px);
        transform: translateY(2px);
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2), inset 0px -1px 0 rgba(0, 0, 0, 0.22);
    }
    @media (max-width: 40em) {
        .button-label {
            padding: 0em 1em 3px;
            margin: 0.25em;
        }
    }

    .radio-label:checked + .button-label {
        background: #2ECC71;
        color: #efefef ;
    }
    .radio-label:checked + .button-label:hover {
        background: #29b765;
        color: #e2e2e2 ;
    }

    .hidden {
        display: none;
    }

</style>
