import { NavigationMenu, NavigationMenuList } from "./ui/navigation-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useEffect, useState } from "react";
import { Separator } from "./ui/separator";
import CustomNavigationMenuItem from "./navigation-menu-item";

const Sidebar = () => {
  const [selectedUser, setSelectedUser] = useState(() => {
    // Only runs once during initialization
    if (typeof window !== "undefined") {
      return localStorage.getItem("selectedUser") || "diogo";
    }
    return "diogo";
  });

  const [selectedNavItem, setSelectedNavItem] = useState<string>("inbox");

  useEffect(() => {
    const path = window.location.pathname.substring(1);
    if (path) {
      setSelectedNavItem(path);
    }
  }, []);

  const handleUserChange = (value: string) => {
    localStorage.setItem("selectedUser", value);
    setSelectedUser(value);
  };

  return (
    <div className="w-full">
      <div className="flex justify-center mt-4">
        <Select value={selectedUser} onValueChange={handleUserChange}>
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
              href="/inbox"
              item="inbox"
              selectedNavItem={selectedNavItem}
            >
              Inbox
            </CustomNavigationMenuItem>
            <CustomNavigationMenuItem
              href="/drafts"
              item="drafts"
              selectedNavItem={selectedNavItem}
            >
              Drafts
            </CustomNavigationMenuItem>
            <CustomNavigationMenuItem
              href="/sent"
              item="sent"
              selectedNavItem={selectedNavItem}
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
