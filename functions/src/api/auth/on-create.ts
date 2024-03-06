/* eslint-disable @typescript-eslint/no-empty-function */
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

export const onCreate = functions.auth.user().onCreate((user) => {
  const current = new Date().toString();
  const email = user.email;
  const nameIndex = email?.indexOf("@");
  const nameUser = email?.substring(0, nameIndex);

  return admin.firestore().collection("users").doc(user.uid).set({
    userId: user.uid,
    email: user.email,
    name: nameUser,
    creationDate: current,
  });
});
