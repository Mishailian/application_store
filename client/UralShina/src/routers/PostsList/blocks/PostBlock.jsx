import { staticApi, getUsersTable } from "../../../static/static";
import { chooseBlock } from "../../../auxСomponents/ChooseBlock";
import { PostForm } from "../../../forms/PostForm";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  useDeletePostMutation,
  useChengePostMutation,
} from "../../../app/api/apiSlice";

export const PostBlock = (props) => {
  var executor = getUsersTable()?.[props.data.executor];
  const [del, {}] = useDeletePostMutation();
  var [chng] = useChengePostMutation();
  const navigate = useNavigate();
  var s = staticApi();
  const dellete = async () => await del(props.data.id);

  var callback = (initialState) =>
    chng({ initialState: { executor: initialState }, postId: props.data.id });

  var { result, chengeState } = chooseBlock(getUsersTable(), callback);
  var buttons = s.structure.postBlockButtons(props.data.id, dellete, navigate);
  var addStuctures = s.structure.chooseExecutor(chengeState, executor, result);
  var postBlock = PostForm({
    name: props.data.name,
    date_create: props.data.date_create,
    buttons: buttons,
    addStuctures: addStuctures,
  });
  return <>{postBlock}</>;
};
