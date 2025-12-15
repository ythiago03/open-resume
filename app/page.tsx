import Link from "next/link";

import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<main>
			<section className="container mx-auto px-4 py-20 md:py-32">
				<div className="mx-auto text-center max-w-4xl">
					<p className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">
						<Sparkles className="size-6" /> Build your online CV in minutes
					</p>

					<h1 className="text-4xl md:text-6xl lg:text-7xl mb-6 font-extrabold text-balance tracking-tight">
						Your Professional Story,{" "}
						<span className="text-primary">Beautifully Told</span>
					</h1>

					<p className="text-lg md:text-xl text-pretty max-w-2xl mx-auto mb-6 leading-relaxed text-muted-foreground">
						Create a stunning online CV with custom sections, profile photos,
						and shareble links. More than a resume-it's your digital portfolio.
					</p>

					<div className="flex flex-col justify-center sm:flex-row gap-4">
						<Button
							size="lg"
							className="w-full sm:w-auto font-semibold cursor-pointer"
							asChild
						>
							<Link href="/">Start Building Free</Link>
						</Button>
						<Button
							size="lg"
							className="w-full sm:w-auto font-semibold cursor-pointer"
							variant="outline"
							asChild
						>
							<Link href="/">Learn More</Link>
						</Button>
					</div>
				</div>
			</section>
		</main>
	);
}
