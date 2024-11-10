import { NavigationMenu, NavigationMenuList } from "./ui/navigation-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Separator } from "./ui/separator";
import CustomNavigationMenuItem from "./navigation-menu-item";
import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("selectedUser") || "diogo";
    }
    return "diogo";
  });

  const [selectedNavItem, setSelectedNavItem] = useState<string | null>(null);

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

  const handleNewEmail = () => {
    navigate("/compose");
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
            <div className="mb-2 w-full">
              <Button
                onClick={handleNewEmail}
                className="w-full flex items-center justify-start gap-2"
                variant="ghost"
              >
                <PlusCircle className="h-4 w-4" />
                New Email
              </Button>
            </div>
            <Separator className="mt-4" />
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
