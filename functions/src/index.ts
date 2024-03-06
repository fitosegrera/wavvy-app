import { initializeApp } from "firebase-admin/app";
initializeApp();

export { onCreate } from "./api/auth/on-create";
export { onDelete } from "./api/auth/on-delete";
