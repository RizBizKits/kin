import ApiService from "./ApiService";

export default {
    show( userID ) {
        return ApiService().get(`/user/${userID}`);
    },

    updatePoints(userID) {
        return ApiService().patch(`/user/${userID}/points`)
    }
}