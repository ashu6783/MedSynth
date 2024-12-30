import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarDropdown = ({ item }: any) => {
  const pathname = usePathname(); // Corrected spelling

  return (
    <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
      {item.map((menuItem: any, index: number) => (
        <li key={index}>
          <Link
            href={menuItem.route}
            className={`group relative flex items-center gap-2.5 rounded-md px-4 ${
              pathname === menuItem.route ? "text-white bg-blue-600" : "text-gray-600"
            }`}
          >
            {menuItem.label} {/* Assuming each menu item has a label */}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SidebarDropdown;
