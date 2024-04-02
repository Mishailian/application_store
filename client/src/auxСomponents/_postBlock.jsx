import { staticApi } from "../static/static";
import { PostForm } from "../forms/PostForm";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  useDeletePostMutation,
  useChengePostMutation,
} from "../app/api/apiSlice";

export const _postBlock = (props) => {
  var addStuctures;
  var s = staticApi();
  const navigate = useNavigate();
  var executor = props.data.executor;
  var [chng] = useChengePostMutation();
  const [del] = useDeletePostMutation();
  const dellete = async () => await del(props.data.id);
  var callback = async (initialState) =>
    await chng({
      initialState: { executor: initialState },
      postId: props.data.id,
    });
  var { result, chengeState } = s.structure.chooseBlock(
    props.data.getUsersTable,
    callback
  );
  var buttons = s.structure.postBlockButtons(props.data.id, dellete, navigate);
  addStuctures =
    props.data.alternativeView ??
    s.structure.chooseExecutor(
      chengeState,
      props.data.getUsersTable?.[executor],
      result
    );
  var postBlock = PostForm({
    name: props.data.name,
    date_create: props.data.date_create,
    buttons: buttons,
    addStuctures: addStuctures,
  });
  return <>{postBlock}</>;
};
