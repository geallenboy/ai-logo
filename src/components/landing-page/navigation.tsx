import React from "react";
import Logo from "@/components/logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/supabase/queries";
import { LanguageSwitcher } from "./language-switcher";

const NavItems = ({ user }: { user: any }) => {
  const homeT = useTranslations("home.navigtion");

  return (
    <>
      <Link
        href={"#features"}
        className="text-sm font-medium hover:underline underline-offset-4"
      >
        {homeT("features")}
      </Link>
      <Link
        href={"#faqs"}
        className="text-sm font-medium hover:underline underline-offset-4"
      >
        {homeT("faqs")}
      </Link>
      <>
        <LanguageSwitcher />
      </>
      {user ? (
        <Link
          href={"/dashboard"}
          className="text-sm font-medium hover:underline underline-offset-4"
        >
          <Button variant={"outline"}> {homeT("name")}</Button>
        </Link>
      ) : (
        <Link
          href={"/login?state=signup"}
          className="text-sm font-medium hover:underline underline-offset-4"
        >
          <Button variant={"outline"}> {homeT("signup")}</Button>
        </Link>
      )}
    </>
  );
};

const Navigtion = async () => {
  const supabase = await createClient();
  const user = await getUser(supabase);
  return (
    <div className="w-full bg-background/60 backdrop-blur-md fixed top-0 px-8 py-4 z-50 shadow-xl overflow-hidden">
      <header className="contariner mx-auto flex items-center">
        <Logo />
        <nav className="ml-auto hidden md:flex items-center justify-center gap-6">
          <NavItems user={user} />
        </nav>
        {/* <div className="ml-auto md:hidden overflow-hidden">
          <Sheet>
            <SheetTrigger>
              <Menu className="h-6 w-6" strokeWidth={1.5} />
            </SheetTrigger>
            <SheetContent>
              <SheetTitle className="sr-only">导航</SheetTitle>
              <nav className="flex flex-col gap-4 mt-12">
                <NavItems user={user} />
              </nav>
            </SheetContent>
          </Sheet>
        </div> */}
      </header>
    </div>
  );
};

export default Navigtion;
