import { useEffect } from "react";
import { unwrapData } from "../../../creatFunctions/unwrapData";
import { TasksFields } from "../../../forms/TasksFields";
import { TasksHeader } from "../../../forms/tasksHeader";

export const SinglePostBlock = (data) => {
  const postData = data.data;
  const inputData = data.localState[0].formData;
  const handleChange = data.obj.handleChange;
  const handleSubmit = data.obj.handleSubmit;
  const setData = data.obj.setData;
  const postId = postData.postId;
  const is_superuser = postData.is_superuser;
  const obj = {
    name: postData.name,
    about: postData.about,
    price_id: postData.price_id,
  };
  console.log(postData.about);
  var decodedAbout = unwrapData(postData.about, TasksFields);
  // console.log(typeof decodedAbout);
  useEffect(() => {
    setData(obj, { postId });
  }, [obj, postId, setData]);

  const sibmite = () => handleSubmit(data.chPost);
  return (
    <form>
      <label htmlFor="floatingTextarea2">Название</label>
      <div className="form-floating">
        <textarea
          className="form"
          type="name"
          placeholder=""
          value={inputData?.name}
          onChange={handleChange}
          name="name"
          id="floatingTextarea2"
          style={{ height: "3em", width: "25%" }}
        ></textarea>
      </div>
      <br />
      <label htmlFor="floatingTextarea2">Описание</label>
      <TasksHeader />
      {...decodedAbout}
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
          value={inputData?.price_id}
          onChange={handleChange}
        />
      </div>
      <br />
      <div className="col-auto">
        {is_superuser ? (
          <button type="button" className="btn btn-primary" onClick={sibmite}>
            Изменить
          </button>
        ) : null}
      </div>
    </form>
  );
};
