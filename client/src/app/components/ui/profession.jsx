import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
  getProfessionById,
  getProfessionsIsLoading
} from "../../store/professions";

const Profession = ({ id }) => {
  const isLoading = useSelector(getProfessionsIsLoading());
  const profession = useSelector(getProfessionById(id));

  return !isLoading ? profession.name : "loading...";
};

Profession.propTypes = {
  id: PropTypes.string
};

export default Profession;
