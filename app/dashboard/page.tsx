"use client";

import Link from "next/link";

import { FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ResumeProvider } from "@/context/ResumeContext";
import NewResumeBtn from "@/components/common/NewResumeBtn";
import ResumesCards from "@/components/templates/ResumesCards";

const page = () => {
	return (
		<ResumeProvider>
			<header className="sticky top-0 z-50 border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
				<div className="container mx-auto flex items-center justify-between h-16 px-4">
					<Link href="/" className="flex items-center gap-2">
						<FileText className="size-6 text-primary" />
						<span className="text-xl font-semibold">OpenResume</span>
					</Link>

					<Button
						className="font-semibold text-md cursor-pointer"
						variant="ghost"
						asChild
					>
						<Link href="/">Home</Link>
					</Button>
				</div>
			</header>

			<main>
				<div className="container mx-auto p-6 flex justify-between items-center">
					<div>
						<h1 className="text-3xl font-bold">My Online CVs</h1>
						<p className="mt-3 text-lg text-muted-foreground">
							Create and manage your online portfólio
						</p>
					</div>

					<NewResumeBtn />
				</div>

				<ResumesCards />
			</main>
		</ResumeProvider>
	);
};

export default page;
