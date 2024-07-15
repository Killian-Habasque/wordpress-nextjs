export default function MenuItems({ menuItems }) {
    return (
      <ul className="max-w-2xl mx-auto">
          Menu
          {menuItems.nodes.map((item, index) => (
            <li key={index} className="ml-4 font-normal">
              {item.label}
            </li>
          ))}
      </ul>
    );
  }
  