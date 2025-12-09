import React from "react";

const experienceData = [
  {
    company: "impact code GmbH",
    role: "Software Developer (Full-Stack)",
    period: "Mar 2025 -  Present",
    responsibilities: [
      "Development of web applications in the health sector using Next.js, Angular, Tailwind CSS, PHP and MySQL",
      "Implementation of the company website from given designs",
      "Use of Docker for containerization",
    ],
  },
  {
    company: "Brüder Schlau GmbH",
    role: "Software Development Apprenticeship (Full-Stack)",
    period: "Aug 2022 - Jan 2025",
    responsibilities: [
      "Optimization and Expansion of the E-Commerce platform written in JSP and SAP Hybris",
      "Development of internal tools using React.js",
      "Maintenance of existing applications",
    ],
  },
];

const Experience = () => {
  return (
    <div className="stack-xl">
      <h2 className="type-title">My Working Experience</h2>
      {experienceData.map((exp, index) => (
        <article key={index} className="stack-md">
          <h3 className="type-subheading">{exp.company}</h3>
          <h4 className="type-heading">{exp.role}</h4>
          <p className="type-meta">{exp.period}</p>
          <ul className="type-list stack-sm list-disc pl-4">
            {exp.responsibilities.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
};

export default Experience;
