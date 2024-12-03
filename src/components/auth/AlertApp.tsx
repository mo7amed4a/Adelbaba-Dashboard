import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import { X } from "lucide-react";
import Link from "next/link";

type AlertAppType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
  msg: string;
  url?: string;
  btnText?: string;
};

export default function AlertApp({
  isOpen,
  setIsOpen,
  text,
  msg,
  url,
  btnText,
}: AlertAppType) {
  return (
    <AlertDialog open={isOpen} >
      {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
      <AlertDialogContent>
        <AlertDialogHeader className="text-center flex flex-col items-center space-y-4">
          <div className="w-full flex justify-end items-start -mb-4">
            <X className="cursor-pointer" onClick={() => setIsOpen(false)}/>
          </div>
          <AlertDialogTitle>{text}</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            {msg}
          </AlertDialogDescription>
          <Image
            className="size-16 md:size-24"
            src="/auth/toast.png"
            width={400}
            height={400}
            alt=""
          />
        </AlertDialogHeader>
        <AlertDialogFooter className="w-full">
          {btnText &&
            (url ? (
              <Link
                href={url}
                className="w-full flex justify-center items-center"
              >
                <AlertDialogAction className="w-2/4">
                  {btnText}
                </AlertDialogAction>
              </Link>
            ) : (
              <div
                onClick={() => setIsOpen(false)}
                className="w-full flex justify-center items-center"
              >
                <AlertDialogAction className="w-2/4">
                  {btnText}
                </AlertDialogAction>
              </div>
            ))}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
