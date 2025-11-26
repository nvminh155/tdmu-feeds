import React from "react";
// import { getTranslations } from "next-intl/server";

const Footer = async () => {
  // const t = await getTranslations("Footer");
  return (
    <footer className="mt-auto bg-blue-800 py-8 text-white">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <p className="mb-2 flex justify-center gap-2 text-lg max-sm:flex-col max-sm:text-sm">
          {/* <span>{t("Copyright.year")}</span>{" "} */}
          {/* <span>{t("Copyright.school")}</span> */}
        </p>
        {/* <p className="text-blue-200 max-sm:text-sm">{t("description")}</p> */}
      </div>
    </footer>
  );
};

export default Footer;
