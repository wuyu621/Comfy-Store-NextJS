"use client";

import { Button } from "../ui/button";
import { useState } from "react";
import { Card } from "../ui/card";
import FormContainer from "../form/FormContainer";
import { createReviewAction } from "@/utils/actions";
import RatingInput from "./RatingInput";
import TextAreaInput from "../form/TextAreaInput";
import { SubmitButton } from "../form/Buttons";
import { useUser } from "@clerk/nextjs";
import { findExistingReview } from "@/utils/actions";

async function SubmitReview({ productId }: { productId: string }) {
  const { user } = useUser();

  const [isReviewFormVisible, setReviewFormVisible] = useState(false);

  return (
    <div>
      <Button
        size="lg"
        className="capitalize"
        onClick={() => setReviewFormVisible((prev) => !prev)}
      >
        leave reviews
      </Button>

      {isReviewFormVisible && (
        <Card className="mt-8 p-8">
          <FormContainer action={createReviewAction}>
            <input type="hidden" name="productId" value={productId} />
            <input
              type="hidden"
              name="authorName"
              value={user?.firstName || "user"}
            />
            <input type="hidden" name="authorImageUrl" value={user?.imageUrl} />
            <RatingInput name="rating" />
            <TextAreaInput
              name="comment"
              labelText="feedback"
              defaultValue="Outstanding product!!!"
            />
            <SubmitButton className="mt-4" />
          </FormContainer>
        </Card>
      )}
    </div>
  );
}

export default SubmitReview;
