import AppLink from "@/components/button/AppLink";
import { notify } from "@/lib/toast/toast";

export interface ISection {
  title: string;
  links: string[];
}

const Section = ({ title, links }: ISection) => {
  const onClick = () => notify.info("footer.coming_soon");

  return (
    <div className="text-left">
      <p className="text-xl sm:text-2xl font-semibold uppercase">{title}</p>
      <ul className="mt-7 space-y-2 sm:space-y-3">
        {links.map((item, index) => (
          <li key={index}>
            <AppLink to="#" onClick={onClick}>
              {item}
            </AppLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Section;
