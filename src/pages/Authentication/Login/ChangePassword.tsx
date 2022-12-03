import React, { ChangeEvent } from "react";
import FormItem from "antd/lib/form/FormItem";

export interface ChangePasswordProps {
  onChangeNewPass?: (ev: ChangeEvent<HTMLInputElement>) => void;
  onChangeConfirmPassword?: (ev: ChangeEvent<HTMLInputElement>) => void;
  onChangePass?: () => void;
  checkPass?: boolean;
  confirmPass?: string;
  showLogin?: () => void;
}
export default function ChangePassword({
  checkPass,
  onChangeNewPass,
  onChangeConfirmPassword,
  confirmPass,
  onChangePass,
}: ChangePasswordProps) {
  return (
    <div className="login-frame">
      <div className="login-frame_title ">Nhập lại mật khẩu</div>
      <div className="login-content">
        <div className="user-name mt-3">
          <FormItem>
            <div className="right-inner-addon input-container">
              <input
                type="password"
                className="ant-input ant-input-xs input-login"
                placeholder="Nhập mật khẩu"
                onChange={onChangeNewPass}
              />
            </div>
          </FormItem>
        </div>
        <div className="password mt-3">
          <FormItem>
            <div className="right-inner-addon input-container">
              <input
                type="password"
                className="ant-input ant-input-xs input-login"
                placeholder="Xác nhận mật khẩu mới"
                onChange={onChangeConfirmPassword}
              />
            </div>

            {!checkPass && confirmPass !== null && (
              <div className="login-error text-danger mt-2">
                Mật khẩu không trùng khớp
              </div>
            )}
          </FormItem>
        </div>
        <div className="action-login mt-4">
          <button
            className="btn btn-sm btn-login"
            onClick={onChangePass}
            disabled={!checkPass}
          >
            Xác nhận và đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
}
