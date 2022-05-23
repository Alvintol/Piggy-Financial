import React from 'react';
import "../sass/signup.scss";

export default function Signup(props) {

  return (
    <section className="vh-100 bg-image">
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card card-border">
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                  <form>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="signup-name"
                        className="form-control form-control-lg"
                      />
                      <label
                        className="form-label"
                        htmlFor="signup-name">Your Name</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="signup-email"
                        className="form-control form-control-lg" />
                      <label c
                        lassName="form-label"
                        htmlFor="signup-email">Your Email</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="signup-password"
                        className="form-control form-control-lg" />
                      <label
                        className="form-label"
                        htmlFor="signup-password">Password</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="signup-repeat"
                        className="form-control form-control-lg" />
                      <label
                        className="form-label"
                        htmlFor="signup-repeat">Repeat your password</label>
                    </div>

                    <div className="form-check d-flex justify-content-center mb-5">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        value=""
                        id="signup-terms" />
                      <label
                        className="form-check-label"
                        htmlFor="signup-terms">
                        I agree all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
                      </label>
                    </div>

                    <div className="d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                    </div>

                    <p className="text-center text-muted mt-5 mb-0">
                      Have already an account? <a onClick={() => props.transition('LOGIN')} href="#!"
                        className="fw-bold text-body"><u>Login here</u></a>
                    </p>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}