import {getLocal, setLocal} from "../../utils/storage";
import getRoutePool from "../../assets/ts/handleData";

export default {
    namespaced: true,
    state: () => {
        return {sidebarOpened: getLocal("sidebarOpened", []), tagsViewList: getLocal('tagsViewList', [])}
    },
    actions: {
        addTagsViewList(context:any, tag:any) {

            const routePool = getRoutePool()
            const isFindRoute = routePool.find((item:any) => item.path === tag.path)
            if (!isFindRoute) return
            const isFindTag = context.state.tagsViewList.find((item:any) => item.path === tag.path)

            if (!isFindTag) {
                //深拷贝一份，解除循环引用
                const arr =JSON.parse(JSON.stringify(context.state.tagsViewList.concat(tag)))
                context.commit('storeAddTagsViewList', arr)
                setLocal('tagsViewList', arr)
            }
        },
        removeTagsViewList(context:any, {type, index}:any) {
            //深拷贝一份,解除循环引用
            let arr =JSON.parse(JSON.stringify(context.state.tagsViewList.concat()))
            switch (type) {
                case 'index':
                    arr.splice(index, 1)
                    break;
                case 'other':
                    arr = arr.splice(index, 1)
                    break;
                case 'right':
                    arr.splice(index + 1)
                    break;
            }
            setLocal('tagsViewList', arr)
            context.commit('storeAddTagsViewList', arr)
        }
    },
    mutations: {
        changeSidebarOpened(state:any) {
            state.sidebarOpened = !state.sidebarOpened
            setLocal("sidebarOpened", state.sidebarOpened)

        },
        storeAddTagsViewList(state:any, list:any) {
            state.tagsViewList = list
        }
    }
}
