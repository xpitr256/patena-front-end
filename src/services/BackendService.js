function timeout() {
  return new Promise(resolve => setTimeout(resolve, 1000));
}

import Vue from "vue";

// TODO read value from env file
const baseDomain = "https://patena-api.herokuapp.com";
const genericErrorMessage = "There was an error connecting with our servers. Try again later please"; //TODO translate it

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

  async sendOrderNumber() {
    await timeout();
    return {
      status: "ok"
    };
  },
  async sendOrderNumberUnknown() {
    await timeout();
    return {
      status: "failed",
      errors: [
        {
          message: "Order number not found"
        }
      ]
    };
  },

  async failedSendContactInformation() {
    await timeout();
    return {
      status: "failed",
      errors: [
        {
          message: "There was an error. Please try again later"
        }
      ]
    };
  }
};
