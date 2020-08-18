import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from "../components/Home";
import Register from "../components/Register";
import Login from "../components/Login";
import Profile from "../components/Profile";
import Dashboard from "../components/Dashboard";
import Centres from "../components/Centres";
import CentresDetail from "../components/CentresDetail";
import UserApp from "../components/UserApp";
import Resources from "../components/Resources";




import store from "../store/store"

//
// const Login = () => import("../components/Login");
// const Register = () => import("../components/Register");

Vue.use(Router);

const routes = [
    {
        path: "/",
        name: "home",
        component: HelloWorld
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/:id',
        name: 'Profile',
        component: Profile
    },
    {
        path: '/donor-centres/:town',
        name: 'Centres',
        component: Centres
    },
    {
        path: '/donor-centres/:town/:id',
        name: 'CentresDetail',
        component: CentresDetail
    },
    {
        path: '/user/:id/appointments',
        name: 'userapp',
        component: UserApp
    },
    {
        path: '/resources',
        name: 'resources',
        component: Resources
    }
];

const router = new Router({
    mode: 'history',
    routes
});

export default router
