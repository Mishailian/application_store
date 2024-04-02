import DatePicker from "react-datepicker";

export var TasksFields = (props) => {
  return (
    <div>
      <form className="row g-3">
        <div className="col-md-5">
          <input
            defaultValue={""}
            value={props.data.title}
            name="title"
            type="text"
            className="form-control"
            id="inputCity"
            readOnly
          />
        </div>
        <div className="col-md-2">
          <input
            defaultValue={""}
            value={props.data.units}
            type="text"
            className="form-control"
            id="inputCity"
            readOnly
          />
        </div>
        <div className="col-md-2">
          <input
            defaultValue={""}
            value={props.data.quantity}
            type="text"
            className="form-control"
            id="inputCity"
            readOnly
          />
        </div>
        <div className="col-md-2">
          <DatePicker
            dateFormat={"yyy/MM/dd"}
            selected={new Date(props.data.deadline)}
            disabled
          />
        </div>
        <div
          className="col-md-1"
          style={{ paddingLeft: "3%", paddingTop: "0.5%" }}
          onClick={
            () =>
              props.chenge((data) => ({
                ...data,
                [props.id]: {
                  ...data[props.id],
                  isDone: !props.data.isDone,
                },
              }))

            // console.log(props.additionalData)
          }
        >
          {/* <button
            onClick={() => {
              props.del(props.name);
              event.preventDefault();
            }}
          >
            del
          </button> */}
          {props.data.isDone ? "✅" : "❌"}
        </div>
        {props.data.about && <input value={props.data.about} />}
      </form>
      <br></br>
    </div>
  );
};
