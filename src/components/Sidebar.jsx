import GenresDropdown from "./GenresDropdown";

function Sidebar() {
  return (
    <aside
      className="col-12 col-md-3 col-lg-2 bg-light p-3 text-dark"
      style={{ minHeight: "100%", height: "auto" }}
    >
      <div className="d-md-block d-flex justify-content-between align-items-center">
        <GenresDropdown />
      </div>
    </aside>
  );
}

export default Sidebar;
