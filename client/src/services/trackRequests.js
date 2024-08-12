import { URL } from '../config'

export async function addSong(data = {}) {
    console.log(data)
    let res = await fetch(`${URL}/tracks/add`, {
        method:"POST",
        mode:"cors",
        body: JSON.stringify({data}),
        headers: {
            "Content-Type": 'application/json'
        }
    })
    return res.json()
}

// async function postToTodos(url='', data = {}) {
//     const res = await fetch(`${URL}/todos${url}`, {
//         method:"POST",
//         mode:"cors",
//         body: JSON.stringify(data),
//         headers: {
//             "Content-Type": 'application/json'
//         }
//     })
//     return res.json()
// }