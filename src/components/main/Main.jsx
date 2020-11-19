import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import ApiRequest from '../../services/api/Api-request';
import { Loading } from '../Loading/Loading';
import { VideoCard } from '../video/VideoCard';
import './Main.css';

const Main = (props) => {

    const [videoDataSearch, setVideoDataSearch] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const params = new URLSearchParams();
        params.append("token", props.state.token);
        params.append("device", "Web");
        props.main(params);
    }, [])

    const handleSearch = (event) => {
        setSearch(event.target.value);
        let contentSearch = [];
        if (event.target.value.length >= 0) {
            props.state.contents.map(content => {
                let newContent = {};
                if (content.title.toLowerCase().includes(event.target.value.toLowerCase())) {
                    newContent = {
                        ...content
                    }
                    contentSearch.push(newContent)
                }
            })
        } else {
            contentSearch = [];
        }
        setVideoDataSearch(contentSearch);
    }

    const changeFav = (params) => {
        props.fav(params);
    }

    return (

        <div>
            <header className="header">
                <div className="search">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={handleSearch} />
                </div>
            </header>
            <div className="card-grid">
                {search.length > 0 ?
                    videoDataSearch.map(content => (
                        <VideoCard key={content.id} videoData={content} changeFav={changeFav}/>
                    ))
                    :
                    props.state.contents.map(content => (
                        <VideoCard key={content.id} videoData={content} changeFav={changeFav}/>
                    ))
                }

                {props.state.loading &&
                    <Loading />
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({ state: state });

const mapDispatchToProps = (dispatch) => ({
    main: (params) => {
        ApiRequest.App.Main(params)(dispatch);
    },
    fav: (params) => {
        ApiRequest.App.Favorite(params)(dispatch);
    }
});

const connectedMain = connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);

export default connectedMain;

