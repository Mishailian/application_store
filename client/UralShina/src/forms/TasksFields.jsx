import DatePicker from "react-datepicker";

export var TasksFields = (props) => {
  return (
    <div>
      <form className="row g-3">
        <div className="col-md-5">
          <input
            value={props.data.title}
            name="title"
            type="text"
            className="form-control"
            id="inputCity"
            readonly
          />
        </div>
        <div className="col-md-2">
          <input
            value={props.data.units}
            type="text"
            className="form-control"
            id="inputCity"
            readonly
          />
        </div>
        <div className="col-md-2">
          <input
            value={props.data.quantity}
            type="text"
            className="form-control"
            id="inputCity"
            readonly
          />
        </div>
        <div className="col-md-2">
          <DatePicker
            dateFormat={"yyy/MM/dd"}
            selected={new Date(props.data.deadline)}
            disabled
          />
        </div>
        <div className="col-md-1">
          {/* <button
            onClick={() => {
              props.del(props.name);
              event.preventDefault();
            }}
          >
            del
          </button> */}
        </div>
      </form>
      <br></br>
    </div>
  );
};
