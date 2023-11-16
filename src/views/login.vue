<template>
  <div class="form-container">
    <a-form
      :model="formState"
      name="normal_login"
      class="login-form"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <div class="login-tip">欢迎登录</div>
      <a-form-item
        label="Username"
        name="username"
        :rules="[{ required: true, message: 'Please input your username!' }]"
        :label-col="{ span: 7 }"
      >
        <a-input v-model:value="formState.username">
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item
        label="Password"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
        :label-col="{ span: 7 }"
      >
        <a-input-password v-model:value="formState.password">
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item>
        <a-form-item name="remember" no-style>
          <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
        </a-form-item>
        <a class="login-form-forgot" href="">Forgot password</a>
      </a-form-item>

      <a-form-item>
        <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button">
          Log in
        </a-button>
        Or
        <a href="">register now!</a>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import { computed, reactive } from 'vue'
import { router } from '@/router'
import { useAuth } from '@/stores/auth'
import { dynamicRoutes, routes } from '@/router/dynamic-routes'
import { useRoute } from 'vue-router'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
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
    token: 'xs'
  })
  const res = await dynamicRoutes()
  if (res) {
    const flag = routes.find((item: any) => {
      return item.path === route.query.redirect
    })
    const name = flag ? flag.name : routes[0].name
    await router.push({
      name: name
    })
  }
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

const disabled = computed(() => {
  return !(formState.username && formState.password)
})
</script>
<style lang="scss" scoped>
.form-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('https://picsum.photos/seed/picsum/1920/1080') no-repeat;
  background-size: 100% 100%;
}
.login-form {
  padding: 30px;
  background: #ffffff;
  border-radius: 15px;
}
.login-tip {
  text-align: center;
  font-size: 22px;
  margin-bottom: 30px;
}
.login-form-forgot {
  float: right;
}
.login-form-button {
  width: 100%;
}
</style>
