import { SERVER_URL } from '../constants'

export const login = userLoginSignup('login')
export const signup = userLoginSignup('signup')

export const logout = () => {
    localStorage.removeItem('user')
}


function handleResponse(res) {
    if(res.ok) {
        return res.json()
    }

    if(res.status === 401) {
        logout()
    }

    throw res.statusText
}

// login and signup are indentical but the url
export function userLoginSignup(mode) {

    return (username, password) => {
        const body = JSON.stringify({ username, password })

        const headers = new Headers({"Content-Type": "application/json"})
        const settings = {
            method: 'POST',
            headers,
            body
        }

        const serverBase = SERVER_URL
        const url = new URL(`${serverBase}/${mode}`)

        const request = new Request(url, settings)


        return fetch(request)
            .then(handleResponse)
            .then(user => {
                localStorage.setItem('user', JSON.stringify(user))
                return user
            })
    }
}