import Image from "next/image";

interface ProjectCardProps {
  title: string;
  githubLink: string;
  imgUrl: string;
  alt: string;
  description: string;
  link?: string;
}

export default function ProjectCard(props: ProjectCardProps) {
  const CardContent = (
    <div className="w-full h-full max-w-[450px] text-white border-2 border-white rounded-xl overflow-hidden hover:scale-105 transition-transform duration-200">
      <Image src={props.imgUrl} alt={props.alt} height={250} width={450} />
      <div className="px-3 py-2 w-full text-wrap">
        <p className="text-2xl font-bold">{props.title}</p>
        <p>{props.description}</p>
      </div>
    </div>
  );

  return props.link ? (
    <a href={props.link} target="_blank" rel="noopener noreferrer">
      {CardContent}
    </a>
  ) : (
    CardContent
  );
}
