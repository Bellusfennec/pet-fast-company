import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import API from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";

const RegistrForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    profession: "",
    sex: "male",
    qualities: [],
    licence: false,
    agreement: []
  });
  const [qualities, setQualities] = useState({});
  const [formError, setFormError] = useState({});
  const [professions, setProfessions] = useState();

  const handleChangeForm = (target) => {
    setFormData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  useEffect(() => {
    API.professions.fetchAll().then((data) => {
      const professionsList = Object.keys(data).map((professionName) => ({
        label: data[professionName].name,
        value: data[professionName]._id
      }));
      setProfessions(professionsList);
    });
    API.qualities.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map((optionName) => ({
        label: data[optionName].name,
        value: data[optionName]._id,
        color: data[optionName].color
      }));
      setQualities(qualitiesList);
    });
  }, []);

  const validatorCongig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения"
      },
      isEmail: {
        message: "Электронная почта некорректна"
      }
    },
    password: {
      isRequired: {
        message: "Пароль обязательна для заполнения"
      },
      isCapitalSymbol: {
        message: "Пароль должен содержать хотя бы одну заглавную букву"
      },
      isContainDigit: {
        message: "Пароль должен содержать хотя бы одну цифру"
      },
      min: {
        message: "Пароль должен содержать не менее 8 символов",
        value: 8
      }
    },
    profession: {
      isRequired: {
        message: "Профессия обязательна для заполнения"
      }
    },
    licence: {
      isRequired: {
        message:
          "Вы не можете использовать наш сервис без лицензионного соглашения"
      }
    },
    agreement: {
      isContainValue: {
        message: "Согласие на обработку данных обязательно",
        param: "1"
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
    console.log({
      ...formData,
      profession: getProfessionById(profession),
      qualities: getQualities(qualities)
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
    <form onSubmit={handleSendForm}>
      <TextField
        label="Email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChangeForm}
        error={formError.email}
      />
      <TextField
        label="Пароль"
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChangeForm}
        error={formError.password}
      />
      {console.log(formData, formData.profession)}
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
      />
      <MultiSelectField
        label="Выберите ваши качества"
        options={qualities}
        defaultValue={formData.qualities}
        onChange={handleChangeForm}
        name="qualities"
      />
      <CheckBoxField
        value={formData.licence}
        name="licence"
        onChange={handleChangeForm}
        error={formError.licence}
      >
        <a>Подтвердить лицензионное соглашение</a>
      </CheckBoxField>
      <button
        type="submit"
        disabled={!isValid}
        className="btn btn-primary w-100 mx-auto"
      >
        Отправить
      </button>
    </form>
  );
};

export default RegistrForm;
