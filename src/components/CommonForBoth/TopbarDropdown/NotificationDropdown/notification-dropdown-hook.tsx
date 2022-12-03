import { DEFAULT_TAKE } from "config/consts";

import { AppUser, AppUserFilter } from "models/AppUser";
import path from "path";
import React, { useEffect } from "react";
import authenticationService from "services/authentication-service";
import notification from "antd/lib/notification";
import { Model } from "react3l-common";
import { userNotificationRepository } from "repositories/user-notification-repository";
import {
  APP_USER_DETAIL_ROUTE,
  APP_USER_MASTER_ROUTE,
  USER_NOTIFICATION_ROUTE,
} from "config/route-consts";
import { SignalRService } from "services/signalr-service";
import { useHistory } from "react-router";
import useApp from "app/appHook";
import { Notification24 } from "@carbon/icons-react";

export class Site extends Model {
  public id?: number;
  public code?: string;
  public name?: string;
  public icon?: string;
}

export class AppUserSiteMapping extends Model {
  public appUserId?: number;
  public siteId?: number;
  public enabled?: boolean;
  public site?: Site;
}

export function useNotificationDropdown(service: any, channel: any) {
  const history = useHistory();
  const { state } = useApp();

  const [notificationFilter, setNotificationFilter] =
    React.useState<AppUserFilter>(new AppUserFilter());

  const [notificationDropDown, setNotificationDropDown] = React.useState(false);

  const [notifications, setNotifications] = React.useState<AppUser[]>([]);

  const [fetchNotification, setFetchNotification] =
    React.useState<boolean>(false);

  const [loadingNotification, setLoadingNotification] =
    React.useState<boolean>(false);

  const [hasMore, setHasMore] = React.useState<boolean>(true);

  const [total, setTotal] = React.useState<number>(0);

  const [profileDrop, setProfileDrop] = React.useState(false);
  const [subcribe, setSubcribe] = React.useState<boolean>(true);
  const [unreadNotification, setUnreadNotification] = React.useState<number>(0);
  const notificationConfig = (data: any) => {
    return notification.success({
      message: (
        <div
          className="content-noti-ellipsis"
          dangerouslySetInnerHTML={{
            __html: data.titleWeb,
          }}
        ></div>
      ),

      description: (
        <div
          className="content-noti-ellipsis"
          dangerouslySetInnerHTML={{
            __html: data.contentWeb,
          }}
        ></div>
      ),
      icon: <Notification24 />,
      onClick: async () => {
        await userNotificationRepository.read(data.id);
        setTimeout(() => {
          window.location.href = data.linkWebsite
            ? buildAbsoluteLink(data.linkWebsite)
            : "#";
        }, 0);
      },
    });
  };

  useEffect(() => {
    const cancelled = false;
    if (fetchNotification) {
      const fetchData = async () => {
        await setLoadingNotification(true);

        await userNotificationRepository
          .list(notificationFilter)
          .subscribe((res: any) => {
            if (!cancelled) {
              setNotifications([...res]);
            }
          });

        await userNotificationRepository
          .count(notificationFilter)
          .subscribe((res: any) => {
            if (!cancelled) {
              setTotal(res);
            }
          });

        await setFetchNotification(false);
        await setLoadingNotification(false);
      };
      fetchData();
    }
  }, [fetchNotification, notificationFilter, total]);

  const fetchUnreadNotification = React.useCallback(async () => {
    try {
      await userNotificationRepository
        .countUnread(notificationFilter)
        .subscribe((res: any) => {
          setUnreadNotification(res);
        });
    } catch (ex) {
      // eslint-disable-next-line no-console
      console.log(`ex:`, ex);
    }
  }, [notificationFilter]);

  const fetchReadNotification = React.useCallback(async (id) => {
    try {
      await userNotificationRepository.read(id).subscribe((_res: any) => {
        // eslint-disable-next-line no-console
        // console.log(`readNotiId:`, id);
      });
    } catch (ex) {
      // eslint-disable-next-line no-console
      console.log(`ex:`, ex);
    }
  }, []);

  const subcribeChannel = React.useCallback(
    (signalRService: SignalRService, channel: string) => {
      return signalRService.registerChannel(channel, (data: any) => {
        // eslint-disable-next-line no-console
        console.log(`data`, data);
        fetchUnreadNotification();
        // fire toast to notice new notification
        notificationConfig(data);
      });
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  useEffect(() => {
    fetchUnreadNotification();
  }, [fetchUnreadNotification]);

  useEffect(() => {
    if (subcribe) {
      subcribeChannel(service, channel);
      setSubcribe(false);
    }
  }, [channel, service, subcribe, subcribeChannel]);
  const handleLogout = React.useCallback(() => {
    authenticationService.logout();
  }, []);
  const handleClickToNotification = React.useCallback(() => {
    history.push(USER_NOTIFICATION_ROUTE);
  }, [history]);
  const handleClickToProfile = React.useCallback(() => {
    window.location.href = `${APP_USER_DETAIL_ROUTE}?id=${state?.user?.id}`;
  }, [state?.user?.id]);
  const handleClickToChangePassword = React.useCallback(() => {
    window.location.href = `${APP_USER_MASTER_ROUTE}?idChangePassword=${state?.user?.id}`;
  }, [state?.user?.id]);

  /* handleToggerNotification */
  const handleToggleNotification = React.useCallback(() => {
    /* if notification is closing, set fetch data = true */
    if (!notificationDropDown) {
      setNotificationFilter({
        ...notificationFilter,
        skip: 0,
        take: DEFAULT_TAKE,
      });
      setHasMore(true);
      setFetchNotification(true);
    }
    // setNotifications([]);
    setNotificationDropDown(!notificationDropDown);
  }, [notificationDropDown, notificationFilter]);

  /* handleInfiniteOnLoad */
  const handleInfiniteOnLoad = React.useCallback(() => {
    if (notificationFilter.skip + 10 >= total) {
      setLoadingNotification(false);
      setHasMore(false);
      return;
    }
    /* fetch notification with effect */
    const fetch = async () => {
      await setLoadingNotification(true);
      await userNotificationRepository
        .list({
          ...notificationFilter,
          skip: notificationFilter.skip + 10,
        })
        .subscribe((res: any) => {
          setNotifications([...notifications, ...res]);
        });
      await setNotificationFilter({
        ...notificationFilter,
        skip: notificationFilter.skip + 10,
      });
      await setLoadingNotification(false);
    };
    fetch();
  }, [total, notificationFilter, notifications]);

  const handleToggerProfile = React.useCallback(() => {
    setProfileDrop(!profileDrop);
  }, [profileDrop]);

  const handleMouseLeaveAll = React.useCallback(() => {
    setNotificationDropDown(false);
    setProfileDrop(false);
  }, []);
  const handleReadNotification = React.useCallback(
    (id: number, url: string) => {
      return async () => {
        // ev.preventDefault();
        await fetchReadNotification(id);
        await fetchUnreadNotification();
        window.location.href = url;
      };
    },
    [fetchReadNotification, fetchUnreadNotification]
  );

  function buildAbsoluteLink(url: string | null | undefined | number) {
    if (url === null || typeof url === "undefined") {
      return "#";
    }
    return path.join("/", url.toString());
  }

  return {
    state,
    handleLogout,
    handleClickToNotification,
    handleToggleNotification,
    handleClickToChangePassword,
    notificationDropDown,
    notifications,
    hasMore,
    total,
    loadingNotification,
    handleInfiniteOnLoad,
    handleToggerProfile,
    profileDrop,
    handleMouseLeaveAll,
    handleReadNotification,
    buildAbsoluteLink,
    unreadNotification,
    handleClickToProfile,
  };
}
