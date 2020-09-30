
<template>
    <div class="page-outer">
        <el-row>
            <el-col :span="24">
                <h1 class="title">{{centre.centreName}}</h1>
                <p class="centre-listing__title">{{centre.streetName}}</p>
                <p class="centre-listing__title">{{centre.town}}</p>
                <p class="centre-listing__title">{{centre.postcode}}</p>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="24">

                <h2 class="title">Appointments</h2>

                <el-date-picker
                        v-model="value1"
                        type="daterange"
                        range-separator="To"
                        start-placeholder="Start date"
                        end-placeholder="End date">
                </el-date-picker>

                <el-button type="primary" @click="findApp()" class="mt-s app-btn">Find Appointments</el-button>

                <div v-if="appointments">
                    <table :data="appointments" v-for="appointment in appointments" :key="appointment.id">
                        <thead>
                            <tr v-if="appointments">
                                <th v-if="appointments">Appointment ID</th>
                                <th v-if="appointments">Timing</th>
                                <th v-if="appointments">Book</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{{appointment.id}}</td>
                                <td>{{appointment.dateAsString}}</td>
                                <td><el-button :id="appointment.id" v-on:click="book($event)">Book Now</el-button></td>
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
                centre: {},
                appointments: {},
                err: '',
                value1: '',
                appointmentSlot: '',
                pass: ''
            }
        },
        methods: {
             async format_date(value){
                console.log("THE VAL:", value);
                 return moment(value).format('YYYYMMDD');
            },
            async findApp() {

                try {

                    console.log(this.value1);
                    const appointments = (await CentresService.listAppByCentre_s(store.state.route.params.id, store.state.route.params.town, this.value1)).data

                    this.appointments = appointments;

                    console.log(this.appointments);

                } catch (error) {
                    console.log(error.response.data);
                    this.err = error.response.data.error;
                }
            },
            async book(event) {

                 try {
                     let appointmentID = event.currentTarget.id;
                     const appointment = await AppointmentsService.bookAppointmentToUser(store.state.user.id, {appointmentID});
                     console.log(appointment);
                     this.pass = "sucesss!";

                 } catch (error) {
                     console.log(error.response.data);
                     this.err = error.response.data.error;
                 }

            }
        },


        async mounted() {
            const res = (await CentresService.load(store.state.route.params.id, store.state.route.params.town)).data
            this.centre = res.centre;
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