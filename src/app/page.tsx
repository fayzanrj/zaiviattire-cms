import LogInForm from "@/components/auth/LogInForm";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-dvh">
      <LogInForm />
    </div>
  );
}
