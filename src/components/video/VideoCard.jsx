import React from 'react'
import { Link } from 'react-router-dom';
import './VideoCard.css';

export const VideoCard = (props) => {

    const secondsToHms = (d) => {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);

        var hDisplay = h + ":";
        var mDisplay = m + ":";
        var sDisplay = s;
        return hDisplay + mDisplay + sDisplay;
    }

    const changeFavorite = (id, action) => {
        let params = {
            id: id,
            action: action
        }
        props.changeFav(params);
    };

    return (
        <div className="card">
            <img src={props.videoData.cover} alt={props.videoData.title} />
            <div className="card-info">
                <label className="label-gray">Title</label>
                <label className="label-black">{props.videoData.title}</label>
                <label className="label-gray">Duration</label>
                <label className="label-black">{secondsToHms(props.videoData.duration)}</label>
                <label className="label-gray">Section</label>
                <label className="label-black"> {props.videoData.section}</label>
                <hr />
                <div>
                    <Link to={`video/${props.videoData.id}`}>
                        <i alt="Play video"
                            class="material-icons">
                            play_circle_outline
                        </i>
                    </Link>
                    <Link onClick={() => changeFavorite(props.videoData.id, props.videoData.fav ? false : true)}>
                        <i alt="add favorite"
                            class="material-icons">
                            {props.videoData.fav ? 'favorite' : 'favorite_border'}
                        </i>
                    </Link>
                </div>
            </div>
        </div>
    )
}
/*
const mapStateToProps = (state) => ({ state: state });

const mapDispatchToProps = (dispatch) => ({
    favorite: (params) => {
        ApiRequest.Session.Favorite(params)(dispatch);
    },
});

const connectedVideoCard = connect(
    mapStateToProps,
    mapDispatchToProps
)(VideoCard);

export default connectedVideoCard;*/