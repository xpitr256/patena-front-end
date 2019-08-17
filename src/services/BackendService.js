function timeout() {
  return new Promise(resolve => setTimeout(resolve, 1000));
}

export default {

  async sendContactInformation() {
    await timeout();
    return {
      status: 'ok'
    };
  },

  async sendOrderNumber() {
    await timeout();
    return {
      status: 'ok'
    };
  },
  async sendOrderNumberUnknown() {
    await timeout();
    return {
      status: 'failed',
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
      status: 'failed',
      errors: [
        {
          message: "There was an error. Please try again later"
        }
      ]
    };
  }
}
