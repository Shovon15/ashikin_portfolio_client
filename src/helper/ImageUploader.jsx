const handleFileUpload = async (data) => {
	const imageHostKey = import.meta.env.VITE_API_IMG_KEY;
	try {
		const image = data;
		
		const formData = new FormData();
		formData.append("image", image);

		const response = await fetch(`https://api.imgbb.com/1/upload?key=${imageHostKey}`, {
			method: "POST",
			body: formData,
		});

		if (!response.ok) {
			throw new Error(`Failed to upload image: ${response.statusText}`);
		}

		const imgData = await response.json();

		if (imgData.success) {
			return imgData.data;
		} else {
			console.error("Image upload failed:", imgData.error.message);
			throw new Error(`Image upload failed: ${imgData.error.message}`);
		}
	} catch (error) {
		console.error("Error uploading image:", error.message);
		throw error;
	}
};

export default handleFileUpload;
