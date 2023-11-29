import { useParams } from "react-router-dom";
import { useGetPostQuery } from "../../app/api/apiSlice";
import { useState, useEffect } from "react";
import { useChengePostMutation } from "../../app/api/apiSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// чето тут надо сделать по рефакторингу
export const SinglePost = () => {
  const is_superuser = useSelector((state) => state.auth.is_superuser);
  const history = useNavigate();
  let { postId } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    about: "",
    price_id: "",
  });
  const [chengePost, {}] = useChengePostMutation();
  const { data, isError, isSuccess } = useGetPostQuery(postId);

  useEffect(() => {
    if (isSuccess) {
      setFormData({
        name: data.name,
        about: data.about,
        price_id: data.price_id,
      });
    }
  }, [isSuccess, data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const { data, error } = await chengePost({
        initialState: formData,
        postId: postId,
      });
      history(-1);
    } catch {
      console.log(error);
    }
  };

  let DataForm;
  if (isSuccess) {
    DataForm = (
      <form>
        <label htmlFor="floatingTextarea2">Название</label>
        <div className="form-floating">
          <textarea
            className="form"
            type="name"
            placeholder=""
            value={formData.name}
            onChange={handleChange}
            name="name"
            id="floatingTextarea2"
            style={{ height: "3em", width: "25%" }}
          ></textarea>
        </div>
        <br />
        <label htmlFor="floatingTextarea2">Описание</label>
        <div className="form-floating">
          <textarea
            className="form"
            type="about "
            placeholder=""
            value={formData.about}
            onChange={handleChange}
            name="about"
            id="floatingTextarea2"
            style={{ height: "100px", width: "75%" }}
          ></textarea>
          {/* <label htmlFor="floatingTextarea2">Описание</label> */}
        </div>
        <br />
        <label htmlFor="floatingTextarea2">Счёт</label>
        <div className="input-group">
          <div className="input-group-text">$</div>
          <input
            type="text"
            className="form-control"
            id="autoSizingInputGroup"
            placeholder="Счет"
            name="price_id"
            value={formData.price_id}
            onChange={handleChange}
          />
        </div>
        <br />
        <div className="col-auto">
          {is_superuser ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Изменить
            </button>
          ) : null}
        </div>
      </form>
    );
  } else if (isError) {
    DataForm = <>Ошибка загрузки данных</>;
  } else {
    DataForm = <>Загрузка...</>;
  }

  return <div>{DataForm}</div>;
};
