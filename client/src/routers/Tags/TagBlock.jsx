import {
  useDeleteTagMutation,
  useChengeTagMutation,
} from "../../app/api/apiSlice";
import { useState } from "react";
import { useInputCheck } from "../../hooks/useInputCheck";
import { useEffect } from "react";

export const TagBlock = (props) => {
  const [chengeTag] = useChengeTagMutation();
  const tagId = props.tag.id;
  const obj = { name: "" };
  const [isChenge, setChenge] = useState(false);
  const [del] = useDeleteTagMutation();
  const dellete = async () => await del(props.tag.id);
  const { inputData, handleChange, handleSubmit, setData } = useInputCheck();

  useEffect(() => {
    setData(obj, { tagId });
  }, [obj, tagId, setData]);

  const submite = () => handleSubmit(chengeTag);
  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{props.tag.name}</h5>
        {isChenge ? (
          <div className="input-group">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Recipient's username"
              aria-label="Recipient's username with two button addons"
              value={inputData.name}
              onChange={handleChange}
            />
            <button
              data-testid="TagBlockSubmite"
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => {
                submite();
                setChenge(!isChenge);
              }}
            >
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
