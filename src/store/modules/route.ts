import {getLocal, setLocal} from "../../utils/storage";
import {getRoute} from "../../api/menuRoute";

export default {
    namespaced: true,
    state: () => {
        return {
            menuRoute: getLocal('menuRoute', [])
        }
    },
    actions:{
        getMenuRoute(context:any) {
           getRoute().then(({data})=>{
               context.commit('storeRoute',data)
               setLocal("menuRoute",data)
           })
        }
    },
    mutations: {
        storeRoute(state:any, menuRoute:any) {
            state.menuRoute = menuRoute
        }
    }
}
