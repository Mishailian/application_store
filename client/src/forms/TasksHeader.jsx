export var TasksHeader = () => {
  return (
    <div data-testid="TasksHeader">
      <div>
        <form className="row g-3">
          <div className="col-md-5">
            <label htmlFor="inputCity" className="form">
              <strong>Наименование</strong>
            </label>
          </div>
          <div className="col-md-2">
            <label htmlFor="inputState" className="form">
              <strong> Еденица измерения</strong>
            </label>
          </div>
          <div className="col-md-2">
            <label htmlFor="inputZip" className="form">
              <strong> Количество</strong>
            </label>
          </div>
          <div className="col-md-2">
            <label htmlFor="inputEmail4" className="form">
              <strong>Планируемый срок</strong>
            </label>
          </div>
          <div className="col-md-1">
          </div>
        </form>
      </div>
    </div>
  );
};
