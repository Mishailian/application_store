import { useAddField } from "../../hooks/useAddField";
import { useInputCheck } from "../../hooks/useInputCheck";
import { useAddPostMutation } from "../../app/api/apiSlice";
import { TasksInputFields } from "../../auxСomponents/TasksInputFields";
import { staticApi, getUsersTable } from "../../static/static";
import { TasksHeader } from "../../forms/tasksHeader";

export const AddPost = () => {
  var s = staticApi();
  const [postObj] = useAddPostMutation();
  const { formData, handleChange, handleSubmit, setData } = useInputCheck();
  var { component, componentData } = useAddField(
    s.structure.addPosition,
    TasksInputFields
  );
  const submite = () => {
    var about = JSON.stringify(componentData.formData);
    handleChange({ about: about });
  };
  setData(s.structure.addPost);
  return (
    <div>
      <h1>служебная записка</h1>
      <TasksHeader />
      {component}
      <button
        onClick={() => {
          submite();
        }}
      >
        нажми на меня
      </button>{" "}
      <button
        onClick={() => {
          console.log(formData);
          handleSubmit(postObj);
        }}
      >
        нажми на меня
      </button>
    </div>
  );
};
