"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import ImageInput from "./ImageInput";
import FormContainer from "./FormContainer";
import { actionFunction } from "@/utils/type";
import { SubmitButton } from "./Buttons";

type ImageContainerProps = {
  name: string;
  image: string;
  action: actionFunction;
  children?: React.ReactNode;
};

function ImageInputContainer(props: ImageContainerProps) {
  const { name, image, action, children } = props;
  const [isUpdateFormVisible, setUpdateFormVisible] = useState(false);

  return (
    <div className="mb-8">
      <Image
        src={image}
        alt={name}
        width={200}
        height={200}
        className="object-cover rounded-md mb-4"
      />
      <Button
        size="sm"
        variant="outline"
        onClick={() => setUpdateFormVisible((prev) => !prev)}
      >
        update image
      </Button>
      {isUpdateFormVisible && (
        <div className="mt-4 max-w-md">
          <FormContainer action={action}>
            {children}
            <ImageInput />
            <SubmitButton size="sm" text="update image" />
          </FormContainer>
        </div>
      )}
    </div>
  );
}

export default ImageInputContainer;
