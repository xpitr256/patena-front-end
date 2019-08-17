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
