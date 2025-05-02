import instance from "./api-instance";

const apiPost = async (path, payload)=> {

    try {
        const response = await instance.post(path, payload)
        return response.data
    } catch (error) {
        console.log(error)
        throw new Error(error.response.data.msg)
    }
}

const apiGet = async (path) => {
    try {
        const response = await instance.get(path)
        return response.data
    } catch (error) {
        console.log(error)
        throw new Error(error.response.data.msg)
    }
}

 const apiPatch = async (path, payload) => {
    try {
      const response = await instance.patch(path, payload);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.msg || "PATCH error"); // Adjust the error message based on your API response
    }
  };
  

export {apiPost, apiGet, apiPatch } 