import GoBackButton from "../../../components/Button/GoBackButton";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import { useRef, useState } from "react";
import { BsTrashFill } from "react-icons/bs";
import { LuUploadCloud } from "react-icons/lu";
import { Button, Spinner, Typography } from "@material-tailwind/react";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import { IconButton } from "@material-tailwind/react";
import { IoIosAdd } from "react-icons/io";
import { showErrorToast, showSuccessToast } from "../../../helper/ToastMessage";
import { del, get, post } from "../../../utils/fetchApi";
import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt } from "react-icons/fa";
import ConfirmationModal from "../../../helper/ConfirmationModal";
import cloudinaryImageUploader from "../../../helper/cloudinaryImageUploader";
import LoadingSpinner from "../../../components/shared/loadingSpinner/LoadingSpinner";

const BrandManage = () => {
	const [isAddBrand, setIsAddBrand] = useState(false);

	const [image, setImage] = useState(null);
	const [fileName, setFileName] = useState("No file selected");
	const [loading, setLoading] = useState(false);

	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [deletingData, setDeletingData] = useState(null);

	const inputImageRef = useRef(null);

	const {
		data: brandData = [],
		refetch,
		isLoading,
	} = useQuery({
		queryKey: ["brandData"],
		queryFn: async () => {
			const res = await get("brands/all");
			const data = res.data.payload.data;

			return data;
		},
	});

	const handleCloseDeleteModal = () => {
		setDeletingData(null);
		setIsDeleteModalOpen(false);
	};

	const handleDeleteEvent = async ({ _id }) => {
		try {
			const response = await del(`brands/delete-brand/${_id}`);
			refetch();
			showSuccessToast(response.data.message);
		} catch (error) {
			console.error("Error deleting brand:", error);
			showErrorToast(`Error deleting brand. Try again`);
		} finally {
			handleCloseDeleteModal();
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		if (!image) {
			setLoading(false);
			showErrorToast("brand logo is required");
			return;
		}

		// const formData = new FormData();
		// formData.append("brand", image);
		try {
			let formData = {};

			if (image) {
				const data = await cloudinaryImageUploader(image);
				formData.brand = data.url;

				try {
					const res = await post("brands/create-brand", formData);
					refetch();
					showSuccessToast(res.data?.message);
					setIsAddBrand(false);
					setImage(null);
					setFileName("No file selected");
				} catch (err) {
					showErrorToast(err?.response?.data.message);
				}
			}
		} catch (error) {
			console.error("Failed to upload image:", error);
			showErrorToast("Failed to upload image. Please try again.");
		} finally {
			setLoading(false);
		}

		// try {
		// 	const res = await post("brands/create-brand", formData, "multipart/form-data");
		// 	refetch();
		// 	showSuccessToast(res.data?.message);
		// 	setIsAddBrand(false);
		// 	setImage(null);
		// 	setFileName("No file selected");
		// } catch (err) {
		// 	showErrorToast(err?.response?.data.message);
		// } finally {
		// 	setLoading(false);
		// }
	};
	const TABLE_HEAD = ["No.", "Logo", "Action"];
	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<div>
			<div>
				<GoBackButton />
			</div>
			<HeaderText>Manage Brand logo</HeaderText>

			{brandData.length === 0 ? (
				<div className="text-center py-8 px-5 lg:px-0">
					<p className="text-lg text-color-primary">
						You have not created any brand yet.
						<br />
						Please add brand to get started!
					</p>
				</div>
			) : (
				<div>
					<div className="relative overflow-x-auto">
						<table className="w-full text-sm text-left rtl:text-right">
							<thead className="uppercase">
								<tr>
									{TABLE_HEAD.map((head) => (
										<th key={head} className="border-b  border-color-border bg-color-secondary p-4">
											<Typography
												variant="small"
												className="font-bold text-color-header opacity-70 text-center"
											>
												{head}
											</Typography>
										</th>
									))}
								</tr>
							</thead>
							<tbody className="text-color-primary">
								{!isLoading &&
									brandData.length !== 0 &&
									brandData.map(({ _id, brandLogo }, index) => (
										<tr key={_id} className="even:bg-color-secondary text-center">
											<td className="p-2 ">
												<p className="font-bold">{String(index + 1) + "."}</p>
											</td>

											<td className="p-2 center w-full h-20 flex items-center">
												<img
													src={brandLogo}
													alt="logo"
													className=" object-contain h-full"
													// width="150"
													// height="50"
												/>
											</td>
											<td>
												<Button
													variant="text"
													className="focus:ring-0  border-none rounded-full p-3"
													onClick={() => {
														setIsDeleteModalOpen(true);
														setDeletingData({ _id });
													}}
												>
													<FaTrashAlt className="w-5 h-5 text-red-500" />
												</Button>
											</td>
										</tr>
									))}
							</tbody>
						</table>
					</div>
					<ConfirmationModal
						message={`Warning: Deleting this Brand is permanent and cannot be undone.`}
						isOpen={isDeleteModalOpen}
						onClose={handleCloseDeleteModal}
						content={deletingData}
						successAction={handleDeleteEvent}
						setDeleteModalOpen={setIsDeleteModalOpen}
					/>
				</div>
			)}

			{isAddBrand ? (
				<form onSubmit={handleSubmit} className="w-96 mx-auto py-3 mt-5 relative">
					<div className="absolute top-2 right-5">
						<IconButton
							size="sm"
							variant="text"
							onClick={() => {
								setIsAddBrand(false);
								setImage(null);
								setFileName("No file selected");
							}}
							className="bg-color-primary text-color-header "
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
								className="h-5 w-5"
							>
								<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</IconButton>
					</div>
					<div className="w-80 mx-auto">
						<p className="font-bold text-color-primary py-2">
							Brand logo <span className="text-red-500">*</span>
						</p>
						<div className="w-full h-36 mx-auto">
							<div
								className={`center border-2 border-dashed w-full h-full cursor-pointer
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
									<img
										src={URL.createObjectURL(image)}
										className="w-full h-full p-5"
										alt={fileName}
									/>
								) : (
									<div className="flex flex-col items-center gap-2 text-color-primary">
										<LuUploadCloud className="w-12 h-12 " />
										<p className="">Browse file to upload</p>
									</div>
								)}
							</div>
							<section
								className="flex-end gap-3 bg-color-secondary
                           rounded-md mt-1 p-2 pr-2 text-color-primary my-5"
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
					</div>
					<div className="w-full flex justify-center items-center mt-[4rem]">
						<PrimaryButton buttonType={"submit"} disabled={loading} className="px-16">
							{loading ? <Spinner color="gray" className="mx-auto" /> : "Submit"}
						</PrimaryButton>
					</div>
				</form>
			) : (
				<div className="flex justify-center py-5">
					<Button
						onClick={() => setIsAddBrand(true)}
						className="px-6 py-3 bg-color-button text-color-primary hover:bg-color-buttonHover rounded-none active:bg-color-button capitalize text-md flex gap-2"
					>
						<IoIosAdd className="w-6 h-6" />
						Add Brand
					</Button>
				</div>
			)}
		</div>
	);
};

export default BrandManage;
