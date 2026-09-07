import { type ReactNode } from "react";
import { LinkPreview } from "./components/LinkPreview";

function About() {
  return (
    <section id="about" className="mt-6 space-y-4">
      <p className="body-text">
        I&apos;m a Computer Science student studying at the University of
        Toronto. I will be graduating in June 2027 and currently exploring
        full-time software engineering roles.
      </p>

      <p className="body-text">
        Over the past few years, I&apos;ve tried to do interesting things at
        interesting places. Along the way, I&apos;ve had the privilege of
        working with some amazing people at{" "}
        <CompanyLink href="https://cloud.google.com/products/alloydb">
          Google
        </CompanyLink>
        , <CompanyLink href="https://www.yscope.com/">YScope</CompanyLink>,{" "}
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
    <LinkPreview
      url={href}
      className="text-gray-900 underline underline-offset-2 decoration-gray-400 transition-[text-decoration-color] hover:decoration-gray-900">
      {children}
    </LinkPreview>
  );
};
