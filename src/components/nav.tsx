import { useRouter } from "next/router";
import { Button } from "./ui/button";

const Nav = () => {
  const router = useRouter();

  return (
    <div className="flex w-full items-center justify-center gap-4 fixed top-0 ">
      <Button onClick={() => router.push("/")}>Main</Button>
      <Button onClick={() => router.push("/find")}>Find</Button>
    </div>
  );
};

export default Nav;
