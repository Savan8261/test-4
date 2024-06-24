import UserTaskFilter from "./UserTaskFilter";
import UserTaskTable from "../../components/UserTaskTable";
import { useState } from "react";

import PageController from "../../components/PageController";

function UserTasklist() {
  const [pageNumber, setPageNumber] = useState(1);
  const pageLimit = 5;

  return (
    <>
      <UserTaskFilter
        page={pageNumber}
        limit={pageLimit}
        setPageNumber={setPageNumber}
      />
      <UserTaskTable page={pageNumber} limit={pageLimit} />
      <PageController
        page={pageNumber}
        limit={pageLimit}
        setPageNumber={setPageNumber}
      />
    </>
  );
}

export default UserTasklist;
