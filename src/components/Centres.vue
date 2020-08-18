
<template>
    <div class="page-outer">
        <el-row>
            <el-col :span="24">
                <h1 class="title">Donor Centres in <strong class="centre__name">{{$route.params.town}}</strong></h1>
            </el-col>
        </el-row>


        <div v-for="centre in centres" class="centre-listing" :key="centre.id">
            <el-row>
                <el-col :span="24">
                    <router-link :to="{name: 'CentresDetail', params: {id: centre.id, town: centre.town.toLowerCase().trim()}}">
                        <h2 class="centre-listing__title">{{centre.centreName}}</h2>
                        <p class="centre-listing__title">{{centre.streetName}}</p>
                        <p class="centre-listing__title">{{centre.town}}</p>
                        <p class="centre-listing__title">{{centre.postcode}}</p>
                    </router-link>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import store from "../store/store";
    import UserService from "../services/UserService";
    import CentresService from "../services/CentresService";

    export default {
        data () {
            return {
                centres: {}
            }
        },

        async mounted() {
            // server
            const res = (await CentresService.show(store.state.route.params.town)).data
            this.centres = res.centres;

            console.log(this.centres);
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

    .stat-section {
        margin: 20px 0;
    }

    .centre-listing {
        min-height: 120px;
        background-color: #011627;
        color: white;
        border-radius: 18px;
        margin: 20px 0;

        -webkit-box-shadow: 11px 14px 21px -10px rgba(115,115,115,1);
        -moz-box-shadow: 11px 14px 21px -10px rgba(115,115,115,1);
        box-shadow: 11px 14px 21px -10px rgba(115,115,115,1);
    }

    .centre-listing a {
        color: white;
        text-decoration: none;
        padding: 40px;
        display: block;
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