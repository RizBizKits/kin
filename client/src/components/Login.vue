<template>
    <div class="outer">

        <h1>Log in</h1>

        <el-form class="login-form" ref="login-form" :rules="rules" :model="form" label-width="120px" label-position="top">
            <el-alert
                    v-if="form.err"
                    title="error alert"
                    type="error"
                    center
                    show-icon
                    v-html="form.err">
            </el-alert>
            <section class="np-t">
                <el-form-item label="Email" prop="email">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="Password" prop="password">
                    <el-input v-model="form.password" type="password"></el-input>
                </el-form-item>

            </section>


            <el-form-item>
                <el-button type="primary" @click="onLogin" class="mt-s">Log in</el-button>
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
                    password: '',
                    username: '',
                    err: null
                },
                rules: {
                    email: [
                        { required: true, validator: emailVal, trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'Password is required', trigger: 'blur' },
                        { min: 6, message: 'Password should be, at least, 3 characters long', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {

            async onLogin () {
                this.$refs['login-form'].validate(async (valid) => {
                    if (valid) {
                        try{

                            this.form.err = null;

                            const res = await UserAuthService.login({
                                email: this.form.email,
                                password: this.form.password,
                            })

                            await this.$store.dispatch('setToken', res.data.token);
                            await this.$store.dispatch('setUser', res.data.user);

                            await this.$router.push({
                                name: 'Dashboard',
                                params: {
                                    id: res.data.user.id
                                }
                            })
                        } catch(error) {
                            this.form.err = error.response.data.error;
                        }

                    } else {
                        return false;
                    }
                });
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

    .login-form {
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

