import React from "react";
import { AuthInput } from "./components/auth.input";
import { AuthButton } from "./components/auth.button";
import { AuthTitle } from "./components/auth.title";
import useAuth from "../hooks/useAuth";

export default function AuthComponent() {
  const { signin } = useAuth();
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await signin({ login, password });
    setLogin('');
    setPassword('');
  }

  const handleInputLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  }

  const handleInputPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }
  return (
    <form onSubmit={handleSubmit} noValidate autoComplete="off">
      <AuthTitle title={'Welcome back!'} />
      <AuthInput onChange={handleInputLogin} label={'login'} type={'text'} />
      <AuthInput onChange={handleInputPassword} label={'password'} type={'password'} />
      <AuthButton type="submit" text={'Sign In'} variant="contained" fullWidth />
    </form>
  );
}