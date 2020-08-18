import ApiService from "./ApiService";

export default {

    bookAppointmentToUser(id, appointmentid) {
        return ApiService().post(`/appointments/${id}`, appointmentid);
    },

    loadUserAppointments_s(id) {
        return ApiService().get(`user/${id}/appointments`);

    }
}