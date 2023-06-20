import React, { useState, ChangeEvent } from "react";
import { db, storage } from "../index";
import {
  addDoc,
  collection,
  serverTimestamp,
  DocumentReference,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  UploadTaskSnapshot,
} from "firebase/storage";
import { useUserData } from "../User/userSlice";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import TextField from "@mui/material/TextField";
import { getAuth, User } from "firebase/auth";

const Transition = React.forwardRef(function Transition(
  props: any,
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ImageUpload = () => {
  const [image, setImage] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [caption, setCaption] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const user = useUserData();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = (username: string) => {
    if (!image) return;

    const metadata = {
      contentType: "image/jpeg",
    };
    const storageRef = ref(storage, "images/" + image.name);
    const uploadTask = uploadBytesResumable(storageRef, image, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot: UploadTaskSnapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error: any) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: string) => {
          const auth = getAuth();
          const user: User | null = auth.currentUser;
          console.log(user);
          addDoc(collection(db, "posts"), {
            timestamp: serverTimestamp(),
            caption: caption,
            imgUrl: downloadURL,
            username: username,
            profileImg: user?.photoURL ?? "",
          })
            .then((data: DocumentReference) => console.log(data))
            .catch((err: any) => console.log(err));
          setProgress(0);
          setCaption("");
          setImage(null);
        });
      }
    );
  };

  return (
    <div>
      <div
        className="fixed top-2 right-28 cursor-pointer"
        onClick={(e) => setOpen((prev) => !prev)}
      >
        <img
          src="/plus.png"
          className="shadow-md h-12 w-12 rounded-full"
          alt=""
        />
      </div>

      {open && (
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle className="flex justify-center text-zinc-700">
            {"Select picture to upload!"}
          </DialogTitle>
          <DialogContent className="flex flex-col gap-5">
            <Button type="button" className="shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
              </svg>
              <input
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="font-normal text-sm border-blue-400"
              />
            </Button>
            <TextField
              onChange={(e) => setCaption(e.target.value)}
              value={caption}
              className="w-full"
              placeholder="Caption"
            />
            <Button
              onClick={() => {
                handleUpload(user.user.displayName);
                setOpen((prev) => !prev);
              }}
              type="button"
              className=" w-full font-medium text-xl leading-tight uppercase rounded shadow-md"
            >
              Upload
            </Button>
            <Button
              onClick={() => {
                setOpen((prev) => !prev);
              }}
              type="button"
              className=" w-full font-medium text-xl leading-tight uppercase rounded shadow-md"
            >
              CLOSE
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ImageUpload;
