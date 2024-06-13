export var PostForm = (props) => {
  return (
    <>
      <div
        className="col-span-2 row-span-2 min-w-2/3 w-full min-h-3 overflow-hidden max-h-full h-full relative bg-white rounded-md grid grid-cols-3 grid-rows-2 z-0 shadow-sm hover:shadow-md transition-all duration-300"
        data-testid="PostForm"
      >
        {/* main block */}
        <h5 className="text-xl ">{props.name}</h5>
        <p></p>
        {props.addStuctures}
        <div className="col-span-2">{props.buttons}</div>
        <div>
          <p className="inline-block p-1 text-lg">снаб</p>
          <p className="inline-block text-lg">{props.date_create}</p>
        </div>
        {/* simple structure executors pick for example */}
      </div>
    </>
  );
};
