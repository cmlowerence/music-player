import React, { useEffect, useState } from "react";
import "./sidebarButton.css";
import { Link, useLocation } from "react-router-dom";
import { IconContext } from "react-icons";

export default function SidebarButton(props) {
  const location = useLocation();

  const isActive = location.pathname === props.to;

  const btnClass = isActive ? "btn-body active" : "btn-body";
  const [iconSize, setIconSize] = useState(24);

  useEffect(() => {
    const handleIconSize = () => {
      const screenSize = window.innerWidth;
      if (screenSize >= 700) {
        setIconSize(24);
      } else if (screenSize >= 500) {
        setIconSize(20);
      } else {
        setIconSize(16);
      }
    };

    handleIconSize();

    window.addEventListener("resize", handleIconSize);

    return () => {
      window.removeEventListener("resize", handleIconSize);
    };
  }, []);

  return (
    <Link to={props.to}>
      <div className={btnClass}>
        <IconContext.Provider value={{ size: `${iconSize}px`, className: "btn-icon" }}>
          {props.icon}
          <p className='btn-title'>{props.title}</p>
        </IconContext.Provider>
      </div>
    </Link>
  );
}
