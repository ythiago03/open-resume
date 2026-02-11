import useCVEditor from "@/hooks/useCVEditor";
import { useParams } from "next/navigation";
import { Button } from "../ui/button";
import { Download, Eye, Save } from "lucide-react";
import { Input } from "../ui/input";

const ResumeEdit = () => {
	const { resumeData, saveResume, setResumeData } = useCVEditor();
	const params = useParams();
	const resumeId = params.id ? params.id[0] : null;

	const save = () => {
		if (!resumeId) return;
		saveResume(resumeId, resumeData);
	};

	return (
		<div className="flex items-center gap-4">
			<span className="text-muted-foreground">Saved</span>
			<Button className="cursor-pointer" variant="outline" onClick={save}>
				<Save /> Save
			</Button>
			<Input
				type="text"
				placeholder="Resume Name"
				value={resumeData.fileName}
				onChange={(e) =>
					setResumeData({
						...resumeData,
						fileName: e.target.value,
					})
				}
			/>
			<Button className="cursor-pointer" variant="outline">
				<Download /> Export
			</Button>
			<Button className="cursor-pointer">
				<Eye /> Preview
			</Button>
		</div>
	);
};

export default ResumeEdit;
