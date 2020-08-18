import ApiService from "./ApiService";

export default {
    register(credentials) {
        return ApiService().post('user/register', credentials);
    },
    login(credentials) {
        return ApiService().post('user/login', credentials);
    }
}