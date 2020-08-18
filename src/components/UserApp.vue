
<template>
    <div class="page-outer">

        <el-row>
            <el-col :span="24">

                <h2 class="title">Your Upcoming Appointments</h2>

                <div v-if="appointments">
                    <table :data="appointments" v-for="appointment in appointments" :key="appointment.id">
                        <thead>
                        <tr v-if="appointments">
                            <th v-if="appointments">Appointment ID</th>
                            <th v-if="appointments">Timing</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{{appointment.id}}</td>
                            <td>{{appointment.appointmentSlot}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <el-alert
                        v-if="err"
                        title="error alert"
                        type="error"
                        center
                        show-icon
                        v-html="err">
                </el-alert>

                <el-alert
                        v-if="pass"
                        title="success alert"
                        type="success"
                        show-icon
                        v-html="pass">
                </el-alert>

            </el-col>
        </el-row>
    </div>
</template>

<script>
    import store from "../store/store";
    import UserService from "../services/UserService";
    import CentresService from "../services/CentresService";
    import AppointmentsService from "../services/AppointmentsService";

    import moment from "moment";

    export default {
        data () {
            return {
                appointments: {},
                err: '',
                pass: ''
            }
        },
        async mounted() {
            try {
                const res = (await AppointmentsService.loadUserAppointments_s(store.state.route.params.id)).data;
                this.appointments = res.user.appointments;
                console.log(this.appointments);

            } catch (error) {
                console.log(error.response.data);
                this.err = error.response.data.error;
            }
        },
        beforeRouteEnter(to, from, next) {
            if (!store.state.isLoggedIn) {
                // User not logged in
                next({
                    name: "Login"
                })
            } else {
                next()
            }
        }
    }

</script>
<style>

    .el-table {
        margin: 50px 0;
    }

    .el-alert {
        margin: 20px 0;
    }

    .app-btn {
        display: block;
        margin: 20px auto;
    }


    .title {
        text-align: left;
    }

    .centre__name {
        text-transform: uppercase;
        font-style: italic;
    }

    .page-outer {
        margin: 0 20px;
    }

    .centre-listing__title {
        text-align: left;
    }



    .stat-item-tag {
        font-size: 20px;
        margin: 0;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    tr:nth-of-type(odd) {
        background: #eee;
    }

    th {
        background: #011627;
        color: white;
        font-weight: bold;
    }

    td, th {
        padding: 6px;
        border: 1px solid #ccc;
        text-align: left;
    }

</style>