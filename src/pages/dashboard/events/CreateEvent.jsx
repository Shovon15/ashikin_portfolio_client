/* eslint-disable no-unused-vars */
import { Button, IconButton, Input, Option, Select, Spinner } from "@material-tailwind/react";
import { useContext, useRef, useState } from "react";
import { post } from "../../../utils/fetchApi";
import { useNavigate } from "react-router-dom";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import JoditEditor from "jodit-react";
import { showErrorToast, showSuccessToast } from "../../../components/shared/ToastMessage";
import DateTimePicker from "react-datetime-picker";

// ----------------date picker css
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

import "./CreateEvent.css";
import { DataContext } from "../../../context/DataContext";
import handleFileUpload from "../../../helper/ImageUploader";

import { LuUploadCloud } from "react-icons/lu";
import { BsTrashFill } from "react-icons/bs";
import GoBackButton from "../../../components/Button/GoBackButton";

const CreateEvent = () => {
	const [title, setTitle] = useState("");
	const [eventType, setEventType] = useState("");
	const [image, setImage] = useState(null);
	const [dateTime, setDateTime] = useState(new Date());
	const [content, setContent] = useState("");
	const [showErrorState, setShowErrorState] = useState(false);
	const [fileName, setFileName] = useState("No file selected");
	const [isLoading, setIsLoading] = useState(false);

	const editor = useRef(null);

	const navigate = useNavigate();

	const handleEventForm = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		let imgData = {};
		if (image) {
			imgData = await handleFileUpload(image);
		}

		const formData = {
			title,
			eventType,
			cover: imgData?.url || null,
			content,
			dateTime: dateTime.toString(),
		};

		if (Object.values(formData).some((field) => !field)) {
			// Handle the case where data is missing
			setShowErrorState(true);
			setIsLoading(false);
			showErrorToast("Please Fill in All Fields");
			return;
		}
		setShowErrorState(false);

		try {
			const res = await post("events/write-event", formData);
			showSuccessToast(res.data?.message);
			setIsLoading(false);
			navigate("/dashboard/events");
		} catch (err) {
			// console.error(err, "err");
			showErrorToast(err.message);
			setShowErrorState(false);
			showErrorToast(err?.response?.data.message || "An error occurred");
			setIsLoading(false);
		}
	};

	const selectData = [
		{
			name: "Free",
			value: "free",
		},
		{
			name: "Premium",
			value: "premium",
		},
	];

	return (
		<div className="">
			<GoBackButton />
			<HeaderText>Add Event</HeaderText>
			<form onSubmit={handleEventForm}>
				<div className="w-full lg:w-1/2 flex flex-col gap-2 pb-2">
					<div>
						<p className="font-bold text-textPrimary dark:text-white py-2">
							Event Title <span className="text-red-500">*</span>
						</p>
						<Input
							size="lg"
							color="blue"
							label="Event Title"
							className="text-gray-500 dark:text-white"
							style={{ fontSize: "18px", fontWeight: "normal" }}
							onChange={(ev) => setTitle(ev.target.value)}
						/>
					</div>
					<div>
						<p className="font-bold text-textPrimary dark:text-white py-2">
							Event Type <span className="text-red-500">*</span>
						</p>
						<Select
							value={eventType}
							onChange={(value) => setEventType(value)}
							label="Select Event Type"
							color="blue"
							className="!p-0"
						>
							{selectData.map((item) => (
								<Option
									key={item.value}
									value={item.value}
									style={{
										fontSize: "18px",
										fontWeight: "normal",
										color: eventType === item.value ? "#2196F3" : "black",
									}}
									className="m-2 border-b border-gray-500 rounded-none"
								>
									{item.name}
								</Option>
							))}
						</Select>
					</div>
					<div>
						<p className="font-bold text-textPrimary dark:text-white py-2">
							Cover Image <span className="text-red-500">*</span>
						</p>
						<div
							className={`flex justify-center items-center border-2 border-dashed  w-full h-80 cursor-pointer ${
								image ? "border-blue-500" : "border-gray-500"
							}`}
							onClick={() => document.querySelector(".input-field").click()}
						>
							<input
								type="file"
								accept="image/*"
								className="input-field"
								hidden
								onChange={({ target: { files } }) => {
									files[0] && setFileName(files[0].name);
									if (files) {
										setImage(files[0]);
									}
								}}
							/>
							{image ? (
								<img src={URL.createObjectURL(image)} className="w-full h-full p-5" alt={fileName} />
							) : (
								<div className="flex flex-col items-center gap-2 dark:text-white">
									<LuUploadCloud className="w-12 h-12" />
									<p>Browse file to upload</p>
								</div>
							)}
						</div>
						<section className="flex justify-end gap-3 items-center bg-gray-300 rounded-md mt-1 p-2">
							{fileName}
							{image !== null && (
								<IconButton variant="text" className="rounded-full">
									<BsTrashFill
										onClick={() => {
											setFileName("No file selected");
											setImage(null);
										}}
										className="w-5 h-5 text-red-500 cursor-pointer"
									/>
								</IconButton>
							)}
						</section>
					</div>
				</div>
				<div className="my-5 flex flex-col ">
					<label className="font-bold text-textPrimary dark:text-white py-2">
						Select date and time of event <span className="text-red-500">*</span>
					</label>
					<DateTimePicker onChange={setDateTime} value={dateTime} />
				</div>

				<div className="h-auto">
					<p className="font-bold text-textPrimary dark:text-white py-2">
						Event Text <span className="text-red-500">*</span>
					</p>
					<JoditEditor
						ref={editor}
						value={content}
						tabIndex={1} // tabIndex of textarea
						onBlur={(newContent) => setContent(newContent)}
						className="h-full"
					/>
				</div>
				<div className="w-full md:w-2/6 md:mx-auto my-10 ">
					{/* {showErrorState && (
						<p className="text-red-500 text-lg font-normal text-center pb-2">Fill in all input field</p>
					)} */}
					<Button
						type="submit"
						variant="text"
						className="bg-buttonPrimary hover:bg-buttonHover active:bg-buttonActive text-white capitalize text-lg py-2 w-full"
					>
						{isLoading ? <Spinner color="blue" className="mx-auto" /> : "Submit"}
					</Button>
				</div>
			</form>
		</div>
	);
};

export default CreateEvent;
