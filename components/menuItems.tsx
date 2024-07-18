import Link from "next/link";

export default function MenuItems({ menuItems }) {
    return (
        <ul className="max-w-2xl mx-auto flex-col md:flex-row flex">
            {menuItems.map((item, index) => (
                <li key={index} className="ml-4 font-normal">
                    <Link
                        href={item.url}
                        className="hover:underline"
                        dangerouslySetInnerHTML={{ __html: item.label }}
                    ></Link>
                </li>
            ))}
        </ul>
    );
}
