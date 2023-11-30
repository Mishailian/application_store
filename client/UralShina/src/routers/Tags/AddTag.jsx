import { useAddTagMutation } from "../../app/api/apiSlice";
import { useInputCheck } from "../../hooks/useInputCheck";

export const AddTag = () => {
  // const [formData, setFormData] = useState({ name: "" });
  // const [sendForm, {}] = useAddTagMutation();

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData(() => ({
  //     [name]: value,
  //   }));
  // };

  // const handleSubmit = async () => {
  //   console.log(formData);
  //   if (formData.name !== "") {
  //     try {
  //       const { data, error } = await sendForm(formData);
  //     } catch {
  //       console.log(error);
  //     }
  //   } else {
  //     alert("вы не ввели имя!");
  //   }
  // };
  const obj = { name: "" };
  const { inputData, handleChange, handleSubmit } = useInputCheck(obj, {
    callback: useAddTagMutation,
  });
  return (
    <div className="input-group mb-3" style={{ width: "25%" }}>
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
        onClick={handleSubmit}
      >
        Добавить
      </button>
    </div>
  );
};
