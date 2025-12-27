"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSeparator,
	FieldSet,
} from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import type { CvSocialLink, ResumeData } from "@/app/types/ResumeData";
import { useState } from "react";

interface EditorFormProps {
	resumeData: ResumeData;
	changeResumeData: (data: ResumeData) => void;
}

const EditorForm = ({ resumeData, changeResumeData }: EditorFormProps) => {
	const updateLink = (link: CvSocialLink) => {
		changeResumeData({
			...resumeData,
			socialLinks: resumeData.socialLinks.map((oldLink) =>
				oldLink.id === link.id ? link : oldLink,
			),
		});
	};

	const addLink = () => {
		const uuid = crypto.randomUUID();
		const newLink = {
			id: uuid,
			platform: "",
			url: "",
			icon: "",
		};
		changeResumeData({
			...resumeData,
			socialLinks: [...resumeData.socialLinks, newLink],
		});
	};

	const deleteLink = (id: string) => {
		changeResumeData({
			...resumeData,
			socialLinks: resumeData.socialLinks.filter((link) => link.id !== id),
		});
	};

	return (
		<form className="overflow-y-auto">
			<FieldGroup className="px-6">
				<FieldSet>
					<FieldGroup className="gap-2">
						<FieldLegend className="font-semibold text-xl!">
							Template Design
						</FieldLegend>
						<Field className="w-fit">
							<FieldLabel htmlFor="template" className="font-semibold">
								Choose Template
							</FieldLabel>
							<Select defaultValue="">
								<SelectTrigger id="template">
									<SelectValue placeholder="Centered - Clean card-based layout" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="centered">
										Centered - Clean card-based layout
									</SelectItem>
									<SelectItem value="vibrant">
										Vibrant - Colorful gradient design
									</SelectItem>
									<SelectItem value="elegant">
										Elegant - Sophisticated typography
									</SelectItem>
								</SelectContent>
							</Select>
							<FieldDescription>
								Preview updates instantly on the right panel
							</FieldDescription>
						</Field>
					</FieldGroup>
				</FieldSet>

				<FieldSeparator />

				<FieldSet>
					<FieldGroup className="gap-2">
						<FieldLegend className="font-semibold text-xl!">
							Personal Info
						</FieldLegend>
						<Field>
							<FieldLabel className="font-semibold" htmlFor="fullName">
								Full Name
							</FieldLabel>
							<Input
								id="fullName"
								placeholder="John Doe"
								required
								value={resumeData.personalInfo.fullName}
								onChange={(e) =>
									changeResumeData({
										...resumeData,
										personalInfo: {
											...resumeData.personalInfo,
											fullName: e.target.value,
										},
									})
								}
							/>
						</Field>
						<Field>
							<FieldLabel className="font-semibold" htmlFor="tagline">
								Tagline
							</FieldLabel>
							<Input
								id="tagline"
								placeholder="Product Designer & Developer"
								required
								value={resumeData.personalInfo.tagline}
								onChange={(e) =>
									changeResumeData({
										...resumeData,
										personalInfo: {
											...resumeData.personalInfo,
											tagline: e.target.value,
										},
									})
								}
							/>
						</Field>
						<Field>
							<FieldLabel className="font-semibold" htmlFor="bio">
								Bio
							</FieldLabel>
							<Textarea
								id="bio"
								placeholder="A short bio about yourself..."
								className="resize-vertical"
								rows={4}
								value={resumeData.personalInfo.bio}
								onChange={(e) =>
									changeResumeData({
										...resumeData,
										personalInfo: {
											...resumeData.personalInfo,
											bio: e.target.value,
										},
									})
								}
							/>
						</Field>
						<Field>
							<FieldLabel className="font-semibold" htmlFor="location">
								Location
							</FieldLabel>
							<Input
								id="location"
								placeholder="San Francisco, CA"
								required
								value={resumeData.personalInfo.location}
								onChange={(e) =>
									changeResumeData({
										...resumeData,
										personalInfo: {
											...resumeData.personalInfo,
											location: e.target.value,
										},
									})
								}
							/>
						</Field>
						<Field>
							<FieldLabel className="font-semibold" htmlFor="profilePicture">
								Profile Image
							</FieldLabel>
							<Input id="profilePicture" type="file" />
						</Field>
					</FieldGroup>
				</FieldSet>

				<FieldSeparator />

				<FieldSet>
					<FieldGroup className="gap-2">
						<div className="flex justify-between items-center">
							<FieldLegend className="font-semibold text-xl!">
								Social Links
							</FieldLegend>

							<Button
								onClick={addLink}
								variant="outline"
								className="cursor-pointer"
							>
								<Plus /> Add Link
							</Button>
						</div>

						{resumeData.socialLinks.map(({ id, platform, url }) => (
							<Card key={id} className="grid grid-cols-[1fr_auto] gap-4 px-4">
								<FieldGroup className="gap-2">
									<Input
										id="platformName"
										placeholder="Platform (e.g., LinkedIn)"
										value={platform}
										onChange={(e) =>
											updateLink({ id, url, platform: e.target.value })
										}
									/>
									<Input
										id="platformLink"
										placeholder="URL"
										value={url}
										onChange={(e) =>
											updateLink({ id, platform, url: e.target.value })
										}
									/>
								</FieldGroup>
								<Button
									onClick={() => deleteLink(id)}
									variant="ghost"
									className="cursor-pointer text-destructive hover:text-destructive hover:bg-destructive/10"
								>
									<Trash2 />
								</Button>
							</Card>
						))}
					</FieldGroup>
				</FieldSet>

				<FieldSeparator />

				<FieldSet>
					<FieldGroup className="gap-2">
						<FieldLegend className="font-semibold text-xl!">
							Content Blocks
						</FieldLegend>
						<Field className="grid grid-cols-[1fr_auto]">
							<Select>
								<SelectTrigger id="template">
									<SelectValue placeholder="About" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="about">About</SelectItem>
									<SelectItem value="links">Links</SelectItem>
									<SelectItem value="projects">Projects</SelectItem>
									<SelectItem value="skills">Skills</SelectItem>
									<SelectItem value="expirience">Expirience</SelectItem>
									<SelectItem value="education">Education</SelectItem>
								</SelectContent>
							</Select>
							<Button className="cursor-pointer">
								<Plus /> Add Block
							</Button>
						</Field>
					</FieldGroup>
				</FieldSet>
			</FieldGroup>
		</form>
	);
};

export default EditorForm;
