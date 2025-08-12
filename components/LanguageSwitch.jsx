"use client";

import { useState } from "react";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/providers/LanguageProvider";

export default function LanguageSwitch() {
  const { language, languages, changeLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Globe className="h-5 w-5 text-white hover:text-white" />
          <span className="sr-only">Switch Language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        {Object.entries(languages).map(([code, name]) => (
          <DropdownMenuItem 
            key={code} 
            className="cursor-pointer"
            onClick={() => changeLanguage(code)}
          >
            <div className="flex items-center gap-2">
              {language === code && (
                <div className="h-2 w-2 rounded-full bg-primary" />
              )}
              <span className={language === code ? "font-medium" : ""}>
                {name}
              </span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
