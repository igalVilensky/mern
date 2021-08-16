import React, { useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

function AuthPage() {
  const message = useMessage();
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      console.log("Data", data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Link shortener</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
            <div>
              <div class="input-field">
                <input
                  placeholder="Enter your email"
                  id="email"
                  type="text"
                  name="email"
                  className="yellow-input"
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div class="input-field">
                <input
                  placeholder="Enter your password"
                  id="password"
                  type="password"
                  name="password"
                  className="yellow-input"
                  onChange={changeHandler}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              disabled={loading}
              className="btn yellow darken-4"
              style={{ marginRight: 10 }}
            >
              Sign in
            </button>
            <button
              onClick={registerHandler}
              disabled={loading}
              className="btn grey lighten-1 black-text"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
