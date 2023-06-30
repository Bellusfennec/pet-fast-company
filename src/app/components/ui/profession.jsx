import PropTypes from "prop-types";
import { useProfessions } from "../../hooks/useProfession";

const Profession = ({ id }) => {
  console.log(id);
  const { isLoading, getProfession } = useProfessions();
  const prof = getProfession(id);
  return !isLoading ? prof.name : "loading...";
};

Profession.propTypes = {
  id: PropTypes.string
};

export default Profession;
