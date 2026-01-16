import { type ReactNode } from "react";

function About() {
  return (
    <section id="about" className="mt-6 space-y-4">
      <p className="body-text">
        I&apos;m a Computer Science student studying at the University of
        Toronto. I will be (hopefully) be graduating in June 2027.
      </p>

      <p className="body-text">
        Over the past few years, I&apos;ve tried to do interesting things at
        interesting places. Along the way, I&apos;ve had the privilege of
        working with some amazing people at{" "}
        <CompanyLink href="https://www.indexexchange.com/">
          Index Exchange
        </CompanyLink>
        ,{" "}
        <CompanyLink href="https://aws.amazon.com/rds/aurora/">
          Amazon Aurora
        </CompanyLink>
        ,{" "}
        <CompanyLink href="https://www.dashsocial.com/">
          Dash Social
        </CompanyLink>
        , my{" "}
        <CompanyLink href="https://www.autodrive.utoronto.ca/">
          university&apos;s self-driving car team
        </CompanyLink>
        , an{" "}
        <CompanyLink href="https://okareai.com/">
          AI dental software startup
        </CompanyLink>{" "}
        and the{" "}
        <CompanyLink href="https://www.utat.ca/space-systems">
          CubeSat division
        </CompanyLink>{" "}
        within a student-led aerospace team.
      </p>
      <div className="body-text">
        <p>
          If any of this sounds interesting, feel free to reach out via
          LinkedIn. I&apos;m always open to conversation.
        </p>
      </div>
    </section>
  );
}

export default About;

const CompanyLink = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-900 underline">
      {children}
    </a>
  );
};
