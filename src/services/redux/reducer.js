import Config from "../config/Config";

const initialState = {
    user: {},
    contents: [],
    login: {},
    token: '',
    loading: false
};

function reducer(state = initialState, {type, data}) {
    switch (type) {
        case Config.ApiRequest.actionsTypes.LOGIN:           
            return {
                ...state,
                token: data.token,
                loading: false,
            };
        case Config.ApiRequest.actionsTypes.LOGIN_ERROR:           
            return {
                ...state,
                login: data,
                loading: false,
            };
        case Config.ApiRequest.actionsTypes.INIT_MAIN:
            return {
                ...state,
                contents: data.contents,
                user: data.user,
                loading: false,
            };
        case Config.ApiRequest.actionsTypes.LOADING:
            return {
                ...state,
                loading: data.loading
            };
        case Config.ApiRequest.actionsTypes.FAVORITE:
            let newContent = changeFavorite(data, state)
            return {
               ...state,
               contents: newContent,
            };
        default:
            return state;
    }
}

function changeFavorite(params, state){
    let contentsFavs = []
    state.contents.map(content => {
        let newContent = {};
        if (!content.id.indexOf(params.id)) {
          newContent = {
            ...content,
            fav: params.action
          }
        }else{
            newContent = {
                ...content,
              }
        }
        contentsFavs.push(newContent)
      })
      return contentsFavs
}

export default reducer;
