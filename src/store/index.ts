import { createStore } from 'vuex'
import user from "./modules/user"
import route from "../store/modules/route";
import getters from "../store/getters";
import app from "../store/modules/app";
export default createStore({
    state: {

    },
    getters,
    mutations: {

    },
    actions: {

    },
    modules: {
        user,route,app
    }
})
