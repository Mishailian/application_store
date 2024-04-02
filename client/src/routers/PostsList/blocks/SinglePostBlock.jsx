import { useEffect } from "react";
import { unwrapData } from "../../../creatFunctions/unwrapData";
import { TasksFields } from "../../../forms/TasksFields";
import { TasksHeader } from "../../../forms/tasksHeader";
import { useState } from "react";

export const SinglePostBlock = (data) => {
  const [isSubmite, setSubmite] = useState(false);
  const postData = data.data;
  const [aboutLines, setAboutline] = useState(JSON.parse(postData.about));
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

  let decodedAbout = [];
  for (let [key, value] of Object.entries(aboutLines)) {
    decodedAbout.push(
      <TasksFields data={value} id={key} chenge={setAboutline} key={key} />
    );
  }
  const sibmite = () => handleSubmit(data.chPost);

  // need laze chenge of isdone
  // var decodedAbout = unwrapData(postData.about, TasksFields, handleChange);
  // console.log(typeof decodedAbout);
  useEffect(() => {
    setData(obj, { postId });
  }, [obj, postId, setData]);

  useEffect(() => {
    isSubmite && sibmite();
  }, [isSubmite]);

  return (
    <form data-testid="SinglePostBlockForm">
      <label htmlFor="floatingTextarea2">Название</label>
      <div className="form-floating">
        <input
          className="form"
          type="name"
          defaultValue={"aa"}
          placeholder=""
          value={inputData?.name}
          onChange={handleChange}
          name="name"
          id="floatingTextarea2"
          style={{ height: "3em", width: "25%" }}
        />
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
          defaultValue={""}
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
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              handleChange({ about: JSON.stringify(aboutLines) });
              setSubmite(true);
            }}
            data-testid="SinglePostBlockSubmite"
          >
            Изменить
          </button>
        ) : null}
      </div>
    </form>
  );
};
