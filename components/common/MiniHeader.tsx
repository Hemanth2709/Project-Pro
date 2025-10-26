import { Link, BarChart3 } from "lucide-react";
import { UserNav } from "../user-nav";

const MiniHeader = () => {
  return (
    <>
      <header className="sticky top-0 px-4 md:px-6 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <BarChart3 className="h-6 w-6" />
            <span>ProjectPro</span>
          </Link>
          <UserNav />
        </div>
      </header>
    </>
  );
};


export default MiniHeader;
