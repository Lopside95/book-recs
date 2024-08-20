import { useRouter } from "next/router";
import { Button } from "./ui/button";

const Nav = () => {
  const router = useRouter();

  return (
    <div className="flex z-50 w-full items-center justify-center gap-4 sticky top-0 mb-10 ">
      <Button onClick={() => router.push("/")}>Main</Button>
    </div>
  );
};

export default Nav;
