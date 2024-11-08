import {Header} from "@/components/header/header";
import {Main} from "@/components/main/main";
import {Footer} from "@/components/footer/footer";

export default function Page() {
  return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <Main />
        <Footer />
      </div>
  )
}