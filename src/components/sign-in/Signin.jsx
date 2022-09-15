import React from "react";
import "./Signin.css";
import signInContent from "../../static/index2";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
  projectname: yup.string().required("required").min(4),
});

const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => console.log("Signin succesful", data);

  return (
    <div className="Signin">
      <h1>Have an account already</h1>
      <h3>Sign In</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        {signInContent.inputs.map((input, key) => {
          return (
            <div key={key}>
              <label htmlFor="{input.name}">{input.label}</label>
              <br />
              <input
                type={input.type}
                name={input.name}
                {...register(input.name)}
              />
              <span className="message">{errors[input.name]?.message}</span>
            </div>
          );
        })}

        <Link to="/scrumboard">
          <button>Sign In</button>
        </Link>
      </form>
      <p>
        Dont have an account? <Link to="/signup"> Sign Up</Link>
      </p>
      <p>
        <Link to="/">Back to home</Link>
      </p>
    </div>
  );
};

export default Signin;
