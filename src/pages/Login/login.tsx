import { useSignIn, useIsAuthenticated } from "react-auth-kit";
import { useFormik } from "formik";
import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/modal";
import useModal from "../../hooks/useModal";
import GoogleButton from "react-google-button";

const Login = (props: any) => {
  const [error, setError] = useState("");
  const signIn = useSignIn();
  const navigate = useNavigate();
  const isAuth = useIsAuthenticated();
  const { isOpen, toggle } = useModal();
  useEffect(() => {
    if (isAuth()) {
      navigate("/", { replace: true });
    }
  }, [isAuth, navigate]);

  const onSubmit = async (values: any) => {
    setError("");
    if (!values.email || !values.password) {
      setError("이메일 혹은 비밀번호를 다시 확인해 주세요");
      toggle();
      return null;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/auth/login",
        values
      );
      signIn({
        token: response.data.tokens.accessToken,
        expiresIn: response.data.tokens.expiresIn,
        tokenType: "Bearer",
        authState: { email: values.email },
      });
      navigate("/");
    } catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.message);
      else if (err && err instanceof Error) setError(err.message);

      console.log("Error: ", err);
    }
  };

  const onClickGoogleSignIn = async () => {
    const googleAuthUrl = "http://localhost:4000/auth/google";
    const loginWindow = window.open(
      googleAuthUrl,
      "_blank",
      "width=500, height=600"
    );

    const handleMessage = (event: any) => {
      if (event.origin !== "http://localhost:4000") return;
      if (loginWindow) loginWindow.close();

      const { access_token, expires_in, token_type, email } = event.data;
      signIn({
        token: access_token,
        expiresIn: expires_in,
        tokenType: token_type,
        authState: { email },
      });
      window.removeEventListener("message", handleMessage);
    };
    window.addEventListener("message", handleMessage);
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
  });

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-gray-700">
          LOGO
        </h1>
        <Modal isOpen={isOpen} toggle={toggle}>
          {error}
        </Modal>
        <form onSubmit={formik.handleSubmit} className="mt-6">
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Email
            </label>
            <input
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder="Email"
              type="email"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Password
            </label>
            <input
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Password"
              type="password"
            />
          </div>
          <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:bg-gray-700">
              Login
            </button>
          </div>
        </form>
        <div className="mt-2 ">
          <p className="text-center text-gray-700">
            OR
            <hr />
            <GoogleButton
              type="light"
              onClick={onClickGoogleSignIn}
              className="mt-2"
            >
              Sign in with Google
            </GoogleButton>
          </p>
        </div>
        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Don't have an account?{" "}
          <a
            href="/signup"
            className="font-medium text-gray-900 hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
