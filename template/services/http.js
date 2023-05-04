export default function getServiceHttp(){
    return `
const axios = require("axios").default;

const REQ_TIMEOUT = 1000 * 80 // 80 seconds

export const get = async (url) => {
    const config = {
        timeout: REQ_TIMEOUT,
    }
    try {
      return await axios.get(url, config);
    } catch (e) {
      if(e.code === "ECONNABORTED"){ // server no response, Service Unavailable
        return {data: [], status: 503};;
      }else if(e.code === "ERR_NETWORK"){ // host is down, Gatway Timeout
        return {data: [], status: 504};
      }else{
        const {data, status} = e.response;
        return {data, status}
      }
    }
};

export const post = async (url, data) => {
    const config = {
        timeout: REQ_TIMEOUT,
    }
    try {
      return await axios.post(url, data, config);
    } catch (e) {
      if(e.code === "ECONNABORTED"){ // server no response, Service Unavailable
        return {data: null, status: 503};;
      }else if(e.code === "ERR_NETWORK"){ // host is down, Gatway Timeout
        return {data: null, status: 504};
      }else{
        const {data, status} = e.response;
        return {data, status}
      }
    }
};

export const put = async (url, data) => {
    const config = {
        timeout: REQ_TIMEOUT,
    }
    try {
      return await axios.put(url, data, config);
    } catch (e) {
      if(e.code === "ECONNABORTED"){ // server no response, Service Unavailable
        return {data: null, status: 503};;
      }else if(e.code === "ERR_NETWORK"){ // host is down, Gatway Timeout
        return {data: null, status: 504};
      }else{
        const {data, status} = e.response;
        return {data, status}
      }
    }
};

export const del = async (url) => {
    const config = {
        timeout: REQ_TIMEOUT,
    }
    try {
      return await axios.delete(url, config);
    } catch (e) {
      if(e.code === "ECONNABORTED"){ // server no response, Service Unavailable
        return {data: null, status: 503};;
      }else if(e.code === "ERR_NETWORK"){ // host is down, Gatway Timeout
        return {data: null, status: 504};
      }else{
        const {data, status} = e.response;
        return {data, status}
      }
    }
};
  `
}