import { skillsData } from "@/lib/data";
export default function Skills() {
  return (
    <ul className="skill-grid">
      {skillsData.map(({ name, icon }) => (
        <li key={name}>
          <span aria-hidden="true">{icon}</span>
          <span>{name}</span>
        </li>
      ))}
    </ul>
  );
}
