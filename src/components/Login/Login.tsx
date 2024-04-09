import React from "react";
import { useController, useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

import { Input } from "../common/FormsControl/FormsControl";

import { login } from "../../redux/auth-reducer";
import { AppStateType } from "../../redux/redux-store";

import s from "./Login.module.css";

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = ({ login, isAuth, error, captchaUrl }) => {
  return (
    <div>
      <h1>Login</h1>
      <LoginForm
        login={login}
        isAuth={isAuth}
        error={error}
        captchaUrl={captchaUrl}
      />
    </div>
  );
};

const LoginForm: React.FC<MapStatePropsType & MapDispatchPropsType> = ({ login, isAuth, error, captchaUrl }) => {
  const { control, handleSubmit, register, formState: { errors, isValid } } = useForm();

  const {
    field: emailField,
  } = useController({
    control,
    name: "email",
    rules: { required: true },
  });

  const {
    field: passwordField,
  } = useController({
    control,
    name: "password",
    rules: { required: true },
  });

  const {
    field: captchaField,
  } = useController({
    control,
    name: "captcha",
    rules: { required: captchaUrl !== null },
  });

  const onSubmit = async (data: any) => {
    try {
      await login(data.email, data.password, data.rememberMe, data.captcha || undefined);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  if (isAuth) {
    return <Navigate to={"/profile"} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <p className={s.loginError}>{error}</p>}
      <div>
        <Input {...emailField} placeholder="Email" />
        {errors.email && <p className={s.loginError}>Email is required.</p>}
      </div>
      <div>
        <Input {...passwordField} placeholder="Password" type="password" />
        {captchaUrl && <img src={captchaUrl} alt="captcha" />}
        {captchaUrl && <Input {...captchaField} placeholder="Symbols from images" />}
        {errors.password && <p className={s.loginError}>Password is required.</p>}
      </div>
      <div>
        <input type="checkbox" {...register("rememberMe")} /> Remember me
      </div>
      <div>
        <button type="submit" disabled={!isValid}>
          Login
        </button>
      </div>
    </form>
  );
};

type MapStatePropsType = {
  captchaUrl: string | null
  isAuth: boolean
  error: string | null
}

type MapDispatchPropsType = {
  login: (email: string, password: string, rememberMe: boolean, captcha: null | undefined) => void
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  captchaUrl: state.auth.captchaUrl,
  isAuth: state.auth.isAuth,
  error: state.auth.error,
});

export default connect(mapStateToProps, { login })(Login);
