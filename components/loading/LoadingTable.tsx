import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div>
      <div className="w-full mb-2 flex justify-between">
        <div className="h-8 w-[50%] flex justify-between">
          <Skeleton className="h-8 w-[30%] " />
          <Skeleton className="h-8 w-[40%] " />
          <Skeleton className="h-8 w-[20%] " />
        </div>
        <div className="h-8 w-[20%] flex justify-between">
          <Skeleton className="h-8 w-[45%] " />
          <Skeleton className="h-8 w-[45%] " />
        </div>
      </div>

      <div className="shadow-md rounded-lg overflow-hidden border">
        <table className="min-w-full divide-y ">
          <thead>
            <tr>
              <th className="px-6 py-4  ">
                <Skeleton className="h-6 w-full " />
              </th>
              <th className="px-6 py-4 ">
                <Skeleton className="h-6 w-full" />
              </th>
              <th className="px-6 py-4  ">
                <Skeleton className="h-6 w-full" />
              </th>
              <th className="px-6 py-4  ">
                <Skeleton className="h-6 w-full" />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="animate-pulse">
              <td className="px-6 py-4 bg-gray-150">
                <Skeleton className="h-8 w-full" />
              </td>
              <td className="px-6 py-4 bg-gray-150">
                <Skeleton className="h-8 w-full" />
              </td>
              <td className="px-6 py-4 bg-gray-150">
                <Skeleton className="h-8 w-full" />
              </td>
              <td className="px-6 py-4 bg-gray-150">
                <Skeleton className="h-8 w-full" />
              </td>
            </tr>
            <tr className="animate-pulse">
              <td className="px-6 py-4 bg-gray-150">
                <Skeleton className="h-8 w-full" />
              </td>
              <td className="px-6 py-4 bg-gray-150">
                <Skeleton className="h-8 w-full" />
              </td>
              <td className="px-6 py-4 bg-gray-150">
                <Skeleton className="h-8 w-full" />
              </td>
              <td className="px-6 py-4 bg-gray-150">
                <Skeleton className="h-8 w-full" />
              </td>
            </tr>
            <tr className="animate-pulse">
              <td className="px-6 py-4 bg-gray-150">
                <Skeleton className="h-8 w-full" />
              </td>
              <td className="px-6 py-4 bg-gray-150">
                <Skeleton className="h-8 w-full" />
              </td>
              <td className="px-6 py-4 bg-gray-150">
                <Skeleton className="h-8 w-full" />
              </td>
              <td className="px-6 py-4 bg-gray-150">
                <Skeleton className="h-8 w-full" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
