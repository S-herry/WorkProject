import React, { useState, useEffect } from "react";

const Getcolor = ({ counts }) => {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    function generateSoftColor(counts) {
      let newColors = [];

      while (newColors.length < counts) {
        const hue = Math.floor(Math.random() * 360);
        const saturation = 40 + Math.floor(Math.random() * 30);
        const lightness = 70 + Math.floor(Math.random() * 20);
        const colorString = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

        // 检查颜色是否已存在于数组中
        if (!newColors.includes(colorString)) {
          newColors.push(colorString);
        }
      }

      setColors(newColors);
    }

    generateSoftColor(counts);
  }, [counts]);

  return colors;
};

export default Getcolor;
