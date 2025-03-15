"use client";
import React from "react";
import Logo from "@/components/custom/logo";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import NavItemsLeft from "./nav-items-left";
import NavItemsRight from "./nav-items.right";
import { useUserStore } from "@/store/userStore";

const Navigtion = () => {
  const { user } = useUserStore();
  return (
    <div className="w-full bg-background/60 backdrop-blur-md fixed top-0 px-8 py-4 z-50 shadow-xl overflow-hidden">
      <header className="contariner mx-auto flex items-center ">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center justify-center gap-6">
            <Logo />
            <nav className="hidden md:flex items-center justify-center gap-3 ml-2">
              <NavItemsLeft />
            </nav>
          </div>
          <div className="hidden md:flex items-center justify-center gap-3">
            <NavItemsRight user={user} />
          </div>
        </div>
        <div className="ml-auto md:hidden overflow-hidden">
          <Sheet>
            <SheetTrigger>
              <Menu className="h-6 w-6" strokeWidth={1.5} />
            </SheetTrigger>
            <SheetContent>
              <SheetTitle className="sr-only">导航</SheetTitle>
              <nav className="flex flex-col gap-4 mt-12">
                <NavItemsLeft />
                <NavItemsRight user={user} />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </div>
  );
};

export default Navigtion;
