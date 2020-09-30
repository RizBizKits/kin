import ApiService from "./ApiService";

export default {

    bookAppointmentToUser(id, appointmentid) {
        return ApiService().post(`/appointments/${id}`, appointmentid);
    },

    // loadUserAppointments_s(id) {
    //     return ApiService().get(`user/${id}/appointments`);
    // }

    loadUserAppointments_s(id) {
        return ApiService().get(`/appointments/${id}`);
    },

    valPoints(appointmentID, code) {
        return ApiService().get(`/appointments/${appointmentID}/points`, {
            params: {
                code: code
            }
        });
    },

}