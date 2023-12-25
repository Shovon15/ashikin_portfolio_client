/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Button, IconButton, Input, Option, Select, Spinner } from "@material-tailwind/react";
import { useContext, useEffect, useRef, useState } from "react";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import DateTimePicker from "react-datetime-picker";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../../../context/DataContext";
import { BsTrashFill } from "react-icons/bs";
import { LuUploadCloud } from "react-icons/lu";
import handleFileUpload from "../../../helper/ImageUploader";
import { put } from "../../../utils/fetchApi";
import GoBackButton from "../../../components/Button/GoBackButton";
import { Editor } from "@tinymce/tinymce-react";
import LoadingSpinner from "../../../components/shared/loadingSpinner/LoadingSpinner";
import { showErrorToast, showSuccessToast } from "../../../helper/ToastMessage";
import PrimaryButton from "../../../components/Button/PrimaryButton";

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
	const [isDataLoading, setIsDataLoading] = useState(false);

	const [isUpdateImage, setIsUpdateImage] = useState(false);
	const [eventData, setEventData] = useState(false);

	const editorRef = useRef(null);
	const inputImageRef = useRef(null);

	const navigate = useNavigate();

	const { id } = useParams();

	useEffect(() => {
		const fetchEvent = async () => {
			setIsDataLoading(true);
			const data = await fetchEventById(id);
			setEventData(data);
			setIsDataLoading(false);
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
			navigate("/dashboard/programs");
		} catch (err) {
			setShowErrorState(false);
			showErrorToast(err?.response?.data.message || "An error occurred");
		} finally {
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

	if (isDataLoading) {
		return <LoadingSpinner />;
	}

	return (
		<div>
			<GoBackButton />
			<HeaderText className="py-5">Update Program</HeaderText>
			<form onSubmit={handleEventForm}>
				<div className="w-full md:w-1/2 mx-auto flex flex-col gap-2 pb-2">
					<div>
						<p className="font-bold text-color-text  py-2">
							Program Title <span className="text-red-500">*</span>
						</p>
						<Input
							size="lg"
							color="yellow"
							value={title}
							label="Program Title"
							className="text-color-text "
							style={{ fontSize: "18px", fontWeight: "normal" }}
							onChange={(ev) => setTitle(ev.target.value)}
						/>
					</div>
					<div>
						<p className="font-bold text-color-text py-2">
							Program Type <span className="text-red-500">*</span>
						</p>
						<Select
							value={eventType}
							onChange={(value) => setEventType(value)}
							label="Select Event Type"
							color="yellow"
							className="!p-0 "
						>
							{selectData.map((item) => (
								<Option
									key={item.value}
									value={item.value}
									style={{
										fontSize: "18px",
										fontWeight: "normal",
										color: eventType === item.value ? "#CCA531 " : "white",
										backgroundColor: "inherit",
									}}
									className="!bg-color-primary mt-2 "
								>
									{item.name}
								</Option>
							))}
						</Select>
					</div>
					<div>
						<p className="font-bold text-color-text py-2">
							Cover Image <span className="text-red-500">*</span>
						</p>
						{!isUpdateImage ? (
							<div>
								<img src={oldImage} alt="..." />
								<div className="flex justify-center mt-2">
									<PrimaryButton className=" " onClick={handleUploadImage}>
										Upload new Image
									</PrimaryButton>
								</div>
							</div>
						) : (
							<>
								<div
									className={`flex justify-center items-center border-2 border-dashed  w-full h-80 cursor-pointer ${
										image ? "border-color-border" : "border-gray-500"
									}`}
									onClick={() => inputImageRef.current.click()}
								>
									<input
										type="file"
										accept="image/*"
										className="input-field"
										hidden
										onChange={(event) => {
											const files = event.target.files;
											if (files[0]) {
												setFileName(files[0].name);
												setImage(files[0]);
											}
										}}
										ref={inputImageRef}
										key={fileName}
									/>
									{image ? (
										<img
											src={URL.createObjectURL(image)}
											className="w-full h-full p-5"
											alt={fileName}
										/>
									) : (
										<div className="flex flex-col items-center gap-2 text-color-text">
											<LuUploadCloud className="w-12 h-12" />
											<p>Browse file to upload</p>
										</div>
									)}
								</div>
								<section className="flex justify-end gap-3 items-center bg-color-secondary text-color-text rounded-md mt-1 p-2">
									{fileName}
									{image !== null && (
										<IconButton variant="text" className="rounded-full">
											<BsTrashFill
												onClick={() => {
													setFileName("No file selected");
													setImage(null);
													inputImageRef.current.value = null;
												}}
												className="w-5 h-5 text-red-500 cursor-pointer"
											/>
										</IconButton>
									)}
								</section>
								<p className="text-red-500 text-md py-2">
									Note: If you don&apos;t want to upload a new cover image, please refresh the page
									before clicking the update button.
								</p>
							</>
						)}
					</div>
					<div className="my-5 flex flex-col ">
						<label className="font-bold text-color-text py-2">
							Select date and time of event <span className="text-red-500">*</span>
						</label>
						<DateTimePicker onChange={setDateTime} value={dateTime} className="pb-5" />
					</div>
				</div>

				<div className="h-auto">
					<p className="font-bold text-color-text dark:text-white py-2">
						Event Text <span className="text-red-500">*</span>
					</p>
					<Editor
						apiKey="dne6kwcfh5bie2h2hkj9qjtgu1xk4qthm9k6xajczb3vuj4e"
						onInit={(evt, editor) => {
							editorRef.current = editor;
							editor.on("change", (changeEvent) => setContent(editor.getContent()));
						}}
						init={{
							plugins:
								"anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
							toolbar:
								"undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
						}}
						initialValue={content}
					/>
				</div>
				<div className="w-full flex justify-center items-center my-10 ">
					<PrimaryButton buttonType={"submit"} disabled={isLoading} className="px-16">
						{isLoading ? <Spinner color="gray" className="mx-auto" /> : "Update"}
					</PrimaryButton>
				</div>
			</form>
		</div>
	);
};

export default UpdateEvent;
