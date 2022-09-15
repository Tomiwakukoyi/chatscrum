import React from "react";
import "./Signup.css";
import content from "../../static";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";

const schema = yup.object().shape({
  fullname: yup.string().required("required").min(6),
  email: yup.string().required("please enter a valid email").max(100),
  password: yup
    .string()
    .required("please enter password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
});

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => console.log(data);

  return (
    <div className="Signup">
      <h1>Dont have an account?</h1>
      <h3>Sign up</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        {content.inputs.map((input, key) => {
          return (
            <div key={key}>
              <label htmlFor={input.name}>{input.label}</label>
              <br />
              <input
                type={input.type}
                name={input.name}
                {...register(input.name)}
              />
              <br />
              <span className="message">{errors[input.name]?.message}</span>
            </div>
          );
        })}

        <label htmlFor="options">User Type</label>
        <select id="options">
          <option value="Developer">Developer</option>
          <option value="Owner">Owner</option>
        </select>
        <button>Sign Up</button>
      </form>

      <p>
        Have an account? <Link to="/signin"> Sign In</Link>
      </p>
      <p>
        <Link to="/">Back to home</Link>
      </p>
    </div>
  );
};

export default Signup;
