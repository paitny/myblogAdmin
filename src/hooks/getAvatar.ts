import { computed } from "vue";
import { useStore } from "vuex";

export const getAvatar = () => {
    const store = useStore();
    // 登出状态 给default.gif作为默认图
    const avatarSrc = computed(() => store.getters.userInfo.photo || require('../assets/img/logo.png'));

    return {store,avatarSrc}

}
