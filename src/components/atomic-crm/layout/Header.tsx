import {
  Building2,
  ContactRound,
  FileText,
  Handshake,
  Import,
  LayoutDashboard,
  Settings,
  User,
  Users,
  type LucideIcon,
} from "lucide-react";
import { CanAccess, useTranslate, useUserMenu } from "ra-core";
import { Link, matchPath, useLocation } from "react-router";
import { RefreshButton } from "@/components/admin/refresh-button";
import { ThemeModeToggle } from "@/components/admin/theme-mode-toggle";
import { UserMenu } from "@/components/admin/user-menu";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

import { useConfigurationContext } from "../root/ConfigurationContext";
import { ImportPage } from "../misc/ImportPage";
import { ChangelogPage } from "../misc/ChangelogPage";
import { GlobalSearchButton } from "../search/GlobalSearchButton";

const Header = () => {
  const { darkModeLogo, lightModeLogo, title } = useConfigurationContext();
  const location = useLocation();
  const translate = useTranslate();

  let currentPath: string | boolean = "/";
  if (matchPath("/", location.pathname)) {
    currentPath = "/";
  } else if (matchPath("/contacts/*", location.pathname)) {
    currentPath = "/contacts";
  } else if (matchPath("/companies/*", location.pathname)) {
    currentPath = "/companies";
  } else if (matchPath("/deals/*", location.pathname)) {
    currentPath = "/deals";
  } else {
    currentPath = false;
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-14 max-w-screen-xl items-center gap-6 px-4">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2.5 text-foreground no-underline"
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
            <img
              className="[.light_&]:hidden size-5"
              src={darkModeLogo}
              alt={title}
            />
            <img
              className="[.dark_&]:hidden size-5"
              src={lightModeLogo}
              alt={title}
            />
          </span>
          <h1 className="text-base font-semibold tracking-tight">{title}</h1>
        </Link>
        <NavigationMenu aria-label={translate("crm.navigation.label")}>
          <NavigationMenuList className="gap-1">
            {NAVIGATION_ITEMS.map(({ to, icon, label }) => (
              <NavigationTab
                key={to}
                to={to}
                icon={icon}
                label={translate(label, { smart_count: 2 })}
                isActive={currentPath === to}
              />
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="ml-auto flex items-center gap-1">
          <GlobalSearchButton />
          <ThemeModeToggle />
          <RefreshButton />
          <UserMenu>
            <ProfileMenu />
            <CanAccess resource="sales" action="list">
              <UsersMenu />
            </CanAccess>
            <CanAccess resource="configuration" action="edit">
              <SettingsMenu />
            </CanAccess>
            <ImportFromJsonMenuItem />
            <ChangelogMenuItem />
          </UserMenu>
        </div>
      </div>
    </header>
  );
};

const NAVIGATION_ITEMS: {
  to: string;
  icon: LucideIcon;
  label: string;
}[] = [
  { to: "/", icon: LayoutDashboard, label: "ra.page.dashboard" },
  { to: "/contacts", icon: ContactRound, label: "resources.contacts.name" },
  { to: "/companies", icon: Building2, label: "resources.companies.name" },
  { to: "/deals", icon: Handshake, label: "resources.deals.name" },
];

const NavigationTab = ({
  label,
  to,
  icon: Icon,
  isActive,
}: {
  label: string;
  to: string;
  icon: LucideIcon;
  isActive: boolean;
}) => (
  <NavigationMenuItem>
    <NavigationMenuLink
      active={isActive}
      render={<Link to={to} />}
      className={cn(
        "gap-2 px-3 py-1.5 font-medium",
        isActive
          ? "bg-muted text-foreground"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      <Icon />
      {label}
    </NavigationMenuLink>
  </NavigationMenuItem>
);

const UsersMenu = () => {
  const translate = useTranslate();
  const userMenuContext = useUserMenu();
  if (!userMenuContext) {
    throw new Error("<UsersMenu> must be used inside <UserMenu?");
  }
  return (
    <DropdownMenuItem
      onClick={userMenuContext.onClose}
      render={<Link to="/sales" className="flex items-center gap-2" />}
    >
      <Users />
      {translate("resources.sales.name", { smart_count: 2 })}
    </DropdownMenuItem>
  );
};

const ProfileMenu = () => {
  const translate = useTranslate();
  const userMenuContext = useUserMenu();
  if (!userMenuContext) {
    throw new Error("<ProfileMenu> must be used inside <UserMenu?");
  }
  return (
    <DropdownMenuItem
      onClick={userMenuContext.onClose}
      render={<Link to="/profile" className="flex items-center gap-2" />}
    >
      <User />
      {translate("crm.profile.title")}
    </DropdownMenuItem>
  );
};

const SettingsMenu = () => {
  const translate = useTranslate();
  const userMenuContext = useUserMenu();
  if (!userMenuContext) {
    throw new Error("<SettingsMenu> must be used inside <UserMenu>");
  }
  return (
    <DropdownMenuItem
      onClick={userMenuContext.onClose}
      render={<Link to="/settings" className="flex items-center gap-2" />}
    >
      <Settings />
      {translate("crm.settings.title")}
    </DropdownMenuItem>
  );
};

const ImportFromJsonMenuItem = () => {
  const translate = useTranslate();
  const userMenuContext = useUserMenu();
  if (!userMenuContext) {
    throw new Error("<ImportFromJsonMenuItem> must be used inside <UserMenu>");
  }
  return (
    <DropdownMenuItem
      onClick={userMenuContext.onClose}
      render={<Link to={ImportPage.path} className="flex items-center gap-2" />}
    >
      <Import />
      {translate("crm.header.import_data")}
    </DropdownMenuItem>
  );
};

const ChangelogMenuItem = () => {
  const translate = useTranslate();
  const userMenuContext = useUserMenu();
  if (!userMenuContext) {
    throw new Error("<ChangelogMenuItem> must be used inside <UserMenu>");
  }
  return (
    <DropdownMenuItem
      onClick={userMenuContext.onClose}
      render={
        <Link to={ChangelogPage.path} className="flex items-center gap-2" />
      }
    >
      <FileText />
      {translate("crm.changelog.title")}
    </DropdownMenuItem>
  );
};
export default Header;
