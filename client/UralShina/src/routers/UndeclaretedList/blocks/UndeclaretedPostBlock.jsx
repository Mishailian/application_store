import { useDeclaredPostMutation } from "../../../app/api/apiSlice";
import { staticApi } from "../../../static/static";
import { PostForm } from "../../../forms/PostForm";

export var UndeclaretedPostBlock = (props) => {
  var [chng] = useDeclaredPostMutation();
  var s = staticApi();
  var callback = () => chng({ postId: props.data.id });

  var buttons = s.structure.undeclaretedPostsBlock(callback);
  var undeclaretedPostsBlock = PostForm({
    name: props.data.name,
    date_create: props.data.date_create,
    buttons: buttons,
  });

  return <>{undeclaretedPostsBlock}</>;
};
