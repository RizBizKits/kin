
<template>
    <div class="page-outer">


        <el-row>
            <el-col :span="24">

                <h2 class="title">Your Upcoming Appointments</h2>

                <div v-if="appointments">
                    <div :data="appointments" v-for="(appointment, counter) in appointments" :key="appointment.id">
                        <div class="appointment-listicle blue-bg">
                            <p class="appointment-listicle__eta">{{appointment.eta}}</p>
                            <p class="appointment-listicle__time">{{appointment.timeAsString}}, {{appointment.dateAsString}}</p>
                            <p class="appointment-listicle__location">{{appointment.centre.centreName}}</p>

                            <div class="appointment-listicle__claim">
<!--                                <input type="text" name="listicle__code" class="appointment-listicle__code">-->
                                <el-input class="appointment-listicle__code" placeholder="Enter points code" v-model="inputs[counter]"></el-input>

                                <el-button :id="appointment.id" v-on:click="valPointsCode($event)" class="appointment-listicle__claim-btn" round>Claim points</el-button>
                            </div>
                        </div>
                    </div>
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

<!--        <el-row>-->
<!--            <el-col :span="24">-->

<!--                <h2 class="title">Your Upcoming Appointments</h2>-->

<!--                <div v-if="appointments">-->
<!--                    <table :data="appointments" v-for="appointment in appointments" :key="appointment.id">-->
<!--                        <thead>-->
<!--                        <tr v-if="appointments">-->
<!--                            <th v-if="appointments">Appointment ID</th>-->
<!--                            <th v-if="appointments">Day</th>-->
<!--                            <th v-if="appointments">Time</th>-->
<!--                        </tr>-->
<!--                        </thead>-->
<!--                        <tbody>-->
<!--                        <tr>-->
<!--                            <td>{{appointment.id}}</td>-->
<!--                            <td>{{appointment.dateAsString}}</td>-->
<!--                            <td>{{appointment.timeAsString}}</td>-->


<!--                        </tr>-->
<!--                        </tbody>-->
<!--                    </table>-->
<!--                </div>-->

<!--                <el-alert-->
<!--                        v-if="err"-->
<!--                        title="error alert"-->
<!--                        type="error"-->
<!--                        center-->
<!--                        show-icon-->
<!--                        v-html="err">-->
<!--                </el-alert>-->

<!--                <el-alert-->
<!--                        v-if="pass"-->
<!--                        title="success alert"-->
<!--                        type="success"-->
<!--                        show-icon-->
<!--                        v-html="pass">-->
<!--                </el-alert>-->

<!--            </el-col>-->
<!--        </el-row>-->
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
                pass: '',
                dialogVisible: false,
                inputs: []
            }
        },
        methods: {
            handleClose(done) {
                this.$confirm('Are you sure to close this dialog?')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            async valPointsCode(event) {


               try {
                   let appointmentID = event.currentTarget.id;
                   console.log(appointmentID);
                   let pointsCode = this.inputs[1];
                   console.log("points code: ", pointsCode);
                   const res = (await AppointmentsService.valPoints(appointmentID, {pointsCode})).data;
                   console.log("message recieved: ", res.message);

                   const res_points = (await UserService.updatePoints(store.state.route.params.id)).data;
                   console.log("user message recieved: ", res_points.message);




               } catch (error) {
                   console.log(error.response.data);
               }
            }
        },

        async mounted() {
            try {
                const res = (await AppointmentsService.loadUserAppointments_s(store.state.route.params.id)).data;
                this.appointments = res.appointments;
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
<style scoped>

    .el-dialog {
        width: 80%;
    }

    .appointment-listicle {
        /*min-height: 120px;*/

        border-radius: 18px;
        -webkit-box-shadow: 11px 14px 21px -10px rgba(115,115,115,1);
        -moz-box-shadow: 11px 14px 21px -10px rgba(115,115,115,1);
        box-shadow: 11px 14px 21px -10px rgba(115,115,115,1);
        display: flex;
        /*align-items: center;*/
        justify-content: center;
        flex-direction: column;

        padding: 40px;
        background-color: #FFCE39;
        margin: 20px 0;


    }

    .appointment-listicle p {
        text-align: left;
    }

    .appointment-listicle__eta {
        font-size: 2em;
        margin: 0;
        color: #011627;
        /*position: relative;*/

    }

    .appointment-listicle__time {
        font-size: 1.4em;
        font-weight: bold;
        margin: 10px 0;
    }

    .appointment-listicle__location {
        margin: 5px 0;
        color: #011627;
        background-image: url("../assets/pin.svg");
        background-repeat: no-repeat;
        padding: 0 0 0 30px;
    }

    .appointment-listicle__claim-btn {
        max-width: 300px;
        margin: 30px 0 0 auto;
        display: inline-block;

    }

    .appointment-listicle__code {
        display: inline-block;
        margin: 0 10px 0 0;
        width: 50%;
    }

    /*.appointment-listicle__location::before {*/
    /*    content: '';*/
    /*    display: inline-block;*/
    /*    width: 40px;*/
    /*    height: 40px;*/
    /*    border: solid 2px red;*/
    /*    position: absolute;*/
    /*    top: -50%;*/
    /*    left: -20px;*/
    /*    transform: translate(50%, 0);*/
    /*    margin: 0 30px 0 0;*/
    /*    z-index: 1;*/
    /*}*/


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