<template>
    <div class="outer">

        <h1>Welcome! Register an account on Kindred</h1>

    <el-form class="register-form" ref="register-form" :rules="rules" :model="form" label-width="120px" label-position="top">
        <el-alert
                v-if="form.err"
                title="error alert"
                type="error"
                center
                show-icon
                v-html="form.err">
        </el-alert>
<!--        <div v-html="form.err"/>-->
        <section class="np-t">
            <h3>Personal</h3>
            <el-col :span="12">
                <el-form-item label="First name" prop="firstname">
                    <el-input v-model="form.firstname"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="Last name" prop="lastname">
                    <el-input v-model="form.lastname"></el-input>
                </el-form-item>
            </el-col>

            <el-form-item label="Email" prop="email">
                <el-input v-model="form.email"></el-input>
            </el-form-item>

            <el-form-item label="Username" prop="username">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="password">
                <el-input v-model="form.password" type="password"></el-input>
            </el-form-item>

            <el-form-item label="Birthday" prop="dob">
                <el-alert
                        title="You have to be at least 18 years old to be a Kindred account holder."
                        type="info"
                        show-icon>
                </el-alert>
                <el-date-picker default-value="2002-11-31" type="date" placeholder="Pick a date" v-model="form.dob" format="yyyy/MM/dd" style="width: 100%;" :picker-options="datePickerOptions"></el-date-picker>
            </el-form-item>

            <el-form-item label="Blood type">
                <el-select v-model="form.bloodtype" placeholder="please select your blood type">
                    <el-option label="O positive" value="O positive"></el-option>
                    <el-option label="O negative" value="O-"></el-option>
                    <el-option label="A positive" value="A+"></el-option>
                    <el-option label="A negative" value="A-"></el-option>
                    <el-option label="B positive" value="B+"></el-option>
                    <el-option label="B negative" value="B-"></el-option>
                    <el-option label="AB positive" value="AB+"></el-option>
                    <el-option label="AB negative" value="AB-"></el-option>
                </el-select>
            </el-form-item>

        </section>


        <section>
            <h3>Address</h3>


            <el-col :span="8">
                <el-form-item label="House number">
                    <el-input v-model="form.housenumber"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="16">
                <el-form-item label="Street name">
                    <el-input v-model="form.streetname"></el-input>
                </el-form-item>
            </el-col>
            <el-form-item label="Town">
                <el-input v-model="form.town"></el-input>
            </el-form-item>
            <el-form-item label="Postcode">
                <el-input v-model="form.postcode"></el-input>
            </el-form-item>
        </section>

        <el-form-item>
            <el-button type="primary" @click="onRegister" class="mt-s">Create account</el-button>
        </el-form-item>
    </el-form>
    </div>
</template>

<script>
    import UserAuthService from "../services/UserAuthService";
    export default {
        data() {

            let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            var emailVal = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('Email is required'))
                } else if (!reg.test(value)) {
                    callback(new Error('Email is in an incorrect format'))
                } else {
                    callback()
                }
            }

            return {
                form: {
                    email: '',
                    firstname: '',
                    lastname: '',
                    username: '',
                    password: '',
                    dob: '',
                    bloodtype: '',
                    housenumber: '',
                    streetname: '',
                    town: '',
                    postcode: '',
                    err: null
                },
                datePickerOptions: {
                    disabledDate (date) {
                        return date.valueOf() > new Date(2002,11,31).valueOf();
                    }
                },
                rules: {
                    firstname: [
                        { required: true, message: 'First name is required', trigger: 'blur' }
                    ],
                    lastname: [
                        { required: true, message: 'Last name is required', trigger: 'blur' }
                    ],
                    email: [
                        { required: true, validator: emailVal, trigger: 'blur' }
                    ],
                    username: [
                        { required: true, message: 'Username is required', trigger: 'blur' },
                        { min: 4, max: 10, message: 'Username should be between 4 and 10 characters long', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'Password is required', trigger: 'blur' },
                        { min: 6, message: 'Password should be, at least, 6 characters long', trigger: 'blur' }
                    ],
                    dob: [
                        { required: true, message: 'Date of Birth is required', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {

                async onRegister () {

                try {
                    this.$refs['register-form'].validate(async (valid) => {
                         if (valid) {
                            const res = await UserAuthService.register({
                                email: this.form.email,
                                firstName: this.form.firstname,
                                lastName: this.form.lastname,
                                username: this.form.username,
                                password: this.form.password,
                                dob: this.form.dob,
                                bloodType: this.form.bloodtype,
                                houseNumber: this.form.housenumber,
                                streetName: this.form.streetname,
                                town: this.form.town,
                                postcode: this.form.postcode
                            })


                        } else {
                            return false;
                        }
                    });



                    await this.$router.push({
                        name: 'Login'
                    })

                } catch(error) {
                    console.log(error.response.data);

                    this.form.err = error.response.data.error;
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .el-form-item {
        text-align: left;
    }

    .el-form-item__label{
        padding-bottom: 2px;
    }

    .register-form {
        padding: 10px 10px 30px;
    }

    .mt-s {
        margin-top: 20px;
    }

    section {
        padding: 30px 0;
    }

    .np-t {
        padding: 0;
    }

    h3 {
        text-align: left;
    }
    .el-alert--info.is-light {
        padding: 10px 8px 10px 16px;
        line-height: 20px;
    }

</style>

