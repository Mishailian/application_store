export var _postBlockButtons = (id, dellete, navigate, is_superuser) => {
  return (
    <>
      <button onClick={() => navigate(`${id}`)}>перейти</button>
      {is_superuser ? <button onClick={dellete}>удалить</button> : null}
    </>
  );
};
