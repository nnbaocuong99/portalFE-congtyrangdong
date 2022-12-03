import { notification } from "antd";
import { AxiosError } from "axios";
import { AppUser } from "models/AppUser";
import React, { ChangeEvent, useCallback, useState } from "react";
import { setGlobal } from "reactn";
import authenticationService from "services/authentication-service";
import { getParameterByName } from "helpers/query";
import { LANDING_PAGE_ROUTE } from "config/route-consts";
import { GlobalState } from "config/global";
export default function useLogin(
  appUser: any,
  setAppUser: any,
  setErrorMessageUsername: any,
  setErrorMessagePass: any,
  setErrorMessageOtp: any,
  setErrorMessageEmail: any
): [
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  string,
  () => void,
  (event: any) => void,
  (event: any) => void,
  () => void,
  () => void,
  (event: any) => void,
  (event: any) => void,
  () => void,
  () => void,
  () => void,
  (field: string) => (ev: any) => void,
  (ev: React.KeyboardEvent<HTMLInputElement>) => void,
  string,
  string
] {
  const [loginVisible, setLoginVisible] = useState(true);
  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);
  const [getOtpVisible, setGetOtpVisible] = useState(false);
  const [changePassVisible, setChangePassVisible] = useState(false);
  const [email, setEmail] = useState<string>(null);
  const [otp, setOtp] = useState<string>(null);
  const [newPass, setNewPass] = useState<string>(null);
  const [confirmPass, setConfirmPass] = useState<string>(null);
  const [checkPass, setCheckPass] = useState<boolean>(false);

  const showForgotPassword = () => {
    setLoginVisible(false);
    setForgotPasswordVisible(true);
  };
  const showLogin = () => {
    setLoginVisible(true);
    setForgotPasswordVisible(false);
    setChangePassVisible(false);
    setGetOtpVisible(false);
    setOtp(null);
    setEmail(null);
    setNewPass(null);
    setConfirmPass(null);
    setErrorMessageUsername(null);
    setErrorMessagePass(null);
    setErrorMessageOtp(null);
    setErrorMessageEmail(null);
  };
  const handleLogin = useCallback(() => {
    authenticationService.login(appUser).subscribe(
      (user: AppUser) => {
        setGlobal<GlobalState>({
          user,
        });
        localStorage.setItem("currentUserInfo", JSON.stringify(user));
        const redirect =
          getParameterByName("redirect") === null
            ? LANDING_PAGE_ROUTE
            : getParameterByName("redirect");
        window.location.href = `${redirect}`;
      },
      (error) => {
        if (error.response && error.response.status === 400) {
          const { username, password } = error.response.data?.errors;
          if (typeof username !== "undefined")
            setErrorMessageUsername(username);
          if (typeof password !== "undefined") setErrorMessagePass(password);
        }
      }
    );
  }, [appUser, setErrorMessagePass, setErrorMessageUsername]);
  // handle change email
  const handleChangeEmail = useCallback((event) => {
    setEmail(event.target.value);
  }, []);

  // handle change otp
  const handleChangeOtp = useCallback(
    (event) => {
      setOtp(event);
      setErrorMessageOtp(null);
    },
    [setErrorMessageOtp]
  );

  // SendOtp

  const handleSendOtp = useCallback(() => {
    const obj = {
      email,
      otpCode: otp,
    };
    authenticationService.verifyOtpCode(obj).subscribe(
      () => {
        setGetOtpVisible(false);
        setChangePassVisible(true);
      },
      (error: AxiosError<AppUser>) => {
        if (error.response && error.response.status === 400) {
          const { otpCode } = error.response.data?.errors;
          if (typeof otpCode !== "undefined") setErrorMessageOtp(otpCode);
        }
        setChangePassVisible(false);
      }
    );
  }, [email, otp, setErrorMessageOtp]);

  // Send mail to get otp
  const handleSendMail = useCallback(() => {
    authenticationService.forgotPassword(email).subscribe(
      () => {
        setForgotPasswordVisible(false);
        setGetOtpVisible(true);
      },
      (error) => {
        if (error.response && error.response.status === 400) {
          setErrorMessageEmail(error.response.data?.errors?.email);
        }
      }
    );
  }, [email, setErrorMessageEmail]);

  // Get new pass word
  const handleChangeNewPass = useCallback((event) => {
    setNewPass(event.target.value);
    setCheckPass(false);
  }, []);

  const handleChangeConfirmPassword = useCallback(
    (event) => {
      const confirmPass: string = event.target.value;
      setConfirmPass(event.target.value);
      if (confirmPass === newPass) {
        setCheckPass(true);
      } else {
        setCheckPass(false);
      }
    },
    [newPass]
  );

  const handleChangePass = useCallback(() => {
    authenticationService
      .recoveryPassword(confirmPass)
      .pipe()
      .subscribe(() => {
        setLoginVisible(true);
        setChangePassVisible(false);
        setGetOtpVisible(false);
        notification.info({
          message: "Thay đổi mật khẩu thành công",
          // description: error.response.statusText,
          placement: "topRight",
        });
      });
  }, [confirmPass]);
  /* return handleChangePass, handleChangeNewPass, handleChangeConfirmPassword, handleChangeEmail, handleSendMail */

  const handleSetValue = useCallback(
    (field: string, value?: string | number | boolean | null) => {
      setAppUser({
        ...appUser,
        [field]: value,
        errors: undefined,
      });
      setErrorMessagePass(null);
      setErrorMessageUsername(null);
    },
    [appUser, setAppUser, setErrorMessagePass, setErrorMessageUsername]
  );

  const handleChangeField = useCallback(
    (field: string) => {
      return (ev: ChangeEvent<HTMLInputElement>) => {
        if (typeof ev === "object" && ev !== null) {
          if ("target" in ev) {
            return handleSetValue(field, ev.target.value);
          }
        }
      };
    },
    [handleSetValue]
  );
  const handleEnter = useCallback(
    (ev: React.KeyboardEvent<HTMLInputElement>) => {
      if (ev.key === "Enter") {
        handleLogin();
      }
    },
    [handleLogin]
  );
  return [
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
  ];
}
