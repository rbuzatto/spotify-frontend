import  { BASE_URL } from '../constants/index'

const createRequestObject = (config) => {
    const { mainRoute = 'search', id, qParams , secondRoute } = config

    const query = qParams ? `?${Object.entries(qParams).map(keyValue => keyValue.join('=')).join('&')}` : ''

    const secondary = !id 
        ? ''
        : secondRoute
            ? `/${id}/${secondRoute}/`
            : `/${id}/`

    const url = new URL(`${BASE_URL}/${mainRoute}${secondary}${query}`)
    const token = localStorage.getItem('token')

    const headers = new Headers({"Content-Type": "application/json", "Authorization": `Bearer ${token}`})

    const settings = {
      method: 'GET',
      headers
    }

    return new Request(url, settings)
}

export default createRequestObject