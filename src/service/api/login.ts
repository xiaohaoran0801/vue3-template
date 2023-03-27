import request from "../request";
import * as T from "./types";

const loginApi: T.ILoginApi = {
  login(params) {
    return request.post("/login", params);
  },
};
export default loginApi;
