import { createContext, useState } from "react";
import { ResumeData, SimpleResume } from "@/types/ResumeData";

interface ResumeContext {
	resumeData: ResumeData | null;
	setResumeData: (data: ResumeData) => void;
	simpleResumes: SimpleResume[];
	setSimpleResumes: (data: SimpleResume[]) => void;
	fullResumes: ResumeData[];
	setFullResumes: (data: ResumeData[]) => void;
}

const initialContext = {
	resumeData: null,
	setResumeData: () => {},
	simpleResumes: [],
	setSimpleResumes: () => {},
	fullResumes: [],
	setFullResumes: () => {},
};

const ResumeContext = createContext<ResumeContext>(initialContext);

const ResumeProvider = ({ children }: { children: React.ReactNode }) => {
	const [resumeData, setResumeData] = useState<ResumeData | null>({
		id: "cv-teste",
		personalInfo: {
			fullName: "Thiago Fidêncio",
			profileImg: "https://via.placeholder.com/150",
			tagline: "Product Designer & Creative Developer",
			bio: "I create beautiful, accessible digital experiences that bridge the gap between design and technology..",
			location: "New York, USA",
		},
		socialLinks: [
			{
				id: "1",
				platform: "LinkedIn",
				url: "https://www.linkedin.com/in/johndoe/",
				icon: "",
			},
			{
				id: "2",
				platform: "Github",
				url: "https://www.linkedin.com/in/johndoe/",
				icon: "",
			},
			{
				id: "3",
				platform: "Twitter",
				url: "https://www.linkedin.com/in/johndoe/",
				icon: "",
			},
		],
		blocks: [
			{
				id: "1",
				type: "about",
				title: "About",
				order: 0,
				visible: true,
				data: {
					description:
						"I'm a designer and developer passionate about creating delightful user experiences. With over 5 years of experience in the industry, I specialize in building design systems and crafting interfaces that are both beautiful and functional.",
				},
			},
			{
				id: "2",
				type: "skills",
				title: "Skills",
				order: 0,
				visible: true,
				data: {
					skills: [
						{ id: "1", name: "React" },
						{ id: "2", name: "Next.js" },
						{ id: "3", name: "Tailwindcss" },
						{ id: "4", name: "Typescript" },
						{ id: "5", name: "Figma" },
					],
				},
			},
			{
				id: "3",
				type: "projects",
				title: "Feature Projects",
				order: 0,
				visible: true,
				data: {
					projects: [
						{
							id: "project-1",
							name: "Portfolio Website",
							description:
								"Designed and developed a minimal portfolio site with smooth animations",
							url: "https://thiagof.com",
							tags: ["React", "Next.js", "Tailwindcss", "Typescript"],
						},
					],
				},
			},
		],
	});

	const [fullResumes, setFullResumes] = useState<ResumeData[]>([]);
	const [simpleResumes, setSimpleResumes] = useState<SimpleResume[]>([]);

	return (
		<ResumeContext.Provider
			value={{
				resumeData,
				setResumeData,
				simpleResumes,
				setSimpleResumes,
				fullResumes,
				setFullResumes,
			}}
		>
			{children}
		</ResumeContext.Provider>
	);
};

export { ResumeContext, ResumeProvider };
