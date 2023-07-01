import PropTypes from "prop-types";
import { useProfessions } from "../../hooks/useProfession";

const Profession = ({ id }) => {
  const { isLoading, getProfession } = useProfessions();
  const profession = getProfession(id);

  return !isLoading ? profession.name : "loading...";
};

Profession.propTypes = {
  id: PropTypes.string
};

export default Profession;
