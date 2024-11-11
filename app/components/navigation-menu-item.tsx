import React from "react";
import {
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { Link } from "@remix-run/react";

interface NavigationMenuItemProps {
  href: string;
  item: string;
  selectedNavItem: string;
  setSelectedNavItem: (item: string) => void;
  children: React.ReactNode;
}

const CustomNavigationMenuItem: React.FC<NavigationMenuItemProps> = ({
  href,
  item,
  selectedNavItem,
  setSelectedNavItem,
  children,
}) => {
  return (
    <div className="w-full">
      <Link to={href} className="w-full block">
        <NavigationMenuLink
          data-item={item}
          onClick={() => {
            setSelectedNavItem(item);
          }}
          className={`w-full block min-w-[200px] h-12 px-4 py-2 text-left ${navigationMenuTriggerStyle()} ${
            selectedNavItem === item ? "bg-gray-300" : "bg-white"
          } hover:bg-gray-300`}
        >
          {children}
        </NavigationMenuLink>
      </Link>
    </div>
  );
};

export default CustomNavigationMenuItem;
