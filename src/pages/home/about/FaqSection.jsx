import React from "react";
import { Accordion, AccordionHeader, AccordionBody, Typography } from "@material-tailwind/react";
import { useState } from "react";

function Icon({ id, open }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={2}
			stroke="currentColor"
			className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
		>
			<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
		</svg>
	);
}

export function FaqSection() {
	const [open, setOpen] = useState(1);

	const handleOpen = (value) => setOpen(open === value ? 0 : value);

	return (
		<div className="py-5 md:py-10">
			<Typography
				variant="h2"
				color="blue-gray"
				className="flex justify-center font-bold mb-3 dark:text-darkTextPrimary"
			>
				FAQ
			</Typography>
			<Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
				<AccordionHeader
					onClick={() => handleOpen(1)}
					className={`border-b-0 transition-colors dark:text-white ${
						open === 1 ? "text-blue-500 hover:!text-blue-700" : ""
					}`}
				>
					What is Material Tailwind?
				</AccordionHeader>
				<AccordionBody className="text-lg dark:text-white">
					We&apos;re not always in the position that we want to be at. We&apos;re constantly growing.
					We&apos;re constantly making mistakes. We&apos;re constantly trying to express ourselves and
					actualize our dreams.
				</AccordionBody>
			</Accordion>
			<Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
				<AccordionHeader
					onClick={() => handleOpen(2)}
					className={`border-b-0 dark:text-white transition-colors ${
						open === 2 ? "text-blue-500 hover:!text-blue-700" : ""
					}`}
				>
					How to use Material Tailwind?
				</AccordionHeader>
				<AccordionBody className="text-lg dark:text-white">
					We&apos;re not always in the position that we want to be at. We&apos;re constantly growing.
					We&apos;re constantly making mistakes. We&apos;re constantly trying to express ourselves and
					actualize our dreams.
				</AccordionBody>
			</Accordion>
			<Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
				<AccordionHeader
					onClick={() => handleOpen(3)}
					className={`border-b-0 dark:text-white transition-colors ${
						open === 3 ? "text-blue-500 hover:!text-blue-700" : ""
					}`}
				>
					What can I do with Material Tailwind?
				</AccordionHeader>
				<AccordionBody className="text-lg dark:text-white">
					We&apos;re not always in the position that we want to be at. We&apos;re constantly growing.
					We&apos;re constantly making mistakes. We&apos;re constantly trying to express ourselves and
					actualize our dreams.
				</AccordionBody>
			</Accordion>
		</div>
	);
}

export default FaqSection;
