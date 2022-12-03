import FormItem from "antd/lib/form/FormItem";
import React, { ChangeEvent } from "react";
import "./Login.scss";

export interface ForgotPasswordProps {
  onChangeEmail?: (event: ChangeEvent<HTMLInputElement>) => void;
  onSendMail?: () => void;
  showLogin?: () => void;
  errorMessageEmail?: string;
  email?: string;
}

export default function ForgotPassword({
  onChangeEmail,
  onSendMail,
  showLogin,
  errorMessageEmail,
  email,
}: ForgotPasswordProps) {
  return (
    <div className="login-frame">
      <div className="login-frame_title ">Lấy lại mật khẩu!</div>
      <div className="mt-3 under-title">
        <span>
          Vui lòng nhập email của bạn để nhận hướng dẫn lấy lại mật khẩu
        </span>
      </div>
      <div className="email mt-3">
        <FormItem>
          <div className="right-inner-addon input-container">
            <input
              type="text"
              className="ant-input ant-input-xs input-login"
              placeholder="Email"
              onChange={onChangeEmail}
            />
          </div>
          {errorMessageEmail !== null && (
            <div className="login-error text-danger mt-2">
              {errorMessageEmail}
            </div>
          )}
        </FormItem>
      </div>
      <div className="row mt-3">
        <div className="col pointer forgot-password" onClick={showLogin}>
          <i className="tio-arrow_backward mr-2"></i>
          <span>Quay lại</span>
        </div>
        <div className="col forgot-pass d-flex justify-content-end">
          <button
            className="btn btn-sm btn-send-otp "
            disabled={!email || email === ""}
            onClick={onSendMail}
          >
            Gửi OTP
          </button>
        </div>
      </div>
    </div>
  );
}
