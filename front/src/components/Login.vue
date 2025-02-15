<template>
    <div class="login-container">
      <el-card class="login-card">
        <template #header>
          <div class="card-header">用户登录</div>
        </template>
        <el-form :model="form"  ref="formRef" label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input 
              v-model="form.password" 
              type="password" 
              placeholder="请输入密码" 
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleLogin">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </template>
  
  <script setup>
  import { reactive, ref } from 'vue';
import axios from "axios"
 
  import { useRouter } from 'vue-router';
  import { ElMessage } from 'element-plus';
  
  const form = reactive({
    username: '',
    password: ''
  });
  
 
  const formRef = ref(null);
  const router = useRouter();
  
// 登录逻辑
const handleLogin = async () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        const response = await axios.post('/api/login', form);

        if (response.data.success) {
          ElMessage.success('登录成功');
          router.push('/');
        } else {
          ElMessage.error('用户名或密码错误');
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          ElMessage.error('用户名或密码错误');
        } else {
          ElMessage.error('登录失败，请稍后再试');
        }
      }
    } else {
      ElMessage.error('请检查输入信息');
    }
  });
};


  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f2f5;
  }
  
  .login-card {
    width: 400px;
  }
  
  .card-header {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
  }
  </style>