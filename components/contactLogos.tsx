import { ReactNode } from "react";

interface ContactLogoProps {
  link: string;
  usedInNav?: boolean;
  children?: ReactNode;
}
export default function ContactLogo({
  link,
  usedInNav,
  children,
}: ContactLogoProps) {
  return (
    <div
      className={`${
        usedInNav ? "" : "bg-white"
      } rounded-full p-2 cursor-pointe hover:scale-[115%] transition-all duration-200`}
    >
      <a href={link} target="_blank" aria-label="contact link">
        {children}
      </a>
    </div>
  );
}
