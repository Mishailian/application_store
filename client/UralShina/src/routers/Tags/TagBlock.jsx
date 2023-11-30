import {
  useDeleteTagMutation,
  useChengeTagMutation,
} from "../../app/api/apiSlice";

import { useState } from "react";

export const TagBlock = (props) => {
  const [isChenge, setChenge] = useState(false);
  const [del, {}] = useDeleteTagMutation();
  const dellete = async () => await del(props.tag.id);

  console.log(props);
  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{props.tag.name}</h5>
        {isChenge ? (
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Recipient's username"
              aria-label="Recipient's username with two button addons"
            />
            <button className="btn btn-outline-secondary" type="button">
              Изменить
            </button>
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => setChenge(!isChenge)}
            >
              X
            </button>
          </div>
        ) : (
          <>
            <button onClick={() => setChenge(!isChenge)}>Изменить</button>
            <button onClick={dellete}>Удалить</button>
          </>
        )}
      </div>
    </div>
  );
};
