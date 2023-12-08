import {  CardBody, Typography } from "@material-tailwind/react";
import eventImg from "../../../assets/image/events.jpg";
export function EventSummary() {
	return (
		<div className="mt-6 rounded-md shadow-xl border border-primary dark:border-borderDark cursor-pointer hover:shadow-xxl transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300">
			<CardBody className="flex items-center rounded-lg dark:bg-darkSecondary">
				<div>
					<img className="w-44" src={eventImg} />
				</div>
				<div className="w-56 flex flex-col items-center">
					<Typography variant="h5" className="mb-2 text-textPrimary text-4xl dark:text-darkTextPrimary">
						3
					</Typography>
					<Typography variant="h5" className="mb-2 text-textPrimary text-4xl dark:text-darkTextPrimary">
						Events
					</Typography>
				</div>
			</CardBody>
		</div>
	);
}

export default EventSummary;
