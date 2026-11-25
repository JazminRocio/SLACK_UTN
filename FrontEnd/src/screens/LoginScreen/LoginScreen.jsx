import React, { useState } from 'react'
import useForm from '../../hooks/useform.jsx'
import login from '../../services/authService.js'

function LoginScreen() {

    const initial_state = { email: '', password: '' }
    const { formState, handleChangeInput } = useForm(initial_state)

    /*Cuando consultemos tendremos este estado que estara guardando como se hace esa consulta, basicamente en que estado esta la consulta  */
    const [apiResponse, setApiResponse] = useState({ response: null, error: null, loading: false })

    async function handleSubmit(event) {
        event.preventDefault()
        console.log('Usuario intenta iniciar sesion', formState)
        try {
            setApiResponse({ loading: true, error: null, response: null })
            const response = await login(formState.email, formState.password)
            setApiResponse({ loading: false, error: null, response: response })
        }
        catch (error) {
            //Si hubo fallo, guardamos en el estado el mensaje de fallo
            setApiResponse({ loading: false, error: error.message, response: null })
        }

    }

    console.log('Estado de la consulta de login', apiResponse)


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
                    apiResponse.error && !apiResponse.loading && <span style={{ color: 'red' }}> ERROR {apiResponse.error} </span>
                }
                {
                    apiResponse.loading
                        ? <button type='submit ' disabled={true}>Cargando...</button>
                        : <button type='submit'>Iniciar sesion</button>
                }

                {
                    apiResponse.response && !apiResponse.loading && <span style={{ color: 'green' }}> Inicio de sesion exitosa </span>
                }

            </form>
        </div>
    )
}

export default LoginScreen