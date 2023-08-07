import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Qualitie from "./qualitie";
import {
  getQualitiesByIds,
  getQualitiesIsLoading,
  loadQualitiesList
} from "../../../store/qualities";
import { useDispatch, useSelector } from "react-redux";

const QualitiesList = ({ qualities }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getQualitiesIsLoading());
  // const qualitiesList = useSelector(getQualities());
  if (isLoading) return <p>Загрузка...</p>;
  const newQualities = useSelector(getQualitiesByIds(qualities));
  // const newQualities = qualities.map((id) => {
  //   return qualitiesList.find((q) => q._id === id);
  // });

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
