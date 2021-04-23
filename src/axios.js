import axios from "axios";
import store from "./redux/store";
import { loginAuthAction } from "./redux/ActionCreator/authAction";

const axiosInstance = axios.create({
  baseURL: "https://newaap123.herokuapp.com",
}); //BACKEND API

axiosInstance.interceptors.request.use((req) => {
  const jwt = store.getState().auth.jwt;
  const refreshtoken = store.getState().auth.refreshtoken;
  const expiresin = store.getState().auth.expiresin;
  req.headers.authorization = `Bearer ${jwt}`;

  if (jwt && expiresin < Date.now()) {
    axios({
      url: "https://newaap123.herokuapp.com/signin/refreshtoken", //BACKEND API
      method: "GET",
      headers: { authorization: refreshtoken },
    })
      .then((data) => {
        const newJwt = data.data.jwt;
        const newExpiresin = data.data.expiresin;

        localStorage.jwt = newJwt;
        localStorage.expiresin = newExpiresin;
        store.dispatch(loginAuthAction());
        req.headers.authorization = `Bearer ${newJwt}`;

        window.location.replace(window.location.pathname);

        return req;
      })
      .catch((err) => {
        //  window.location.replace("/404");
        // window.history.pushState({}, "", "/404");
        // console.log(err, "refresh");
      });
  } else {
    return req;
  }
});
export default axiosInstance;
