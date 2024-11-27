'use client'



import ReactDataTableComponent from '@/components/table/ReactDataTableComponent';
import { ACTION_TYPES } from '@/utils/static-const';
import React from 'react';



const companyMenuItems = [
    { text: "View Profile", type: ACTION_TYPES?.VIEW }
  ];


const CompaniesList = ({ rows, handleActionMenu }) => {
    const columns = useMemo(
        () => [
          {
            name: "Title",
            selector: (row) => row?.title,
            maxWidth: "20%",
          },
          {
            name: "Email",
            selector: (row) => row?.email,
            maxWidth: "20%",
          },
          {
            name: "Country",
            selector: (row) => row?.country,
            maxWidth: "15%",
          },
          {
            name: "Location",
            selector: (row) => `${row?.city}, ${row?.state}, ${row?.zipCode}`,
            maxWidth: "20%",
          },
          {
            name: "District",
            selector: (row) => row?.district,
            maxWidth: "15%",
          },
          {
            name: "Currency",
            selector: (row) => row?.currency,
            maxWidth: "10%",
          },
          {
            id: "action-btn",
            name: "Action",
            cell: (row) => (
              <ActionMenu
                menuItems={companyMenuItems}
                handleActionMenu={handleActionMenu}
                row={row}
              />
            ),
            minWidth: "15%",
            button: true,
          },
        ],
        [rows, handleActionMenu]
      );
      


    return (
        <>
            <ReactDataTableComponent rows={rows} columns={columns} />  
        </>
    );
};

export default CompaniesList;