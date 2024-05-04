export var PostForm = (props) => {
  return (
    <>
      <div className="" data-testid="PostForm">
        <div className="">
          {/* main block */}
          <div className="bg-red-200 grid grid-cols-2 grid-rows-3">
            <h5 className="">{props.name}</h5>
            <p className="">{props.date_create}</p>
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
