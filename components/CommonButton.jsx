"use client";
import useMobileView from "@/lib/useMobileView";
import { useRouter } from "next/navigation";
import React from "react";

export default function CommonButton({
  name,
  bgColor = "",
  textColor = "",
  hoverColor = "",
  borderColor = "",
  px = "",
  py = "",
  mobilePx = "20px",
  mobilePy = "10px",
  textSize = "",
  fontWeight = "",
  leading = "",
  width = "",
  onClick = () => {},
  redirectTo = "",
  disabled = false,
  height = ""
}) {
  const router = useRouter();
  const isMobile = useMobileView();

  const handleClick = () => {
    if (!disabled) {
      if (redirectTo) {
        console.log(`Redirecting to: ${redirectTo}`);
        router.push(redirectTo);
      }
      onClick();
    }
  };

  return (
    <button
      className="rounded-[10px] border font-lexend text-[24px] font-[400] leading-[28.8px]"
      style={{
        backgroundColor: disabled ? "#DEDEDE" : bgColor,
        color: disabled ? "#BEBEBE" : textColor,
        borderColor: disabled ? "#BEBEBE" : borderColor,
        paddingLeft: isMobile ? mobilePx : px,
        paddingRight: isMobile ? mobilePx : px,
        paddingTop: isMobile ? mobilePy : py,
        paddingBottom: isMobile ? mobilePy : py,
        fontWeight: fontWeight,
        fontSize: textSize,
        lineHeight: leading,
        width: width,
        height: height
      }}
      onMouseEnter={(e) =>
        !disabled && (e.target.style.backgroundColor = hoverColor)
      }
      onMouseLeave={(e) =>
        !disabled && (e.target.style.backgroundColor = bgColor)
      }
      onClick={handleClick}
      disabled={disabled}
    >
      {name}
    </button>
  );
}
