"use client";
import Link from "next/link";

const BreadCrumb = ({ items = [] }) => {
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <nav className="text-sm mb-6 font-thin">
      <ol className="flex flex-wrap items-center gap-x-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center">
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-[#bd9354] text-black/70">
                  {item.label}
                </Link>
              ) : (
                <span className="text-[#bd9254] font-semibold">{item.label}</span>
              )}
              {!isLast && <span className="mx-2 text-gray-300">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadCrumb;
