import GenresDropdown from "./GenresDropdown";

function Sidebar() {
  return (
    <aside className="col-12 col-md-3 col-lg-2 bg-primary p-3 text-white vh-100">
      <div className="d-flex flex-column gap-3">
        <GenresDropdown />
      </div>
    </aside>
  );
}

export default Sidebar;
