import { useForm } from "react-hook-form";
import s from "./Login.module.css";
import { Input } from "../common/FormsControl/FormsControl";
import { connect } from "react-redux";
import { login } from "../../redux/auth-reducer";
import { Navigate } from "react-router-dom";

const Login = ({ login, isAuth, error }) => {
  return (
    <div>
      <h1>Login</h1>
      <LoginForm login={login} isAuth={isAuth} error={error} />
    </div>
  );
};

const LoginForm = ({ login, isAuth, error }) => {
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
  isAuth: state.auth.isAuth,
  error: state.auth.error,
});

export default connect(mapStateToProps, { login })(Login);
