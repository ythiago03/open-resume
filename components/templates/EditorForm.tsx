"use client";

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

import { Eye, EyeOff, Plus, Trash2 } from "lucide-react";

import type {
	AboutBlock,
	CvBlockTypes,
	CvSocialLink,
	ResumeData,
} from "@/app/types/ResumeData";
import { useState } from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../ui/accordion";

interface EditorFormProps {
	resumeData: ResumeData;
	changeResumeData: (data: ResumeData) => void;
}

const EditorForm = ({ resumeData, changeResumeData }: EditorFormProps) => {
	const [selectedBlock, setSelectedBlock] = useState<string>("about");

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

	const addBlock = (type: "about" | "skills") => {
		const uuid = crypto.randomUUID();
		const newBlocks = [];

		if (type === "about") {
			const newBlock: AboutBlock = {
				id: uuid,
				type: type,
				title: "About",
				order: 0,
				visible: true,
				data: {
					description: "",
				},
			};
			newBlocks.push(newBlock);
		}
		if (type === "skills") {
			const newBlock = {
				id: uuid,
				type: type,
				title: "Skills",
				order: 0,
				visible: true,
				data: {
					skills: [],
				},
			};
			newBlocks.push(newBlock);
		}

		changeResumeData({
			...resumeData,
			blocks: [...resumeData.blocks, ...newBlocks],
		});
	};

	const changeAboutBlock = (
		id: string,
		content: { title?: string; content?: string },
	) => {
		changeResumeData({
			...resumeData,
			blocks: resumeData.blocks.map((block) =>
				block.type === "about" && block.id === id
					? {
							...block,
							title: content.title ?? block.title,
							data: { description: content.content ?? block.data.description },
						}
					: block,
			),
		});
	};

	const deleteBlock = (id: string) => {
		changeResumeData({
			...resumeData,
			blocks: resumeData.blocks.filter((block) => block.id !== id),
		});
	};

	const toggleBlockView = (id: string) => {
		changeResumeData({
			...resumeData,
			blocks: resumeData.blocks.map((block) =>
				block.id === id ? { ...block, visible: !block.visible } : block,
			),
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
								type="button"
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
							<Select
								defaultValue="about"
								onValueChange={(value: string) => setSelectedBlock(value)}
							>
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
							<Button
								type="button"
								onClick={() => addBlock(selectedBlock as "about" | "skills")}
								className="cursor-pointer"
							>
								<Plus /> Add Block
							</Button>
						</Field>

						<Accordion type="single" collapsible className="w-full px-2">
							{resumeData.blocks.map(
								(block) =>
									block.type === "about" && (
										<div key={block.id} className="border-b">
											<AccordionItem value={block.id} className="border-b">
												<div className="flex items-center gap-2">
													<AccordionTrigger className="flex items-center cursor-pointer font-semibold">
														{block.title}
														{!block.visible && (
															<EyeOff className="size-4 text-muted-foreground" />
														)}
													</AccordionTrigger>
													<Button
														type="button"
														onClick={() => toggleBlockView(block.id)}
														variant="ghost"
														className="cursor-pointer"
													>
														{block.visible ? <Eye /> : <EyeOff />}
													</Button>
													<Button
														type="button"
														onClick={() => deleteBlock(block.id)}
														variant="ghost"
														className="cursor-pointer text-destructive hover:text-destructive hover:bg-destructive/10"
													>
														<Trash2 />
													</Button>
												</div>
												<AccordionContent className="flex flex-col gap-4 mt-4">
													<Field>
														<FieldLabel
															className="font-semibold"
															htmlFor="aboutTitle"
														>
															Block Title
														</FieldLabel>
														<Input
															id="aboutTitle"
															placeholder="About"
															value={block.title}
															onChange={(e) =>
																changeAboutBlock(block.id, {
																	title: e.target.value,
																})
															}
															required
														/>
													</Field>

													<Field>
														<FieldLabel
															className="font-semibold"
															htmlFor="aboutContent"
														>
															About Content
														</FieldLabel>
														<Textarea
															id="aboutContent"
															placeholder="Tell your story..."
															className="resize-vertical"
															value={block.data.description}
															onChange={(e) =>
																changeAboutBlock(block.id, {
																	content: e.target.value,
																})
															}
															rows={4}
														/>
													</Field>
												</AccordionContent>
											</AccordionItem>
										</div>
									),
							)}

							{resumeData.blocks.map(
								(block) =>
									block.type === "skills" && (
										<div key={block.id} className="border-b">
											<AccordionItem value="skills">
												<div className="flex items-center gap-2">
													<AccordionTrigger className="flex items-center cursor-pointer font-semibold">
														{block.title}
														{!block.visible && (
															<EyeOff className="size-4 text-muted-foreground" />
														)}
													</AccordionTrigger>
													<Button
														type="button"
														onClick={() => toggleBlockView(block.id)}
														variant="ghost"
														className="cursor-pointer"
													>
														{block.visible ? <Eye /> : <EyeOff />}
													</Button>
													<Button
														type="button"
														onClick={() => deleteBlock(block.id)}
														variant="ghost"
														className="cursor-pointer text-destructive hover:text-destructive hover:bg-destructive/10"
													>
														<Trash2 />
													</Button>
												</div>

												<AccordionContent className="flex flex-col gap-4 mt-4">
													<Field>
														<FieldLabel
															className="font-semibold"
															htmlFor="skillBlockTittle"
														>
															Block Title
														</FieldLabel>
														<Input
															id="skillBlockTittle"
															placeholder="Skills"
															value={block.title}
															// onChange={(e) =>
															// 	changeAboutBlock(block.id, {
															// 		title: e.target.value,
															// 	})
															// }
															required
														/>
													</Field>

													<div className="grid grid-cols-2 gap-4">
														{block.data.skills.map((skill: string) => (
															<div key={skill} className="flex gap-2">
																<Input placeholder="Skill name" value={skill} />
																<Button
																	type="button"
																	// onClick={() => deleteBlock(block.id)}
																	variant="ghost"
																	className="cursor-pointer text-destructive hover:text-destructive hover:bg-destructive/10"
																>
																	<Trash2 />
																</Button>
															</div>
														))}
													</div>

													<Button
														className="font-semibold cursor-pointer"
														variant="outline"
													>
														<Plus /> Add Skill
													</Button>
												</AccordionContent>
											</AccordionItem>
										</div>
									),
							)}
						</Accordion>
					</FieldGroup>
				</FieldSet>
			</FieldGroup>
		</form>
	);
};

export default EditorForm;
