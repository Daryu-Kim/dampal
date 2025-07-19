import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export async function createUser(phone, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      `${phone}@dampal.shop`,
      password
    );
    const user = userCredential.user;
    return user.uid;
  } catch (error) {
    console.error("회원가입 실패", error);
    return null;
  }
}
