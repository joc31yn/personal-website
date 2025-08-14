import Image from "next/image";

interface ContactLogoProps {
  svgUrl: string;
  link: string;
  alt: string;
  usedInNav?: boolean;
}
export default function ContactLogo(props: ContactLogoProps) {
  return (
    <div
      className={`${
        props.usedInNav ? "" : "bg-white"
      } rounded-full p-2 cursor-pointe hover:scale-[115%] transition-all duration-200`}
    >
      <a href={props.link} target="_blank">
        <Image
          className={`${props.usedInNav ? "w-7 h-7" : "w-5 h-5 md:w-6 md:h-6"}`}
          src={props.svgUrl}
          alt={props.alt}
          width={6}
          height={6}
        />
      </a>
    </div>
  );
}
