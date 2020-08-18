import ApiService from "./ApiService";

export default {
    index() {
        return ApiService().get(`/centre`);
    },
    show( town ) {
        return ApiService().get(`/centre/${town}`);
    },
    load( id, town ) {
        return ApiService().get(`/centre/${town}/${id}`);
    },

    // listAppByCentre_s(id, town, dates) {
    //     return ApiService().get(`/centre/${town}/${id}/appointments`, dates);
    // },

    listAppByCentre_s(id, town, pickedDates) {
        return ApiService().get(`/centre/${town}/${id}/appointments`, {
            params: {
                dates: pickedDates
            }
        });
    }
}