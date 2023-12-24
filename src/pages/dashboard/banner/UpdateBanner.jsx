import { IconButton, Input, Spinner } from "@material-tailwind/react";
import GoBackButton from "../../../components/Button/GoBackButton";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import { useState } from "react";
import { LuUploadCloud } from "react-icons/lu";
import { BsTrashFill } from "react-icons/bs";

const UpdateBanner = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [headerText, setHeaderText] = useState("");

	const [oldImage, setOldImage] = useState("");
	const [image, setImage] = useState(null);
	const [fileName, setFileName] = useState("No file selected");
	const [isUpdateImage, setIsUpdateImage] = useState(false);

	const handleUploadImage = () => {
		setIsUpdateImage(true);
	};

	const handleEventForm = async () => {};
	return (
		<div>
			<GoBackButton />
			<HeaderText>Banner Update</HeaderText>
			<form onSubmit={handleEventForm}>
				<div className="w-full md:w-1/2 flex flex-col gap-2 pb-2">
					<div>
						<p className="font-bold text-color-text  py-2">
							Banner Heading<span className="text-red-500">*</span>
						</p>
						<Input
							size="lg"
							color="yellow"
							value={headerText}
							label="Banner Heading"
							className="text-color-text "
							style={{ fontSize: "18px", fontWeight: "normal" }}
							onChange={(ev) => setHeaderText(ev.target.value)}
						/>
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

export default UpdateBanner;
