import { translate } from "i18n/i18n";
import { TFunction } from "i18next";
import { ReactNode } from "react";
import {
  APP_USER_MASTER_ROUTE,
  COLOR_PAGE_ROUTE, DISTRICT_MASTER_ROUTE, NATION_MASTER_ROUTE, ORGANIZATION_MASTER_ROUTE, PROVINCE_MASTER_ROUTE, ROLE_MASTER_ROUTE, SIDE_BAR_PAGE_ROUTE, TYPOGRAPHY_PAGE_ROUTE, WARD_MASTER_ROUTE
} from "./route-consts";

export interface Menu {
  name?: string | TFunction;
  icon?: string | ReactNode;
  link: string;
  children?: Menu[];
  active?: boolean;
  show?: boolean;
  checkVisible?: (mapper: Record<string, number>) => boolean;
}

export const menu: Menu[] = [
  {
    name: translate("menu.title.dashboard"),
    icon: "bx-home",
    link: "/dashboard",
    show: true,
    active: false,
    children: [
      {
        name: translate("menu.title.typography"),
        icon: "bx-pen",
        link: TYPOGRAPHY_PAGE_ROUTE,
        active: false,
        show: true,
      },
      {
        name: translate("menu.title.color"),
        icon: "bx-paint",
        link: COLOR_PAGE_ROUTE,
        active: false,
        show: true,
      },
      {
        name: "Nested Menu",
        icon: "bx-paint",
        link: "/buttton",
        active: false,
        show: true,
        children: [
          {
            name: translate("menu.title.sidebar"),
            icon: "bx-paint",
            link: SIDE_BAR_PAGE_ROUTE,
            active: false,
            show: true,
          },
        ],
      },
    ],
  },
  {
    name: translate("menu.title.appUser"),
    icon: "bx-pen",
    link: APP_USER_MASTER_ROUTE,
    active: false,
    show: true,
  },
  {
    name: translate("menu.title.role"),
    icon: "bx-pen",
    link: ROLE_MASTER_ROUTE,
    active: false,
    show: true,
  },
  {
    name: translate("menu.title.organization"),
    icon: "bx-pen",
    link: ORGANIZATION_MASTER_ROUTE,
    active: false,
    show: true,
  },

  {
    name: translate("menu.title.aministrativeDivisions"),
    icon: "bx-pen",
    link: "/aministrative-divisions",
    active: false,
    show: true,
    children: [
      {
        name: translate("menu.title.nation"),
        icon: "bx-pen",
        link: NATION_MASTER_ROUTE,
        active: false,
        show: true,
      },
      {
        name: translate("menu.title.province"),
        icon: "bx-pen",
        link: PROVINCE_MASTER_ROUTE,
        active: false,
        show: true,
      },
      {
        name: translate("menu.title.district"),
        icon: "bx-pen",
        link: DISTRICT_MASTER_ROUTE,
        active: false,
        show: true,
      },
      {
        name: translate("menu.title.ward"),
        icon: "bx-pen",
        link: WARD_MASTER_ROUTE,
        active: false,
        show: true,
      },
    ],
  },
];


