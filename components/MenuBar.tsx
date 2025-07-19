"use client";

import React, { useState, useEffect, Fragment } from "react";
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { CgMenuRight } from "react-icons/cg";

export interface MenuBarProps {
  className?: string;
  iconClassName?: string;
}

const MenuBar: React.FC<MenuBarProps> = ({
  className = "p-2 rounded-full text-neutral-700 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition",
  iconClassName = "w-7 h-7",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsVisible(false);
  }, [pathname]);

  const handleOpenMenu = () => setIsVisible(true);
  const handleCloseMenu = () => setIsVisible(false);

  return (
    <>
      <button
        onClick={handleOpenMenu}
        aria-label="Open menu"
        className={`flex items-center justify-center ${className}`}
      >
        <CgMenuRight className={iconClassName} />
      </button>

      <Transition appear show={isVisible} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={handleCloseMenu}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <motion.div className="fixed inset-0 bg-black/40 dark:bg-black/70 backdrop-blur-sm" />
          </TransitionChild>

          <div className="fixed inset-0 flex justify-end">
            <TransitionChild
              as={Fragment}
              enter="transition ease-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in duration-200 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <DialogPanel className="w-full max-w-sm h-full bg-white dark:bg-neutral-900 shadow-2xl rounded-l-2xl p-4 overflow-y-auto">
                Nav Menu
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default MenuBar;
