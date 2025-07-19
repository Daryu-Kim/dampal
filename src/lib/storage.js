import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { storage } from "./firebase";

export async function uploadRrnImage(uid, photo) {
  try {
    const imageRef = ref(storage, `${uid}/id-cards/${Date.now()}.jpg`);
    await uploadString(imageRef, photo, "data_url");
    const downloadURL = await getDownloadURL(imageRef);
    return downloadURL;
  } catch (error) {
    console.error("신분증 사진 업로드 실패", error);
    return null;
  }
}
