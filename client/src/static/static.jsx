import { useDispatch, useSelector } from "react-redux";
import { WidthType } from "docx";

export var staticApi = () => {
  var username = useSelector((state) => state.auth.username);
  var is_superuser = useSelector((state) => state.auth.is_superuser);

  var obj = {
    paths: {
      users: "/users/",
      store: "/store/",
      undeclared: "/undeclared/",
      archived: "/archived/",
      auth: "/auth/",
      addPost: "/addPost/",
      addUser: "/addUser/",
      tagList: "/tagList/",
    },
    names: {
      store: "Заявки",
      archived: "Архив",
      undeclared: "Регистрация",
      users: "Пользователи",
      auth: "Вход",
      addPost: "Добавить",
      addUser: "Пользователь",
      tagList: "Тэги",
    },

    document: {
      table: {
        main: {
          columnWidths: [450, 4700, 600, 600, 1425, 1425],
          headers: [
            "\u2116",
            "Наименование",
            "Ед",
            "Колл",
            "Планируемый срок приобретения",
            // "Фактический срок приобретения",
          ],
          cell: {
            width: {
              size: 3505,
              type: WidthType.AUTO,
            },
            height: {},
          },
        },
      },
    },
    structure: {
      addPost: {
        name: "test",
        about: null,
        data_dead_line: null,
        author: username,
      },
      addPosition: {
        //  это метаданные структур а не структуры
        title: "",
        units: null,
        quantity: 0,
        deadline: new Date(),
        isDone: false,
        tags: [],
        about: "",
      },
    },
  };
  return obj;
};
// надо провести сюда запрос по получению пользователь и включить хэш  это сейчас находиться в Login.js
export var updateObjectsTable = (
  setFunction,
  errorMessege = "ты не передал обекты в аргументы"
) => {
  var table = {};
  var dispatch = useDispatch();
  var callBack = (objects = null) => {
    if (objects) {
      Object.values(objects).map((object) => (table[object.id] = object.name));
      dispatch(setFunction(table));
    } else {
      alert(errorMessege);
    }
  };
  return callBack;
};
