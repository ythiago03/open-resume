import { createContext, useState } from "react";
import { FullResume, ResumeData } from "@/types/ResumeData";

interface ResumeContext {
	resumeData: ResumeData | null;
	setResumeData: (data: ResumeData) => void;
	fullResumes: FullResume[];
	setFullResumes: (data: FullResume[]) => void;
}

const initialContext = {
	resumeData: null,
	setResumeData: () => {},
	fullResumes: [],
	setFullResumes: () => {},
};

const ResumeContext = createContext<ResumeContext>(initialContext);

const ResumeProvider = ({ children }: { children: React.ReactNode }) => {
	const [resumeData, setResumeData] = useState<ResumeData>({
		fileName: "",
		personalInfo: {
			fullName: "",
			profileImg: "",
			tagline: "",
			bio: "",
			location: "",
		},
		socialLinks: [],
		blocks: [],
	});

	const [fullResumes, setFullResumes] = useState<FullResume[]>([]);
	return (
		<ResumeContext.Provider
			value={{
				resumeData,
				setResumeData,
				fullResumes,
				setFullResumes,
			}}
		>
			{children}
		</ResumeContext.Provider>
	);
};

export { ResumeContext, ResumeProvider };
