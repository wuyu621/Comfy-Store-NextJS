"use client";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";
import { LuPenSquare, LuTrash2 } from "react-icons/lu";
import { SignInButton } from "@clerk/nextjs";
import { FaRegHeart, FaHeart } from "react-icons/fa";

type BtnSize = "default" | "lg" | "icon" | "sm";

type SubmitButtonProps = {
  className?: string;
  text?: string;
  size?: BtnSize;
};

export function SubmitButton({
  className = "",
  size = "lg",
  text = "submit",
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      size={size}
      className={cn("capitalize", className)}
      disabled={pending}
    >
      {pending ? (
        <>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Please waiting...
        </>
      ) : (
        text
      )}
    </Button>
  );
}

type ActionType = "edit" | "delete";

export const IconButton = ({ actionType }: { actionType: ActionType }) => {
  const { pending } = useFormStatus();

  const renderIcon = () => {
    switch (actionType) {
      case "edit":
        return <LuPenSquare />;
      case "delete":
        return <LuTrash2 />;
      default:
        const never: never = actionType;
        throw new Error(`Invalid action type ${never}`);
    }
  };

  return (
    <Button type="submit" size="icon" variant="link" className="cursor-pointer">
      {pending ? <ReloadIcon className="animate-spin" /> : renderIcon()}
    </Button>
  );
};

export const CardSignInButton = () => {
  return (
    <SignInButton mode="modal">
      <Button
        type="button"
        size="icon"
        variant="outline"
        className="p-2 cursor-pointer"
        asChild
      >
        <FaRegHeart />
      </Button>
    </SignInButton>
  );
};

export const CardSubmitButton = ({ isFavorite }: { isFavorite: boolean }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      size="icon"
      variant="outline"
      className="p-2 cursor-pointer"
    >
      {pending ? (
        <ReloadIcon className=" animate-spin" />
      ) : isFavorite ? (
        <FaHeart />
      ) : (
        <FaRegHeart />
      )}
    </Button>
  );
};

export const ProductSignInButton = () => {
  return (
    <SignInButton mode="modal">
      <Button type="button" size="default" className="mt-8 capitalize">
        sign in
      </Button>
    </SignInButton>
  );
};
