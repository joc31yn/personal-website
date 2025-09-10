import Image from "next/image";
import { ReactNode } from "react";
import { SiGithub } from "react-icons/si";

interface ProjectCardProps {
  title: string;
  githubLink: string;
  imgUrl: string;
  alt: string;
  description: string;
  children?: ReactNode;
}

export default function ProjectCard({
  title,
  githubLink,
  imgUrl,
  alt,
  description,
  children,
}: ProjectCardProps) {
  const CardContent = (
    <div className="w-[320px] sm:w-[380px] text-white border-[1px] border-white rounded-lg overflow-hidden transition-transform duration-200">
      <div className="relative w-full h-52">
        <Image
          className="object-cover border-b-[1px] border-white"
          src={imgUrl}
          alt={alt}
          fill
          sizes="380px"
        />
      </div>
      <div className="px-3 py-2 w-full">
        <div className="text-wrap mb-3">
          <div className="flex flex-row gap-2 items-center mb-1">
            <p className="text-2xl font-semibold">{title}</p>
            <a href={githubLink} target="_blank">
              <SiGithub className="text-white w-[22px] h-[22px]" />
            </a>
          </div>
          <p className="text-xs">{description}</p>
        </div>
        <div className="flex flex-row gap-3 flex-wrap">{children}</div>
      </div>
    </div>
  );

  return CardContent;
}
