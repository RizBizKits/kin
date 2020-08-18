import ApiService from "./ApiService";

export default {
    show( userID ) {
        return ApiService().get(`/user/${userID}`);
    }
}