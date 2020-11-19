import md5 from 'md5';
import React, { useState } from 'react'
import { connect } from "react-redux";
import { Link, Redirect } from 'react-router-dom';
import ApiRequest from "../../services/api/Api-request";
import { Loading } from '../Loading/Loading';
import './Login.css';


const Login = (props) => {
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')

    const onSubmit = (event) => {
        event.preventDefault();
        const params = new URLSearchParams();
        params.append("user", user);
        params.append("pass", md5(pass));
        params.append("device", "Web");
        props.login(params);
    };

    const handleChangePass = (event) => {
        setPass(event.target.value);
    }

    const handleChangeUser = (event) => {
        setUser(event.target.value);
    }

    return (
        <div className="login-page">
            <div className="form">
                <form className="login-form" onSubmit={onSubmit}>
                    <input
                        type="email"
                        name="user"
                        id="user"
                        value={user}
                        placeholder="Email"
                        onChange={handleChangeUser} />
                    <input
                        type="password"
                        name="pass"
                        id="pass"
                        value={pass}
                        placeholder="Password"
                        onChange={handleChangePass} />
                    <button type="submit">Login</button>
                </form>
                {props.state.login.error &&
                    <div className="error">{props.state.login.message}</div>
                }
            </div>
            { props.state.loading &&
                <Loading />
            }
            { props.state.token &&
                <Redirect to="/main" />
            }
        </div>
    )
}


const mapStateToProps = (state) => ({ state: state });

const mapDispatchToProps = (dispatch) => ({
    login: (params) => {
        ApiRequest.Session.Login(params)(dispatch);
    },
});

const connectedLogin = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

export default connectedLogin;
