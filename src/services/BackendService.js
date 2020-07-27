import Vue from "vue";

const baseDomain = process.env.VUE_APP_BACK_END_BASE_URL;
const genericErrorMessage =
  "There was an error connecting with our servers. Try again later please"; //TODO translate it

export default {
  async sendContactInformation(email, name, message) {
    const postData = { email: email, name: name, message: message };
    try {
      let response = await Vue.http.post(baseDomain + "/contact", postData);
      return response.ok;
    } catch (error) {
      console.error("BackendService -> sendContactInformation -> " + error);
      return false;
    }
  },

  async designLinker(data) {
    try {
      const response = await Vue.http.post(baseDomain + "/design", data);
      if (response.ok) {
        return {
          orderNumber: response.body.orderNumber,
          email: data.email
        };
      }
      return {
        error: response.body.message
      };
    } catch (error) {
      console.error("BackendService -> designLinker -> " + error);
      return {
        error: genericErrorMessage
      };
    }
  },

  async analyzeLinker(postData) {
    try {
      const response = await Vue.http.post(baseDomain + "/analyze", postData);
      if (response.ok) {
        return {
          orderNumber: response.body.orderNumber
        };
      }
      return {
        error: response.body.message
      };
    } catch (error) {
      console.error("BackendService -> analyzeLinker -> " + error);
      return {
        error: genericErrorMessage
      };
    }
  },

  async calculateLength(distance) {
    return new Promise((resolve, reject) => {
      Vue.http
        .get(baseDomain + "/linkerLength?distance=" + distance, {
          before(request) {
            if (Vue.previousRequest) {
              Vue.previousRequest.abort();
            }
            Vue.previousRequest = request;
          }
        })
        .then(
          response => {
            resolve({
              length: response.body.length
            });
          },
          error => {
            reject(error);
          }
        );
    });
  },

  async getResults(orderNumber) {
    try {
      const response = await Vue.http.get(
        baseDomain + "/results?orderNumber=" + orderNumber
      );
      if (response.ok) {
        return response.body;
      }
      return {
        error: response.body.message
      };
    } catch (error) {
      console.error("BackendService -> getResults:");
      console.error(error);
      return {
        error: error.body.message
      };
    }
  },
  async wakeUpBackend() {
     await Vue.http.get(baseDomain);
  }
};
