import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import qualityService from "../services/quality.service";
import { toast } from "react-toastify";

export const QualitiesContext = React.createContext();

export const useQualities = () => {
  return useContext(QualitiesContext);
};

export const QualitiesProvider = ({ children }) => {
  const [qualities, setQualities] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getQualitiesList();
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  const getQuality = (id) => {
    return qualities.find((q) => q._id === id);
  };

  const getQualitiesList = async () => {
    try {
      const { content } = await qualityService.fetchAll();
      setQualities(content);
      setLoading(false);
    } catch (error) {
      errorCather(error);
    }
  };

  // const updateQuality = async ({ _id: id, ...data }) => {
  //   try {
  //     const { content } = await qualityService.update(id, data);
  //     setQualities((prevState) =>
  //       prevState.map((item) => {
  //         if (item._id === content._id) {
  //           return content;
  //         }
  //         return item;
  //       })
  //     );
  //     return content;
  //   } catch (error) {
  //     errorCather(error);
  //   }
  // };

  // const addQuality = async (data) => {
  //   try {
  //     const { content } = await qualityService.create(data);
  //     setQualities((prevState) => [...prevState, content]);
  //     return content;
  //   } catch (error) {
  //     errorCather(error);
  //   }
  // };

  // const deleteQuality = async (id) => {
  //   try {
  //     const { content } = await qualityService.delete(id);
  //     setQualities((prevState) => {
  //       return prevState.filter((item) => item._id !== content._id);
  //     });
  //     return content;
  //   } catch (error) {
  //     errorCather(error);
  //   }
  // };

  function errorCather(error) {
    const { message } = error.response.data;
    setError(message);
  }

  return (
    <QualitiesContext.Provider
      value={{
        qualities,
        getQuality,
        isLoading
      }}
    >
      {children}
    </QualitiesContext.Provider>
  );
};
QualitiesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
