<template>
  <div class="login-container" >
    <div class="x-box">
      <div class="x-top">
        <p>后台管理系统</p>
      </div>
      <div class="x-mid">
        <div class="input">
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules" style="width: 350px" class="demo-ruleForm">
            <el-form-item prop="username" label="用户名:" label-width="100px">
              <el-input v-model="loginForm.userName" name="username" type="text" auto-complete="off" placeholder="请输入你的用户名"/>
            </el-form-item>
            <el-form-item prop="password" label="密码:" label-width="100px" class="mb-0">
              <el-input
                :type="pwdType"
                v-model="loginForm.password"
                name="password"
                auto-complete="off"
                placeholder="请输入你的密码"
                @keyup.enter.native="handleLogin"/>
              <span class="show-pwd" @click="showPwd">
                <svg-icon icon-class="eye" />
              </span>
            </el-form-item>
            <el-form-item label-width="60px" prop="name" class="mb-0">
              <el-button :loading="loading" type="primary" style="width: 290px;margin-top: 15px" @click.native.prevent="handleLogin">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
        <p style="color:#c2c2c2;text-align:center; margin-bottom: 10px;font-size: 12px">Copyright © 2015.电动瓦力版权所有 </p>
      </div>
    </div>
    <div class="slideshow">
      <div :style="`background-image: url(\'${loginBg}\')`" class="slideshow-image"/>
      <div :style="`background-image: url(\'${loginBg}\')`" class="slideshow-image"/>
      <div :style="`background-image: url(\'${loginBg}\')`" class="slideshow-image"/>
      <div :style="`background-image: url(\'${loginBg}\')`" class="slideshow-image"/>
      <div :style="`background-image: url(\'${loginBg}\')`" class="slideshow-image"/>
      <!-- <div class="slideshow-image" style="background-image: url('https://gitee.com/iiifi/dmm/raw/master/img/beijing_4.jpg')"/>
      <div class="slideshow-image" style="background-image: url('https://gitee.com/iiifi/dmm/raw/master/img/beijing_3.jpg')"/>
      <div class="slideshow-image" style="background-image: url('https://gitee.com/iiifi/dmm/raw/master/img/beijing_4.jpg')"/> -->
    </div>
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import loginBg from '@/assets/login/web_login_bg.jpg'
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('Please enter correct account'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('不能少于5个字符'))
      } else {
        callback()
      }
    }
    return {
      loginBg,
      loginForm: {
        userName: '',
        password: ''
      },
      loginRules: {
        userName: [{ trigger: 'blur', validator: validateUsername }],
        password: [{ trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password'
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style type="text/css" scoped>
  /* *{margin:0;padding:0;} */
  .x-mid{
    position: relative;
    height: 200px;
    width: 100%;
    /*background: #fff url() 0 0 no-repeat;*/
  }
  .input{
    padding-left: 15px;
  }
  .el-input input{
    box-shadow: inset 0 0 0 1000px #fff;
    background-color: rgba(255, 255, 255, 0.3 );
  }
  .x-top{
    line-height: 130px;
    height: 130px;
    width: 100%;
    position: relative;
  }
  .x-top p{
    font-size: 20px;
    text-align: center;
  }
  .x-box {
    width: 500px;
    height: 380px;
    border-radius: 10px;
    overflow: hidden;
    position: absolute;
    top: 45%;
    left: 50%;
    -webkit-transform: translate3d(-50%, -50%, 0);
    transform: translate3d(-50%, -50%, 0);
    z-index: 99;
    background-color: rgba(255, 255, 255, 0.3 );
    padding: 1em 2em;
    line-height: 1.5;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: #889aa4;
    cursor: pointer;
    user-select: none;
  }
  .slideshow {
    position: absolute;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  .slideshow-image {
    position: absolute;
    width: 100%;
    height: 100%;
    background: no-repeat 50% 50%;
    background-size: cover;
    -webkit-animation-name: kenburns;
    animation-name: kenburns;
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    -webkit-animation-duration: 16s;
    animation-duration: 16s;
    opacity: 1;
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }
  .slideshow-image:nth-child(1) {
    -webkit-animation-name: kenburns-1;
    animation-name: kenburns-1;
    z-index: 3;
  }
  .slideshow-image:nth-child(2) {
    -webkit-animation-name: kenburns-2;
    animation-name: kenburns-2;
    z-index: 2;
  }
  .slideshow-image:nth-child(3) {
    -webkit-animation-name: kenburns-3;
    animation-name: kenburns-3;
    z-index: 1;
  }
  .slideshow-image:nth-child(4) {
    -webkit-animation-name: kenburns-4;
    animation-name: kenburns-4;
    z-index: 0;
  }

  @-webkit-keyframes kenburns-1 {
    0% {
      opacity: 1;
      -webkit-transform: scale(1.2);
      transform: scale(1.2);
    }
    1.5625% {
      opacity: 1;
    }
    23.4375% {
      opacity: 1;
    }
    26.5625% {
      opacity: 0;
      -webkit-transform: scale(1);
      transform: scale(1);
    }
    100% {
      opacity: 0;
      -webkit-transform: scale(1.2);
      transform: scale(1.2);
    }
    98.4375% {
      opacity: 0;
      -webkit-transform: scale(1.21176);
      transform: scale(1.21176);
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes kenburns-1 {
    0% {
      opacity: 1;
      -webkit-transform: scale(1.2);
      transform: scale(1.2);
    }
    1.5625% {
      opacity: 1;
    }
    23.4375% {
      opacity: 1;
    }
    26.5625% {
      opacity: 0;
      -webkit-transform: scale(1);
      transform: scale(1);
    }
    100% {
      opacity: 0;
      -webkit-transform: scale(1.2);
      transform: scale(1.2);
    }
    98.4375% {
      opacity: 0;
      -webkit-transform: scale(1.21176);
      transform: scale(1.21176);
    }
    100% {
      opacity: 1;
    }
  }
  @-webkit-keyframes kenburns-2 {
    23.4375% {
      opacity: 1;
      -webkit-transform: scale(1.2);
      transform: scale(1.2);
    }
    26.5625% {
      opacity: 1;
    }
    48.4375% {
      opacity: 1;
    }
    51.5625% {
      opacity: 0;
      -webkit-transform: scale(1);
      transform: scale(1);
    }
    100% {
      opacity: 0;
      -webkit-transform: scale(1.2);
      transform: scale(1.2);
    }
  }
  @keyframes kenburns-2 {
    23.4375% {
      opacity: 1;
      -webkit-transform: scale(1.2);
      transform: scale(1.2);
    }
    26.5625% {
      opacity: 1;
    }
    48.4375% {
      opacity: 1;
    }
    51.5625% {
      opacity: 0;
      -webkit-transform: scale(1);
      transform: scale(1);
    }
    100% {
      opacity: 0;
      -webkit-transform: scale(1.2);
      transform: scale(1.2);
    }
  }
  @-webkit-keyframes kenburns-3 {
    48.4375% {
      opacity: 1;
      -webkit-transform: scale(1.2);
      transform: scale(1.2);
    }
    51.5625% {
      opacity: 1;
    }
    73.4375% {
      opacity: 1;
    }
    76.5625% {
      opacity: 0;
      -webkit-transform: scale(1);
      transform: scale(1);
    }
    100% {
      opacity: 0;
      -webkit-transform: scale(1.2);
      transform: scale(1.2);
    }
  }
  @keyframes kenburns-3 {
    48.4375% {
      opacity: 1;
      -webkit-transform: scale(1.2);
      transform: scale(1.2);
    }
    51.5625% {
      opacity: 1;
    }
    73.4375% {
      opacity: 1;
    }
    76.5625% {
      opacity: 0;
      -webkit-transform: scale(1);
      transform: scale(1);
    }
    100% {
      opacity: 0;
      -webkit-transform: scale(1.2);
      transform: scale(1.2);
    }
  }
  @-webkit-keyframes kenburns-4 {
    73.4375% {
      opacity: 1;
      -webkit-transform: scale(1.2);
      transform: scale(1.2);
    }
    76.5625% {
      opacity: 1;
    }
    98.4375% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
  @keyframes kenburns-4 {
    73.4375% {
      opacity: 1;
      -webkit-transform: scale(1.2);
      transform: scale(1.2);
    }
    76.5625% {
      opacity: 1;
    }
    98.4375% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }

  h1 {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate3d(-50%, -50%, 0);
    transform: translate3d(-50%, -50%, 0);
    z-index: 99;
    text-align: center;
    font-family: Raleway, sans-serif;
    font-weight: 300;
    text-transform: uppercase;
    background-color: rgba(255, 255, 255, 0.75);
    box-shadow: 0 1em 2em -1em rgba(0, 0, 0, 0.5);
    padding: 1em 2em;
    line-height: 1.5;
  }
  h1 small {
    display: block;
    text-transform: lowercase;
    font-size: .7em;
  }
  h1 small:first-child {
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
    padding-bottom: .5em;
  }
  h1 small:last-child {
    border-top: 1px solid rgba(0, 0, 0, 0.25);
    padding-top: .5em;
  }
</style>
