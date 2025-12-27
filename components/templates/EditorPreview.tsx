import type { ResumeData } from "@/app/types/ResumeData";
import { MapPin, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

interface EditorPreviewProps {
	resumeData: ResumeData;
}

const EditorPreview = ({ resumeData }: EditorPreviewProps) => {
	return (
		<section className="flex flex-col items-center text-center p-6">
			<div className="flex flex-col items-center text-center">
				<h2 className="text-2xl md:text-4xl font-bold">
					{resumeData.personalInfo.fullName}
				</h2>
				<p className="text-lg md:text-xl mt-4 text-muted-foreground max-w-xl">
					{resumeData.personalInfo.tagline}
				</p>
				<span className="flex items-center mt-2 gap-2 text-sm text-muted-foreground">
					<MapPin className="size-4" /> {resumeData.personalInfo.location}
				</span>
				<p className="text-lg mt-4 text-muted-foreground max-w-2xl">
					{resumeData.personalInfo.bio}
				</p>

				<div className="flex gap-4 m-4">
					{resumeData.socialLinks.map((link) => (
						<Button key={link.id} variant="outline" className="cursor-pointer">
							<Link href={link.url} target="_blank">
								{link.platform}
							</Link>{" "}
							<SquareArrowOutUpRight />
						</Button>
					))}
				</div>
			</div>
		</section>
	);
};

export default EditorPreview;
