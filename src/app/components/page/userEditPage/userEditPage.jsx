import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import MultiSelectField from "../../common/form/multiSelectField";
import RadioField from "../../common/form/radioField";
import SelectField from "../../common/form/selectField";
import TextField from "../../common/form/textField";
import { validator } from "../../../utils/validator";
import BackHistoryButton from "../../ui/BackHistoryButton";
import { useProfessions } from "../../../hooks/useProfession";
import { useQualities } from "../../../hooks/useQualities";
import { useAuth } from "../../../hooks/useAuth";

const UserEditPage = () => {
  const history = useHistory();
  const { userId } = useParams();
  const { updateUser, currentUser } = useAuth();
  const user = currentUser;
  const { qualities: qualitiesList, getQuality } = useQualities();
  const { professions: professionsList } = useProfessions();
  const [qualities, setQualities] = useState([]);
  const [professions, setProfessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState({});

  useEffect(() => {
    if (qualitiesList.length > 0 && user) {
      const transformed = qualitiesList.map((q) => ({
        label: q.name,
        value: q._id,
        color: q.color
      }));
      setQualities(transformed);
      const qualities = user.qualities.map((id) => {
        const { name, _id, color } = getQuality(id);
        return { label: name, value: _id, color };
      });
      setFormData({ ...user, qualities });
    }
    if (professionsList.length > 0) {
      const transformed = professionsList.map((p) => ({
        label: p.name,
        value: p._id
      }));
      setProfessions(transformed);
    }
    if (professionsList.length > 0 && qualitiesList.length > 0 && user) {
      setLoading(false);
    }
  }, [qualitiesList, professionsList]);

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
