import React from "react";

export default function DeviceCard({
  icon,
  title,
  subtitle,
  active = true,
  color = "gray",
  onClick,
  children,
}) {
  const activeBg = "bg-white dark:bg-gray-800";
  const inactiveBg = "bg-gray-100 dark:bg-gray-700";

  const bg = active ? activeBg : inactiveBg;

  return (
    <div
      onClick={onClick}
      className={`
        ${bg}
        rounded-2xl p-4 shadow-sm cursor-pointer
        transition-all duration-300
        transform hover:scale-[1.03] hover:shadow-md
        animate-fadeInUp
      `}
    >
      <div className="flex items-start gap-3">
        <div
          className={`
            w-10 h-10 rounded-xl flex items-center justify-center
            transition-all duration-300
            ${active ? `bg-${color}-100 dark:bg-${color}-900/40` : "bg-gray-200 dark:bg-gray-600"}
          `}
        >
          {React.cloneElement(icon, {
            className: active
              ? `text-${color}-500 dark:text-${color}-300`
              : "text-gray-400 dark:text-gray-500",
          })}
        </div>

        <div>
          <h3 className="text-gray-900 dark:text-gray-100 text-base">
            {title}
          </h3>
          {subtitle && (
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {children && <div className="mt-3">{children}</div>}
    </div>
  );
}
