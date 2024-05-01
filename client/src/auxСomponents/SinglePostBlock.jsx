import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { TaskBlock } from "./taskBlock";
import { tagsPickerBlock } from "./tagsPickerBlock";
import { ApplicationBlock } from "./ApplicationBlock";

export const SinglePostBlock = (props) => {
  let tagsTable = useSelector((state) => state.tags.tagsTable);
  let listOfComponents = [];
  const [isSubmite, setSubmite] = useState(false);
  const postData = props.data;
  const [aboutLines, setAboutline] = useState(JSON.parse(postData?.about));
  const inputData = props?.localState?.[0]?.formData;
  const handleChange = props.obj?.handleChange;
  const handleSubmit = props.obj?.handleSubmit;
  const setData = props.obj?.setData;
  const postId = postData?.postId;
  const is_superuser = postData?.is_superuser;
  const obj = {
    name: postData?.name,
    about: postData?.about,
    price_id: postData?.price_id,
  };

  const sibmite = () => handleSubmit(props.chPost);

  useEffect(() => {
    setData(obj, { postId });
  }, [obj, postId, setData]);

  useEffect(() => {
    isSubmite && sibmite();
  }, [isSubmite]);

  for (let [key, _] of Object.entries(aboutLines)) {
    var callBack = (id) => {
      var result = tagsTable[id];
      var listOfTags = [...aboutLines[key].tags];

      listOfTags.includes(result)
        ? (listOfTags = listOfTags.filter((el) => el !== result))
        : listOfTags.push(result);

      setAboutline((state) => ({
        ...state,
        [key]: { ...state[key], tags: [...listOfTags] },
      }));
    };

    let { result, chengeState } = tagsPickerBlock(
      tagsTable,
      aboutLines[key].tags,
      callBack
    );

    listOfComponents.push(
      TaskBlock({ result, key, state: aboutLines, chengeState })
    );
  }

  // var Comp = s.structure.singlePostBlock({
  //   inputData,
  //   handleChange,
  //   listOfComponents,
  // });

  return (
    <>
      <ApplicationBlock
        data={{
          inputData,
          handleChange,
          listOfComponents,
        }}
      />
      {is_superuser ? (
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            handleChange({ about: JSON.stringify(aboutLines) });
            setSubmite(true);
          }}
          data-testid="SinglePostBlockSubmite"
        >
          {postData.textInButton}
        </button>
      ) : null}
    </>
  );
};

// return (
//   <form data-testid="SinglePostBlockForm">
//     <label htmlFor="floatingTextarea2">Название</label>
//     <div className="form-floating">
//       <input
//         className="form"
//         type="name"
//         defaultValue={"aa"}
//         placeholder=""
//         value={inputData?.name}
//         onChange={handleChange}
//         name="name"
//         id="floatingTextarea2"
//         style={{ height: "3em", width: "25%" }}
//       />
//     </div>
//     <br />
//     <label htmlFor="floatingTextarea2">Описание</label>
//     <TasksHeader />
//     {...decodedAbout}
//     <br />
//     <label htmlFor="floatingTextarea2">Счёт</label>
//     <div className="input-group">
//       <div className="input-group-text">$</div>
//       <input
//         defaultValue={""}
//         type="text"
//         className="form-control"
//         id="autoSizingInputGroup"
//         placeholder="Счет"
//         name="price_id"
//         value={inputData?.price_id}
//         onChange={handleChange}
//       />
//     </div>
//     <br />
//     <div className="col-auto">
//       {is_superuser ? (
//         <button
//           type="button"
//           className="btn btn-primary"
//           onClick={() => {
//             handleChange({ about: JSON.stringify(aboutLines) });
//             setSubmite(true);
//           }}
//           data-testid="SinglePostBlockSubmite"
//         >
//           Изменить
//         </button>
//       ) : null}
//     </div>
//   </form>
// );
// };
