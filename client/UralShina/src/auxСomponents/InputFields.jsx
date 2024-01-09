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
import DropdownList from "react-widgets/DropdownList";
import "react-widgets/styles.css";

export const InputFields = (props) => {
  return (
    <div>
      <form className="row g-3">
        <div className="col-md-5">
          <input
            value={props.data.formData[props.name].title}
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
          <DropdownList
            defaultValue="см"
            value={props.data.formData[props.name].units}
            data={["мм", "см", "м", "км"]}
            onChange={(el) =>
              props.chenge(
                {
                  units: el,
                },
                props.name
              )
            }
          />
        </div>
        <div className="col-md-2">
          <NumberPicker
            value={props.data.formData[props.name].quantity}
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
            selected={props.data.formData[props.name].deadline}
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
          <button
            onClick={() => {
              props.del(props.name);
              event.preventDefault();
            }}
          >
            del
          </button>
        </div>
      </form>
      <br></br>
    </div>
  );
};
