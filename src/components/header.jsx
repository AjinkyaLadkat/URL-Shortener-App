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

const Header = () => {
  const navigate = useNavigate();
  const user = false;

  // for testing , true = user is logged in

  return (
    <nav className="w-full flex flex-row items-center justify-between py-4 sm:px-8">
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
                <AvatarImage src="https://github.com/shadcn.png"/>
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Ajinkya Ladkat</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem className="text-[#e1ba60]">
                <LinkIcon/>
               <span>My Links</span>
              </DropdownMenuItem>

              <DropdownMenuItem className="text-red-700">
                <LogOut></LogOut>
                <span>Logout</span>
              </DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
};

export default Header;
