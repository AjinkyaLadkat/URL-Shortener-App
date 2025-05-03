import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LinkIcon, LogOut } from "lucide-react";
import { UrlState } from "@/context";
import useFetch from "@/hooks/use-fetch";
import { logout } from "@/db/apiAuth";
import { BarLoader } from "react-spinners";

const Header = () => {
  const navigate = useNavigate();
  const { user, fetchUser } = UrlState();

  const { loading, fn: fnLogout } = useFetch(logout);

  // for testing , true = user is logged in

  return (
    <>
      <nav className="w-full flex flex-row items-center justify-between py-4">
        {/* Logo */}
        <Link to="/">
          <img src="/sitelogo.png" alt="sitelogo" className="h-16 sm:h-24" />
        </Link>

        {/* Login Button */}
        <div className="">
          {!user ? (
            <Button className="" onClick={() => navigate("/auth")}>
              Login
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
                <Avatar>
                  <AvatarImage
                    src={user?.user_metadata?.profile_pic}
                    className="object-contain"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  {user?.user_metadata?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem className="text-[#e1ba60]">
                  <Link to="/dashboard" className="flex gap-2">
                    <LinkIcon />

                    <span>My Links</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="text-red-700">
                  <LogOut></LogOut>
                  <span
                    onClick={() => {
                      fnLogout().then(() => {
                        fetchUser();
                        navigate("/");
                      });
                    }}
                  >
                    Logout
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
      {loading && <BarLoader className="mb-4" width={"100%"} color="#912121 " />}
    </>
  );
};

export default Header;
