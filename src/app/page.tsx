import Image from "next/image";
import { redirect } from "next/navigation";

export default function Home() {
  redirect('/auth/sign-in')
  return (
    <div>
      wepfkm
    </div>
  );
}
