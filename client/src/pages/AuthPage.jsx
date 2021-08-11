import React from "react";

function AuthPage() {
  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Link shortener</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
            <div>
              <div class="input-field">
                <input placeholder="Placeholder" id="first_name" type="text" />
                <label htmlFor="first_name">First Name</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button className="btn yellow darken-4" style={{ marginRight: 10 }}>
              Sign in
            </button>
            <button className="btn grey lighten-1 black-text">Sign up</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
