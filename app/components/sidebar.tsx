import { Link } from "@radix-ui/react-navigation-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";
import { Separator } from "./ui/separator";
import CustomNavigationMenuItem from "./navigation-menu-item";

const Sidebar = () => {
  const [selectedUser, setSelectedUser] = useState("diogo");
  const [selectedNavItem, setSelectedNavItem] = useState<string>("inbox");

  const handleNavItemClick = (item: string) => {
    setSelectedNavItem(item);
  };
  return (
    <div className="w-full">
      <div className="flex justify-center mt-4">
        <Select value={selectedUser} onValueChange={setSelectedUser}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="User" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="diogo">Diogo</SelectItem>
            <SelectItem value="carol">Carol</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Separator className="mt-4" />
      <div className="flex justify-center mt-4 w-full">
        <NavigationMenu className="min-w-[200px]">
          <NavigationMenuList className="flex-col items-start space-x-0 w-full">
            <CustomNavigationMenuItem
              href="/"
              item="inbox"
              selectedNavItem={selectedNavItem}
              onClick={handleNavItemClick}
            >
              Inbox
            </CustomNavigationMenuItem>
            <CustomNavigationMenuItem
              href="/"
              item="drafts"
              selectedNavItem={selectedNavItem}
              onClick={handleNavItemClick}
            >
              Drafts
            </CustomNavigationMenuItem>
            <CustomNavigationMenuItem
              href="/"
              item="sent"
              selectedNavItem={selectedNavItem}
              onClick={handleNavItemClick}
            >
              Sent
            </CustomNavigationMenuItem>
            <Separator />
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};

export default Sidebar;
