import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Section = ({ children }: Props) => {
  return (
    <section className="layout-section section-spacing">{children}</section>
  );
};

export default Section;
