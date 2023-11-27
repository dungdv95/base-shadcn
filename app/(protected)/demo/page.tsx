import { Metadata } from "next";
import MainPage from "./main";

export const metadata: Metadata = {
  title: "Demo",
};
export default function Page() {
  return <MainPage />;
}
