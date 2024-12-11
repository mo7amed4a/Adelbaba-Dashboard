"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Bold,
  Image,
  Italic,
  Link2,
  Paperclip,
  Plus,
  Underline,
} from "lucide-react";
import RichEditorEmail from "../template/RichEditor/RichEditorEmail";

export default function SendEmail() {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        className="w-full bg-primary text-white"
        onClick={() => setOpen(true)}
      >
        <Plus className="mr-2 h-4 w-4" /> Compose
      </Button>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Compose Email</DialogTitle>
          {/* <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              CC
            </Button>
            <Button variant="ghost" size="sm">
              BC
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
              ✕
            </Button>
          </div> */}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input placeholder="Recipients" className="col-span-full" />
          <Input placeholder="Subject" className="col-span-full" />
          <RichEditorEmail />
          <div className="flex items-center gap-2">
            <Button className="bg-[#F4B860] hover:bg-[#F4B860]/90 text-white">
              Send
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
