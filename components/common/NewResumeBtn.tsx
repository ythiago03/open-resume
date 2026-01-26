import { useRouter } from "next/navigation";
import useCVEditor from "@/hooks/useCVEditor";

import { Plus } from "lucide-react";

import { Button } from "../ui/button";
import { twMerge } from "tailwind-merge";

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const NewResumeBtn = ({ className = "", ...rest }: IButton) => {
	const router = useRouter();
	const { createNewResume } = useCVEditor();

	const newResume = () => {
		const resumeId = createNewResume();

		router.push(`/cv/${resumeId}`);
	};

	return (
		<Button
			onClick={newResume}
			size="lg"
			className={twMerge("font-semibold cursor-pointer", className)}
			{...rest}
		>
			<Plus className="size-5" /> New CV
		</Button>
	);
};

export default NewResumeBtn;
