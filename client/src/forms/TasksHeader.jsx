export var TasksHeader = () => {
  return (
    <div
      data-testid="TasksHeader"
      className="flex flex-row gap-12 ml-4 shadow-md"
    >
      <div className="basis-1/3">Наименование</div>
      <div className="basis-1/12 whitespace-nowrap">Еденица измерения</div>
      <div className="basis-1/12">Количество</div>
      <div className="basis-1/4">Планируемый срок</div>
      <div className="basis-1/2">Дополнительная информация</div>
      <div className=""></div>
    </div>
  );
};
