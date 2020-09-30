// eslint-disable-next-line no-unused-vars
import axios from 'axios'

export default () => {
    return axios.create({
        baseURL: `http://localhost:3000/`
    })
}