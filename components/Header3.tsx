"use client";

import React, { FC, useCallback, useRef } from "react";
import Logo from "./Logo";
import NotifyDropdown from "./NotifyDropdown";
//import AvatarDropdown from "./AvatarDropdown";
import MenuBar from "./MenuBar";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/Button";

interface Header3Props {
  className?: string;
}

const Header3: FC<Header3Props> = ({ className = "" }) => {
  const session = useSession();
  const { data: user } = session;
  const router = useRouter();
  const onSign = useCallback(() => {
    router.push("/auth/signin");
  }, [router]);

  const headerInnerRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <header ref={headerInnerRef} className={`sticky top-0 z-40 bg-white dark:bg-neutral-900 shadow-sm ${className}`}>
        <div className="relative flex items-center justify-between h-[80px] px-4 md:px-6 lg:px-10">
          <div className="flex items-center space-x-4">
            <Logo className="w-16" img="/YouSell_Logo.png" />
            <div className="hidden lg:block h-10 border-l border-neutral-300 dark:border-neutral-500"></div>
          </div>

          <div className="flex items-center space-x-4 text-neutral-700 dark:text-neutral-100">
        
            {user ? (
              <>
                <div className="hidden lg:flex items-center space-x-3">
                  <NotifyDropdown />
                 
                  <MenuBar />
                </div>
                <div className="lg:hidden flex items-center space-x-2">
                  <NotifyDropdown />
                 
                  <MenuBar />
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-1">
                <Button onClick={onSign} className="px-4 py-2 border border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 rounded-full text-sm text-gray-700 dark:text-neutral-300">
                  Sign In
                </Button>
                <MenuBar />
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header3;
