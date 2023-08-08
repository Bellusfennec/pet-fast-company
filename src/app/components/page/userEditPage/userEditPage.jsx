import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import {
  getProfessions,
  getProfessionsIsLoading
} from "../../../store/professions";
import { getQualities, getQualitiesIsLoading } from "../../../store/qualities";
import { getCurrentUserData } from "../../../store/users";
import { validator } from "../../../utils/validator";
import MultiSelectField from "../../common/form/multiSelectField";
import RadioField from "../../common/form/radioField";
import SelectField from "../../common/form/selectField";
import TextField from "../../common/form/textField";
import BackHistoryButton from "../../ui/BackHistoryButton";

const UserEditPage = () => {
  const history = useHistory();
  const { userId } = useParams();
  const { updateUser } = useAuth();
  const currentUser = useSelector(getCurrentUserData());
  const qualitiesList = useSelector(getQualities());
  const qualities = tranformQualities(qualitiesList);
  const isLoadingQualities = useSelector(getQualitiesIsLoading());
  const professionsList = useSelector(getProfessions());
  const professions = transformProfessions(professionsList);
  const isLoadingProfession = useSelector(getProfessionsIsLoading());
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState();
  const [formError, setFormError] = useState({});

  useEffect(() => {
    if (!isLoadingQualities && !isLoadingProfession && currentUser) {
      const qualitiesData = currentUser.qualities.map((id) => {
        return qualities.find((q) => q.value === id);
      });
      setFormData({
        ...currentUser,
        qualities: qualitiesData
      });
    }
  }, [isLoadingQualities, isLoadingProfession, currentUser]);

  useEffect(() => {
    if (formData && loading) {
      setLoading(false);
    }
  }, [formData]);

  function tranformQualities(data) {
    return data.map((q) => ({
      label: q.name,
      value: q._id,
      color: q.color
    }));
  }
  function transformProfessions(data) {
    return data.map((p) => ({
      label: p.name,
      value: p._id
    }));
  }

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

  const handleSendForm = async (e) => {
    e.preventDefault();

    const isValid = validate();
    if (!isValid) return;
    const { qualities } = formData;
    const formatForm = {
      ...formData,
      qualities: qualities.map((q) => q.value)
    };
    await updateUser(formatForm).then(() => history.push(`/users/${userId}`));
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <BackHistoryButton />
          </div>
          <div className="col-md-6 offset-md-3 p-4 shadow">
            {loading && <>Loading...</>}
            {!loading && (
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
