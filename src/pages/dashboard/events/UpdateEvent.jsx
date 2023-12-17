/* eslint-disable no-unused-vars */
import { Button, IconButton, Input, Option, Select, Spinner } from "@material-tailwind/react";
import { useContext, useEffect, useRef, useState } from "react";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import DateTimePicker from "react-datetime-picker";
import JoditEditor from "jodit-react";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../../../context/DataContext";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import { BsTrashFill } from "react-icons/bs";
import { LuUploadCloud } from "react-icons/lu";
import handleFileUpload from "../../../helper/ImageUploader";
import { showErrorToast, showSuccessToast } from "../../../components/shared/ToastMessage";
import { put } from "../../../utils/fetchApi";
import GoBackButton from "../../../components/Button/GoBackButton";

const UpdateEvent = () => {
	const { fetchEventById } = useContext(DataContext);

	const [title, setTitle] = useState("");
	const [eventType, setEventType] = useState("");
	const [oldImage, setOldImage] = useState("");
	const [image, setImage] = useState(null);
	const [dateTime, setDateTime] = useState("");
	const [content, setContent] = useState("");
	const [showErrorState, setShowErrorState] = useState(false);
	const [fileName, setFileName] = useState("No file selected");
	const [isLoading, setIsLoading] = useState(false);

	const [isUpdateImage, setIsUpdateImage] = useState(false);
	const [eventData, setEventData] = useState(false);

	const editor = useRef(null);

	const navigate = useNavigate();

	const { id } = useParams();
	// console.log(receiveEventById);

	useEffect(() => {
		const fetchEvent = async () => {
			setIsLoading(true);
			const data = await fetchEventById(id);
			setEventData(data);
			setIsLoading(false);
		};
		fetchEvent();
	}, []);

	useEffect(() => {
		if (Object.keys(eventData).length !== 0) {
			setTitle(eventData.title);
			setEventType(eventData.eventType);
			setOldImage(eventData.cover);
			setDateTime(new Date(eventData.dateTime));
			setContent(eventData.content);
		}
	}, [eventData]);

	const handleUploadImage = () => {
		setIsUpdateImage(true);
	};

	const handleEventForm = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		let imgData = {};
		if (isUpdateImage && image) {
			imgData = await handleFileUpload(image);
		}

		const formData = {
			title,
			eventType,
			content,
			dateTime: dateTime.toString(),
			...(isUpdateImage ? { cover: imgData?.url || null } : {}),
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
			const res = await put(`events/${id}`, formData);
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
			name: "free",
			value: "free",
		},
		{
			name: "premium",
			value: "premium",
		},
	];
	// if (isLoading) {
	// 	return <LoadingSpinner />;
	// }

	return (
		<div className="px-10">
			<GoBackButton />
			<HeaderText>Add Event</HeaderText>
			<form onSubmit={handleEventForm}>
				<div className="w-1/2 flex flex-col gap-2 pb-2">
					<div>
						<p className="font-bold text-textPrimary dark:text-white py-2">
							Event Title <span className="text-red-500">*</span>
						</p>
						<Input
							size="lg"
							color="blue"
							value={title}
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
									className="m-2"
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
						{!isUpdateImage ? (
							<div>
								<img src={oldImage} alt="..." />
								<div className="flex justify-center mt-2">
									<Button className="py-3 bg-textPrimary" onClick={handleUploadImage}>
										Upload new Image
									</Button>
								</div>
							</div>
						) : (
							<>
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
										<img
											src={URL.createObjectURL(image)}
											className="w-full h-full p-5"
											alt={fileName}
										/>
									) : (
										<div className="flex flex-col items-center gap-2">
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
								<p className="text-red-500 text-sm py-2">
									Note: If you don&apos;t want to upload a new cover image, please refresh the page
									before clicking the update button.
								</p>
							</>
						)}
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
				<div className="mx-auto my-10 w-2/6">
					{/* {showErrorState && (
						<p className="text-red-500 text-lg font-normal text-center pb-2">Fill in all input field</p>
					)} */}
					<Button
						type="submit"
						variant="text"
						className="bg-buttonPrimary hover:bg-buttonHover active:bg-buttonActive text-white capitalize text-lg py-2 w-full"
					>
						{isLoading ? <Spinner color="blue" className="mx-auto" /> : "Update"}
					</Button>
				</div>
			</form>
		</div>
	);
};

export default UpdateEvent;
