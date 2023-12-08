import { Button, Input, Option, Select } from "@material-tailwind/react";

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

const CreateEvent = () => {
	const { fetchEventData } = useContext(DataContext);
	const [title, setTitle] = useState("");
	const [eventType, setEventType] = useState("");
	const [files, setFiles] = useState("");
	const [dateTime, setDateTime] = useState(new Date());
	const [content, setContent] = useState("");
	const [showErrorState, setShowErrorState] = useState(false);

	const editor = useRef(null);

	const navigate = useNavigate();

	const handleEventForm = async (e) => {
		e.preventDefault();
		// console.log({ title, eventType, files, content, dateTime });

		if (!title || !eventType || !files || files.length === 0 || !content || !dateTime) {
			// Handle the case where data is missing
			setShowErrorState(true); // Update state to show an error message
			showErrorToast("Fill in all fields");
			return;
		} else {
			setShowErrorState(false);

			const formData = new FormData();
			formData.append("title", title);
			formData.append("eventType", eventType);
			formData.append("file", files[0]);
			formData.append("dateTime", dateTime);
			formData.append("content", content);
			try {
				const res = await post("events/write-event", formData, "multipart/form-data");
				// console.log(res.data, "response data");
				showSuccessToast(res.data?.message);
				fetchEventData();
				navigate("/dashboard/events");
			} catch (err) {
				console.error(err, "err");
				showErrorToast(err?.response?.data.message);
			}
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

	return (
		<div className="px-10">
			<HeaderText>Add Event</HeaderText>
			<form onSubmit={handleEventForm}>
				<div className="w-1/2 flex flex-col gap-2 pb-2">
					<div>
						<p className="font-bold text-blue-500 dark:text-white py-2">
							Event Title <span className="text-red-500">*</span>
						</p>
						<Input
							size="lg"
							color="blue"
							label="Event Title"
							style={{ fontSize: "20px", fontWeight: "normal" }}
							onChange={(ev) => setTitle(ev.target.value)}
						/>
					</div>
					<div>
						<p className="font-bold text-blue-500 dark:text-white py-2">
							Event Type <span className="text-red-500">*</span>
						</p>
						<Select
							value={eventType}
							onChange={(value) => setEventType(value)}
							label="Select Event Type"
							color="blue"
						>
							{selectData.map((item) => (
								<Option key={item.value} value={item.value} className="text-lg">
									{item.name}
								</Option>
							))}
						</Select>
					</div>
					<div>
						<p className="font-bold text-blue-500 dark:text-white py-2">
							Event cover image <span className="text-red-500">*</span>
						</p>
						<Input
							size="lg"
							type="file"
							onChange={(event) => setFiles(event.target.files)}
							color="blue"
							label="Image"
						/>
					</div>
				</div>
				<div className="my-5 flex flex-col ">
					<label className="font-bold text-blue-500 dark:text-white py-2">
						Select date and time of event <span className="text-red-500">*</span>
					</label>
					<DateTimePicker onChange={setDateTime} value={dateTime} />
				</div>

				<div className="h-auto">
					<p className="font-bold text-blue-500 dark:text-white py-2">
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
					{showErrorState && (
						<p className="text-red-500 text-xl font-semibold text-center pb-2">Fill in all input field</p>
					)}
					<Button
						type="submit"
						variant="text"
						className="bg-blue-600 hover:bg-blue-400 active:bg-blue-700 text-white capitalize text-lg py-2 w-full"
					>
						Submit
					</Button>
				</div>
			</form>
		</div>
	);
};

export default CreateEvent;
