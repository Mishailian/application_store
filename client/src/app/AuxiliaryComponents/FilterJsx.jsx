export const FilterJsx = (props) => {
  let tags = [];
  // put this ↓ in staticApi and then too
  let elemlist = [
    ["дата создания", "date_create"],
    ["дата редоктирования", "data_update"],
    ["дата дэдлайна xxxxxxx", "data_dead_line"],
    ["по имени", "name"],
  ];

  switch (props.mode) {
    case "PostsPage":
      tags.push(1);
    case "UserPage":
      null;
  }

  const result = elemlist.map((elem) => (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        name={elem[1]}
        value={props.isOn?.[elem[1]]}
        type="checkbox"
        role="switch"
        id="flexSwitchCheckDefault"
        onChange={props.handleSwitch}
        checked={props.isOn?.[elem[1]]}
      />
      <label className="form-check-label" shtmlFor="flexSwitchCheckDefault">
        {elem[0]}
      </label>
    </div>
  ));

  tags = tags.map((tag) => (
    <div class="form-check">
      <input class="" type="checkbox" value="" id="" />
      <label class="form-check-label">Default checkbox</label>
    </div>
  ));

  return (
    <nav className="navbar sticky-bottom bg-body-tertiary">
      <div className="container-fluid">
        {result}
        {tags}
      </div>
    </nav>
  );
};
