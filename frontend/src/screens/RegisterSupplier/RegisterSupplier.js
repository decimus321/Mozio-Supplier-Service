import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom'

const languageOptions = [
    {value: "EN", label: "English"},
    {value: "RU", label: "Russian"},
    {value: "RO", label: "Romanian"},
    {value: "FR", label: "French"},
];
const currencyOptions = [
    {value: "eur", label: "EUR"},
    {value: "usd", label: "USD"},
    {value: "gbp", label: "GBP"},
    {value: "ron", label: "RON"},
]

const RegisterSupplier = (props) => {

    const navigate = useNavigate()

    function RegisterHandler(e) {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const name = form.name.value;
        const phone = form.phone.value;
        const language = form.language.value;
        const currency = form.currency.value;
        const secret = form.secret.value;

        async function RegisterRequest() {
            const config = {
                ContentType: 'application/json'
            }
            const body = {
                email, password, name, phone, language, currency, secret
            }
            try {
                const response = await axios.post('api/register-supplier', body, config)
                navigate('/supplier/login')
            } catch (e) {

            }

        }

        RegisterRequest()
    }


    return (
        <div className={"pt-24 font-sans  uppercase font-bold "}>
            <h1 className={"page-header"}>Sign Up</h1>
            <form className={'flex flex-col w-1/4 mx-auto min-w-[20rem]'} onSubmit={RegisterHandler}>
                <label htmlFor={"email"} className={"form-label"}>Email</label>
                <input required name={'email'} id="email" type={'email'} className={"form-input"}/>
                <label htmlFor={"name"} className={"form-label"}>Name</label>
                <input required name={'name'} id="name" type={'text'} className={"form-input"}/>
                <label htmlFor={"phone"} className={"form-label"}>Phone Number</label>
                <input required name={'phone'} id="phone" type={'tel'} className={"form-input"}/>

                <div className={"flex justify-between mt-2"}>
                    <div className={'w-[45%]'}>
                        <label htmlFor={"language"} className={"form-label"}>Language</label>
                        <select name={'language'} required id="language" className={"form-select"}>
                            className={"form-select"}>
                            {languageOptions.map(option => <option key={option.label}
                                                                   value={option.value}>{option.label}</option>)}
                        </select>
                    </div>
                    <div className={'w-[45%]'}>
                        <label htmlFor={"currency"} className={"form-label"}>Currency</label>
                        <select name={'currency'} required id="currency" className={"form-select"}>
                            {currencyOptions.map(option => <option key={option.label}
                                                                   value={option.value}>{option.label}</option>)}
                        </select>
                    </div>
                </div>
                <label htmlFor={"password"} className={"form-label"}>Password</label>
                <input name={'password'} required id={'password'} type={'password'} className={"form-input"}/>
                <label htmlFor={"key"} className={"form-label"}>Secret Registration Key</label>
                <input name={'secret'} required id={'key'} type={'text'} className={"form-input"}/>
                <button className={'form-button mt-6'}>Register</button>
                <Link className={'mt-12 text-custom-yellow font-semibold normal-case text-sm'} to={'/supplier/login'}>Already
                    have an account? Sign In
                </Link>
            </form>
            <div className={'hint'}>For Testing: 123456789</div>
        </div>
    )
};

export default RegisterSupplier;