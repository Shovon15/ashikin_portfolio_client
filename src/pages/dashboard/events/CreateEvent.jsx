import { IconButton, Input, Option, Select, Spinner } from "@material-tailwind/react";
import { useRef, useState } from "react";
import { post } from "../../../utils/fetchApi";
import { useNavigate } from "react-router-dom";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import DateTimePicker from "react-datetime-picker";

// ----------------date picker css
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

// import "./CreateEvent.css";

import handleFileUpload from "../../../helper/ImageUploader";

import { LuUploadCloud } from "react-icons/lu";
import { BsTrashFill } from "react-icons/bs";
import GoBackButton from "../../../components/Button/GoBackButton";
import { Editor } from "@tinymce/tinymce-react";
import { showErrorToast, showSuccessToast } from "../../../helper/ToastMessage";
import PrimaryButton from "../../../components/Button/PrimaryButton";

const CreateEvent = () => {
	const [title, setTitle] = useState("");
	const [eventType, setEventType] = useState("");
	const [image, setImage] = useState(null);
	const [dateTime, setDateTime] = useState(new Date());
	const [content, setContent] = useState("");
	const [fileName, setFileName] = useState("No file selected");
	const [isLoading, setIsLoading] = useState(false);

	const editorRef = useRef(null);
	const inputImageRef = useRef(null);

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
			setIsLoading(false);
			showErrorToast("Please Fill in All Fields");
			return;
		}

		try {
			const res = await post("events/write-event", formData);
			showSuccessToast(res.data?.message);
			navigate("/dashboard/programs");
		} catch (err) {
			showErrorToast(err?.response?.data.message || "An error occurred");
		} finally {
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
		<div className="lg:pb-10">
			<GoBackButton />
			<HeaderText className="py-5">Create Programs</HeaderText>
			<form onSubmit={handleEventForm}>
				<div className="w-full lg:w-1/2 mx-auto flex flex-col gap-2 pb-2">
					<div>
						<p className="font-bold text-color-primary  py-2">
							Program Title <span className="text-red-500">*</span>
						</p>
						<Input
							size="lg"
							color="blue"
							label="Program Title"
							className="text-color-primary "
							style={{ fontSize: "18px", fontWeight: "normal" }}
							onChange={(ev) => setTitle(ev.target.value)}
						/>
					</div>
					<div>
						<p className="font-bold text-color-primary py-2">
							Program Type <span className="text-red-500">*</span>
						</p>
						<Select
							value={eventType}
							onChange={(value) => setEventType(value)}
							label="Select Event Type"
							color="blue"
							className="!p-0 "
						>
							{selectData.map((item) => (
								<Option
									key={item.value}
									value={item.value}
									style={{
										fontSize: "18px",
										fontWeight: "normal",
										color: eventType === item.value ? "#CCA531 " : "#000",
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
						<p className="font-bold text-color-primary py-2">
							Service Image <span className="text-red-500">*</span>
						</p>
						<div
							className={`center border-2 border-dashed w-full h-80 cursor-pointer
                            ${image ? "border-color-border" : "border-gray-500"}`}
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
								<img src={URL.createObjectURL(image)} className="w-full h-full p-5" alt={fileName} />
							) : (
								<div className="flex flex-col items-center gap-2 text-color-primary">
									<LuUploadCloud className="w-12 h-12 " />
									<p className="">Browse file to upload</p>
								</div>
							)}
						</div>
						<section
							className="flex-end gap-3 bg-color-secondary
                           rounded-md mt-1 p-2 pr-2 text-color-primary"
						>
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
					</div>
					<div className="my-5 flex flex-col">
						<label className="font-bold text-color-primary py-2">
							Select date and time of Program <span className="text-red-500">*</span>
						</label>
						<DateTimePicker onChange={setDateTime} value={dateTime} className="pb-5" />
					</div>
				</div>
				{/* text-editor */}
				<div className="h-auto">
					<p className="font-bold text-color-primary py-2">
						Program Text <span className="text-red-500">*</span>
					</p>
					<Editor
						apiKey="dne6kwcfh5bie2h2hkj9qjtgu1xk4qthm9k6xajczb3vuj4e"
						onInit={(evt, editor) => {
							editorRef.current = editor;
							editor.on("change", () => setContent(editor.getContent()));
						}}
						init={{
							plugins:
								"anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
							toolbar:
								"undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
						}}
					/>
				</div>
				<div className="w-full flex justify-center items-center my-10 ">
					<PrimaryButton buttonType={"submit"} disabled={isLoading} className="px-16">
						{isLoading ? <Spinner color="gray" className="mx-auto" /> : "Submit"}
					</PrimaryButton>
				</div>
			</form>
		</div>
	);
};

export default CreateEvent;
