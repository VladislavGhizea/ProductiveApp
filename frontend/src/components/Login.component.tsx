import { FormEvent, useState } from "react";
import * as Yup from "yup";
interface LoginProps {
  className?: string;
}

const Login: React.FC<LoginProps> = ({ className }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });

  const schema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required.")
      .min(3, "Username must be at least 3 characters long.")
      .max(20, "Username must be at most 20 characters long.")
      .matches(
        /^[a-zA-Z0-9]*$/,
        "Username must contain only letters and numbers."
      ),
    password: Yup.string()
      .required("Password is required.")
      .min(8, "Password must be at least 8 characters long."),
  });
  //! imprevedibile da sistemare
  const validate = () => {
    try {
      schema.validateSync({ username, password });
      setErrors({ username: "", password: "" });
      return true;
    } catch (error: any) {
      setErrors((prevState) => ({
        ...prevState,
        [error.path as "username" | "password"]: error.message,
      }));
      return false;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    validate();
    console.log(errors);
  };

  return (
    <div className={className}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center"
      >
        <input
          type="text"
          placeholder="Username"
          className="m-2 p-2 border-2 border-gray-400 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {errors.username && (
          <p className="text-red-500 bg-red-100 p-2 rounded">
            {errors.username}
          </p>
        )}
        <input
          type="password"
          placeholder="Password"
          className="m-2 p-2 border-2 border-gray-400 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && (
          <p className="text-red-500 bg-red-100 p-2 rounded">
            {errors.password}
          </p>
        )}
        <div className="flex flex-row">
          <button
            type="submit"
            className="m-2 p-2 bg-custom-blue text-white rounded"
          >
            Log in
          </button>
          <button
            type="button"
            className="m-2 p-2 bg-custom-blue text-white rounded"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
