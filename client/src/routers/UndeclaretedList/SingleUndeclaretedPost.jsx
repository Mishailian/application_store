import { useParams } from "react-router-dom";
import {
  useGetUndeclaredPostQuery,
  useDeclaredPostMutation,
} from "../../app/api/apiSlice";
import { SinglePostBlock } from "../../auxСomponents/SinglePostBlock";
import { useSelector } from "react-redux";
import { progressCheck } from "../../progressCheck";
import { useNavigate } from "react-router-dom";

export const SingleUndeclaretedPost = () => {
  const { postId } = useParams();
  const postObject = useGetUndeclaredPostQuery({ postId });
  const navigate = useNavigate();

  const is_superuser = useSelector((state) => state.auth.is_superuser);

  var [chng] = useDeclaredPostMutation();

  var callback = () => {
    chng({ postId });
    navigate(-1);
  };

  const content = progressCheck(
    {
      ...postObject,
      data: {
        ...postObject.data,
        is_superuser,
        postId,
        textInButton: "Зарегестрировать",
      },
    },
    (data) => {
      return (
        <SinglePostBlock
          data={data}
          obj={{
            handleChange: callback,
            setData: () => {},
            handleSubmit: () => {},
          }}
        />
      );
    }
  );
  return <div>{content}</div>;
};
