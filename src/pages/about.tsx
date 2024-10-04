import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";

const About = () => {
  const teamMembers = [
    {
      name: "Shane Jeon",
      role: "Software Engineer",
      img: "/shane.jpg",
      linkedIn: "https://www.linkedin.com/in/shane-jeon/",
      summary:
        "Shane is a freelance software engineer specializing in frontend development with experience in quality assurance. They've worked on projects with Rocket Lawyer's Quality Assurance team and website redesigns with Sustainable Progress and Equality Collective. Their background in healthcare provides a unique perspective, making them a strong fit for health tech, though they are open to other fields as well. With a strong work ethic and eagerness to learn, Shane is ready to be a valuable contributor to any team.",
    },
    {
      name: "Jessica Chew",
      role: "Software Engineer",
      img: "/jessica.jpg",
      linkedIn: "https://www.linkedin.com/in/jessica-chew-151824189/",
      summary: "",
    },
    {
      name: "Jonas Bartels",
      role: "Software Engineer",
      img: "/jonas.jpg",
      linkedIn: "https://www.linkedin.com/in/jonas-i-bartels/",
      summary:
        "Jonas recently completed his undergraduate degree at Carleton College where he studied computer science and music. Formerly a sailing instructor, he is now looking to break into the software development industry. In his free time he enjoys 8-ball, chess, and musical composition. ",
    },
    {
      name: "Heidi Arcilla",
      role: "Product Designer",
      img: "/heidi.jpg",
      linkedIn: "https://www.linkedin.com/in/heidiarcilla/",
      summary: "",
    },
    {
      name: "Jui-Ting Sun",
      role: "Product Designer",
      img: "/juiting.jpg",
      linkedIn: "https://www.linkedin.com/in/juitingsun/",
      summary: "",
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
    Cloudflare, and fed by AssemblyAI. Our team of solo
    software engineers and product designers met for the first time at
    the event, united by one mission: to create a fun and utterly useless
    AI-powered product. The result? MMMMMai, a recipe
    generator that crafts absurd recipes based on user input.`,
    `By the end, we were a tight-knit group of 3 software engineers and 2
    product designers, collaborating to bring this concept to
    life. Our challenge? To use Cloudflare’s WorkersAI, deepset’s
    Haystack LLM, or AssemblyAI’s SpeechAI model to build a
    creative, technically complex, and – most importantly – useless product.
    Our product designers crafted a brilliant design, while our
    software engineers tackled the tech within the time constraint. One of our
    teammates pulled together a highly entertaining presentation
    for the judges and audience.`,
    `While we didn’t take home the top prizes, we’re proud of what we
    built and thrilled to share our absolutely useless creation with
    the world. So, welcome to MMMMMai – a project as much about
    collaboration and fun as it is about useless recipes.`,
    `If you ever attempt one of our culinary disasters, we’d love to
    hear about it! Drop us a note on our contact page or tag us on
    LinkedIn. Bon appétit...and good luck!`,
  ];

  const techParagraphs = [
    `We built our useless project using Cloudflare's WorkersAI to tap into
    LLaMA 3.0, which generated our recipes and Stable Diffusion XL
    to manifest these meals visually. Due to time
    constraints, we forked Cloudflare’s Hackathon Helper starter kit,
    which included a TypeScript-based API originally designed for an
    etymology app. We cusotmized this API to suit our use case and utilized prompt engineering to define a role system that processes content with the directive: “You generate bad recipes. The user will input
    ingredients, and you will provide the worst recipe ever.” The API processed user inputs and forwarded them to the LLaMa model, which generated the absurd recipe text. This text was then passed to the Stable Diffusion XL model to produce a corresponding image. BOth outputs were then displayed to the user, constituting the 1.0 version of the project.`,
    `MMMMMai 2.0 is a re-engineered and optimized iteration of the original hackathon project. Driven by the potential of the concept, I (Shane Jeon) took the initiative to rebuild the app using a modern frontend tech stack, including Next.js, TypeScript, React, and TailwindCSS, which aligns with my expertise. For an enhanced user experience, I integrated Lottie animations for recipe-loading visuals. The frontend architecture was redesigned to improve efficiency, and the app was deployed on Vercel to ensure high performance and scalability.`,
  ];

  return (
    <div className="mx-4 border-2 border-purple-600 lg:mx-auto lg:mb-20">
      <Header />
      {/* <div className="mx-2 lg:mx-6"> */}
      <div className="">
        <div className="mx-4 lg:mx-52 lg:mt-10">
          <div className="lg:mb-6">
            {/* <h1 className="text-center font-sans text-2xl lg:text-4xl">
              MMMMMMai
            </h1> */}
            <Image
              src="/logo.png"
              alt="Useless Fun AI Build-A-Thon"
              width={200}
              height={0}
              className="mx-auto mt-8 rounded-lg"
            />
            <h1 className="my-5 text-center text-lg lg:mb-10 lg:mt-8 lg:text-3xl">
              The &quot;tastiest&quot; result of useless fun and
              cross-collaboration
            </h1>
          </div>
          <Image
            src="/hackathonuseless.jpg"
            alt="Useless Fun AI Build-A-Thon"
            width={600}
            height={300}
            className="mx-auto rounded-lg"
          />
          <div className="mb-4 lg:mb-10">
            <h2 className="mx-2 my-4 text-center text-2xl lg:my-8 lg:text-3xl">
              The Origins of MMMMMMai 🥦
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
            <h2 className="pb-2 text-2xl lg:text-3xl">How We Built It 💻</h2>
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
              <div className="flex flex-col items-center justify-center p-4 lg:flex-row">
                <Image
                  src="/github.png"
                  alt="GitHub"
                  width={80}
                  height={80}
                  className="mb-2 lg:mb-0"
                />
                <p className="items-center justify-center text-xl hover:underline lg:ml-2 lg:text-2xl">
                  MMMMMai GitHub Repo
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* <div className="mx-auto w-full flex-col items-center rounded-md border-4 border-[#00464B] p-8 lg:w-2/4 lg:px-20 lg:py-12"> */}
        <div className="">
          <h2 className="pb-8 text-center text-2xl lg:text-5xl">
            Meet the Team Members of PinkPonyClub 👋
          </h2>

          {/* <div className="mx-auto flex flex-col pb-12 pt-2"> */}
          <div className="">
            <h3 className="pb-6 text-center text-3xl lg:text-4xl">
              Software Engineers
            </h3>
            {/* <div className="md:scrollbar-hide flex w-max overflow-x-auto md:w-auto"> */}
            <div className="lg:mx-20 lg:flex">
              {engineers.map((member, index) => (
                // <div
                //   key={index}
                //   className="mx-auto flex-shrink-0 rounded-md p-6 hover:bg-[#007E61] hover:text-white">
                <div key={index} className="flex justify-center p-10 lg:w-1/3">
                  <Link href={member.linkedIn} target="_blank" className="">
                    <Image
                      src={member.img}
                      alt={member.name}
                      width={140}
                      height={140}
                      className="mb-2 rounded-full"
                    />
                    <p className="pb-1 text-3xl">{member.name}</p>
                    <p className="text-2xl">{member.role}</p>
                    <p className="mt-2 text-lg">{member.summary}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="py-6 text-center text-3xl lg:text-4xl">
              Product Designers
            </h3>
            {/* <div className="md:scrollbar-hide flex w-max overflow-x-auto md:w-auto"> */}
            <div className="lg:flex lg:justify-center">
              {designers.map((member, index) => (
                // <div
                //   key={index}
                //   className="mx-auto flex-shrink-0 rounded-md p-6 hover:bg-[#007E61] hover:text-white">
                <div key={index} className="p-10">
                  <Link href={member.linkedIn} target="_blank" className="">
                    <Image
                      src={member.img}
                      alt={member.name}
                      width={140}
                      height={140}
                      className="mb-2 rounded-full"
                    />
                    <p className="pb-1 text-3xl">{member.name}</p>
                    <p className="text-2xl">{member.role}</p>
                    <p className="mt-2 text-lg">{member.summary}</p>
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
