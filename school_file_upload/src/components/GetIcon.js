import React from "react";
import {
  faHome,
  faHouse,
  faCircle,
  faPaperPlane,
  faChevronUp,
  faChevronDown,
  faCircleStop,
  faMicrophoneSlash,
  faMicrophone,
  faGear,
  faCircleQuestion,
  faBook,
  faComments,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function GetIcon({ icon, style, onClick, className = "circle", ...props }) {
  let iconData = {
    faHome: faHome,
    faHouse: faHouse,
    faCircle: faCircle,
    faPaperPlane: faPaperPlane,
    faChevronUp: faChevronUp,
    faChevronDown: faChevronDown,
    faMicrophone: faMicrophone,
    faCircleStop: faCircleStop,
    faMicrophoneSlash: faMicrophoneSlash,
    faGear: faGear,
    faCircleQuestion: faCircleQuestion,
    faComments: faComments,
    faBook: faBook,
  };
  const selectedIcon = iconData[icon] || faHome;

  return (
    <FontAwesomeIcon
      icon={selectedIcon}
      className={className}
      onClick={onClick}
      style={style}
      {...props}
    />
  );
}

export default GetIcon;
