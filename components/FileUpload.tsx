"use client";
import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";

type Props = {
    onUploadAction: (files: File[]) => void;
}
export function FileUploader({ onUploadAction }: Props ) {
    const [files, setFiles] = useState<File[]>([]);
    const handleFileUpload = (files: File[]) => {
        setFiles(files);
        console.log(files);
        onUploadAction(files);
    };

    return (
        <div className="w-full max-w-4xl mx-auto   border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
            <FileUpload onChange={handleFileUpload} />
        </div>
    );
}
