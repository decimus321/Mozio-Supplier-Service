import React from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios'
import {setCode} from '../../store/AdminReducer'
import {useDispatch} from 'react-redux'

const AdministrationLogin = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function LoginAdminHandler(e) {
        e.preventDefault();
        const form = e.target;
        const code = form.code.value;

        async function LoginAdminRequest(url) {
            const config = {
                ContentType: 'application/json'
            }
            try {
                const response = await axios.get('api/check-admin', {params: {code}}, config)
                dispatch(setCode(response.data))
                navigate('/administration')
            } catch (e) {

            }
        }

        LoginAdminRequest()
    }

    return (
        <div className={'pt-24 font-sans  uppercase font-bold '}>
            <h1 className={"page-header"}>Admin Sign In</h1>
            <form className={'mt-8 flex flex-col w-1/4 mx-auto min-w-[20rem]'} onSubmit={LoginAdminHandler}>
                <label htmlFor={"code"} className={"form-label"}>Secret Code</label>
                <input required name={'code'} id="code" type={'text'} className={"form-input"}/>
                <button className={'form-button mt-6'}>Log In as Admin</button>
            </form>
            <div className={'hint'}>For Testing: 987654321</div>
        </div>
    )
};

export default AdministrationLogin;