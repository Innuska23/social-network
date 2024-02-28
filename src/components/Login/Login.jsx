import { useForm } from "react-hook-form";
import s from "./Login.module.css";
import { Input } from "../common/FormsControl/FormsControl";
import { connect } from "react-redux";
import { login } from "../../redux/auth-reducer";
import { Navigate } from "react-router-dom";

const Login = ({ login, isAuth, error, captchaUrl }) => {
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

const LoginForm = ({ login, isAuth, error, captchaUrl }) => {
  console.log("🚀 ~ LoginForm ~ isAuth:", isAuth);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password, data.rememberMe);
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
        <Input {...register("email", { required: true })} placeholder="Email" />
        {errors.email && <p className={s.loginError}>Email is required.</p>}
      </div>
      <div>
        <Input
          {...register("password", { required: true })}
          placeholder="Password"
          type="password"
        />
        {captchaUrl && <img src={captchaUrl} alt="captcha" />}
        {captchaUrl && (
          <Input
            {...register("captcha", { required: true })}
            placeholder="Symbols from images"
          />
        )}
        {errors.password && (
          <p className={s.loginError}>Password is required.</p>
        )}
      </div>
      <div>
        <input type="checkbox" {...register("rememberMe")} />
        Remember me
      </div>
      <div>
        <button type="submit" disabled={!isValid}>
          Login
        </button>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => ({
  captchaUrl: state.auth.captchaUrl,
  isAuth: state.auth.isAuth,
  error: state.auth.error,
});

export default connect(mapStateToProps, { login })(Login);
