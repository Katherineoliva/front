import { space } from "postcss/lib/list";
import React from "react";

const SelectedSpace = ({ count, selectedSpace, onSelectSpace, reservedSpaces, availableSpaces }) => {
  return (
    <div>
      {availableSpaces.map((space) => (
        <button
          key={space._id}
          onClick={() => onSelectSpace(space.value)}
          className={`w-24 text-center gap-2  px-4 py-2 border rounded ${selectedSpace === space.value
            ? "bg-blue-500 text-white"
            : "bg-gray-100"
            } ${reservedSpaces.includes(space.value) || space.state === true ? "bg-gray-500 cursor-not-allowed" : ""}`}
          disabled={reservedSpaces.includes(space.value) || space.state === true} // Deshabilita los espacios reservados y los que tienen state: true
        >
          Espacio {space.value}
        </button>
      ))}
    </div>
  );
};


export default SelectedSpace;
