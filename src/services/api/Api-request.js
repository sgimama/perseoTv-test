import axios from "axios";
import Config from '../config/Config';

const ApiRequest = {
  Session: {
    Login: (params) => {
      return async (dispatch) => {
        setLoading(Config.ApiRequest.actionsTypes.LOADING, dispatch);
        let res = null;
        try {
          res = await axios.post(`${Config.ApiRequest.request.baseURL + Config.ApiRequest.urls.LOGIN}`, params, {
            headers: Config.ApiRequest.request.headers
          })

        } catch (e) {
          console.log(e);
        } finally {
          if (res.data.authorized && !res.data.error) {
            dispatch({
              type: Config.ApiRequest.actionsTypes.LOGIN,
              data: {
                token: res.data.token
              }
            });
          } else {
            dispatch({
              type: Config.ApiRequest.actionsTypes.LOGIN_ERROR,
              data: res.data
            });
          }
        }
      }
    }
  },
  App: {
    Main: (params) => {
      return async (dispatch) => {
        setLoading(Config.ApiRequest.actionsTypes.LOADING, dispatch);
        let res = null;
        let contentsFavs = [];
        try {
          res = await axios.post(`${Config.ApiRequest.request.baseURL + Config.ApiRequest.urls.MAIN}`, params, {
            headers: Config.ApiRequest.request.headers
          })


          res.data.contents.map(content => {
            let newContent = {};
            if (!res.data.user.favs.indexOf(content.id)) {
              newContent = {
                ...content,
                fav: true
              }
            } else {
              newContent = {
                ...content,
                fav: false
              }
            }
            contentsFavs.push(newContent)
          })
        } catch (e) {
          console.log(e);
        } finally {
          dispatch({
            type: Config.ApiRequest.actionsTypes.INIT_MAIN,
            data: {
              user: {
                name: res.data.user.name,
                avatar: res.data.user.avatar
              },
              contents: contentsFavs
            }
          });
          return res.data;
        }
      }
    },
    Player: (params) => {
      return async (dispatch) => {
        setLoading(Config.ApiRequest.actionsTypes.LOADING, dispatch);
        let res = null;
        try {
          res = await axios.post(`${Config.ApiRequest.request.baseURL + Config.ApiRequest.urls.PLAYER}`, params, {
            headers: Config.ApiRequest.request.headers
          })
        } catch (e) {
          console.log(e);
        } finally {
          return res.data.url;
        }
      }
    },
    Favorite: (params) => {
      return async (dispatch) => {

      dispatch({
        type: Config.ApiRequest.actionsTypes.FAVORITE,
        data: { 
          ...params
        }
      });
      }
    }
  }
}

const setLoading = (action, dispatch) => {
  dispatch({
    type: action,
    data: {
      loading: true,
    },
  });
};

export default ApiRequest;