import axios from "axios"
const service=axios.create({
    timeout: 5000,
    withCredentials: true,
    // baseURL: 'http://localhost:4000'

})
export default service
