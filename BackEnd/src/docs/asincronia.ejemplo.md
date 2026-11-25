



/* CLASE 11

JS es un lenguaje de programacion
En JS existen dos tipos de funciones: asincrona / sincronica
las diferenciamos por en su declaracion lleva async o no

- En JS las promesas se inventaron para podeer manejar procesos asincronicos.
Basicamente son un objeto con un estado interno, ese estado puede ser:
    -pending: el proceso está ocurriendo.
    -resolved: el proceso finalizó exitosamente 
    -rejected: 
*/

async function getUsers(){
    try{
        //mediante fetch podemos emitir consultas http
        const result = await fetch(
            'https://jsonplaceholder.typicode.com/users',
            {
                method:'GET'
            }
        )
        //transformamos el contenido de la respuesta en JSON
        const content = await result.json()
        console.log('El contenido del fetch es: ', content)
    }
    catch(error){
        console.log('Hubo un error: ',error)
    }
}

getUsers()

