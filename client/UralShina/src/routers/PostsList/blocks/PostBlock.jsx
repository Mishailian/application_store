import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { staticApi, getUsersTable } from "../../../static/static";
import {
  useDeletePostMutation,
  useChengePostMutation,
} from "../../../app/api/apiSlice";
import { useSelector } from "react-redux";
import { chooseBlock } from "../../../auxСomponents/ChooseBlock";

export const PostBlock = (props) => {
  // console.log(getUsersTable());

  var [chng] = useChengePostMutation();

  var callback = (initialState) =>
    chng({ initialState: { executor: initialState }, postId: props.data.id });

  var { result, chengeState } = chooseBlock(getUsersTable(), callback);
  const [del, {}] = useDeletePostMutation();
  const is_superuser = useSelector((state) => state.auth.is_superuser);
  var s = staticApi();
  var executor = getUsersTable()?.[props.data.executor];
  console.log();
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
              {props.data.executor !== null &&
              props.data.executor !== undefined ? (
                <div onClick={chengeState}>{executor}</div>
              ) : (
                "undefined"
              )}
            </p>
            {result}
          </div>
        </div>
      </div>
      <br />
    </>
  );
};
