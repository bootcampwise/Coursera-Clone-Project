import React from "react";
import MainLayout from "../../../components/layout/MainLayout";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";
import { useRegister } from "./useRegister";

const Register: React.FC = () => {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
  } = useRegister();

  return (
    <MainLayout>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: 420 }}>
        <Input
          label="Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <Button type="submit">Register</Button>
      </form>
    </MainLayout>
  );
};

export default Register;
