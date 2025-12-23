import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Copy,
	Download,
	EllipsisVertical,
	Eye,
	FileText,
	Plus,
	Trash2,
} from "lucide-react";
import Link from "next/link";

const page = () => {
	const resumes = [
		{
			id: "1",
			title: "My Online CV",
			template: "centered",
			lastModified: new Date("2024-01-15"),
			isPublic: true,
		},
		{
			id: "2",
			title: "Portfolio CV",
			template: "minimal",
			lastModified: new Date("2024-01-10"),
			isPublic: false,
		},
	];

	const formatDate = (date: Date) => {
		return new Intl.DateTimeFormat("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		}).format(date);
	};

	return (
		<div>
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

					<Button size="lg" className="font-semibold">
						<Plus className="size-5" /> New CV
					</Button>
				</div>

				<section className="container mx-auto p-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{resumes.map(({ id, title, template, lastModified, isPublic }) => (
						<Card
							key={id}
							className="py-0 relative transition-shadow hover:shadow-lg"
						>
							<DropdownMenu>
								<DropdownMenuTrigger className="absolute top-6 right-6 hover:bg-primary/10 cursor-pointer rounded-lg">
									<EllipsisVertical className="size-5 m-2 " />
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuItem className="cursor-pointer">
										<FileText /> Edit
									</DropdownMenuItem>
									<DropdownMenuItem className="cursor-pointer">
										<Copy /> Duplicate
									</DropdownMenuItem>
									{isPublic ? (
										<DropdownMenuItem className="cursor-pointer">
											<Eye /> View Public
										</DropdownMenuItem>
									) : (
										<DropdownMenuItem className="cursor-pointer">
											{" "}
											<Eye /> Turn Public
										</DropdownMenuItem>
									)}
									<DropdownMenuItem className="cursor-pointer">
										<Download /> Download PDF
									</DropdownMenuItem>
									<DropdownMenuItem
										className="cursor-pointer"
										variant="destructive"
									>
										<Trash2 />
										Delete
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>

							<Link className="h-full py-6" href="/">
								<CardHeader>
									<div className="mb-4 flex h-48 items-center justify-center rounded-lg border border-border bg-muted">
										<FileText className="h-16 w-16 text-muted-foreground" />
									</div>
									<CardTitle className="text-lg">{title}</CardTitle>
									<div className="flex justify-between capitalize text-muted-foreground">
										<span>{template}</span>
										<span>{formatDate(lastModified)}</span>
									</div>
								</CardHeader>
								<CardContent>
									{isPublic && (
										<span className="inline-flex items-center gap-2 p-1 mt-4 text-xs text-primary bg-primary/10 rounded-md">
											<Eye className="size-4" /> Public
										</span>
									)}
								</CardContent>
							</Link>
						</Card>
					))}
				</section>
			</main>
		</div>
	);
};

export default page;
