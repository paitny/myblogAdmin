<template>
  <div class="login-container">

    <router-view></router-view>
    <BackgroundParticles></BackgroundParticles>

    <el-form
        class="login-form"
        :model="loginForm"
        :rules="rules"
        ref="loginFormRef"
    >
      <div class="title-container">
        <h3 class="title">后台管理登录系统</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon="user"></svg-icon>
        </span>
        <el-input v-model="loginForm.user"></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon="password"></svg-icon>
        </span>
        <el-input v-model="loginForm.pass" :type="typeInput"></el-input>
        <span class="show-pwd" @click="changeShowEye">
          <svg-icon :icon="eyeIcon"></svg-icon>
        </span>
      </el-form-item>
      <el-button type="primary" @click="handleSubmit">登录</el-button>
    </el-form>
  </div>
</template>

<script setup>
import BackgroundParticles from "../../components/BackgroundParticles/index.vue";
import {validatePassword} from "./rules";
import {computed, ref} from "vue";
import {ElMessage} from 'element-plus'
import {useStore} from 'vuex'
const loginForm = ref({
  user: "admin",
  pass: "709920",
});
const isShoeEye = ref(false)
const typeInput = computed(() => isShoeEye.value ? "text" : "password")
const eyeIcon = computed(() => isShoeEye.value ? "eye" : "eye-open")
const changeShowEye = () => {
  isShoeEye.value = !isShoeEye.value
}
const store = useStore()
const rules = ref({
  user: [{required: true, message: "账户名是必填项", trigger: "blur"}],
  pass: [
    {
      // 自定义校验规则
      validator: validatePassword,
      trigger: "blur",
    },
  ],
});

const loginFormRef = ref(null)

const handleSubmit = () => {
  loginFormRef.value.validate(async (v) => {
    if (v) {
      //提交登录
      await store.dispatch("user/loginFn", loginForm.value)

    } else {
      ElMessage({
        showClose: true,
        message: '登录失败,验证不通过',
        type: 'error',
        grouping: true,
      })
    }
  })
}


</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;
.login-container {
  min-height: 100%;
  width: 100%;
  height: 100%;
  background:url("../../assets/img/admin.png") no-repeat;
  background-size: cover;
  overflow: hidden;
  user-select: none;
  .login-form {
    position: absolute;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    top:10%;
    left:-50%;
    right:-50%;
    :deep(.el-button) {
      width: 100%;

      span {
        color: #fff;
      }
    }

    :deep(.el-form-item) {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    :deep(.el-input) {
      // 修改element样式
      display: inline-block;
      height: 47px;
      width: 85%;

      div {
        width: 100%;
        background: transparent;
        border: 0;
        box-shadow: 0 0 0 0;

        input {
          border: 0px;
          border-radius: 0px;
          padding: 12px 5px 12px 15px;
          color: $light_gray;
          height: 47px;
        }
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>





