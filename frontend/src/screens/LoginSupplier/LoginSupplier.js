import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {useDispatch} from 'react-redux'
import {login} from '../../store/UserDataReducer'

const LoginSupplier = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function LoginHandler(e) {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        async function LoginRequest() {
            const config = {
                ContentType: 'application/json'
            }
            const body = {
                username: email, password
            }
            try {
                const response = await axios.post('api/login-supplier', body, config)
                dispatch(login(response.data))
                navigate('/supplier')
            } catch (e) {

            }
        }

        LoginRequest()
    }

    return (
        <div className={"pt-24 font-sans  uppercase font-bold "}>
            <h1 className={"page-header"}>Sign In</h1>
            <form className={'flex flex-col w-1/4 mx-auto min-w-[20rem]'} onSubmit={LoginHandler}>
                <label htmlFor={"email"} className={"form-label"}>Email</label>
                <input required name={'email'} id="email" type={'email'} className={"form-input"}/>
                <label htmlFor={"password"} className={"form-label"}>Password</label>
                <input name={'password'} required id={'password'} type={'password'} className={"form-input"}/>
                <button className={'form-button mt-6'}>Log In</button>
                <Link className={'mt-12 text-custom-yellow font-semibold normal-case text-sm'}
                      to={'/supplier/register'}>
                    Don't have an account yer? Sign Up
                </Link>
            </form>

        </div>
    )
};

export default LoginSupplier;