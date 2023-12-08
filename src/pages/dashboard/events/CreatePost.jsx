import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../../../components/Editor";
import { post } from "../../../utils/fetchApi";

export default function CreatePost() {
	const [title, setTitle] = useState("");
	const [summary, setSummary] = useState("");
	const [content, setContent] = useState("");
	const [files, setFiles] = useState("");
	const [redirect, setRedirect] = useState(false);


	async function createNewPost(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("summary", summary);
        formData.append("content", content);
    
        if (files) {
          for (let i = 0; i < files.length; i++) {
            formData.append("file", files[i]);
          }
        }
		console.log("data", formData);
        try {
			// console.log(eventData, "eventData");

			post("events/write-event", formData, "multipart/form-data")
				.then((res) => {
					// setReceiveData(res?.data?.payload);
					console.log(res.data, "response data");
				})
				.catch((err) => {
					console.log(err, "err");
				})
				.finally(() => {
					console.log("success");
					// navigate("/dashboard/events");
				});
		} catch (error) {
			console.log(error);
		}
		// const response = await fetch("http://localhost:5000/api/events/write-event", {
		// 	method: "POST",
		// 	body: data,
		// 	credentials: "include",
		// });
		// if (response.ok) {
		// 	setRedirect(true);
		// }
	}

	if (redirect) {
		return <Navigate to={"/"} />;
	}
	return (
		<form onSubmit={createNewPost}>
			<input type="title" placeholder={"Title"} value={title} onChange={(ev) => setTitle(ev.target.value)} />
			<input
				type="summary"
				placeholder={"Summary"}
				value={summary}
				onChange={(ev) => setSummary(ev.target.value)}
			/>
			<input type="file" onChange={(ev) => setFiles(ev.target.files)} />
			<Editor value={content} onChange={setContent} />
			<button style={{ marginTop: "5px" }}>Create post</button>
		</form>
	);
}
