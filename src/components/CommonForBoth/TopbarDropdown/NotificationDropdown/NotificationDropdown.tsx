import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import { useNotificationDropdown } from "./notification-dropdown-hook";
import { SignalRContext } from "app/AppContext";
//i18n
import { useTranslation, withTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import { formatDateTime } from "helpers/date-time";
import classNames from "classnames";
import "./NotificationDropdown.scss";

export const SIGNALR_CHANNEL: string = "Receive";

const NotificationDropdown = (props: any) => {
  const [translate] = useTranslation();

  const signalRContext = useContext(SignalRContext);
  const {
    handleToggleNotification,
    notificationDropDown,
    notifications,
    hasMore,
    total,
    loadingNotification,
    handleClickToNotification,
    handleInfiniteOnLoad,
    handleMouseLeaveAll,
    handleReadNotification,
    buildAbsoluteLink,
    unreadNotification,
  } = useNotificationDropdown(signalRContext, SIGNALR_CHANNEL);

  return (
    <React.Fragment>
      <Dropdown
        isOpen={notificationDropDown}
        toggle={handleToggleNotification}
        className="dropdown d-inline-block"
        tag="li"
      >
        <DropdownToggle
          className="btn header-item noti-icon "
          tag="button"
          id="page-header-notifications-dropdown"
          onClick={handleToggleNotification}
        >
          <i className="bx bx-bell bx-tada" />
          <span className="badge bg-danger rounded-pill">
            {unreadNotification}
          </span>
        </DropdownToggle>

        <DropdownMenu className="dropdown-menu notification-dropdown-menu">
          <div
            className={`notification-dropdown on-click-show-div ${
              notificationDropDown ? "active" : ""
            }`}
            onMouseLeave={handleMouseLeaveAll}
          >
            <>
              <div className="notification-header-title p-l--xs">
                {translate("general.notification.title")}
              </div>
              <hr />
              <div className="notifications-content">
                <InfiniteScroll
                  dataLength={notifications.length}
                  next={handleInfiniteOnLoad}
                  hasMore={true}
                  height={500}
                  loader={loadingNotification && notifications.length > 5}
                >
                  {
                    <div className="notifications d-flex flex-column align-item-center">
                      {notifications &&
                        notifications?.length > 0 &&
                        notifications?.map((notification, index) => (
                          <div
                            key={index}
                            onClick={handleReadNotification(
                              notification.id,
                              notification.linkWebsite
                                ? `${buildAbsoluteLink(
                                    notification.linkWebsite
                                  )}`
                                : "#"
                            )}
                          >
                            <div className="box-notification-wrapper p-l--xs p-r--xs">
                              <div
                                className={classNames(
                                  "box-notification p-l--md p-t--xs p-r--md m-b--xxxs align-items-center",
                                  {
                                    "unread-noti": notification.unread === true,
                                  }
                                )}
                              >
                                <div className="box-notification-header justify-content-between d-flex m-b--xxxs">
                                  <div className="box-notification-header-left d-flex">
                                    <div className="box-notification-icon-wrapper">
                                      <svg
                                        width="15"
                                        height="15"
                                        viewBox="0 0 15 15"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <g clipPath="url(#clip0_5569_24364)">
                                          <path
                                            d="M9.34108 12.5818C9.34108 13.8873 8.28279 14.9455 6.97737 14.9455C5.67195 14.9455 4.61377 13.8873 4.61377 12.5818C4.61377 11.2764 5.67195 10.2181 6.97737 10.2181C8.28279 10.2181 9.34108 11.2764 9.34108 12.5818Z"
                                            fill="#22215B"
                                          />
                                          <path
                                            d="M11.1185 7.80791C9.11531 7.52183 7.5684 5.79931 7.5684 3.71822C7.5684 3.12723 7.69477 2.56655 7.91874 2.05769C7.61622 1.98682 7.3019 1.94549 6.97741 1.94549C4.69659 1.94549 2.84109 3.80088 2.84109 6.08182V7.72925C2.84109 8.89866 2.32877 10.0025 1.42996 10.7624C1.20015 10.9585 1.06836 11.2452 1.06836 11.5477C1.06836 12.118 1.53221 12.5819 2.10241 12.5819H11.8524C12.4227 12.5819 12.8866 12.118 12.8866 11.5477C12.8866 11.2452 12.7548 10.9585 12.519 10.7571C11.6468 10.0191 11.141 8.94768 11.1185 7.80791Z"
                                            fill="#22215B"
                                          />
                                          <path
                                            d="M14.6593 3.71822C14.6593 5.34996 13.3364 6.67269 11.7047 6.67269C10.073 6.67269 8.75012 5.34996 8.75012 3.71822C8.75012 2.08647 10.073 0.763634 11.7047 0.763634C13.3364 0.763634 14.6593 2.08647 14.6593 3.71822Z"
                                            fill="#4CE364"
                                          />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_5569_24364">
                                            <rect
                                              width="14.1818"
                                              height="14.1818"
                                              fill="white"
                                              transform="translate(0.763672 0.763634)"
                                            />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    </div>
                                    <div className="box-notification-text m-l--xs">
                                      <div className="box-notification-text-first-row">
                                        {notification?.titleWeb}
                                      </div>
                                      <div className="box-notification-text-second-row">
                                        {formatDateTime(notification?.time)}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="box-notification-status-wrapper">
                                    {notification?.unread ? (
                                      <div className="box-notification-status"></div>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                </div>
                                <div className="box-notification-content p-b--xs text-truncate--3">
                                  {notification?.contentWeb}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      {!hasMore && (
                        <div
                          className="d-flex justify-content-center p-2"
                          style={{ background: "#e8e8e8", fontSize: 12 }}
                        >
                          {translate("general.notification.listAllLeft")}
                          <b>&nbsp;{total}&nbsp;</b>
                          {translate("general.notification.listAllRight")}
                        </div>
                      )}
                    </div>
                  }
                </InfiniteScroll>
              </div>
            </>
            <div className="p-2 border-top d-grid">
              {!notifications?.length &&
                !loadingNotification &&
                notificationDropDown && (
                  <div className="d-flex justify-content-center">
                    <div className="no-data-item">
                      {translate("general.notification.noData")}
                    </div>
                  </div>
                )}
              {notificationDropDown && (
                <div className="notification-viewAll text-center">
                  <div onClick={handleClickToNotification}>
                    {translate("general.notification.viewAll")}
                  </div>
                </div>
              )}
            </div>
          </div>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default withTranslation()(NotificationDropdown);

NotificationDropdown.propTypes = {
  t: PropTypes.any,
};
