export const AddUser = () => {
  return (
    <div class="row g-3">
      <div class="col">
        <input
          type="text"
          className="form-control"
          placeholder="First name"
          aria-label="First name"
        />
      </div>
      <div class="col">
        <input
          type="text"
          className="form-control"
          placeholder="Last name"
          aria-label="Last name"
        />
      </div>
    </div>
  );
};
