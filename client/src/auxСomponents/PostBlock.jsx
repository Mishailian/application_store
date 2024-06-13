import { PostForm } from "../forms/PostForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ChooseBlock } from "./ChooseBlock";
import { PostBlockButtons } from "./postBlockButtons";
import { ChooseExecutor } from "./ChooseExecutor";

import { memo } from "react";

export const PostBlock = memo((props) => {
  var is_superuser = useSelector((state) => state.auth.is_superuser);
  var path = props.data.path;
  var addStuctures;
  const navigate = useNavigate();
  var executor = props.data.executor;
  var chng = props.data.chenge;
  const fn = props.data.fn;
  const dellete = async () => await fn(props.data.id);
  var callback = async (initialState) =>
    await chng({
      initialState: { executor: initialState },
      postId: props.data.id,
    });
  var { result, chengeState } = ChooseBlock(props.data.getUsersTable, callback);
  var buttons = PostBlockButtons(
    props.data.id,
    dellete,
    navigate,
    is_superuser,
    path
  );
  if (props.data.alternativeView)
    addStuctures = props.data.alternativeView(props.data.id);
  else
    addStuctures = ChooseExecutor(
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
});
