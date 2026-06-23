export const uploadToCloudinary = async (pics) => {
  const cloud_name = "dkn3nesb8";
 const upload_preset = "ecommerce_upload";

  if (!pics) {
    console.error("No image selected");
    return null;
  }

  try {
    const data = new FormData();

    data.append("file", pics);
    data.append("upload_preset", upload_preset);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const fileData = await res.json();

    if (!res.ok) {
      throw new Error(fileData.error?.message || "Upload failed");
    }

    return fileData.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return null;
  }
};