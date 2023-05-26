import React, { useEffect, useState } from "react";
import API from "../../../api";
import { useHistory, useParams } from "react-router-dom";
import MultiSelectField from "../../common/form/multiSelectField";
import RadioField from "../../common/form/radioField";
import SelectField from "../../common/form/selectField";
import TextField from "../../common/form/textField";
import { validator } from "../../../utils/validator";

const UserEditPage = () => {
  const history = useHistory();
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState();
  const [qualities, setQualities] = useState({});
  const [professions, setProfessions] = useState();
  const [formError, setFormError] = useState({});

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    setLoading(true);
    await API.users.getById(userId).then((data) => {
      const qualitiesList = data.qualities.map((optionName) => ({
        label: optionName.name,
        value: optionName._id,
        color: optionName.color
      }));
      setFormData({
        ...data,
        qualities: qualitiesList,
        profession: data.profession._id
      });
    });
    await API.professions.fetchAll().then((data) => {
      const professionsList = Object.keys(data).map((professionName) => ({
        label: data[professionName].name,
        value: data[professionName]._id
      }));
      setProfessions(professionsList);
    });
    await API.qualities.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map((optionName) => ({
        label: data[optionName].name,
        value: data[optionName]._id,
        color: data[optionName].color
      }));
      setQualities(qualitiesList);
    });
    setLoading(false);
  };

  const handleChangeForm = (target) => {
    setFormData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const validatorCongig = {
    name: {
      isRequired: {
        message: "Имя обязательна для заполнения"
      }
    },
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения"
      },
      isEmail: {
        message: "Электронная почта некорректна"
      }
    },
    profession: {
      isRequired: {
        message: "Профессия обязательна для заполнения"
      }
    },
    sex: {
      isRequired: {
        message: "Пол обязательна для заполнения"
      }
    },
    qualities: {
      isRequired: {
        message: "Качества обязательна для заполнения"
      }
    }
  };

  useEffect(() => {
    validate();
  }, [formData]);

  const validate = () => {
    const error = validator(formData, validatorCongig);
    setFormError(error);
    return Object.keys(error).length === 0;
  };

  const isValid = Object.keys(formError).length === 0;

  const handleSendForm = (e) => {
    e.preventDefault();

    const isValid = validate();
    if (!isValid) return;
    const { profession, qualities } = formData;
    const formatForm = {
      ...formData,
      profession: getProfessionById(profession),
      qualities: getQualities(qualities)
    };
    API.users.update(formatForm._id, formatForm).then((data) => {
      console.log(data);
      history.push(`/users/${userId}`);
    });
  };

  const getProfessionById = (id) => {
    for (const prof of professions) {
      if (prof.value === id) {
        return { _id: prof.value, name: prof.label };
      }
    }
  };

  const getQualities = (elements) => {
    const qualitiesArray = [];
    for (const elem of elements) {
      for (const quality in qualities) {
        if (elem.value === qualities[quality].value) {
          qualitiesArray.push({
            _id: qualities[quality].value,
            name: qualities[quality].label,
            color: qualities[quality].color
          });
        }
      }
    }
    return qualitiesArray;
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3 p-4 shadow">
            {loading && !formData && <>Loading...</>}
            {formData && (
              <form onSubmit={handleSendForm}>
                <TextField
                  label="Имя"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChangeForm}
                  error={formError.name}
                />
                <TextField
                  label="Email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChangeForm}
                  error={formError.email}
                />
                <SelectField
                  label="Выберите вашу профессию"
                  name="profession"
                  value={formData.profession}
                  onChange={handleChangeForm}
                  defaultOption="Выберите..."
                  options={professions}
                  error={formError.profession}
                />
                <RadioField
                  label="Выберите ваш пол"
                  name="sex"
                  value={formData.sex}
                  onChange={handleChangeForm}
                  options={[
                    { name: "Мужчина", value: "male" },
                    { name: "Женщина", value: "female" },
                    { name: "Другое", value: "other" }
                  ]}
                  error={formError.sex}
                />
                <MultiSelectField
                  label="Выберите ваши качества"
                  options={qualities}
                  defaultValue={formData.qualities}
                  onChange={handleChangeForm}
                  name="qualities"
                  error={formError.qualities}
                />
                <button
                  type="submit"
                  disabled={!(!isValid || !loading)}
                  className="btn btn-primary w-100 mx-auto"
                >
                  {loading ? "Загрузка..." : "Обновить"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserEditPage;
