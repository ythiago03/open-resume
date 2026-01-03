"use client";

import Link from "next/link";
import { ArrowLeft, Download, Eye, FileText, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";

import EditorForm from "@/components/templates/EditorForm";
import type { ResumeData } from "../types/ResumeData";
import EditorPreview from "@/components/templates/EditorPreview";
import { useState } from "react";

const cvData: ResumeData = {
	personalInfo: {
		fullName: "Thiago Fidêncio",
		profileImg: "https://via.placeholder.com/150",
		tagline: "Product Designer & Creative Developer",
		bio: "I create beautiful, accessible digital experiences that bridge the gap between design and technology..",
		location: "New York, USA",
	},
	socialLinks: [
		{
			id: "1",
			platform: "LinkedIn",
			url: "https://www.linkedin.com/in/johndoe/",
			icon: "",
		},
		{
			id: "2",
			platform: "Github",
			url: "https://www.linkedin.com/in/johndoe/",
			icon: "",
		},
		{
			id: "3",
			platform: "Twitter",
			url: "https://www.linkedin.com/in/johndoe/",
			icon: "",
		},
	],
	blocks: [
		{
			id: "1",
			type: "about",
			title: "About",
			order: 0,
			visible: true,
			data: {
				description:
					"I'm a designer and developer passionate about creating delightful user experiences. With over 5 years of experience in the industry, I specialize in building design systems and crafting interfaces that are both beautiful and functional.",
			},
		},
		{
			id: "2",
			type: "skills",
			title: "Skills",
			order: 0,
			visible: true,
			data: {
				skills: ["React", "Next.js", "Tailwindcss", "Typescript", "Figma"],
			},
		},
	],
};

const page = () => {
	const [editorResume, setEditorResume] = useState<ResumeData>(cvData);

	return (
		<div>
			<header className="sticky top-0 z-50 border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
				<div className="container mx-auto flex items-center justify-between h-16 px-4">
					<div className="flex gap-4">
						<Button
							className="font-semibold text-md cursor-pointer"
							variant="ghost"
							asChild
						>
							<Link href="/dashboard">
								<ArrowLeft className="size-5" />
							</Link>
						</Button>

						<Link href="/" className="flex items-center gap-2">
							<FileText className="size-6 text-primary" />
							<span className="text-xl font-semibold">CV Editor</span>
						</Link>
					</div>

					<div className="flex items-center gap-4">
						<span className="text-muted-foreground">Saved</span>
						<Button className="cursor-pointer" variant="outline">
							<Save /> Save
						</Button>
						<Button className="cursor-pointer" variant="outline">
							<Download /> Export
						</Button>
						<Button className="cursor-pointer">
							<Eye /> Preview
						</Button>
					</div>
				</div>
			</header>

			<main className="container mx-auto px-6">
				<ResizablePanelGroup direction="horizontal">
					<ResizablePanel defaultSize={50} minSize={40}>
						<div className="flex h-[calc(100vh-70px)] p-6">
							<Card className="h-full w-full overflow-hidden">
								<div className="px-4">
									<CardTitle className="text-lg">Edit Content</CardTitle>
									<CardDescription>Customize your online CV</CardDescription>
								</div>

								<Separator />

								<EditorForm
									resumeData={editorResume}
									changeResumeData={setEditorResume}
								/>
							</Card>
						</div>
					</ResizablePanel>
					<ResizableHandle withHandle />
					<ResizablePanel defaultSize={50} minSize={45}>
						<div className="flex flex-col h-[calc(100vh-70px)] p-6">
							<div className="px-2 mb-4">
								<CardTitle className="text-lg">Edit Content</CardTitle>
								<CardDescription>See your changes in real-time</CardDescription>
							</div>
							<Card className="h-full w-full overflow-hidden">
								<EditorPreview resumeData={editorResume} />
							</Card>
						</div>
					</ResizablePanel>
				</ResizablePanelGroup>
			</main>
		</div>
	);
};

export default page;
