<template>
  <div>
    <vue-dropzone
      id="drop1"
      ref="dropzone"
      :options="dropzoneOptions"
      :useCustomSlot="true"
      @vdropzone-removed-file="removedFile"
      @vdropzone-complete="afterComplete"
    >
      <div class="dropzone-custom-content" v-bind:class="{ hide: isFile }">
        <h3 class="dropzone-custom-title">
          {{ $t("views.components.fastaUploader.title") }}
        </h3>
        <div class="subtitle">
          {{ $t("views.components.fastaUploader.subtitle") }}
        </div>
      </div>
    </vue-dropzone>
  </div>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";

export default {
  name: "FastaUploader",
  components: {
    vueDropzone: vue2Dropzone
  },
  methods: {
    removedFile() {
      this.isFile = false;
      this.$emit("input", null);
    },
    afterComplete(file) {
      if (!file.accepted) {
        this.isFile = false;
        this.$refs.dropzone.removeFile(file);
      } else {
        this.isFile = true;
        this.$emit("input", file);
      }
    }
  },
  data: function() {
    return {
      isFile: false,
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 150,
        thumbnailHeight: 150,
        maxFilesize: 2, // MB
        acceptedFiles: ".fasta,.txt,.fa",
        addRemoveLinks: true,
        accept: function(file, done) {
          this.files.forEach(aFile => {
            if (aFile.status !== "added") {
              this.removeFile(aFile);
            }
          });
          done();
        }
      }
    };
  }
};
</script>
<style scoped>
.hide {
  display: none;
}
.dropzone-custom-content {
  /*position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);*/
  text-align: center;
  margin: 2em 0;
}
.dropzone-custom-title {
  margin-top: 0;
  color: rgb(243, 112, 33);
}
.subtitle {
  color: #2c3e50;
}
</style>
