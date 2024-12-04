import React from "react";

const FormattedDate = ({ date }) => {
    const formatDate = (isoDate) => {
        const options = { day: "numeric", month: "long", year: "numeric" };
        return new Date(isoDate).toLocaleDateString("es-ES", options);
    };

    return <p className="font-poppins text-sm text-gray-500 ">{formatDate(date)}</p>;
};

export default FormattedDate;