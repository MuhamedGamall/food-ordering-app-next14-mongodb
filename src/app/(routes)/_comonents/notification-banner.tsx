import Banner from "@/components/banner";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import React from "react";

export default function NotificationBanner({
  onSave,
  dataLength,
  close,
}: {
  onSave: () => void;
  dataLength: number;
  close: boolean;
}) {
  if (dataLength === 0) {
    return "";
  }
  return (
    <>
      {!close && dataLength > 0 && (
        <div className="my-5 relative">
          <Banner
            label="We regret to inform you that it will some products due to their unavailability. We apologize for any inconvenience and encourage you to follow upcoming offers "
            icon={MessageSquare}
            color="black"
            bgColor="slate"
            iconSize={"w-10 h-10"}
          />
          <Button
            onClick={onSave}
            className=" absolute bottom-3 right-3 rounded-full p-1 w-[30px] h-[20px] text-[12px]"
            size={"sm"}
          >
            Ok
          </Button>
        </div>
      )}
    </>
  );
}
