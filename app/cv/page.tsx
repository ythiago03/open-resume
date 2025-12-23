import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSeparator,
	FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Download, Eye, FileText, Save } from "lucide-react";
import Link from "next/link";

const page = () => {
	return (
		<div>
			<header className="sticky top-0 z-50 border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
				<div className="container mx-auto flex items-center justify-between h-16 px-4">
					<div className="flex gap-4">
						<Button
							className="font-semibold text-md cursor-pointer"
							variant="ghost"
							asChild
						>
							<Link href="/dashboard">
								<ArrowLeft className="size-5" />
							</Link>
						</Button>

						<Link href="/" className="flex items-center gap-2">
							<FileText className="size-6 text-primary" />
							<span className="text-xl font-semibold">CV Editor</span>
						</Link>
					</div>

					<div className="flex items-center gap-4">
						<span className="text-muted-foreground">Saved</span>
						<Button className="cursor-pointer" variant="outline">
							<Save /> Save
						</Button>
						<Button className="cursor-pointer" variant="outline">
							<Download /> Export
						</Button>
						<Button className="cursor-pointer">
							<Eye /> Preview
						</Button>
					</div>
				</div>
			</header>

			<main className="container mx-auto px-6">
				<ResizablePanelGroup direction="horizontal">
					<ResizablePanel defaultSize={50} minSize={40}>
						<div className="flex h-[calc(100vh-70px)] p-6">
							<Card className="h-full w-full overflow-hidden">
								<div className="px-4">
									<CardTitle className="text-lg">Edit Content</CardTitle>
									<CardDescription>Customize your online CV</CardDescription>
								</div>

								<Separator />

								<form className="overflow-y-auto">
									<FieldGroup className="px-6">
										<FieldSet>
											<FieldLegend className="font-semibold !text-xl">
												Template Design
											</FieldLegend>
											<FieldGroup className="gap-2">
												<Field className="w-fit">
													<FieldLabel
														htmlFor="template"
														className="font-semibold"
													>
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
												<FieldLegend className="font-semibold !text-xl">
													Personal Info
												</FieldLegend>
												<Field>
													<FieldLabel
														className="font-semibold"
														htmlFor="fullName"
													>
														Full Name
													</FieldLabel>
													<Input
														id="fullName"
														placeholder="John Doe"
														required
													/>
												</Field>
												<Field>
													<FieldLabel
														className="font-semibold"
														htmlFor="tagline"
													>
														Tagline
													</FieldLabel>
													<Input
														id="tagline"
														placeholder="Product Designer & Developer"
														required
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
													/>
												</Field>
												<Field>
													<FieldLabel
														className="font-semibold"
														htmlFor="location"
													>
														Location
													</FieldLabel>
													<Input
														id="location"
														placeholder="San Francisco, CA"
														required
													/>
												</Field>
											</FieldGroup>
										</FieldSet>
										<FieldSeparator />
										<FieldSet>
											<FieldLegend>Billing Address</FieldLegend>
											<FieldDescription>
												The billing address associated with your payment method
											</FieldDescription>
											<FieldGroup>
												<Field orientation="horizontal">
													{/* <Checkbox
														id="checkout-7j9-same-as-shipping-wgm"
														defaultChecked
													/> */}
													<FieldLabel
														htmlFor="checkout-7j9-same-as-shipping-wgm"
														className="font-normal"
													>
														Same as shipping address
													</FieldLabel>
												</Field>
											</FieldGroup>
										</FieldSet>
										<FieldSet>
											<FieldGroup>
												<Field>
													<FieldLabel htmlFor="checkout-7j9-optional-comments">
														Comments
													</FieldLabel>
													<Textarea
														id="checkout-7j9-optional-comments"
														placeholder="Add any additional comments"
														className="resize-none"
													/>
												</Field>
											</FieldGroup>
										</FieldSet>
										<Field orientation="horizontal">
											<Button type="submit">Submit</Button>
											<Button variant="outline" type="button">
												Cancel
											</Button>
										</Field>
									</FieldGroup>
								</form>
							</Card>
						</div>
					</ResizablePanel>
					<ResizableHandle withHandle />
					<ResizablePanel defaultSize={50} minSize={45}>
						<div className="flex flex-col h-[calc(100vh-70px)] p-6">
							<div className="px-2 mb-4">
								<CardTitle className="text-lg">Edit Content</CardTitle>
								<CardDescription>See your changes in real-time</CardDescription>
							</div>
							<Card className="h-full w-full overflow-hidden"></Card>
						</div>
					</ResizablePanel>
				</ResizablePanelGroup>
			</main>
		</div>
	);
};

export default page;
