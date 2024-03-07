import "@radix-ui/themes/styles.css";
import { Footer } from "./baseClientComponents/Footer";
import { Header } from "./baseClientComponents/Header";
import { Bookmark } from "./bookmark/Bookmark";
import { Broadcast } from "./broadcast/Broadcast";

export default function Home() {
  return (
    <main className="flex flex-col items-center h-dvh">
      <Broadcast />
      <Header />
      <Bookmark />
      <Footer />
    </main>
  );
}
