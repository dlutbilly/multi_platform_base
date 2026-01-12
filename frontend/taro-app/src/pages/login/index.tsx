import { View, Input, Button } from '@tarojs/components'
import { useState } from 'react'
import './index.scss'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    console.log('Login:', { username, password })
  }

  return (
    <View className="login-page">
      <View className="login-card">
        <View className="logo">🚀</View>
        <View className="title">Welcome Back</View>
        <View className="subtitle">Login to continue</View>
        
        <View className="form">
          <View className="form-item">
            <Input
              className="input"
              placeholder="Email or Phone"
              value={username}
              onInput={(e) => setUsername(e.detail.value)}
            />
          </View>
          
          <View className="form-item">
            <Input
              className="input"
              placeholder="Password"
              password
              value={password}
              onInput={(e) => setPassword(e.detail.value)}
            />
          </View>
          
          <Button className="login-btn" onClick={handleLogin}>
            Login
          </Button>
          
          <View className="social-login">
            <View className="divider-text">Or login with</View>
            <View className="social-icons">
              <View className="social-icon">WeChat</View>
              <View className="social-icon">QQ</View>
              <View className="social-icon">GitHub</View>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Login
