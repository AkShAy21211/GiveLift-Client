import { Spinner } from "@heroui/spinner";

function Loading() {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-gray-100">
      <Spinner color="default" className="w-12 h-12" />
    </div>
  );
}

export default Loading;