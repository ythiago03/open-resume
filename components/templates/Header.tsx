"use client";

import Link from "next/link";

import { FileText } from "lucide-react";

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";

const Header = () => {
	const router = useRouter();

	const [isDialogOpen, setIsDialogOpen] = useState(false);

	useEffect(() => {
		setIsDialogOpen(true);
	}, []);

	return (
		<header className="sticky top-0 z-50 border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto flex items-center justify-between h-16 px-4">
				<Link href="/" className="flex items-center gap-2">
					<FileText className="size-6 text-primary" />
					<span className="text-xl font-semibold">OpenResume</span>
				</Link>

				<nav>
					<ul className="flex gap-4">
						<li>
							<Link
								className="text-muted-foreground hover:text-foreground transition-colors"
								href="/"
							>
								Features
							</Link>
						</li>
						<li>
							<Link
								className="text-muted-foreground hover:text-foreground transition-colors"
								href="/"
							>
								How It works
							</Link>
						</li>
					</ul>
				</nav>

				<div className="flex gap-3">
					<Button className="font-semibold cursor-pointer" variant="ghost">
						Sign in
					</Button>
					<Button
						className="font-semibold cursor-pointer"
						onClick={() => router.push("/dashboard")}
					>
						Get Started
					</Button>
				</div>
			</div>

			<Dialog open={isDialogOpen} onOpenChange={() => setIsDialogOpen(false)}>
				<DialogContent className="bg-yellow-100">
					<DialogHeader>
						<DialogTitle>⚠️ This is a demo project!</DialogTitle>
						<DialogDescription>
							This project is currently in development, and this page is for
							demonstration purposes only. It may contain bugs and unfinished
							features that will not be present in the final version.
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</header>
	);
};

export default Header;
