import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactHlsPlayer from 'react-hls-player';
import { connect } from "react-redux";
import ApiRequest from '../../services/api/Api-request';
import Config from '../../services/config/Config';
import './Video.css';


export const Video = (props) => {
    //let url;
    const [url, setUrl] = useState('')

async function loadVideo(){
    const params = new URLSearchParams();
    params.append("token", props.state.token);
    params.append("device", "Web");
    params.append("id", props.match.params.id);
    let res = null;
    try {
      res = await axios.post(`${Config.ApiRequest.request.baseURL + Config.ApiRequest.urls.PLAYER}`, params, {
        headers: Config.ApiRequest.request.headers
      })
      

    } catch (e) {
      console.log(e);
    } finally {
    
      setUrl(res.data.url);
    }

}


    useEffect(() => {
        loadVideo()
    }, [])

    return (
        <div >
            <ReactHlsPlayer className="video"
              url={url}
              autoplay={false}
              controls={true}
          />
        </div>
    )
}
const mapStateToProps = (state) => ({ state: state });
      
const mapDispatchToProps = (dispatch) => ({
    player: (params) => {
    ApiRequest.App.Player(params)(dispatch);
  },
});

const connectedVideo = connect(
  mapStateToProps,
  mapDispatchToProps
)(Video);

export default connectedVideo;