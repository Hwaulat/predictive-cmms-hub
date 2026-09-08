import { ReactNode } from "react";
import { AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  actionText: string;
  onConfirm: () => void;
  cancelText?: string;
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  actionText,
  onConfirm,
  cancelText = "Cancel",
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md sm:rounded-2xl p-6">
        <div className="flex flex-col gap-6">
          <div className="flex justify-start">
            <div className="bg-blue-50 text-blue-600 p-3 rounded-full shrink-0">
              <AlertCircle className="size-6" />
            </div>
          </div>
          
          <DialogHeader className="text-left space-y-2">
            <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
            <DialogDescription className="text-base text-muted-foreground">
              {description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex justify-end gap-3 pt-2">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="rounded-lg px-6"
            >
              {cancelText}
            </Button>
            <Button 
              onClick={() => {
                onConfirm();
                onOpenChange(false);
              }}
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-lg px-6"
            >
              {actionText}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
