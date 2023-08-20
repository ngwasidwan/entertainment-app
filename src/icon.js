import { useState } from "react";

export const NavigationIcons = function ({
  title,
  children,
  icon,
  setActiveIcon,
  activeIcon,
  movies,
  setMovieType,
}) {
  const [iconHeading, setIconHeading] = useState("hidden");
  return (
    <div className="icon-box">
      <svg
        className={activeIcon === icon ? "active icon " : "icon"}
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 256 256"
        onClick={() => {
          setActiveIcon(icon);
          setMovieType(movies);
        }}
        onMouseOver={() => setIconHeading("")}
        onMouseOut={() => setIconHeading("hidden")}
      >
        {children}
      </svg>
      <p className={`${iconHeading} icon-title`}>{title}</p>
    </div>
  );
};

export const FilmIcon = function () {
  return (
    <svg
      className="film-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="rgba(252, 70, 64, 0.957)"
      viewBox="0 0 256 256"
    >
      <path d="M216,104H102.09L210,75.51a8,8,0,0,0,5.68-9.84l-8.16-30a15.93,15.93,0,0,0-19.42-11.13L35.81,64.74a15.75,15.75,0,0,0-9.7,7.4,15.51,15.51,0,0,0-1.55,12L32,111.56c0,.14,0,.29,0,.44v88a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V112A8,8,0,0,0,216,104ZM192.16,40l6,22.07-22.62,6L147.42,51.83Zm-66.69,17.6,28.12,16.24-36.94,9.75L88.53,67.37Zm-79.4,44.62-6-22.08,26.5-7L94.69,89.4ZM208,200H48V120H208v80Z"></path>
    </svg>
  );
};

export const SearchIcon = function () {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="#fff"
      viewBox="0 0 256 256"
    >
      <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
    </svg>
  );
};
