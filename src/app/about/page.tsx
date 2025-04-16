import { Button } from "@/components/ui/button";
import Wrapper from "@/components/Wrapper";
import Link from "next/link";
import { FaArrowRight, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AniHubTracker | About"
}

const About = () => {
  return (
    <Wrapper>
      <div className="container bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 overflow-hidden min-h[80vh] rounded-xl py-10 px-8 shadow-sm flex flex-col gap-6">
        <h2 className="font-bold text-4xl capitalize text-center mb-6 text-zinc-900 dark:text-zinc-200">
          About AniHubTracker
        </h2>
        <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed text-justify">
          AniHubTracker is a fun and passion-driven personal project crafted
          with love by <strong>Shivain Sagar</strong>. It&apos;s built for anime fans
          and fellow weebs to easily discover, track, and stay updated with
          currently airing and upcoming seasonal anime. Whether you&apos;re a
          seasoned anime veteran or just getting started, this tool is made to
          simplify your anime-watching experience.
        </p>

        <p className="mt-4 text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed text-justify">
          The app uses data powered by the awesome and free{" "}
          <strong className="hover:underline underline-offset-4">
            <Link href="https://anilist.co" target="_blank">
              Anilist Public API
            </Link>
          </strong>
          , which makes all anime-related information available in real-time. A
          big shoutout and thanks to the AniList team for providing such a
          wonderful and accessible API to developers like me!
        </p>

        <p className="mt-4 text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed text-justify">
          This project is still a work in progress, and I&apos;m always looking
          to improve it. If you have feature ideas, bug reports, or just want to
          say hi — I&apos;m all ears! Feel free to open issues, raise pull
          requests, or just reach out directly.
        </p>
        <div className="mt-6 flex flex-col gap-3 text-zinc-700 dark:text-zinc-300">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                Contact Me
                <FaArrowRight className="animate-pulse"/>
            </h3>
          <div className="pl-1 flex items-center gap-2">
            <FaGithub className="text-xl" />
            <Button className="pl-0" variant="link">
              <Link href="https://github.com/shivain2393/anime-tracker" target="_blank">
                Github Repository
              </Link>
            </Button>
          </div>
          <div className="pl-1 flex items-center gap-2">
            <MdEmail className="text-xl" />
            <Button className="pl-0" variant="link">
              <Link href="mailto:shivain.sagar@gmail.com">
                shivain.sagar@gmail.com
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default About;
