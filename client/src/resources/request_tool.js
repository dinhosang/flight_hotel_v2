import axios from 'axios';

const requestTool = {

  get: async (details) => {
    try {
      const result = await axios.get(details.url, details.config);
      return {
        success: true,
        data: result.data
      }
    } catch (e) {
      return {
        success: false,
        status: e.status
      }
    }
  }
}

export {requestTool as default};
