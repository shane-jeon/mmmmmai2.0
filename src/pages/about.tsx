import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";

const About = () => {
  const teamMembers = [
    {
      name: "Shane Jeon",
      role: "Frontend Software Engineer",
      img: "/shane.jpg",
      linkedIn: "https://www.linkedin.com/in/shane-jeon/",
    },
    {
      name: "Jessica Chew",
      role: "Software Engineer",
      img: "/jessica.jpg",
      linkedIn: "https://www.linkedin.com/in/jessica-chew-151824189/",
    },
    {
      name: "Jonas Bartels",
      role: "Software Engineer",
      img: "/jonas.jpg",
      linkedIn: "https://www.linkedin.com/in/jonas-i-bartels/",
    },
    {
      name: "Heidi Arcilla",
      role: "Product Designer",
      img: "/heidi.jpg",
      linkedIn: "https://www.linkedin.com/in/heidiarcilla/",
    },
    {
      name: "Jui-Ting Sun",
      role: "Product Designer",
      img: "/juiting.jpg",
      linkedIn: "https://www.linkedin.com/in/juitingsun/",
    },
  ];

  const engineers = teamMembers.filter((member) =>
    member.role.includes("Software Engineer")
  );
  const designers = teamMembers.filter((member) =>
    member.role.includes("Product Designer")
  );

  const aboutParagraphs = [
    `MMMMMai is the brainchild of PinkPonyClub, a team formed at the Useless Fun AI Build-A-Thon, presented by Haystack, hosted by
  Cloudflare, and fueled by lunch from AssemblyAI. Our team of solo
  software engineers and product designers met for the first time at
  the event, united by one mission: to create something fun,
  AI-powered, and utterly useless. The result? MMMMMai, a recipe
  generator that crafts absurd recipes based on user input.`,
    `By the end, we were a tight-knit group of 3 engineers and 2
              product designers, collaborating to bring this wacky project to
              life. Our challenge? Use Cloudflare’s WorkersAI, deepset’s
              Haystack LLM, or AssemblyAI’s SpeechAI model to build something
              creative, technically complex, and – most importantly – useless.
              Our product designers crafted a brilliant concept, while our
              engineers tackled the tech and time constraints. One of our
              teammates even pulled together a highly entertaining presentation
              for the judges and audience.`,
    `While we didn’t take home the top prize, we’re proud of what we
              built and thrilled to share our wonderfully useless creation with
              the world. So, welcome to MMMMMai – a project as much about
              collaboration and fun as it is about ridiculous recipes.`,
    `If you ever attempt one of our culinary disasters, we’d love to
              hear about it! Drop us a note on our contact page or tag us on
              LinkedIn. Bon appétit... and good luck!`,
  ];

  const techParagraphs = [
    `We built our wonderfully useless project using WorkersAI, with the
            LLaMA model powering the recipe generation and Stable Diffusion XL
            Lightning creating the corresponding images. Due to time
            constraints, we forked Cloudflare’s Hackathon Helper starter kit,
            which included a TypeScript-based API originally designed for an
            etymology app. We adapted this API for our purposes, modifying the
            prompt to say: “You generate bad recipes. The user will input
            ingredients, and you will provide the worst recipe ever.” The API
            handled input from the user, passing it to the LLaMA model, which
            generated the absurd recipe text. This recipe was then passed to the
            Stable Diffusion XL model to create the associated image, both of
            which were displayed to the user. This was the project’s 1.0
            version.`,
    `MMMMMai 2.0 is a rebuilt, refined version of the original hackathon
            project. One of our software engineers, Shane Jeon, was so
            entertained by the concept that they decided to rebuild the app
            using a frontend stack they regularly work with. The current version
            is built with Next.js, TypeScript, React, and TailwindCSS. For the
            recipe-loading experience, we integrated Lottie animations. The
            app’s architecture was reworked to make the frontend more efficient,
            and it was deployed on Vercel to ensure smooth performance and
            scalability.`,
  ];

  return (
    <div className="mb-20">
      <Header />
      <div className="mx-6">
        <div className="mx-4 mt-8 lg:mx-52 lg:mt-16">
          <h1 className="mb-10 font-sans text-3xl lg:text-4xl">
            MMMMMMai - The "tastiest" result of useless fun and
            cross-collaboration
          </h1>
          <Image
            src="/hackathonuseless.jpg"
            alt="Useless Fun AI Build-A-Thon"
            width={600}
            height={300}
            className="mx-auto rounded-lg"
          />
          <div className="mb-4 lg:mb-10">
            <h2 className="pb-2 text-2xl lg:text-3xl">
              The Origins of MMMMMMai
            </h2>
            <div className="text-lg lg:text-xl">
              {aboutParagraphs.map((paragraph, index) => (
                <p key={index} className="pb-3">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="mb-4 lg:mb-10">
            <h2 className="pb-2 text-2xl lg:text-3xl">How We Built It</h2>
            <div className="text-lg lg:text-xl">
              {techParagraphs.map((paragraph, index) => (
                <div key={index} className="pb-3">
                  <p>{paragraph}</p>
                </div>
              ))}
            </div>
            <Link
              href="https://github.com/shane-jeon/mmmmmai2.0"
              target="_blank">
              <div className="flex items-center justify-center">
                <Image src="/github.png" alt="GitHub" width={80} height={80} />

                <p className="items-center justify-center text-xl hover:underline">
                  MMMMMai GitHub Repo
                </p>
              </div>
            </Link>
          </div>
        </div>

        <div className="mx-auto w-full flex-col items-center rounded-md border-4 border-[#00464B] p-8 lg:w-2/4 lg:px-20 lg:py-12">
          <h2 className="pb-8 text-center text-4xl lg:text-5xl">
            Meet the Team Members of PinkPonyClub
          </h2>

          <div className="pb-12">
            <h3 className="pb-6 text-3xl lg:text-4xl">Software Engineers</h3>
            <div className="md:scrollbar-hide flex w-max overflow-x-auto md:w-auto">
              {engineers.map((member, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 rounded-md p-6 hover:bg-[#007E61] hover:text-white">
                  <Link href={member.linkedIn} target="_blank">
                    <Image
                      src={member.img}
                      alt={member.name}
                      width={120}
                      height={120}
                      className="mb-3 rounded-full"
                    />
                    <p className="pb-1 text-xl">{member.name}</p>
                    <p className="w-48 text-xl">{member.role}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="pb-6 text-3xl lg:text-4xl">Product Designers</h3>
            <div className="md:scrollbar-hide flex w-max overflow-x-auto md:w-auto">
              {designers.map((member, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 rounded-md p-6 hover:bg-[#007E61] hover:text-white">
                  <Link href={member.linkedIn} target="_blank">
                    <Image
                      src={member.img}
                      alt={member.name}
                      width={120}
                      height={120}
                      className="mb-3 rounded-full"
                    />
                    <p className="pb-1 text-xl">{member.name}</p>
                    <p className="w-48 text-xl">{member.role}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
