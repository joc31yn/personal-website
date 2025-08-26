import { ReactNode } from "react";

interface ContactLogoProps {
  link: string;
  usedInNav?: boolean;
  icon?: ReactNode;
}
export default function ContactLogo(props: ContactLogoProps) {
  return (
    <div
      className={`${
        props.usedInNav ? "" : "bg-white"
      } rounded-full p-2 cursor-pointe hover:scale-[115%] transition-all duration-200`}
    >
      <a href={props.link} target="_blank">
        {props.icon}
      </a>
    </div>
  );
}
