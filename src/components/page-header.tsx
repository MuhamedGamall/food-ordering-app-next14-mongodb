import React from "react";

function PageHeader({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <h1 className="sm:text-[45px] text-[35px] w-full font-bold text-left my-5">
      {title}
      {children}
    </h1>
  );
}

export default PageHeader;
