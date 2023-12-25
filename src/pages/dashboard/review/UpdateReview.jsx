import { IconButton, Input, Spinner, Textarea } from "@material-tailwind/react";
import GoBackButton from "../../../components/Button/GoBackButton";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import handleFileUpload from "../../../helper/ImageUploader";
import { showErrorToast, showSuccessToast } from "../../../helper/ToastMessage";
import { get, put } from "../../../utils/fetchApi";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { LuUploadCloud } from "react-icons/lu";
import { BsTrashFill } from "react-icons/bs";

const UpdateReview = () => {
	const [reviewData, setReviewData] = useState([]);
	const [name, setName] = useState("");
	const [designation, setDesignation] = useState("");
	const [image, setImage] = useState(null);
	const [reviewText, setReviewText] = useState("");

	const [oldImage, setOldImage] = useState(null);
	const [fileName, setFileName] = useState("No File Choosen");
	const [isLoading, setIsLoading] = useState(false);
	const [isUpdateImage, setIsUpdateImage] = useState(false);

	const inputImageRef = useRef(null);
	const navigate = useNavigate();

	const { id } = useParams();

	useEffect(() => {
		const fetchEvent = async () => {
			setIsLoading(true);
			const response = await get(`reviews/${id}`);
			setReviewData(response.data.payload.data);
			setIsLoading(false);
		};
		fetchEvent();
	}, []);

	// console.log(serviceData, "serviceData");

	useEffect(() => {
		if (Object.keys(reviewData).length !== 0) {
			setName(reviewData.name);
			setDesignation(reviewData.designation);
			setOldImage(reviewData.cover);
			setReviewText(reviewData.reviewText);
		}
	}, [reviewData]);

	// console.log(reviewData);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		let imgData = {};
		if (isUpdateImage && image) {
			imgData = await handleFileUpload(image);
		}

		const formData = {
			name,
			designation,
			...(isUpdateImage ? { cover: imgData?.url || null } : {}),
			reviewText,
		};

		if (Object.values(formData).some((field) => !field)) {
			// Handle the case where data is missing
			setIsLoading(false);
			showErrorToast("Please Fill in All Fields");
			return;
		}

		try {
			const res = await put(`reviews/update-review/${id}`, formData);
			showSuccessToast(res.data?.message);
			navigate("/dashboard/reviews");
		} catch (err) {
			showErrorToast(err?.response?.data.message);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<div>
			<div>
				<GoBackButton />
			</div>
			<HeaderText>Update Review</HeaderText>
			<form onSubmit={handleSubmit}>
				<div className="w-full lg:w-1/2 flex flex-col mx-auto gap-2 pb-2">
					<div>
						<p className="font-bold text-color-text  py-2">
							Reviewer Name<span className="text-red-500">*</span>
						</p>
						<Input
							value={name}
							size="lg"
							color="yellow"
							label="Reviewer Name"
							className="text-color-text "
							style={{ fontSize: "18px", fontWeight: "normal" }}
							onChange={(ev) => setName(ev.target.value)}
						/>
					</div>
					<div>
						<p className="font-bold text-color-text capitalize py-2">
							Reviewer Designation<span className="text-red-500">*</span>
						</p>
						<Input
							value={designation}
							size="lg"
							color="yellow"
							label="Reviewer Designation"
							className="text-color-text "
							style={{ fontSize: "14px", fontWeight: "normal" }}
							onChange={(ev) => setDesignation(ev.target.value)}
						/>
					</div>
					{/* image-input */}
					<p className="font-bold text-color-text py-2">
						Service Image <span className="text-red-500">*</span>
					</p>
					<div style={{ maxWidth: "400px" }} className="mx-auto">
						{!isUpdateImage ? (
							<div className="">
								<img src={oldImage} alt="..." />
								<div className="flex justify-center mt-2">
									<PrimaryButton className=" " onClick={() => setIsUpdateImage(true)}>
										Upload new Image
									</PrimaryButton>
								</div>
							</div>
						) : (
							<div>
								<div
									className={`flex justify-center items-center border-2 border-dashed  w-full h-80 cursor-pointer  ${
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
							</div>
						)}
					</div>
					<div>
						<p className="font-bold text-color-text  py-2">
							Reviewer Comment<span className="text-red-500">*</span>
						</p>
						<Textarea
							value={reviewText}
							size="lg"
							color="yellow"
							label="Reviewer Comment"
							className="text-color-text "
							rows={8}
							onChange={(ev) => setReviewText(ev.target.value)}
						/>
					</div>
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

export default UpdateReview;
