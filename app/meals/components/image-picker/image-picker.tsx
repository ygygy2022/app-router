"use client";
import { ChangeEvent, useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";
interface ImagePickerProps {
  lable: string;
  name: string;
}

export default function ImagePicker({ lable, name }: ImagePickerProps) {
  const [image, setImage] = useState<string | null>(null);
  const imageInput = useRef<HTMLInputElement>(null);
  const handlePickClick = () => {
    if (imageInput.current) {
      imageInput.current.click();
    }
  };
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setImage(null);
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImage(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
  };
  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{lable}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!image && <p>No image picked yet.</p>}
          {image && (
            <Image src={image} alt="the image selected by the user" fill />
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          name={name}
          accept="image/png, image/jpeg"
          ref={imageInput}
          onChange={handleImageChange}
          required
        />
      </div>
      <button
        className={classes.button}
        type="button"
        onClick={handlePickClick}
      >
        Pick Image
      </button>
    </div>
  );
}
