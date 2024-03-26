import { useAddTagMutation } from "../../app/api/apiSlice";
import { useInputCheck } from "../../hooks/useInputCheck";

export const AddTag = () => {
  const [tagObj] = useAddTagMutation();
  const { inputData, handleChange, handleSubmit } = useInputCheck();
  const submite = () => handleSubmit(tagObj);
  return (
    <div
      data-testid="AddTag"
      className="input-group mb-3"
      style={{ width: "25%" }}
    >
      <input
        type="text"
        name="name"
        className="form-control"
        placeholder="Добавить тэг"
        aria-label="Добавить тэг"
        aria-describedby="button-addon2"
        onChange={handleChange}
        value={inputData.name}
      />
      <button
        className="btn btn-outline-secondary "
        type="button"
        id="button-addon2"
        onClick={submite}
        data-testid="AddTagButton"
      >
        Добавить
      </button>
    </div>
  );
};
