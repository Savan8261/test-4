import H1 from "../../ui/H1";
import StyledSidebar from "../../ui/StyledSidebar";
import SidebarImage from "../../ui/SidebarImage";
import NavList from "../../ui/NavList";
import StyledNavLink from "../../ui/StyledNavLink";

function AdminSidebar() {
  return (
    <StyledSidebar>
      <SidebarImage src="/admin.jpg" alt="admin" />
      <H1>Admin</H1>
      <nav>
        <NavList>
          <li>
            <StyledNavLink to="dashboard">
              <span>Dashboard</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="task-list">
              <span>Tasklist</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="add-task">
              <span>Add task</span>
            </StyledNavLink>
          </li>
        </NavList>
      </nav>
    </StyledSidebar>
  );
}

export default AdminSidebar;
