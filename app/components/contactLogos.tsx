import Image from "next/image";

interface ContactLogoProps {
  svgUrl: string;
  link: string;
  alt: string;
}
export default function ContactLogo(props: ContactLogoProps) {
  return (
    <div className="bg-white rounded-full p-2">
      <a href={props.link} target="_blank">
        <Image
          className="w-4 h-4 md:w-6 md:h-6"
          src={props.svgUrl}
          alt={props.alt}
          width={6}
          height={6}
        />
      </a>
    </div>
  );
}
