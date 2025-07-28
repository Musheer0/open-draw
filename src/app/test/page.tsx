"use client";
import React, { useRef, useState } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";

const Page = () => {
  const cropperRef = useRef<ReactCropperElement>(null);
  const [cropData, setCropData] = useState({ top: 0, left: 0, width: 0, height: 0 });

  const onCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (!cropper) return;

    // If you want **pixel-perfect cropping data**, use this:
    const data = cropper.getData(); // gives x, y, width, height
    const { x, y, width, height } = data;
    setCropData({ top: y, left: x, width, height });

    console.log("Crop data (from getData):", { x, y, width, height });

    // 👇 getCroppedCanvas().getBoundingClientRect() is DOM info, not crop info
    // const { top, left, width, height } = cropper.getCroppedCanvas().getBoundingClientRect()
  };

  const doSomethingWithCrop = () => {
    // e.g., you wanna send this to a backend or use somewhere else
    console.log("Reused crop data:", cropData);
  };

  return (
    <div className="p-2">
      <Cropper
        src="https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg"
        initialAspectRatio={16 / 9}
        crop={onCrop}
        ref={cropperRef}
        zoomable={false}
      />

      <button
        onClick={doSomethingWithCrop}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Use Crop Data
      </button>
    </div>
  );
};

export default Page;
