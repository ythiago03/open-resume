import Link from "next/link";

import useCVEditor from "@/hooks/useCVEditor";

import {
	Copy,
	Download,
	EllipsisVertical,
	Eye,
	EyeClosed,
	FileText,
	Trash2,
} from "lucide-react";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import NewResumeBtn from "../common/NewResumeBtn";
import { use, useEffect, useState } from "react";
import { get } from "http";
import { FullResume } from "@/types/ResumeData";
import { Button } from "../ui/button";

const ResumesCards = () => {
	const {
		getAllResumes,
		deleteResume,
		changeResumeVisibility,
		duplicateResume,
	} = useCVEditor();
	const [resumes, setResumes] = useState<FullResume[]>([]);

	const formatDate = (date: number) => {
		const convertedDate = new Date(date);

		return new Intl.DateTimeFormat("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		}).format(convertedDate);
	};

	const getResumes = () => {
		const resumes = getAllResumes();

		if (resumes) {
			setResumes(resumes);
		}
	};

	const deleteCv = (id: string) => {
		deleteResume(id);
		getResumes();
	};

	const changeVisibility = (id: string) => {
		changeResumeVisibility(id);
		getResumes();
	};

	const duplicate = (id: string) => {
		duplicateResume(id);
		getResumes();
	};

	useEffect(() => {
		getResumes();
	}, []);

	if (resumes.length === 0) {
		return (
			<section className="container mx-auto p-6">
				<Card className="w-full flex items-center p-6">
					<FileText className="size-16 text-muted-foreground" />

					<CardTitle className="text-2xl">No CVs yet</CardTitle>

					<CardDescription className="text-lg">
						Create your first online CV to get started
					</CardDescription>

					<NewResumeBtn className="w-full md:w-1/3" />
				</Card>
			</section>
		);
	}

	return (
		<section className="container mx-auto p-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{resumes.map(({ id, name, template, lastEdited, isPublic }) => (
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
							<DropdownMenuItem
								className="cursor-pointer"
								onClick={() => duplicate(id)}
							>
								<Copy /> Duplicate
							</DropdownMenuItem>
							<DropdownMenuItem
								className="cursor-pointer"
								onClick={() => changeVisibility(id)}
							>
								{isPublic ? (
									<>
										<EyeClosed /> Turn Private
									</>
								) : (
									<>
										<Eye /> Turn Public
									</>
								)}
							</DropdownMenuItem>
							<DropdownMenuItem className="cursor-pointer">
								<Download /> Download PDF
							</DropdownMenuItem>
							<DropdownMenuItem
								className="cursor-pointer"
								onClick={() => deleteCv(id)}
								variant="destructive"
							>
								<Trash2 />
								Delete
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					<Link className="h-full py-6" href={`/cv/${id}`}>
						<CardHeader>
							<div className="mb-4 flex h-48 items-center justify-center rounded-lg border border-border bg-muted">
								<FileText className="h-16 w-16 text-muted-foreground" />
							</div>
							<CardTitle className="text-lg">{name}</CardTitle>
							<div className="flex justify-between capitalize text-muted-foreground">
								<span>{template}</span>
								<span>{formatDate(lastEdited)}</span>
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
	);
};

export default ResumesCards;
