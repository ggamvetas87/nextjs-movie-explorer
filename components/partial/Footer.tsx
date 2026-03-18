import CustomLink from "@/components/interactions/CustomLink";

export default function Footer() {
  return (
    <div className="
      max-w-5xl
      mx-auto
      p-4
      flex
      flex-col
      md:flex-row
      gap-6
      border-t-1
      border-white
      text-white
    ">
      <div className="w-auto md:w-6/12 lg:w-6/12">
        <div className="flex items-center gap-1">
          <h4 className="text-2xl font-bold">Popcornia</h4>
          | 
          <CustomLink href="/disclaimer" className="mt-1">
            Disclaimer
          </CustomLink>
        </div>
        <p className="mt-1">Your ultimate movie exploration platform</p>
      </div>
      <p className="
        w-auto 
        md:w-6/12 lg:w-6/12
        lg:flex lg:flex-row
        md:flex md:flex-row
        items-end
        md:justify-end lg:justify-end
        text-sm
        mt-1
        sm:mt-2
      ">
        <span className="text-right">
          &copy; {new Date().getFullYear()} {"Popcornia. All rights reserved | Developed by "}
          <CustomLink target="_blank" href="https://www.warriorpanda.com">
            www.warriorpanda.com
          </CustomLink>
        </span>
      </p>
    </div>
  );
}
