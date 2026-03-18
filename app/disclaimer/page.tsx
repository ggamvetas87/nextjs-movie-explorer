import { Metadata } from 'next';
import CustomLink from "@/components/interactions/CustomLink";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Disclaimer",
    description: "Disclaimer page for the movie explorer application",
  };
}

export default async function DisclaimerPage() {
  return (
    <>
        <div className="max-w-5xl mx-auto p-6 flex flex-col md:flex-row gap-6">
            <CustomLink href="/" type="button">
                &larr; Back to Home
            </CustomLink>
        </div>
        <div className="max-w-5xl mx-auto p-6 flex flex-col">
            <h2 className="text-3xl font-bold mb-2">Development Disclaimer</h2>
            <p className="mb-10">
                This application is for educational and entertainment purposes only. 
                It uses the IMDb API to fetch movie data, but it is not affiliated with IMDb or any of its parent companies. 
                The content provided in this app is sourced from IMDb and may be subject to inaccuracies or changes. 
                Users should verify information from official sources before making any decisions based on the data presented here.
            </p>
            
            <h3 className="text-2xl font-bold mb-2">Purpose</h3>
            <p className="mb-10">
                <span className="text-red-500 font-bold">Popcornia</span> is developed strictly for educational, experimental, and development purposes. 
                It is intended to be used as a technical demonstration and learning tool only.
            </p>

            <h3 className="text-2xl font-bold mb-2">Non-Commercial Use</h3>
            <p className="mb-10">
                <span className="text-red-500 font-bold">Popcornia</span> is not intended for commercial use, public distribution, or production environments. 
                Any usage beyond development or testing contexts is not supported or endorsed.
            </p>

            <h3 className="text-2xl font-bold mb-2">Content Disclaimer</h3>
            <p className="mb-10">
                <span className="text-red-500 font-bold">Popcornia</span> does not host, store, or distribute any copyrighted material. 
                Any content accessed through the application is the responsibility of the user.
            </p>

            <h3 className="text-2xl font-bold mb-2">Liability</h3>
            <p className="mb-10">
                The developers of <span className="text-red-500 font-bold">Popcornia</span> are not responsible for any misuse of the application. 
                Users are solely responsible for ensuring that their use complies with applicable laws and regulations.
            </p>

            <h3 className="text-2xl font-bold mb-2">No Warranty</h3>
            <p className="mb-10">
                <span className="text-red-500 font-bold">Popcornia</span> is provided as-is without any warranties, express or implied. 
                The developers do not guarantee functionality, reliability, or availability.
            </p>
        </div>
    </>
  );
}
