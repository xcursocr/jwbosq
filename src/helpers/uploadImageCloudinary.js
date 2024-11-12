// const urlCloudinary = `${import.meta.env.VITE_URL_CLOUDINARY}/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`
import { ENV } from "./constants"

export const upImageCloudinary = async (image) => {
  const formData = new FormData()
  formData.append('file', image)
  // formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_PRESET_NAME)
  formData.append('upload_preset', ENV.CLOUDINARY.PRESET_NAME)

  const resp = await fetch(urlCloudinary, {
    method: "POST",
    body: formData
  })
  return resp.json()
}