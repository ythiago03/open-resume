import { useContext } from "react";
import { ResumeContext } from "@/context/ResumeContext";

import {
	AboutBlock,
	CvSocialLink,
	FullResume,
	ProjectsBlock,
	SkillsBlock,
} from "@/types/ResumeData";

const useCVEditor = () => {
	const { resumeData, setResumeData } = useContext(ResumeContext);

	if (!resumeData || !setResumeData) {
		throw new Error("useCVEditor must be used within a ResumeProvider");
	}

	const createNewResume = (): string => {
		const id = crypto.randomUUID();

		const newResume: FullResume = {
			id,
			name: "New Resume",
			isPublic: false,
			template: "minimal",
			lastEdited: Date.now(),
			publicURL: "",
			content: {
				personalInfo: {
					fullName: "",
					profileImg: "",
					tagline: "",
					bio: "",
					location: "",
				},
				socialLinks: [],
				blocks: [],
			},
		};

		const storagedResumes = localStorage.getItem("storagedResumes");

		if (storagedResumes) {
			const resumes = JSON.parse(storagedResumes);
			resumes.push(newResume);
			localStorage.setItem("storagedResumes", JSON.stringify(resumes));
			return id;
		}

		localStorage.setItem("storagedResumes", JSON.stringify([newResume]));
		return id;
	};

	const deleteResume = (id: string) => {
		const storagedResumes = localStorage.getItem("storagedResumes");

		if (storagedResumes) {
			const resumes: FullResume[] = JSON.parse(storagedResumes);
			const newResumes = resumes.filter((resume) => resume.id !== id);

			localStorage.setItem("storagedResumes", JSON.stringify(newResumes));
		}
	};

	const duplicateResume = (resumeCopyId: string) => {
		const storagedResumes = localStorage.getItem("storagedResumes");

		if (storagedResumes) {
			const resumes: FullResume[] = JSON.parse(storagedResumes);
			const resume = resumes.find((resume) => resume.id === resumeCopyId);
			if (!resume) return;
			setResumeData(resume.content);

			const newResume = {
				...resume,
				id: crypto.randomUUID(),
				name: `${resume.name} Copy`,
			};
			resumes.push(newResume);
			localStorage.setItem("storagedResumes", JSON.stringify(resumes));
		}
	};

	const getAllResumes = () => {
		const storagedResumes = localStorage.getItem("storagedResumes");

		if (storagedResumes) {
			const resumes: FullResume[] = JSON.parse(storagedResumes);
			return resumes;
		}
		return null;
	};

	const getResume = (id: string) => {
		const storagedResumes = localStorage.getItem("storagedResumes");

		if (storagedResumes) {
			const resumes: FullResume[] = JSON.parse(storagedResumes);
			const resume = resumes.find((resume) => resume.id === id);
			if (!resume) return null;
			setResumeData(resume.content);
			return resume;
		}
		return null;
	};

	const saveResume = (id: string) => {
		const storagedResumes = localStorage.getItem("storagedResumes");

		if (storagedResumes) {
			const resumes: FullResume[] = JSON.parse(storagedResumes);

			resumes.forEach((resume) => {
				if (resume.id === id) {
					resume.content = resumeData;
					resume.lastEdited = Date.now();
				}
			});
			localStorage.setItem("storagedResumes", JSON.stringify(resumes));
		}
	};

	const changeResumeVisibility = (id: string) => {
		const storagedResumes = localStorage.getItem("storagedResumes");

		if (storagedResumes) {
			const resumes: FullResume[] = JSON.parse(storagedResumes);
			const updatedResumes = resumes.map((resume) => {
				if (resume.id === id) {
					return {
						...resume,
						isPublic: !resume.isPublic,
					};
				}

				return resume;
			});
			localStorage.setItem("storagedResumes", JSON.stringify(updatedResumes));
		}
	};

	// Links Section

	const addLink = () => {
		const id = crypto.randomUUID();
		const newLink = {
			id,
			platform: "",
			url: "",
			icon: "",
		};
		setResumeData({
			...resumeData,
			socialLinks: [...resumeData.socialLinks, newLink],
		});
	};

	const updateLink = (link: CvSocialLink) => {
		setResumeData({
			...resumeData,
			socialLinks: resumeData.socialLinks.map((oldLink) =>
				oldLink.id === link.id ? link : oldLink,
			),
		});
	};

	const deleteLink = (id: string) => {
		setResumeData({
			...resumeData,
			socialLinks: resumeData.socialLinks.filter((link) => link.id !== id),
		});
	};

	// Blocks Section

	const addBlock = (type: "about" | "skills" | "projects") => {
		const id = crypto.randomUUID();
		const newBlocks = [];

		if (type === "about") {
			const newBlock: AboutBlock = {
				id,
				type,
				title: "About",
				order: 0,
				visible: true,
				data: {
					description: "",
				},
			};
			newBlocks.push(newBlock);
		}
		if (type === "skills") {
			const newBlock: SkillsBlock = {
				id,
				type,
				title: "Skills",
				order: 0,
				visible: true,
				data: {
					skills: [],
				},
			};
			newBlocks.push(newBlock);
		}
		if (type === "projects") {
			const newBlock: ProjectsBlock = {
				id,
				type,
				title: "Feature Projects",
				order: 0,
				visible: true,
				data: {
					projects: [],
				},
			};
			newBlocks.push(newBlock);
		}

		setResumeData({
			...resumeData,
			blocks: [...resumeData.blocks, ...newBlocks],
		});
	};

	const deleteBlock = (id: string) => {
		setResumeData({
			...resumeData,
			blocks: resumeData.blocks.filter((block) => block.id !== id),
		});
	};

	const changeBlockTitle = (id: string, title: string) => {
		setResumeData({
			...resumeData,
			blocks: resumeData.blocks.map((block) =>
				block.id === id ? { ...block, title } : block,
			),
		});
	};

	const toggleBlockView = (id: string) => {
		setResumeData({
			...resumeData,
			blocks: resumeData.blocks.map((block) =>
				block.id === id ? { ...block, visible: !block.visible } : block,
			),
		});
	};

	// About Block Section

	const updateAboutDescription = (id: string, description: string) => {
		setResumeData({
			...resumeData,
			blocks: resumeData.blocks.map((block) =>
				block.type === "about" && block.id === id
					? {
							...block,
							data: { description: description },
						}
					: block,
			),
		});
	};

	// Skills Block Section

	const addSkill = (id: string) => {
		const uuid = crypto.randomUUID();
		setResumeData({
			...resumeData,
			blocks: resumeData.blocks.map((block) =>
				block.type === "skills" && block.id === id
					? {
							...block,
							data: {
								...block.data,
								skills: [...block.data.skills, { id: uuid, name: "" }],
							},
						}
					: block,
			),
		});
	};

	const updateSkillName = (blockId: string, id: string, value: string) => {
		setResumeData({
			...resumeData,
			blocks: resumeData.blocks.map((block) =>
				block.type === "skills" && block.id === blockId
					? {
							...block,
							data: {
								...block.data,
								skills: block.data.skills.map((skill) => {
									if (skill.id === id) {
										return {
											...skill,
											name: value,
										};
									}
									return skill;
								}),
							},
						}
					: block,
			),
		});
	};

	const deleteSkill = (id: string) => {
		setResumeData({
			...resumeData,
			blocks: resumeData.blocks.map((block) =>
				block.type === "skills"
					? {
							...block,
							data: {
								...block.data,
								skills: block.data.skills.filter((skill) => skill.id !== id),
							},
						}
					: block,
			),
		});
	};

	// Projects Block Section

	const addProject = (blockId: string) => {
		const uuid = crypto.randomUUID();
		setResumeData({
			...resumeData,
			blocks: resumeData.blocks.map((block) =>
				block.type === "projects" && block.id === blockId
					? {
							...block,
							data: {
								...block.data,
								projects: [
									...block.data.projects,
									{ id: uuid, name: "Project", description: "", tags: [] },
								],
							},
						}
					: block,
			),
		});
	};

	const deleteProject = (projectId: string, blockId: string) => {
		setResumeData({
			...resumeData,
			blocks: resumeData.blocks.map((block) =>
				block.type === "projects" && block.id === blockId
					? {
							...block,
							data: {
								...block.data,
								projects: block.data.projects.filter(
									(project) => project.id !== projectId,
								),
							},
						}
					: block,
			),
		});
	};

	const updateProject = (
		projectId: string,
		blockId: string,
		newProject: {
			name?: string;
			url?: string;
			description?: string;
			tags?: string[];
		},
	) => {
		setResumeData({
			...resumeData,
			blocks: resumeData.blocks.map((block) =>
				block.type === "projects" && block.id === blockId
					? {
							...block,
							data: {
								...block.data,
								projects: block.data.projects.map((project) =>
									project.id === projectId
										? Object.assign({}, project, newProject)
										: project,
								),
							},
						}
					: block,
			),
		});
		console.log(resumeData);
	};

	return {
		resumeData,
		saveResume,
		createNewResume,
		deleteResume,
		duplicateResume,
		getAllResumes,
		getResume,
		changeResumeVisibility,
		addLink,
		updateLink,
		deleteLink,
		addBlock,
		deleteBlock,
		changeBlockTitle,
		toggleBlockView,
		updateAboutDescription,
		addSkill,
		updateSkillName,
		deleteSkill,
		addProject,
		deleteProject,
		updateProject,
		setResumeData,
	};
};

export default useCVEditor;
