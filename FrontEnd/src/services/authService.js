/*
Integracion con la API
*/

async function login(email, password) {

    const response_http = await fetch(
        'http://localhost:8080/api/auth/login',
        {
            method: 'POST',
            //le comunicamos al servidor que tipo de datos estamos enviando
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }
    )

    //leemos el cuerpo de la respuesta como un JSON
    const response_body = await response_http.json()

    if (!response_body.ok) {
        throw new Error(response_body.message || 'Error en la petición')
    }
    else {
        return response_body
    }
}



/*
JSON.stringify sirve para transformar un objeto de JS en un JSON
*/

export default login