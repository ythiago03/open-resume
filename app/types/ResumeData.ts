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

export interface CvSocialLink {
	id: string;
	platform: string;
	url: string;
	icon?: string;
}

export interface CvBlock {
	id: string;
	type: string;
	title: string;
	order: number;
	visible: boolean;
	data: CvBlockData;
}

export interface CvBlockData {
	content: string;
}
