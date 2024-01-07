import React from "react";

function PageHeader({title}:{title:string}) {
  return (
    <h1 className="sm:text-[45px] text-[35px] text-center w-full sm:text-left">
      {title}
    </h1>
  );
}

export default PageHeader;
