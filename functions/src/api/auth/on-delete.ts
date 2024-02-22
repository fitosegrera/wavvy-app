/* eslint-disable @typescript-eslint/no-empty-function */
import * as admin from "firebase-admin";
import { DocumentReference } from "firebase-admin/firestore";
import * as functions from "firebase-functions";

export const onDelete = functions.auth.user().onDelete(async (user) => {
  const docRef: DocumentReference = admin
    .firestore()
    .collection("users")
    .doc(user.uid);

  await docRef.delete();
});
