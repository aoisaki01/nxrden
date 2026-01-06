import { getAuth } from "firebase/auth";
import { app } from "./firebase";

// Initialize Auth only when imported
const auth = getAuth(app);

export { auth };
