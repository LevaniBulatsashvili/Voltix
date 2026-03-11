import AppLink from "../../components/button/AppLink";

export interface ISection {
  title: string;
  links: string[];
}

const Section = ({ title, links }: ISection) => {
  return (
    <div className="text-left">
      <p className="text-xl sm:text-2xl text-primary font-semibold uppercase">
        {title}
      </p>
      <ul className="mt-7 space-y-2 sm:space-y-3">
        {links.map((item, index) => (
          <li key={index}>
            <AppLink to="#">{item}</AppLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Section;
