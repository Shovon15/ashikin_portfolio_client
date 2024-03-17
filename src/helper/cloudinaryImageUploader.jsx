const cloudinaryImageUploader = async (image) => {
	try {
		const formData = new FormData();
		formData.append("file", image);
		formData.append("upload_preset", "react_upload");
		formData.append("cloud_name", "dreeqkcfb");

		// Add width and height parameters if provided
		// if (width && height) {
		// 	// formData.append("width", width);
		// 	// formData.append("height", height);
		// 	formData.append("transformation", `w_${width},h_${height}`);
		// }

		const response = await fetch("https://api.cloudinary.com/v1_1/dreeqkcfb/image/upload", {
			method: "POST",
			body: formData,
		});

		if (!response.ok) {
			throw new Error("Failed to upload image");
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error uploading image:", error);
		throw new Error("Failed to upload image.", error);
	}
};

export default cloudinaryImageUploader;
