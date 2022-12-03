import React, { ChangeEvent } from "react";
import Countdown from "react-countdown";
import OtpInput from "react-otp-input";

export interface GetOtpProps {
  onChangeOtp?: (ev: ChangeEvent<HTMLInputElement>) => void;
  onSendOtp?: () => void;
  onSendMail?: () => void;
  showLogin?: () => void;
  otp?: string;
  errorMessageOtp?: any;
}

export default function GetOtp({
  onChangeOtp,
  onSendMail,
  onSendOtp,
  showLogin,
  otp,
  errorMessageOtp,
}: GetOtpProps) {
  const [time, setTime] = React.useState(Date.now() + 120000);

  const Completionist = () => <>{time}</>;
  const handleReSendOtp = React.useCallback(() => {
    if (typeof onSendMail() === "function") onSendMail();
    setTime(Date.now() + 120000);
  }, [onSendMail]);

  return (
    <div className="login-frame">
      <div className="login-frame_title mb-4">Xác nhận OTP</div>
      <div className="mt-3 under-title">
        <span>Hãy nhập mã 6 ký tự mà chúng tôi vừa gửi tới Email của bạn</span>
      </div>
      <div className="otp mt-4">
        <OtpInput
          value={otp}
          onChange={onChangeOtp}
          numInputs={6}
          className="otp-input"
          separator={<div style={{ width: "16px" }}></div>}
        />
        {errorMessageOtp !== null && (
          <div className="login-error text-danger mt-3 p-2">
            {errorMessageOtp}
          </div>
        )}
      </div>
      <div className="row mt-3">
        <div className="col pointer">
          <span className="d-flex">
            Thời gian còn lại
            <div className="p-l--xxs">
              <Countdown date={time} onComplete={handleReSendOtp} key={time}>
                <Completionist />
              </Countdown>
            </div>
          </span>
        </div>
        <div className="forgot-password pointer">
          <span
            style={{
              color: "#F44174",
            }}
            onClick={handleReSendOtp}
          >
            Gửi lại OTP
          </span>
        </div>
      </div>
      <div className="action-login" style={{ marginTop: "1.5rem" }}>
        <button
          className="btn-login"
          onClick={onSendOtp}
          disabled={otp === null}
        >
          Tiếp tục
        </button>
      </div>
      <div className="forgot-password pointer mt-3">
        <span style={{ color: "#06A77D" }} onClick={showLogin}>
          Đăng nhập tài khoản khác
        </span>
      </div>
    </div>
  );
}
