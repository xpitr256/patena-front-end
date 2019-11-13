function timeout() {
  return new Promise(resolve => setTimeout(resolve, 1000));
}

import Vue from "vue";

// TODO read value from env file
const baseDomain = "https://patena-api.herokuapp.com";

export default {
  async sendContactInformation() {
    await timeout();
    return {
      status: "ok"
    };
  },

  async analyzeLinker() {
    await timeout();
    return {
      orderNumber: "3cf3e00f-4d72-4c5d-9d5f-aff4582d6ad8"
    };
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
