import Link from "next/link";

import {
	Blocks,
	Download,
	Eye,
	Heart,
	Link2,
	Palette,
	PanelsTopLeft,
	Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Header from "@/components/templates/Header";
import Footer from "@/components/templates/Footer";

export default function Home() {
	const featuresCards = [
		{
			name: "Profile Photos",
			desc: "Add your professional photo to create a personal connection with viewers",
			Icon: Palette,
		},
		{
			name: "Custom Blocks",
			desc: "Add projects, skills, links, and more—build your CV your way",
			Icon: Blocks,
		},
		{
			name: "Social Links",
			desc: "Connect your LinkedIn, GitHub, portfolio, and other profiles",
			Icon: Link2,
		},
		{
			name: "Live Preview",
			desc: "See your changes in real-time with our split-screen editor",
			Icon: Eye,
		},
		{
			name: "Easy Sharing",
			desc: "Share your CV with a simple link or download as PDF",
			Icon: Download,
		},
		{
			name: "Flexible Layouts",
			desc: "Arrange your content blocks in the order that tells your story best",
			Icon: PanelsTopLeft,
		},
	];
	return (
		<div>
			<Header />
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
							and shareble links. More than a resume—it's your digital
							portfolio.
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
								<Link
									href="https://github.com/sponsors/ythiago03"
									target="_blank"
								>
									<Heart className="text-pink-400" /> Sponsor
								</Link>
							</Button>
						</div>
					</div>
				</section>

				<section className="px-4 py-20 bg-muted/50">
					<div className="container mx-auto">
						<div className="mb-16 text-center">
							<h2 className="text-3xl md:text-4xl mb-3 font-bold text-balance tracking-tight">
								Modern CV Features
							</h2>
							<p className="text-lg md:text-xl text-pretty max-w-2xl mx-auto mb-6 leading-relaxed text-muted-foreground">
								Everything you need to create a standout online presence
							</p>
						</div>

						<div className="max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mx-auto">
							{featuresCards.map(({ name, desc, Icon }) => (
								<Card key={name} className="transition-shadow hover:shadow-lg">
									<CardHeader>
										<div className="p-3 w-fit mb-6 text-primary bg-primary/10 rounded-xl">
											<Icon className="size-7" />
										</div>
										<CardTitle className="text-2xl mb-4">{name}</CardTitle>
										<CardDescription className="text-lg">
											{desc}
										</CardDescription>
									</CardHeader>
								</Card>
							))}
						</div>
					</div>
				</section>

				<section className="px-4 py-20">
					<div className="container mx-auto rounded-xl py-12 px-8 bg-primary">
						<div className="text-center">
							<h2 className="text-3xl md:text-4xl mb-3 font-bold text-background text-balance tracking-tight">
								Ready to Build Your Online CV?
							</h2>
							<p className="text-lg md:text-xl text-pretty max-w-2xl mx-auto my-6 leading-relaxed text-background">
								Join professionals creating beautiful online CVs that stand out
							</p>
							<Button
								variant="secondary"
								className="w-full max-w-sm font-semibold cursor-pointer"
							>
								Get Started Now
							</Button>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</div>
	);
}
