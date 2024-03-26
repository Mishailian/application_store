import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useInputCheck } from "../../hooks/useInputCheck";
import { progressCheck } from "../../progressCheck";
import { SinglePostBlock } from "../PostsList/blocks/SinglePostBlock";
import { useChengePostMutation, useGetPostQuery } from "../../app/api/apiSlice";

export const SinglePost = () => {
  const is_superuser = useSelector((state) => state.auth.is_superuser);
  const { inputData, setFormData, handleChange, handleSubmit, setData } =
    useInputCheck();
  const { postId } = useParams();
  const postObject = useGetPostQuery({ postId });
  const [chPost] = useChengePostMutation();
  const content = progressCheck(
    { ...postObject, data: { ...postObject.data, is_superuser, postId } },
    (data) => {
      return (
        <SinglePostBlock
          data={data}
          localState={[inputData, setFormData]}
          chPost={chPost}
          obj={{ handleChange, handleSubmit, setData }}
        />
      );
    }
  );
  return <div>{content}</div>;
};
