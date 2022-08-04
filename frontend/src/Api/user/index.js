import ApiStructure, {CONTENT_TYPE} from '../api'

class UserApi extends ApiStructure {
    LOGIN_ENDPOINT = '/api/user/logAuth'
    REGISTER_ENDPOINT = '/api/user/regAuth'
    TOKEN_ENDPOINT = '/api/token'

    async registerUser(name, email, password) {
        const payload = {
            name,
            email,
            password
        }
        console.log(payload);
        return await this.post(this.REGISTER_ENDPOINT, payload, CONTENT_TYPE.JSON)
    }
    async loginUser(email, password) {
        const payload = {
            email,
            password
        }
        const response =  await this.post(this.LOGIN_ENDPOINT, payload, CONTENT_TYPE.JSON)
        if (response.success) {
            const {token} = response.objVal
            localStorage.setItem('appToken', token)
        }
        return response.success
    }
    async tokenVerify() {
        const token = localStorage.getItem('appToken') || 'no-token'
        const payload = {
            token
        }
        const response = await this.post(this.TOKEN_ENDPOINT, payload, CONTENT_TYPE.JSON)
        return response.objVal.isValid
    }
}

export default new UserApi()
