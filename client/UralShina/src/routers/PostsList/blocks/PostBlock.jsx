import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { staticApi as s } from "../../../static/static";
import { useDeletePostMutation } from "../../../app/api/apiSlice";
import { useSelector } from "react-redux";

export const PostBlock = (props) => {
  const [del, {}] = useDeletePostMutation();
  const is_superuser = useSelector((state) => state.auth.is_superuser);

  const dellete = async () => {
    await del(props.data.id);
  };

  const navigate = useNavigate();
  return (
    <>
      <div className={`card w-50`}>
        <div className="card-body d-flex justify-content-start">
          {/* Блок с именем и информацией */}
          <div className="flex-grow-1">
            <h5 className="card-title">{props.data.name}</h5>
            <p className="card-text">{props.data.date_create}</p>
            <button
              onClick={() => navigate(`${s.paths.posts}${props.data.id}`)}
            >
              перейти
            </button>
            {is_superuser ? <button onClick={dellete}>удалить</button> : null}
          </div>

          {/* Executor как простой текст */}
          <div className="ml-2">
            <p className="text-info">
              {props.data.executor !== null && props.data.executor !== undefined
                ? props.data.executor
                : "undefined"}
            </p>
          </div>
        </div>
      </div>
      <br />
    </>
  );
};
