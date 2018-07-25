import axios from 'axios';

const requestTool = {

  get: async (url) => {
    try {
      return await axios.get(url);
    } catch (e) {
      throw e;
    }
  }


}

export {requestTool as default};
