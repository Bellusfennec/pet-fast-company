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
    API.professions.fetchAll().then((data) => setProfessions(data));
    API.qualities.fetchAll().then((data) => setQualities(data));
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
    console.log(formData);
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
