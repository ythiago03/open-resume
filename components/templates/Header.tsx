import Link from "next/link";

import { FileText } from "lucide-react";

import { Button } from "../ui/button";

const Header = () => {
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
					<Button className="font-semibold cursor-pointer">Get Started</Button>
				</div>
			</div>
		</header>
	);
};

export default Header;
