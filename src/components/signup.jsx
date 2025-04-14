import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import Error from "./error";
import * as Yup from "yup";
import useFetch from "@/hooks/use-fetch";
import { login, signup } from "../db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/context";

const Signup = () => {
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic:null,
  });

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const handleInputChange = (e) => {
    const { name, value, files} = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files? files[0] : value,
    }));
  };

  const { data, error, loading, fn: fnSignup } = useFetch(signup, formData);
  const { fetchUser } = UrlState();

  useEffect(() => {
    if (error === null && data) {
      navigate(`/dashboard${longLink ? `?createNew=${longLink}` : ""}`);
      fetchUser();
    }
  },  [error, loading]);

  const handleSignup = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is Required"),
        password: Yup.string()
          .min(6, "Password must be atleast 6 characters")
          .required("Password is Required"),
        profile_pic: Yup.mixed().required("Profile pic is required")   
      });

      await schema.validate(formData, { abortEarly: false });
      //api call
      await fnSignup();
    } catch (e) {
      const newErrors = {};

      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-[#dcc284]">Signup</CardTitle>
          <CardDescription>Create a new SlimLink.io accountt</CardDescription>
          {error && <Error message={error.message} />}
        </CardHeader>

        <CardContent className="space-y-2">
          <div className="space-y-2">
            <Input
              name="name"
              type="text"
              placeholder="Enter Your Name"
              onChange={handleInputChange}
            />
            {errors.name && <Error message={errors.email} />}
          </div>

          <div className="space-y-2">
            <Input
              name="email"
              type="email"
              placeholder="Enter Your Email"
              onChange={handleInputChange}
            />
            {errors.email && <Error message={errors.email} />}
          </div>

          <div className="space-y-2">
            <Input
              name="password"
              type="password"
              placeholder="Enter Password"
              onChange={handleInputChange}
            />
            {errors.password && <Error message={errors.password} />}
          </div>

          <div className="space-y-2">
            <Input
              name="profile_pic"
              type="file"
              accept="image/*"
              onChange={handleInputChange}
            />
            {errors.profile_pic && <Error message={errors.password} />}
          </div>
        </CardContent>

        <CardFooter>
          <Button onClick={handleSignup} variant="destructive">
            {loading ? (
              <BeatLoader size={10} color="#e1ba60" />
            ) : (
              "Create Account"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
