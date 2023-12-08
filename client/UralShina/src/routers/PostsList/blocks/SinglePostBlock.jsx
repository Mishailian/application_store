import { useEffect } from "react";

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
      <div className="form-floating">
        <textarea
          className="form"
          type="about "
          placeholder=""
          value={inputData?.about}
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
