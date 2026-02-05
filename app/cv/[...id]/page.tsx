"use client";

import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";

import EditorForm from "@/components/templates/EditorForm";
import EditorPreview from "@/components/templates/EditorPreview";
import { ResumeProvider } from "@/context/ResumeContext";
import ResumeEdit from "@/components/templates/ResumeEdit";

const page = () => {
	return (
		<ResumeProvider>
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

						<ResumeEdit />
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

									<EditorForm />
								</Card>
							</div>
						</ResizablePanel>
						<ResizableHandle withHandle />
						<ResizablePanel defaultSize={50} minSize={45}>
							<div className="flex flex-col h-[calc(100vh-70px)] p-6">
								<div className="px-2 mb-4">
									<CardTitle className="text-lg">Live Preview</CardTitle>
									<CardDescription>
										See your changes in real-time
									</CardDescription>
								</div>
								<Card className="h-full w-full overflow-hidden">
									<EditorPreview />
								</Card>
							</div>
						</ResizablePanel>
					</ResizablePanelGroup>
				</main>
			</div>
		</ResumeProvider>
	);
};

export default page;
