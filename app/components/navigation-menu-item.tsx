import React from "react";
import {
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { Link } from "@radix-ui/react-navigation-menu";

interface NavigationMenuItemProps {
  href: string;
  item: string;
  selectedNavItem: string;
  onClick: (item: string) => void;
  children: React.ReactNode;
}

const CustomNavigationMenuItem: React.FC<NavigationMenuItemProps> = ({
  href,
  item,
  selectedNavItem,
  onClick,
  children,
}) => {
  return (
    <div className="w-full">
      <Link href={href} className="w-full block">
        <NavigationMenuLink
          data-item={item}
          onClick={() => onClick(item)}
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
