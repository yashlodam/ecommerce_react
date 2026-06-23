export const uploadToCloudinary = async (pics) => {
  const cloud_name = "dkn3nesb8";
  const upload_preset = "ml_default";

  if (pics) {
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

    return fileData.secure_url; // better than url
  } else {
    console.log("Error: pics not found");
  }
};