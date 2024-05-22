// {`position${count}`: {
//    title: '',
//    p: '', <- mb bullshit
//    units: '',
//    quantity: x,
//    deadline: 00.00.0000,
//  }}
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NumberPicker from "react-widgets/NumberPicker";
import Combobox from "react-widgets/Combobox";
import "react-widgets/styles.css";

export const TasksInputFields = (props) => {
  console.log(props.data[props.name], "lllll");
  return (
    <div>
      <form className="row g-3">
        <div className="col-md-5">
          <input
            value={props.data[props.name].title}
            name="title"
            type="text"
            className="form-control"
            id="inputCity"
            onChange={(el) =>
              props.chenge({ title: el.target.value }, props.name)
            }
          />
        </div>
        <div className="col-md-2">
          <Combobox
            // allowCreate={true}
            // autoComplete="on"

            value={props.data[props.name].units}
            data={["мм", "см", "м", "км"]}
            onChange={(el) => {
              console.log(el);
              props.chenge(
                {
                  units: el,
                },
                props.name
              );
            }}
          />
        </div>
        <div className="col-md-2">
          <NumberPicker
            value={props.data[props.name].quantity}
            defaultValue={0}
            step={10}
            onChange={(el) =>
              props.chenge(
                {
                  quantity: el,
                },
                props.name
              )
            }
          />
        </div>
        <div className="col-md-2">
          <DatePicker
            dateFormat={"yyy/MM/dd"}
            selected={new Date(props.data[props.name].deadline)}
            onChange={(n) =>
              props.chenge(
                {
                  deadline: n,
                },
                props.name
              )
            }
          />
        </div>
        <div className="col-md-1">
          {/*  -------------------  */}
          <button
            onClick={() => {
              props.eventFunc(props.name);
              event.preventDefault();
            }}
          >
            {props.eventFuncName}
          </button>
        </div>
        <input
          placeholder="about"
          value={props.data[props.name].about}
          onChange={(n) =>
            props.chenge(
              {
                about: n.target.value,
              },
              props.name
            )
          }
        />
      </form>
    </div>
  );
};
