import React from "react";
import PropTypes from "prop-types";
import Qualitie from "./qualitie";
import { useQualities } from "../../../hooks/useQualities";

const QualitiesList = ({ qualities }) => {
  const { isLoading, getQuality } = useQualities();
  const newQualities = qualities.map((id) => getQuality(id));

  return (
    <>
      {!isLoading &&
        newQualities.map((quality) => (
          <Qualitie key={quality._id} {...quality} />
        ))}
    </>
  );
};
QualitiesList.propTypes = {
  qualities: PropTypes.array
};

export default QualitiesList;
