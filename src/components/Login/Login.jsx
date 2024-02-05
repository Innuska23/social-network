import { useForm } from "react-hook-form";
import s from "./Login.module.css";

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <div>
        <input {...register("Login", { required: true })} placeholder="Login" />
        {errors.Login && <p className={s.loginError}>Login is required.</p>}
      </div>
      <div>
        <input
          {...register("Password", { required: true })}
          placeholder="Password"
        />
        {errors.Password && (
          <p className={s.loginError}>Password is required.</p>
        )}
      </div>
      <div>
        <input type="checkbox" />
        Remember me
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

export default Login;
