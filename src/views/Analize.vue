<template>
    <div class="container wrapper">

        <vue-dropzone id="drop1"
                      ref="dropzone"
                      :options="dropzoneOptions"
                      :useCustomSlot=true
                      @vdropzone-complete="afterComplete">
            <div class="dropzone-custom-content">
                <h3 class="dropzone-custom-title">Drag and drop to upload content!</h3>
                <div class="subtitle">...or click to select a file from your computer</div>
            </div>
        </vue-dropzone>

    </div>
</template>

<script>
  import vue2Dropzone from 'vue2-dropzone'
  import 'vue2-dropzone/dist/vue2Dropzone.min.css'

  export default {
    name: 'app',
    components: {
      vueDropzone: vue2Dropzone
    },
    methods: {
      afterComplete(file) {
        if (!file.accepted) {
          this.$refs.dropzone.removeFile(file);
        }
      }
  },
    data: function () {
      return {
        dropzoneOptions: {
          url: 'https://httpbin.org/post',
          thumbnailWidth: 150,
          thumbnailHeight: 150,
          maxFilesize: 2, // MB
          acceptedFiles: '.fasta',
          addRemoveLinks: true,
          accept: function(file, done) {
            this.files.forEach((aFile) => {
              if (aFile.status !== 'added'){
                this.removeFile(aFile);
              }
            });
            done();
          }
        }
      }
    }
  }
</script>
<style scoped>
    .dropzone-custom-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
    }
    .dropzone-custom-title {
        margin-top: 0;
        color: #00b782;
    }
    .subtitle {
        color: #314b5f;
    }
</style>
