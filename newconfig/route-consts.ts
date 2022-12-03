import { join } from "path";

export const ROOT_ROUTE: string = process.env.PUBLIC_URL;
export const LOGIN_ROUTE: string = "/login";
export const LOGOUT_ROUTE: string = ROOT_ROUTE
  ? ROOT_ROUTE + "/logout"
  : "/logout";
export const FORBIDENT_ROUTE: string = "/403";
export const NOT_FOUND_ROUTE: string = "/404";
export const LANDING_PAGE_ROUTE: string = "/landing-page";

export const TYPOGRAPHY_PAGE_ROUTE: string = ROOT_ROUTE
  ? join(ROOT_ROUTE + "/typography")
  : "/typography";
export const COLOR_PAGE_ROUTE: string = ROOT_ROUTE
  ? join(ROOT_ROUTE + "/color")
  : "/color";
export const SIDE_BAR_PAGE_ROUTE: string = ROOT_ROUTE
  ? join(ROOT_ROUTE + "/side-bar")
  : "/side-bar";

export const THEME_ROUTE: string = ROOT_ROUTE
  ? ROOT_ROUTE + "/theme"
  : "/theme";
export const THEME_MASTER_ROUTE: string = join(THEME_ROUTE, "theme-master");
export const APP_USER_ROUTE: string = ROOT_ROUTE
  ? ROOT_ROUTE + "/app-user"
  : "/app-user";
export const APP_USER_MASTER_ROUTE: string = join(
  APP_USER_ROUTE,
  "app-user-master"
);
export const APP_USER_DETAIL_ROUTE: string = join(
  APP_USER_ROUTE,
  "app-user-detail"
);

export const ORGANIZATION_ROUTE: string = ROOT_ROUTE
  ? ROOT_ROUTE + "/organization"
  : "/organization";
export const ORGANIZATION_MASTER_ROUTE: string = join(
  ORGANIZATION_ROUTE,
  "organization-master"
);
export const ORGANIZATION_DETAIL_ROUTE: string = join(
  ORGANIZATION_ROUTE,
  "organization-detail"
);

export const ROLE_ROUTE: string = ROOT_ROUTE ? ROOT_ROUTE + "/role" : "/role";
export const ROLE_MASTER_ROUTE: string = join(ROLE_ROUTE, "role-master");
export const ROLE_DETAIL_ROUTE: string = join(ROLE_ROUTE, "role-detail");

export const SITE_ROUTE: string = ROOT_ROUTE ? ROOT_ROUTE + "/site" : "/site";
export const SITE_MASTER_ROUTE: string = join(SITE_ROUTE, "site-master");
export const PERMISSION_ROUTE: string = ROOT_ROUTE
  ? ROOT_ROUTE + "/permission"
  : "/permission";
export const PERMISSION_MASTER_ROUTE: string = join(
  PERMISSION_ROUTE,
  "permission-master"
);
export const USER_NOTIFICATION_ROUTE: string = "/portal/user-notification";

export const DISTRICT_ROUTE: string = ROOT_ROUTE
  ? ROOT_ROUTE + "/district"
  : "/district";
export const DISTRICT_MASTER_ROUTE: string = join(
  DISTRICT_ROUTE,
  "district-master"
);

export const PROVINCE_ROUTE: string = ROOT_ROUTE
  ? ROOT_ROUTE + "/province"
  : "/province";
export const PROVINCE_MASTER_ROUTE: string = join(
  PROVINCE_ROUTE,
  "province-master"
);

export const WARD_ROUTE: string = ROOT_ROUTE ? ROOT_ROUTE + "/ward" : "/ward";
export const WARD_MASTER_ROUTE: string = join(WARD_ROUTE, "ward-master");
export const NATION_ROUTE: string = ROOT_ROUTE
  ? ROOT_ROUTE + "/nation"
  : "/nation";
export const NATION_MASTER_ROUTE: string = join(NATION_ROUTE, "nation-master");
