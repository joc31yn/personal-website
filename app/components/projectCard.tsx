import Image from "next/image";
import { ReactNode } from "react";

interface ProjectCardProps {
  title: string;
  githubLink: string;
  imgUrl: string;
  alt: string;
  description: string;
  link?: string;
  children?: ReactNode;
}

export default function ProjectCard({
  title,
  githubLink,
  imgUrl,
  alt,
  description,
  link,
  children,
}: ProjectCardProps) {
  const CardContent = (
    <div className="w-[400px] text-white border-2 border-white rounded-xl overflow-hidden transition-transform duration-200">
      <Image src={imgUrl} alt={alt} height={400} width={400} />
      <div className="px-3 py-2 w-full">
        <div className="text-wrap mb-3">
          <p className="text-2xl font-bold">{title}</p>
          <p className="text-sm">{description}</p>
        </div>
        <div className="flex flex-row gap-3 flex-wrap">{children}</div>
      </div>
    </div>
  );

  return link ? (
    <a href={link} target="_blank" rel="noopener noreferrer">
      {CardContent}
    </a>
  ) : (
    CardContent
  );
}
