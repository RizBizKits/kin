
<template>
    <div class="page-outer">
        <el-row>

            <el-button type="primary" v-if="!$store.state.isLoggedIn"><router-link to="/register"  class="invite-btn">Become a donor, join Kindred!</router-link></el-button>

            <el-col :span="24">
                <h1 class="title">Profile</h1>
            </el-col>
            <el-col :span="24">
                <section class="avatar-outer">
                    <img src="../assets/avatar-simple.svg" class="avatar"/>
                </section>
            </el-col>
            <el-col :span="24">
                <h2>{{user.firstName}} {{user.lastName}}</h2>
                <h3>Blood Type: {{user.bloodType}}</h3>
            </el-col>
        </el-row>

        <el-row class="stat-section" :gutter="10">
            <el-col :span="8">
                <div class="stat-item">
                    <h4 class="stat-item-number">{{user.points}}</h4>
                    <p class="stat-item-tag">Donor Points</p>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="stat-item">
                    <h4 class="stat-item-number">7</h4>
                    <p class="stat-item-tag">Lives Saved</p>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="stat-item">
                    <h4 class="stat-item-number">7</h4>
                    <p class="stat-item-tag">Badges Earned</p>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>


    import UserService from "../services/UserService";

    export default {
        data () {
            return {
                user: {}
            }

        },
        async mounted () {
            console.log("on the profile page...");
            console.log(this.$store.state.route.params.id);
            const userID = this.$store.state.route.params.id;

            // server
            const res = (await UserService.show(userID)).data;

            //array to json
            this.user = res.user[0];

            console.log(this.user);
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
        background-color: #011627;
        color: white;
        border-radius: 18px;

        -webkit-box-shadow: 11px 14px 21px -10px rgba(115,115,115,1);
        -moz-box-shadow: 11px 14px 21px -10px rgba(115,115,115,1);
        box-shadow: 11px 14px 21px -10px rgba(115,115,115,1);
    }

    .stat-item-number {
        font-size: 40px;
        margin: 0;
    }

    .stat-item-tag {
        font-size: 20px;
        margin: 0;
    }

    a.invite-btn {
        color: white;
    }

</style>