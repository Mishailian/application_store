export var PostForm = (props) => {
  return (
    <>
      <div className={`card w-50`}>
        <div className="card-body d-flex justify-content-start">
          {/* main block */}
          <div className="flex-grow-1">
            <h5 className="card-title">{props.name}</h5>
            <p className="card-text">{props.date_create}</p>
            {props.buttons}
          </div>
          {/* simple structure executors pick for example */}
          {props.addStuctures}
        </div>
      </div>
      <br />
    </>
  );
};
