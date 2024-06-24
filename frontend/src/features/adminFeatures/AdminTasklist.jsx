import AdminTaskTable from "../../components/AdminTaskTable";
import AdminTaskFilter from "./AdminTaskFilter";
import PageController from "../../components/PageController";
import { useState } from "react";

function AdminTasklist() {
  const [pageNumber, setPageNumber] = useState(1);
  const pageLimit = 5;

  return (
    <>
      <AdminTaskFilter
        page={pageNumber}
        limit={pageLimit}
        setPageNumber={setPageNumber}
      />
      <AdminTaskTable page={pageNumber} limit={pageLimit} />
      <PageController
        page={pageNumber}
        limit={pageLimit}
        setPageNumber={setPageNumber}
      />
    </>
  );
}

export default AdminTasklist;
