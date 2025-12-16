import { Coffee, FileText, Github } from "lucide-react";
import Link from "next/link";

const Footer = () => {
	return (
		<footer className="px-4 py-12 border-t bg-muted/50">
			<div className="container mx-auto flex flex-col md:flex-row gap-6 items-center justify-between">
				<Link href="/" className="flex items-center gap-2">
					<FileText className="size-6 text-primary" />
					<span className="text-xl font-semibold">OpenResume</span>
				</Link>

				<div>
					<p className="text-muted-foreground text-center">
						Built with care for your career success by{" "}
						<Link
							className="text-primary hover:underline"
							href="http://thiagof.com"
							target="_blank"
						>
							Thiago Fidêncio
						</Link>
					</p>

					<div className="flex justify-between mt-3">
						<Link
							className="flex gap-2 w-fit items-center text-lg text-muted-foreground hover:text-primary transition-colors"
							href="https://github.com/sponsors/ythiago03"
							target="_blank"
						>
							<Coffee />
							Buy me a coffee
						</Link>
						<Link
							className="flex gap-2 w-fit items-center text-lg text-muted-foreground hover:text-primary transition-colors"
							href="http://thiagof.com"
							target="_blank"
						>
							<Github />
							Github
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
