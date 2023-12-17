import { useRef } from "react";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "@material-tailwind/react";
const CreateBlog = () => {
	const editorRef = useRef(null);
	const log = () => {
		if (editorRef.current) {
			console.log(editorRef.current.getContent());
		}
	};
	return (
		<div>
			<HeaderText>CreateBlog</HeaderText>
			<div>
				<Editor
					apiKey="dne6kwcfh5bie2h2hkj9qjtgu1xk4qthm9k6xajczb3vuj4e"
					onInit={(evt, editor) => (editorRef.current = editor)}
					init={{
						plugins:
							"anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
						toolbar:
							"undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
					}}
					initialValue="Welcome to TinyMCE!"
				/>
				<Button onClick={log}>Log editor content</Button>
			</div>
		</div>
	);
};

export default CreateBlog;
