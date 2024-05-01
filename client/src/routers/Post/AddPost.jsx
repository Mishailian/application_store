import { useAddField } from "../../hooks/useAddField/useAddField";
import { useInputCheck } from "../../hooks/useInputCheck";
import { useAddPostMutation } from "../../app/api/apiSlice";
import { staticApi } from "../../static/static";
import { TasksHeader } from "../../forms/tasksHeader";
import { useEffect, useState } from "react";
import { TasksInputFields } from "../../auxСomponents/TasksInputFields";
import { docxCreator } from "../../../docx/docx_creator";

export const AddPost = () => {
  const [isSubmite, setSubmite] = useState(false);
  var s = staticApi();
  const [postObj] = useAddPostMutation();
  const { formData, handleChange, handleSubmit, setData } = useInputCheck();
  var { component, componentData } = useAddField(
    s.structure.addPosition,
    TasksInputFields
  );
  useEffect(() => {
    setData(s.structure.addPost);
  }, []);

  useEffect(() => {
    isSubmite && handleSubmit(postObj);
  }, [isSubmite]);

  return (
    <div>
      <h1>служебная записка</h1>
      <TasksHeader />
      {component}
      <button
        data-testid="AddPostSubmite"
        onClick={() => {
          docxCreator(componentData.formData);
          handleChange({ about: JSON.stringify(componentData.formData) });
          setSubmite(true);
        }}
      >
        добавить пост
      </button>{" "}
    </div>
  );
};
