import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./language-switcher";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";
import { Button } from "../../ui/button";

const NavItemsRight = ({ user }: { user: any }) => {
  const homeT = useTranslations("home.navigtion");
  return (
    <>
      <LanguageSwitcher />
      <ModeToggle />
      {user ? (
        <Link
          href={"/dashboard"}
          className="text-sm font-medium hover:underline underline-offset-4"
        >
          <Button variant={"outline"}> {homeT("name")}</Button>
        </Link>
      ) : (
        <Link
          href={"/sign-in"}
          className="text-sm font-medium hover:underline underline-offset-4"
        >
          <Button variant={"outline"}> {homeT("login")}</Button>
        </Link>
      )}
    </>
  );
};

export default NavItemsRight;
