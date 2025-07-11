import { useState } from "react";
import Alternate from "../components/Alternate";
import Button from "../components/Button";
import Head from "../components/Head";
import LabelInput from "../components/LabelInput";
import Quote from "../components/Quote";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [postInputs, setPostInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const validate = () => {
    const newErrors = { name: "", email: "", password: "" };
    let isValid = true;

    if (!postInputs.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (!postInputs.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    }
    if (!postInputs.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const sendRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signup`,
        postInputs
      );

      const jwt = response.data;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (err: any) {
      console.log("ERROR OCCURED :", err.message);
    }
  };

  return (
    <div className="h-screen grid sm:grid-cols-2">
      <form
        onSubmit={sendRequest}
        className="w-full flex flex-col justify-center items-center"
      >
        <div className="w-[300px] sm:w-[350px] flex flex-col gap-4">
          <Head text="Create your account now" />
          <div>
            <LabelInput
              required
              label="Name"
              placeholder="Enter your username"
              onChange={(e) =>
                setPostInputs((c) => ({ ...c, name: e.target.value }))
              }
              error={errors.name}
            />
            <LabelInput
              required
              label="Email"
              placeholder="Enter the email"
              onChange={(e) =>
                setPostInputs((c) => ({ ...c, email: e.target.value }))
              }
              error={errors.email}
            />
            <LabelInput
              required
              label="Password"
              placeholder="Enter the password"
              onChange={(e) =>
                setPostInputs((c) => ({ ...c, password: e.target.value }))
              }
              error={errors.password}
            />
          </div>
          <Alternate
            text="Already have an account?"
            alternate="signin"
            alternateText="Signin"
          />
          <div className="flex justify-center">
            <Button type="submit" text="Create account" onClick={sendRequest} />
          </div>
        </div>
      </form>

      <Quote
        text="The customer support I received was exceptional. The support team went above and beyond to address my concerns."
        author="Juliens Winfield"
      />
    </div>
  );
};

export default Signup;
