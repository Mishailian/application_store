import { useDeleteTagMutation } from "../../app/api/apiSlice";

export const TagBlock = (props) => {
  const [del, {}] = useDeleteTagMutation();
  const dellete = async () => await del(props.tag.id);

  console.log(props);
  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{props.tag.name}</h5>
        <button onClick={props.chenge}>Изменить</button>
        <button onClick={dellete}>Удалить</button>
      </div>
    </div>
  );
};
