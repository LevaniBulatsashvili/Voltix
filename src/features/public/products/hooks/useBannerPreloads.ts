import { useEffect } from "react";

const useBannerPreloads = (hrefs: string[]) => {
  useEffect(() => {
    const links = hrefs.map((href) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = href;
      document.head.appendChild(link);
      return link;
    });
    return () => links.forEach((l) => document.head.removeChild(l));
  }, [hrefs]);
};

export default useBannerPreloads;
