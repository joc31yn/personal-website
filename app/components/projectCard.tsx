import Image from "next/image";
import { ReactNode } from "react";
import { SiGithub } from "react-icons/si";
import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  githubLink: string;
  imgUrl: string;
  alt: string;
  description: string;
  children?: ReactNode;
  index?: number;
}

export default function ProjectCard({
  title,
  githubLink,
  imgUrl,
  alt,
  description,
  children,
  index = 0,
}: ProjectCardProps) {
  const CardContent = (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="w-[320px] sm:w-[380px] text-white border-[1px] border-white rounded-lg overflow-hidden"
    >
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
            <a href={githubLink} target="_blank" aria-label={title}>
              <SiGithub className="text-white w-[22px] h-[22px]" />
            </a>
          </div>
          <p className="text-xs">{description}</p>
        </div>
        <div className="flex flex-row gap-3 flex-wrap">{children}</div>
      </div>
    </motion.div>
  );

  return CardContent;
}
