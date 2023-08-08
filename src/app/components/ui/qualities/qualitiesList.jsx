import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Qualitie from "./qualitie";
import {
  getQualitiesByIds2,
  getQualitiesIsLoading,
  loadQualitiesList
} from "../../../store/qualities";
import { useDispatch, useSelector } from "react-redux";

const QualitiesList = ({ qualities }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getQualitiesIsLoading());
  if (isLoading) return <p>Загрузка...</p>;
  const newQualities = dispatch(getQualitiesByIds2(qualities));

  useEffect(() => {
    dispatch(loadQualitiesList());
  }, []);

  return (
    <>
      {newQualities.map((quality) => (
        <Qualitie key={quality._id} {...quality} />
      ))}
    </>
  );
};
QualitiesList.propTypes = {
  qualities: PropTypes.array
};

export default QualitiesList;
