import React, { useState } from 'react'
import useForm from '../../hooks/useform.jsx'
import login from '../../services/authService.js'
import useRequest from '../../hooks/useRequest.jsx'

function LoginScreen() {

    const initial_state = { email: '', password: '' }
    const { formState, handleChangeInput } = useForm(initial_state)

    const { loading, response, error, sendRequest } = useRequest()

    async function handleSubmit(event) {
        event.preventDefault()
        sendRequest(
            () => login(formState.email, formState.password)
        )
        console.log('Usuario intenta iniciar sesion', formState)
    }

    return (
        <div>
            <h1>Iniciar sesion</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='email'> Email </label>
                    <input name='email' id='email' type='email' value={formState.email} onChange={handleChangeInput} ></input>
                </div>
                <div>
                    <label htmlFor='password'> Password </label>
                    <input
                        name='password'
                        id='password'
                        type='password'
                        value={formState.password}
                        onChange={handleChangeInput}>

                    </input>
                </div>
                {
                    error && !loading && <span style={{ color: 'red' }}> ERROR {error} </span>
                }
                {
                    loading
                        ? <button type='submit' disabled={true}>Cargando...</button>
                        : <button type='submit'>Iniciar sesion</button>
                }

                {
                    response && !loading && <span style={{ color: 'greenyellow' }}> Inicio de sesion exitosa </span>
                }

            </form>
        </div>
    )
}

export default LoginScreen