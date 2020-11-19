
const Config = {
    ApiRequest: {
      request: {
        baseURL: "https://dev.perseo.tv/ws",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
      },
      urls: {
        LOGIN: "/Login.php",
        MAIN: "/GetView.php",
        PLAYER: "/Play.php"
      },
      actionsTypes: {
        LOGIN: "LOGIN",
        LOGIN_ERROR: "LOGIN_ERROR",
        INIT_MAIN: "INIT_MAIN",
        LOADING: "LOADING",
        FAVORITE: 'FAVORITE'
      },
    },
  };
  
  export default Config;
  