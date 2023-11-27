import { SmileIcon } from "lucide-react";

export default function FullpageLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-60">
      <SmileIcon className="animate-spin" />
      <span className="ml-2 text-xl font-bold">Loading...</span>
    </div>
  );
}
