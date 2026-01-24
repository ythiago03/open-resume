import Link from "next/link";

import useCVEditor from "@/hooks/useCVEditor";

import type {
	AboutBlock,
	ProjectsBlock,
	SkillsBlock,
} from "@/types/ResumeData";

import { MapPin, SquareArrowOutUpRight } from "lucide-react";

import { Button } from "../ui/button";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

const EditorPreview = () => {
	const { resumeData } = useCVEditor();

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

	const createSkillsContents = (): {
		id: string;
		order: number;
		isVisible: boolean;
		content: React.JSX.Element;
	}[] => {
		const skillBlocks = resumeData.blocks.filter(
			(block): block is SkillsBlock => block.type === "skills",
		);

		return skillBlocks.map((block) => ({
			id: block.id,
			order: block.order,
			isVisible: block.visible,
			content: (
				<Card key={block.id} className="text-start">
					<CardTitle className="px-6 text-xl md:text-2xl mt-4">
						{block.title}
					</CardTitle>
					<CardContent>
						<div className="flex flex-wrap gap-2">
							{block.data.skills.map(({ id, name }) => (
								<span
									key={id}
									className="p-1 px-2 border border-border rounded-md"
								>
									{name}
								</span>
							))}
						</div>
					</CardContent>
				</Card>
			),
		}));
	};

	const createProjectsContents = (): {
		id: string;
		order: number;
		isVisible: boolean;
		content: React.JSX.Element;
	}[] => {
		const projectsBlocks = resumeData.blocks.filter(
			(block): block is ProjectsBlock => block.type === "projects",
		);

		return projectsBlocks.map((block) => ({
			id: block.id,
			order: block.order,
			isVisible: block.visible,
			content: (
				<Card key={block.id} className="text-start">
					<CardTitle className="px-6 text-xl md:text-2xl mt-4">
						{block.title}
					</CardTitle>
					<CardContent className="space-y-4">
						{block.data.projects.map(({ id, name, description, url, tags }) => (
							<div
								key={id}
								className="p-6 border rounded-lg border-border shadow-sm"
							>
								<div className="flex justify-between">
									<h4 className="font-semibold text-lg">{name}</h4>
									{url && (
										<Link href={url}>
											<SquareArrowOutUpRight className="text-muted-foreground size-4" />
										</Link>
									)}
								</div>
								<p className="my-2 text-muted-foreground">{description}</p>
								<div className="flex flex-wrap gap-2">
									{tags.map((tag) => (
										<Badge key={`tag-${tag}-${id}`} variant="secondary">
											{tag}
										</Badge>
									))}
								</div>
							</div>
						))}
					</CardContent>
				</Card>
			),
		}));
	};

	const allBlocks = [
		...createAboutContents(),
		...createSkillsContents(),
		...createProjectsContents(),
	];
	const ordenedBlocks = allBlocks.sort((a, b) => a.order - b.order);

	return (
		<section className="flex flex-col items-center text-center p-6 overflow-auto">
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

				<div className="space-y-4 mt-6 w-full">
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
