export interface ResumeData {
	personalInfo: {
		fullName: string;
		profileImg: string;
		tagline: string;
		bio: string;
		location: string;
	};
	socialLinks: CvSocialLink[];
	blocks: CvBlock[];
}

export type CvBlock = AboutBlock | SkillsBlock;

export interface CvSocialLink {
	id: string;
	platform: string;
	url: string;
	icon?: string;
}

export interface CvBlockBase<TType extends string, TData> {
	id: string;
	type: TType;
	title: string;
	order: number;
	visible: boolean;
	data: TData;
}

export interface CvBlockTypes {
	type: "about" | "experience" | "education" | "projects" | "skills";
}

export type AboutBlock = CvBlockBase<
	"about",
	{
		description: string;
	}
>;

export type SkillsBlock = CvBlockBase<
	"skills",
	{
		skills: { id: string; name: string }[];
	}
>;
