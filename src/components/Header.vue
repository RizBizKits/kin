
<template>
    <div>

    <el-menu
            :default-active=null
            class="el-menu-demo"
            mode="horizontal"
            background-color="#011627"
            text-color="#fff"
            active-text-color="#EAF6FF">

        <el-menu-item index="1" v-if="!$store.state.isLoggedIn"><router-link to="register">Register</router-link></el-menu-item>
        <el-menu-item index="2" v-if="!$store.state.isLoggedIn"><router-link to="login">Log In</router-link></el-menu-item>
        <el-menu-item index="3" v-if="$store.state.isLoggedIn"><v-button @click=dashboard()>Dashboard</v-button></el-menu-item>
        <el-menu-item index="4" v-if="$store.state.isLoggedIn" class="pull-right"><v-button @click=logout()>Log Out</v-button></el-menu-item>
        <el-menu-item index="5" v-if="$store.state.isLoggedIn" class="pull-right"><v-button @click=profile()>Profile</v-button></el-menu-item>


    </el-menu>
    </div>
</template>
<script>

    import store from "../store/store";

    export default {
        methods: {
            logout() {
                this.$store.dispatch("setToken", null);
                this.$store.dispatch("setUser", null);

                this.$router.push({
                    name: 'Login'
                })
            },
            profile() {

                this.$router.push({
                    name: 'Profile',
                    params: {
                        id: store.state.user.id
                    }
                })
            },
            dashboard() {
                this.$router.push({
                    name: 'Dashboard',
                    params: this.$store.state.route.params.id
                })
            }
        }
    }
</script>
<style>
    .el-menu-item {
        font-weight: bold;
    }

    .el-menu-item a {
        text-decoration: none;
    }

    #app .el-menu .pull-right {
        float: right;
    }
</style>