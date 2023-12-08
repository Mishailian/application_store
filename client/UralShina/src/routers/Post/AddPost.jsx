import { useSelector } from "react-redux";
import { useInputCheck } from "../../hooks/useInputCheck";
import { useAddPostMutation } from "../../app/api/apiSlice";

export const AddPost = () => {
  const username_id = useSelector((state) => state.auth.username_id);
  const [postObj] = useAddPostMutation();
  const { inputData: formData, handleChange, handleSubmit } = useInputCheck();

  const submite = () => handleSubmit(postObj);
  return (
    <form className="row gy-2 gx-3 align-items-center" onSubmit={submite}>
      <div className="col-auto">
        <label className="visually-hidden" htmlFor="autoSizingInput">
          название
        </label>
        <input
          type="text"
          name="name"
          className="form-control"
          id="autoSizingInput"
          placeholder="Название"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="col-auto">
        <label className="visually-hidden" htmlFor="autoSizingInputGroup">
          Username
        </label>
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
      </div>
      <div className="col-auto">
        <label className="visually-hidden" htmlFor="autoSizingSelect">
          Preference
        </label>
        <select className="form-select" id="autoSizingSelect">
          <option value="1">В работе</option>
          <option value="2">Выполненно</option>
          <option value="3">Будет выполненно</option>
        </select>
      </div>
      <div className="col-auto">
        <button type="submit" className="btn btn-primary">
          Добавить
        </button>
      </div>
      <div className="col-sm-7">
        <input
          type="text"
          className="form-control"
          placeholder="Информация"
          aria-label="City"
          name="about"
          value={formData.about}
          onChange={handleChange}
        />
        <input
          name="data_dead_line"
          id="startDate"
          class="form-control"
          type="date"
          value={formData.data_dead_line}
          onChange={handleChange}
          onBlur={handleChange}
        />
      </div>
    </form>
  );
};
