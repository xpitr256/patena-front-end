import Vue from "vue";

// TODO read value from env file
const baseDomain = "https://patena-api.herokuapp.com";
const genericErrorMessage =
  "There was an error connecting with our servers. Try again later please"; //TODO translate it

//const baseDomain = "http://localhost:3000";

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
          orderNumber: response.body.orderNumber
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

  async analyzeLinker(email, sequence) {
    const postData = { email: email, sequence: sequence };
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
    let response = await Vue.http.get(
      baseDomain + "/linkerLength?distance=" + distance
    );
    return {
      length: response.body.length
    };
  },

  async getResults(orderNumber) {
    try {
      const response = await Vue.http.get(
        baseDomain + "/results?orderNumber=" + orderNumber
      );
      if (response.ok) {
        return {
          orderNumber: response.body.orderNumber
        };
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
  }
};
