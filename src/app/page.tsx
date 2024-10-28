import "@radix-ui/themes/styles.css";
import { Alert } from "./components/Alert";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Bookmark } from "./components/SearchDialog";

export default function Home() {
  return (
    <main className="flex flex-col items-center h-dvh">
      <Alert />
      <Header />
      <Bookmark />
      <Footer />
    </main>
  );
}
