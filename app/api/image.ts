import axios from "axios";
import * as FormData from "form-data";

// 这里是自己定义的图床接口，如果是cdn服务，一般是需要一些认证操作的
const url = "你的图床接口";
export const uploadImage = (file: Buffer, fileName: string) => {
  const formData = new FormData();
  formData.append("file", file, fileName);
  return axios.post(url, formData, { headers: formData.getHeaders() });
};
