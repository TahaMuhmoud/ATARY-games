import React from "react";
interface TagProps {
  dataKey?: string;
  dataValue?: string | number;
  icon?: React.ReactNode;
}
const Tag = ({ dataKey, dataValue, icon }: TagProps) => {
  if (!dataValue) return;
  return (
    <div className="flex gap-2 items-center bg-white/30 px-2 py-1">
      <div className={`flex ${dataKey ? "gap-2" : ""}`}>
        <span>{dataKey ? dataKey + ":" : ""}</span>
        <span>{dataValue}</span>
      </div>

      {icon}
    </div>
  );
};

export default Tag;
