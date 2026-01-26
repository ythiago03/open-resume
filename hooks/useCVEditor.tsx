import { useContext } from "react";
import { ResumeContext } from "@/context/ResumeContext";

import {
	AboutBlock,
	CvSocialLink,
	ProjectsBlock,
	ResumeData,
	SimpleResume,
	SkillsBlock,
} from "@/types/ResumeData";

const useCVEditor = () => {
	const {
		resumeData,
		setResumeData,
		simpleResumes,
		setSimpleResumes,
		fullResumes,
		setFullResumes,
	} = useContext(ResumeContext);

	if (!resumeData || !setResumeData) {
		throw new Error("useCVEditor must be used within a ResumeProvider");
	}

	const createNewResume = (): string => {
		const id = crypto.randomUUID();

		const newResume: SimpleResume = {
			id,
			name: "New Resume",
			isPublic: false,
			template: "minimal",
			lastEdited: Date.now(),
			publicURL: "",
		};
		const newResumeData: ResumeData = {
			id,
			personalInfo: {
				fullName: "",
				profileImg: "",
				tagline: "",
				bio: "",
				location: "",
			},
			socialLinks: [],
			blocks: [],
		};

		setSimpleResumes([...simpleResumes, newResume]);
		setFullResumes([...fullResumes, newResumeData]);

		return id;
	};

	const deleteResume = (id: string) => {
		setSimpleResumes(simpleResumes.filter((resume) => resume.id !== id));
		setFullResumes(fullResumes.filter((resume) => resume.id !== id));
	};

	const getResume = (id: string) => {
		return fullResumes.find((resume) => resume.id === id);
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
		simpleResumes,
		createNewResume,
		deleteResume,
		getResume,
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
