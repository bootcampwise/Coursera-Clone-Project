import React from 'react'
import MainLayout from '../../components/layout/MainLayout'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'

const Login: React.FC = () => {
  return (
    <MainLayout>
      <h1>Login</h1>
      <form style={{ maxWidth: 420 }}>
        <Input label="Email" type="email" name="email" />
        <Input label="Password" type="password" name="password" />
        <Button type="submit">Login</Button>
      </form>
    </MainLayout>
  )
}

export default Login

















































