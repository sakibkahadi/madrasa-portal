"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/AuthProvider";
import { useLanguage } from "@/providers/LanguageProvider";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Users,
  Settings,
  FileText,
  Bell,
  Calendar,
  DollarSign,
  Award,
  LogOut,
  Book,
  Bookmark,
  Briefcase,
  Home,
  HelpCircle,
  CalendarSync,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function MainSidebar({ isCollapsed, toggleSidebar }) {
  const pathname = usePathname();
  // const { logout } = useAuth();
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);


  const sidebarItems = [
    {
      nameKey: "dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      nameKey: "settings",
      href: "/settings",
      icon: Settings,
    },
    {
      nameKey: "students",
      href: "/students",
      icon: FileText,
    },
    {
      nameKey: "teachers",
      href: "/teachers",
      icon: Users,
    },
    {
      nameKey: "educationalDepartment",
      href: "/educational-department",
      icon: Calendar,
    },
    {
      nameKey: "administrationDepartment",
      href: "/administration-department",
      icon: Briefcase,
    },
    {
      nameKey: "accountingDepartment",
      href: "/accounting-department",
      icon: DollarSign,
    },
    {
      nameKey: "boardingDepartment",
      href: "/boarding-department",
      icon: Home,
    },
    {
      nameKey: "library",
      href: "/library",
      icon: Book,
    },
    {
      nameKey: "subscription",
      href: "/subscription",
      icon: CalendarSync ,
    },
    {
      nameKey: "mosque",
      href: "/mosque",
      icon: Award,
    },
    {
      nameKey: "helpline",
      href: "/helpline",
      icon: HelpCircle,
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <aside
      className={cn(
        "fixed left-4 top-4 z-30 h-[95%] rounded-[20px] bg-primary shadow-md transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-64",
        "hidden lg:block" // Hide on mobile, will use drawer instead
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo and Collapse Toggle */}
        <div className={cn(
          "flex h-[70px] items-center border-b border-primary-600 transition-all",
          isCollapsed ? "justify-center" : "justify-between px-4"
        )}>
          {!isCollapsed && (
            <Link href="/dashboard" className="flex items-center gap-2">
              <Image
                src="/assets/logos/logo.png"
                alt="Logo"
                width={32}
                height={32}
                priority
                className="h-8 w-8"
              />
              <span className="text-lg font-semibold text-white">
                {t('adminPortal')}
              </span>
            </Link>
          )}

          {isCollapsed && (
            <Link href="/dashboard" className="flex items-center justify-center">
              <Image
                src="/assets/logos/logo.png"
                alt="Logo"
                width={32}
                height={32}
                priority
                className="h-8 w-8"
              />
            </Link>
          )}

          <Button
            onClick={toggleSidebar}
            variant="ghost"
            size="icon"
            className={cn(
              "h-8 w-8 rounded-full text-white hover:bg-primary-600",
              isCollapsed ? "ml-0" : "ml-2"
            )}
            aria-label={isCollapsed ? t('expandSidebar') : t('collapseSidebar')}
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </Button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {sidebarItems.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <li key={item.nameKey}>
                  <TooltipProvider delayDuration={300}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center rounded-md py-2 transition-colors",
                            isActive
                              ? "bg-white text-primary-700" // Active state with white background
                              : "text-white hover:bg-primary-600 hover:text-white",
                            isCollapsed ? "justify-center px-2" : "px-3"
                          )}
                        >
                          <item.icon className={cn(
                            "h-5 w-5 flex-shrink-0",
                            isCollapsed ? "mx-0" : "mr-2"
                          )} />

                          {!isCollapsed && (
                            <span className="truncate">{t(item.nameKey)}</span>
                          )}
                        </Link>
                      </TooltipTrigger>

                      {isCollapsed && (
                        <TooltipContent side="right">
                          {t(item.nameKey)}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="mt-auto border-t border-primary-600 px-2 py-4">
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                onClick={() => signOut({ callbackUrl: "/" })}
                  variant="ghost"
                  className={cn(
                    "w-full items-center rounded-md py-2 text-white hover:bg-primary-600 hover:text-white",
                    isCollapsed ? "justify-center px-2" : "px-3"
                  )}
                >
                  <LogOut className={cn(
                    "h-5 w-5 flex-shrink-0",
                    isCollapsed ? "mx-0" : "mr-2"
                  )} />

                  {!isCollapsed && (
                    <span>{t('logout')}</span>
                  )}
                </Button>
              </TooltipTrigger>

              {isCollapsed && (
                <TooltipContent side="right">
                  {t('logout')}
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </aside>
  );
}