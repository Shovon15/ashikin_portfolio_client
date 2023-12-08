import axios from "axios";
import { useEffect, useState } from "react";
// import { post } from "../../../utils/fetchApi";

const BlogManage = () => {
	const [file, setFile] = useState(File | undefined);
	const [text, setText] = useState("");
	const [receiveData, setReceiveData] = useState([]);

	const baseURL = "http://localhost:5000/images/";
	const handleFile = async () => {
		// console.log(file, "file");
		const formData = new FormData();
		formData.append("file", file);
		formData.append("text", text);
		try {
			// console.log(eventData, "eventData");

			axios
				.post("http://localhost:5000/api/blogs/upload-blog", formData)
				.then((res) => {
					// setReceiveData(res?.data?.payload);
					console.log(res.data, "response data");
				})
				.catch((err) => {
					console.log(err, "err");
				})
				.finally(() => {
					// console.log("success");
				});
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		axios
			.get("http://localhost:5000/api/blogs")
			.then((res) => {
				setReceiveData(res?.data?.payload.data);
				// console.log(res.data, "response data");
			})
			.catch((err) => {
				console.log(err, "err");
			});
	}, []);
	// console.log(receiveData);
	return (
		<div>
			<p className="text-center text-3xl font-bold">Blog Manage</p>
			<input type="file" onChange={(e) => setFile(e.target.files[0])} />
			<input type="text" value={text} onChange={(e) => setText(e.target.value)} />
			<button onClick={handleFile} className="px-3 py-2 bg-green-500 rounded-md hover:bg-green-400">
				submit
			</button>

			{receiveData.map((data) => (
				<div key={data._id} className="flex flex-col gap-4">
					<p className="font-bold text-2xl">ID:{data.blogText}</p>

					{/* <img src={`http://localhost:5000/${data.cover.replace(/\\/g, "/")}`} /> */}
					<img className="w-44" src={`${baseURL}${data.cover}`} alt="..." />
				</div>
				
			))}
		</div>
	);
};

export default BlogManage;
