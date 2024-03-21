import { IconButton, Input, Spinner, Textarea } from "@material-tailwind/react";
import GoBackButton from "../../../components/Button/GoBackButton";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import { useRef, useState } from "react";
import { LuUploadCloud } from "react-icons/lu";
import { BsTrashFill } from "react-icons/bs";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import handleFileUpload from "../../../helper/ImageUploader";
import { showErrorToast, showSuccessToast } from "../../../helper/ToastMessage";
import { post } from "../../../utils/fetchApi";
import { useNavigate } from "react-router-dom";

const WriteReview = () => {
	const [name, setName] = useState("");
	const [designation, setDesignation] = useState("");
	const [image, setImage] = useState(null);
	const [reviewText, setReviewText] = useState("");

	const [fileName, setFileName] = useState("No File Choosen");
	const [isLoading, setIsLoading] = useState(false);

	const inputImageRef = useRef(null);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		let imgData = {};
		if (image) {
			imgData = await handleFileUpload(image);
		}

		const formData = {
			name,
			designation,
			cover: imgData?.url || null,
			reviewText,
		};

		if (Object.values(formData).some((field) => !field)) {
			// Handle the case where data is missing
			setIsLoading(false);
			showErrorToast("Please Fill in All Fields");
			return;
		}

		try {
			const res = await post("reviews/write-review", formData);
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
			<HeaderText>Write Review</HeaderText>
			<form onSubmit={handleSubmit}>
				<div className="w-full lg:w-1/2 mx-auto flex flex-col gap-2 pb-2">
					<div>
						<p className="font-bold text-color-primary  py-2">
							Reviewer Name<span className="text-red-500">*</span>
						</p>
						<Input
							size="lg"
							color="blue"
							label="Reviewer Name"
							className="text-color-primary "
							style={{ fontSize: "18px", fontWeight: "normal" }}
							onChange={(ev) => setName(ev.target.value)}
						/>
					</div>
					<div>
						<p className="font-bold text-color-primary capitalize py-2">
							Reviewer Designation<span className="text-red-500">*</span>
						</p>
						<Input
							size="lg"
							color="blue"
							label="Reviewer Designation"
							className="text-color-primary "
							style={{ fontSize: "14px", fontWeight: "normal" }}
							onChange={(ev) => setDesignation(ev.target.value)}
						/>
					</div>
					{/* image-input */}
					<p className="font-bold text-color-primary py-2">
						reviewer Image <span className="text-red-500">*</span>
					</p>
					<div style={{ maxWidth: "400px" }} className="mx-auto">
						<div
							className={`center border-2 border-dashed w-80 h-80 cursor-pointer
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
					<div>
						<p className="font-bold text-color-primary  py-2">
							Reviewer Comment<span className="text-red-500">*</span>
						</p>
						<Textarea
							size="lg"
							color="blue"
							label="Reviewer Comment"
							className="text-color-primary "
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

export default WriteReview;
