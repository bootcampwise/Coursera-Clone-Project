import React from "react";
import MainLayout from "../../../components/layout/MainLayout";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";
import { useLogin } from "./useLogin";

const Login: React.FC = () => {
  const { email, setEmail, password, setPassword, handleSubmit } = useLogin();

  return (
    <MainLayout>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: 420 }}>
        <Input
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Login</Button>
      </form>
    </MainLayout>
  );
};

export default Login;
