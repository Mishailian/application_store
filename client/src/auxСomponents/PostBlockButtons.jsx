export var PostBlockButtons = (id, dellete, navigate, is_superuser, path) => {
  return (
    <>
      <button onClick={() => navigate(`/${path}/${id}/`)}>перейти</button>
      {is_superuser ? <button onClick={dellete}>удалить</button> : null}
    </>
  );
};
