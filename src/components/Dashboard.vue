
<template>

    <div class="page-outer">
        <el-row>
            <el-col :span="24">
                <h1 class="title">Dashboard</h1>
            </el-col>
            <el-col :span="24">
                <h2>Welcome, {{profile.firstName}}</h2>
            </el-col>
        </el-row>

        <el-row class="stat-section" :gutter="10">
            <el-col :span="24">
                <div class="stat-item" @click="toProfile()">
                    <h4 class="stat-item-number">👀</h4>
                    <p class="stat-item-tag">Profile</p>
                </div>
            </el-col>
        </el-row>

        <el-row class="stat-section" :gutter="10">
            <el-col :span="12">
                <div class="stat-item yellow-bg" @click="nav()">
                    <h4 class="stat-item-number">+</h4>
                    <p class="stat-item-tag">Donor Centres</p>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="stat-item yellow-bg" @click="toApp()">
                    <h4 class="stat-item-number">&#9829;</h4>
                    <p class="stat-item-tag">My Appointments</p>
                </div>
            </el-col>
        </el-row>

        <el-row class="stat-section" :gutter="10">
            <el-col :span="24">
                <div class="stat-item" @click="toKnowledge()">
                    <h4 class="stat-item-number">🗞️</h4>
                    <p class="stat-item-tag">Knowledge</p>
                </div>
            </el-col>
        </el-row>
    </div>

</template>

<script>
    import store from "../store/store";

    export default {
        data () {
            return {
                profile: {}
            }
        },

        methods: {
            nav() {

                this.$router.push({
                    name: 'Centres',
                    params: {
                        town: store.state.user.town
                    }
                });
            },

            toProfile() {
                this.$router.push({
                    name: 'Profile',
                    params: {
                        id: store.state.user.id
                    }
                });
            },

            toApp() {
                this.$router.push({
                    name: 'userapp',
                    params: {
                        id: store.state.user.id
                    }
                });
            },
            toKnowledge() {
                this.$router.push({
                    name: 'resources'
                });
            }
        },
        async mounted () {
            console.log("on the dashboard page...");
            console.log(this.$store.state.user);
            this.profile = this.$store.state.user;
            const userID = this.$store.state.route.params.id;
        },
        beforeRouteEnter(to, from, next) {
            if (!store.state.isLoggedIn) {
                // User not logged in
                next({
                    name: "Login",
                    query: { redirectFrom: to.fullPath }
                })
            } else {
                next()
            }
        }
    }

</script>
<style>

    .avatar-outer {
        /*display: flex;*/
        height: 200px;
        /*background-color: #E63946;*/
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin: 10px 0;

    }

    .avatar {
        object-fit: contain;
        width: 200px;
        max-width: 100%;
        max-height: 100%;
    }

    .title {
        text-align: left;
    }

    .page-outer {
        margin: 0 20px;
    }

    .stat-section {
        margin: 20px 0;
    }

    .stat-item {
        min-height: 120px;

        border-radius: 18px;

        -webkit-box-shadow: 11px 14px 21px -10px rgba(115,115,115,1);
        -moz-box-shadow: 11px 14px 21px -10px rgba(115,115,115,1);
        box-shadow: 11px 14px 21px -10px rgba(115,115,115,1);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

    }

    .stat-item:hover {
        cursor: pointer;
    }

    .blue-bg {
        background-color: #011627;
        color: white;
    }

    .yellow-bg {
        background-color: #FFCE39;
        color: black;
    }

    .light-bg {
        background-color: #009FFD;
        color: black;
    }

    .stat-item-number {
        font-size: 40px;
        margin: 0;
    }

    .stat-item-tag {
        font-size: 20px;
        margin: 0;
    }

</style>