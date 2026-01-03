import type { AboutBlock, ResumeData } from "@/app/types/ResumeData";
import { MapPin, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardTitle } from "../ui/card";

interface EditorPreviewProps {
	resumeData: ResumeData;
}

const EditorPreview = ({ resumeData }: EditorPreviewProps) => {
	const createAboutContents = (): {
		id: string;
		order: number;
		isVisible: boolean;
		content: React.JSX.Element;
	}[] => {
		const aboutBlocks = resumeData.blocks.filter(
			(block): block is AboutBlock => block.type === "about",
		);

		return aboutBlocks.map((block) => ({
			id: block.id,
			order: block.order,
			isVisible: block.visible,
			content: (
				<Card key={block.id} className="text-start">
					<CardTitle className="px-6 text-xl md:text-2xl mt-4">
						{block.title}
					</CardTitle>
					<CardContent>
						<p className="text-muted-foreground text-pretty">
							{block.data.description}
						</p>
					</CardContent>
				</Card>
			),
		}));
	};

	const allBlocks = [...createAboutContents()];
	const ordenedBlocks = allBlocks.sort((a, b) => a.order - b.order);

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

				<div className="space-y-4 mt-6">
					{ordenedBlocks
						.filter(({ isVisible }) => isVisible)
						.map(({ id, content }) => (
							<div key={id}>{content}</div>
						))}
				</div>
			</div>
		</section>
	);
};

export default EditorPreview;
