import { useEffect, useRef, useState } from "react";
import handleFileUpload from "../../../helper/ImageUploader";
import { showErrorToast, showSuccessToast } from "../../../helper/ToastMessage";
import { get, put } from "../../../utils/fetchApi";
import { useNavigate, useParams } from "react-router-dom";
import GoBackButton from "../../../components/Button/GoBackButton";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import { IconButton, Input, Spinner } from "@material-tailwind/react";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import { LuUploadCloud } from "react-icons/lu";
import { BsTrashFill } from "react-icons/bs";
import { Editor } from "@tinymce/tinymce-react";

const UpdateBlog = () => {
	const [blogData, setBlogData] = useState([]);
	const [title, setTitle] = useState("");
	const [image, setImage] = useState(null);
	const [content, setContent] = useState("");

	const [oldImage, setOldImage] = useState(null);
	const [fileName, setFileName] = useState("No File Choosen");
	const [isLoading, setIsLoading] = useState(false);
	const [isUpdateImage, setIsUpdateImage] = useState(false);

	const inputImageRef = useRef(null);
	const editorRef = useRef(null);

	const navigate = useNavigate();

	const { slug } = useParams();

	useEffect(() => {
		const fetchBlog = async () => {
			setIsLoading(true);
			const response = await get("blogs/" + slug, slug);
			setBlogData(response.data.payload.data);
			setIsLoading(false);
		};
		fetchBlog();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	console.log(blogData);

	// console.log(serviceData, "serviceData");

	useEffect(() => {
		if (Object.keys(blogData).length !== 0) {
			setTitle(blogData.title);
			setOldImage(blogData.cover);
			setContent(blogData.content);
		}
	}, [blogData]);

	// console.log(reviewData);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		let imgData = {};
		if (isUpdateImage && image) {
			imgData = await handleFileUpload(image);
		}

		const formData = {
			title,
			...(isUpdateImage ? { cover: imgData?.url || null } : {}),
			content,
		};

		if (Object.values(formData).some((field) => !field)) {
			// Handle the case where data is missing
			setIsLoading(false);
			showErrorToast("Please Fill in All Fields");
			return;
		}

		try {
			const res = await put(`blogs/${slug}`, formData);
			showSuccessToast(res.data?.message);
			navigate("/dashboard/blogs");
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
			<HeaderText>Update Blog</HeaderText>
			<form onSubmit={handleSubmit}>
				<div className="w-full lg:w-1/2 flex flex-col mx-auto gap-2 pb-2">
					<div>
						<p className="font-bold text-color-text  py-2">
							Reviewer Name<span className="text-red-500">*</span>
						</p>
						<Input
							value={title}
							size="lg"
							color="yellow"
							label="Blog Title"
							className="text-color-text "
							style={{ fontSize: "18px", fontWeight: "normal" }}
							onChange={(ev) => setTitle(ev.target.value)}
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
									Note: If you don&apos;t want to upload a new blog image, please refresh the page
									before clicking the update button.
								</p>
							</div>
						)}
					</div>
					<div className="h-auto">
						<p className="font-bold text-color-text dark:text-white py-2">
							Event Content <span className="text-red-500">*</span>
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
							initialValue={content}
						/>
					</div>
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

export default UpdateBlog;
