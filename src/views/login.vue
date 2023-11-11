<template>
  <div class="form-wrap">
    <a-form
      :model="formState"
      name="basic"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
      class="form"
    >
      <div class="login-tips">欢迎登录</div>
      <a-form-item
        label="Username"
        name="username"
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <a-form-item
        label="Password"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-form-item name="remember">
        <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
import { router } from '@/router'
import { useAuth } from '@/stores/auth'
import { dynamicRoutes, routes } from '@/router/dynamic-routes'
import { useRoute } from 'vue-router'

interface FormState {
  username: string
  password: string
  remember: boolean
}

const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true
})
const store = useAuth()
const route = useRoute()
const onFinish = async (values: any) => {
  console.log('Success:', values)
  //todo 调用登录接口，存储用户token,获取用户菜单权限，添加路由，跳转页面
  store.$patch({
    token: ''
  })
  await dynamicRoutes()
  const flag = routes.find((item: any) => {
    return item.path === route.query.redirect
  })
  const name = flag ? flag.name : routes[0].name
  await router.push({
    name: name
  })
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
</script>
<style lang="scss" scoped>
.form-wrap {
  width: 100%;
  height: 100vh;
  background: url('https://picsum.photos/seed/picsum/200/300') no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: 100% 100%;
  .login-tips {
    text-align: center;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 22px;
  }
  .form {
    padding: 50px;
    width: 800px;
    margin: 0 auto;
    background: #ffffff;
    border-radius: 15px;
  }
}
</style>
