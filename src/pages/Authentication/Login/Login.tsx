import { Checkbox } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { AppUser } from "models/AppUser";
import React, { useState } from "react";
import nameof from "ts-nameof.macro";
import "./Login.scss";
import useLogin from "./LoginService";
import ChangePassword from "./ChangePassword";
import ForgotPassword from "./ForgotPassword";
import GetOtp from "./GetOtp";

function Login() {
  const [appUser, setAppUser] = useState<AppUser>({
    ...new AppUser(),
    username: "",
    password: "",
  });
  const [errorMessageUsername, setErrorMessageUsername] =
    useState<string>(null);
  const [errorMessagePass, setErrorMessagePass] = useState<string>(null);
  const [errorMessageOtp, setErrorMessageOtp] = useState<string>(null);
  const [errorMessageEmail, setErrorMessageEmail] =
    React.useState<string>(null);

  const [
    loginVisible,
    forgotPasswordVisible,
    getOtpVisible,
    changePassVisible,
    checkPass,
    confirmPass,
    showForgotPassword,
    handleChangeEmail,
    handleChangeOtp,
    handleSendOtp,
    handleSendMail,
    handleChangeNewPass,
    handleChangeConfirmPassword,
    handleChangePass,
    showLogin,
    handleLogin,
    handleChangeField,
    handleEnter,
    otp,
    email,
  ] = useLogin(
    appUser,
    setAppUser,
    setErrorMessageUsername,
    setErrorMessagePass,
    setErrorMessageOtp,
    setErrorMessageEmail
  );

  return (
    <>
      <div className="login-page">
        <div className="main-content d-flex justify-content-between">
          <div className="main-content-img">
            <img
              alt=""
              className="login-label"
              src={require("assets/images/label.png")}
            />
          </div>

          <div className="main-content-form">
            {loginVisible === true && (
              <div className="login-frame">
                <div className="login-frame_title mb-4">
                  Đăng nhập để bắt đầu
                </div>
                <div className="login-content">
                  <div className="user-name">
                    <FormItem>
                      <div className="right-inner-addon input-container">
                        <input
                          type="text"
                          value={appUser.username}
                          className="ant-input ant-input-sm input-login"
                          style={{ marginBottom: "1rem" }}
                          placeholder="Nhập Tài khoản/ Email"
                          onChange={handleChangeField(nameof(appUser.username))}
                          onKeyDown={handleEnter}
                          autoComplete={"on"}
                        />
                      </div>
                      {errorMessageUsername !== null && (
                        <div className="login-error text-danger mt-2">
                          {errorMessageUsername}
                        </div>
                      )}
                    </FormItem>
                  </div>
                  <div className="password" style={{ marginTop: "1.5rem" }}>
                    <FormItem>
                      <div className="right-inner-addon input-container">
                        <input
                          type="password"
                          value={appUser.password}
                          className="ant-input ant-input-sm input-login"
                          style={{ marginBottom: "1rem" }}
                          placeholder="Mật khẩu"
                          onChange={handleChangeField(nameof(appUser.password))}
                          onKeyDown={handleEnter}
                        />
                        {errorMessagePass !== null && (
                          <div className="login-error text-danger mt-2">
                            {errorMessagePass}
                          </div>
                        )}
                      </div>
                    </FormItem>
                  </div>
                  <div className="password-container pt-24">
                    <div className="remember-password pointer">
                      <Checkbox>
                        <span className="remember-password_label">
                          Nhớ mật khẩu
                        </span>
                      </Checkbox>
                    </div>
                    <div className="forgot-password pointer">
                      <span onClick={() => showForgotPassword()}>
                        Quên mật khẩu
                      </span>
                    </div>
                  </div>
                  <div className="action-login" style={{ marginTop: "1.5rem" }}>
                    <button
                      className="btn-login"
                      onClick={handleLogin}
                      disabled={
                        errorMessagePass !== null ||
                        errorMessageUsername !== null
                      }
                    >
                      Đăng nhập
                    </button>
                  </div>
                </div>
              </div>
            )}
            {forgotPasswordVisible && (
              <ForgotPassword
                onChangeEmail={handleChangeEmail}
                onSendMail={handleSendMail}
                showLogin={showLogin}
                errorMessageEmail={errorMessageEmail}
                email={email}
              />
            )}

            {getOtpVisible && (
              <GetOtp
                onChangeOtp={handleChangeOtp}
                onSendMail={handleSendMail}
                onSendOtp={handleSendOtp}
                otp={otp}
                showLogin={showLogin}
                errorMessageOtp={errorMessageOtp}
              />
            )}
            {changePassVisible && (
              <ChangePassword
                onChangeNewPass={handleChangeNewPass}
                onChangeConfirmPassword={handleChangeConfirmPassword}
                onChangePass={handleChangePass}
                checkPass={checkPass}
                confirmPass={confirmPass}
                showLogin={showLogin}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
