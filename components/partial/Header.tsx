import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Section from "@/components/grids/Section";
import GithubAvatar from "@/components/media/GitHubAvatar";
import GithubButton from "@/components/interactions/GithubButton";

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <Section
      className="mb-0"
      style={{ background: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/assets/popcorn-background.jpg) bottom center / cover no-repeat" }} 
    >
      <div className="
        max-w-5xl
        mx-auto
        p-2
        sm:p-4 md:p-6 lg:p-6
        flex
        flex-col
        md:flex-row
        gap-4
        sm:gap-4 md:gap-6 lg:gap-6
        items-center
        justify-between
      ">
        <Link href="/" className="flex items-center gap-4">
          <Image 
            src="/assets/popcornia-logo.jpg" 
            alt="Popcornia logo" 
            className="rounded-full"
            width={64} 
            height={64}
          />
          <div>
            <h1 className="text-4xl font-bold text-white text-shadow:_0_0_0.5px_black">Popcornia</h1>
            <h4 className="text-lg text-white text-shadow:_0_0_0.5px_black">Evokes popcorn and fun movie browsing</h4>
          </div>    
        </Link>
        <div className="
          flex 
          flex-row lg:flex-col xl:flex-col
          items-center
        ">
          <GithubAvatar session={session} />
          <GithubButton session={session} />
        </div>
      </div>
    </Section>
  );
}
