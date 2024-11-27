"use client";

import { useState, useEffect, useCallback } from "react";
import DataList from "../../components/DataList";
import Button from "@/components/button/Button";
import { BiPlus } from "react-icons/bi";
import { useRouter } from "next/navigation";
import Status from "@/components/status/Status";
import RightDrawer from "@/components/rightDrawer/RightDrawer";
import CreateUserForm from "./CreateUserForm";
import Modal from "@/components/modal/Modal";
import apiClient from "@/lib/axios";

const dataSet = [
  {
    name: {
      user: "John Doe",
      email: "bDqP9@example.com",
    },
    office: {
      companyName: "Sr Logistic Inc",
      address: "123 Main St, Anytown, USA",
    },
    workgroups: "",
    seatAssignment: "Load Board - Office Shipper",
    status: (
      <Status sizes="primary" variant="active">
        Active
      </Status>
    ),
  },
  {
    name: {
      user: "Jane Smith",
      email: "jsmith@example.com",
    },
    office: {
      companyName: "Global Freight",
      address: "456 Elm St, Metropolis, USA",
    },
    workgroups: "Shipping",
    seatAssignment: "Main Desk - Logistics",
    status: (
      <Status sizes="primary" variant="active">
        Active
      </Status>
    ),
  },
  {
    name: {
      user: "Alice Johnson",
      email: "alicej@example.com",
    },
    office: {
      companyName: "Quick Transport LLC",
      address: "789 Oak St, Smalltown, USA",
    },
    workgroups: "Dispatch",
    seatAssignment: "Desk 12 - Operations",
    status: (
      <Status sizes="primary" variant="active">
        Active
      </Status>
    ),
  },
  {
    name: {
      user: "Bob Brown",
      email: "bob.b@example.com",
    },
    office: {
      companyName: "Fast Movers",
      address: "101 Pine St, Big City, USA",
    },
    workgroups: "Warehouse",
    seatAssignment: "Office 2 - Shipping",
    status: (
      <Status sizes="primary" variant="active">
        Active
      </Status>
    ),
  },
  {
    name: {
      user: "Carol Davis",
      email: "carol.d@example.com",
    },
    office: {
      companyName: "Trans Logistics",
      address: "202 Birch St, Oldtown, USA",
    },
    workgroups: "Inventory",
    seatAssignment: "Cubicle 5 - Inventory",
    status: (
      <Status sizes="primary" variant="deactive">
        Deactive
      </Status>
    ),
  },
  {
    name: {
      user: "David Wilson",
      email: "davidw@example.com",
    },
    office: {
      companyName: "Metro Delivery",
      address: "303 Cedar St, New City, USA",
    },
    workgroups: "Sales",
    seatAssignment: "Desk 4 - Sales",
    status: (
      <Status sizes="primary" variant="active">
        Active
      </Status>
    ),
  },
  {
    name: {
      user: "Eva Martinez",
      email: "eva.m@example.com",
    },
    office: {
      companyName: "Elite Carriers",
      address: "404 Walnut St, Greenfield, USA",
    },
    workgroups: "Customer Service",
    seatAssignment: "Cubicle 3 - Customer Support",
    status: (
      <Status sizes="primary" variant="active">
        Active
      </Status>
    ),
  },
  {
    name: {
      user: "Frank Clark",
      email: "frankc@example.com",
    },
    office: {
      companyName: "Next Day Shipping",
      address: "505 Maple St, Riverside, USA",
    },
    workgroups: "Fleet Management",
    seatAssignment: "Office 6 - Fleet",
    status: (
      <Status sizes="primary" variant="deactive">
        Deactive
      </Status>
    ),
  },
  {
    name: {
      user: "Grace Hall",
      email: "grace.h@example.com",
    },
    office: {
      companyName: "Prime Freight",
      address: "606 Spruce St, Lakeview, USA",
    },
    workgroups: "Logistics",
    seatAssignment: "Desk 7 - Logistics",
    status: (
      <Status sizes="primary" variant="active">
        Active
      </Status>
    ),
  },
  {
    name: {
      user: "Henry Allen",
      email: "henry.a@example.com",
    },
    office: {
      companyName: "Swift Transport",
      address: "707 Chestnut St, Springfield, USA",
    },
    workgroups: "HR",
    seatAssignment: "Office 1 - Human Resources",
    status: (
      <Status sizes="primary" variant="active">
        Active
      </Status>
    ),
  },
  {
    name: {
      user: "Ivy Green",
      email: "ivy.g@example.com",
    },
    office: {
      companyName: "Reliable Shipping",
      address: "808 Fir St, Hillcrest, USA",
    },
    workgroups: "Finance",
    seatAssignment: "Desk 9 - Finance",
    status: (
      <Status sizes="primary" variant="deactive">
        Deactive
      </Status>
    ),
  },
  {
    name: {
      user: "Jack White",
      email: "jack.w@example.com",
    },
    office: {
      companyName: "Secure Transport",
      address: "909 Ash St, Redwood, USA",
    },
    workgroups: "Planning",
    seatAssignment: "Cubicle 2 - Planning",
    status: (
      <Status sizes="primary" variant="active">
        Active
      </Status>
    ),
  },
  {
    name: {
      user: "Karen Lewis",
      email: "karen.l@example.com",
    },
    office: {
      companyName: "Vast Logistics",
      address: "1010 Elm St, Brookside, USA",
    },
    workgroups: "Operations",
    seatAssignment: "Desk 15 - Operations",
    status: (
      <Status sizes="primary" variant="active">
        Active
      </Status>
    ),
  },
  {
    name: {
      user: "Leo Scott",
      email: "leo.s@example.com",
    },
    office: {
      companyName: "City Movers",
      address: "1111 Oak St, Westfield, USA",
    },
    workgroups: "Delivery",
    seatAssignment: "Office 8 - Delivery",
    status: (
      <Status sizes="primary" variant="deactive">
        Deactive
      </Status>
    ),
  },
  {
    name: {
      user: "Mia Adams",
      email: "mia.a@example.com",
    },
    office: {
      companyName: "Advanced Freight",
      address: "1212 Pine St, Oakville, USA",
    },
    workgroups: "Customer Support",
    seatAssignment: "Cubicle 4 - Support",
    status: (
      <Status sizes="primary" variant="active">
        Active
      </Status>
    ),
  },
  {
    name: {
      user: "Nathan Baker",
      email: "nathan.b@example.com",
    },
    office: {
      companyName: "Smart Shipping",
      address: "1313 Maple St, Rivertown, USA",
    },
    workgroups: "Management",
    seatAssignment: "Desk 13 - Management",
    status: (
      <Status sizes="primary" variant="active">
        Active
      </Status>
    ),
  },
  {
    name: {
      user: "Olivia Carter",
      email: "olivia.c@example.com",
    },
    office: {
      companyName: "Optimum Transport",
      address: "1414 Cedar St, Clearwater, USA",
    },
    workgroups: "Logistics",
    seatAssignment: "Office 11 - Logistics",
    status: (
      <Status sizes="primary" variant="deactive">
        Deactive
      </Status>
    ),
  },
  {
    name: {
      user: "Paul Davis",
      email: "paul.d@example.com",
    },
    office: {
      companyName: "Max Freight",
      address: "1515 Birch St, Greenfield, USA",
    },
    workgroups: "Sales",
    seatAssignment: "Desk 10 - Sales",
    status: (
      <Status sizes="primary" variant="active">
        Active
      </Status>
    ),
  },
  {
    name: {
      user: "Quinn Evans",
      email: "quinn.e@example.com",
    },
    office: {
      companyName: "United Carriers",
      address: "1616 Walnut St, Cityview, USA",
    },
    workgroups: "Planning",
    seatAssignment: "Cubicle 6 - Planning",
    status: (
      <Status sizes="primary" variant="active">
        Active
      </Status>
    ),
  },
  {
    name: {
      user: "Riley Foster",
      email: "riley.f@example.com",
    },
    office: {
      companyName: "National Transport",
      address: "1717 Fir St, Crestwood, USA",
    },
    workgroups: "HR",
    seatAssignment: "Desk 5 - Human Resources",
    status: (
      <Status sizes="primary" variant="deactive">
        Deactive
      </Status>
    ),
  },
  {
    name: {
      user: "Sophia Garcia",
      email: "sophia.g@example.com",
    },
    office: {
      companyName: "Innovative Freight",
      address: "1818 Chestnut St, Hilltop, USA",
    },
    workgroups: "Finance",
    seatAssignment: "Cubicle 9 - Finance",
    status: (
      <Status sizes="primary" variant="active">
        Active
      </Status>
    ),
  },
  {
    name: {
      user: "Tom Harris",
      email: "tom.h@example.com",
    },
    office: {
      companyName: "Prime Movers",
      address: "1919 Cedar St, Baytown, USA",
    },
    workgroups: "Warehouse",
    seatAssignment: "Desk 8 - Warehouse",
    status: (
      <Status sizes="primary" variant="active">
        Active
      </Status>
    ),
  },
  {
    name: {
      user: "Uma Iyer",
      email: "uma.i@example.com",
    },
    office: {
      companyName: "Global Shippers",
      address: "2020 Oak St, Riverview, USA",
    },
    workgroups: "Operations",
    seatAssignment: "Cubicle 1 - Operations",
    status: (
      <Status sizes="primary" variant="deactive">
        Deactive
      </Status>
    ),
  },
  {
    name: {
      user: "Victor James",
      email: "victor.j@example.com",
    },
    office: {
      companyName: "Eagle Logistics",
      address: "2121 Pine St, Lakewood, USA",
    },
    workgroups: "Customer Service",
    seatAssignment: "Desk 3 - Customer Service",
    status: (
      <Status sizes="primary" variant="active">
        Active
      </Status>
    ),
  },
  {
    name: {
      user: "Wendy Knight",
      email: "wendy.k@example.com",
    },
    office: {
      companyName: "Vertex Freight",
      address: "2222 Maple St, Valleyview, USA",
    },
    workgroups: "Sales",
    seatAssignment: "Cubicle 8 - Sales",
    status: (
      <Status sizes="primary" variant="active">
        Active
      </Status>
    ),
  },
  {
    name: {
      user: "Xander Lee",
      email: "xander.l@example.com",
    },
    office: {
      companyName: "Skyline Carriers",
      address: "2323 Birch St, Hilltown, USA",
    },
    workgroups: "Dispatch",
    seatAssignment: "Desk 2 - Dispatch",
    status: (
      <Status sizes="primary" variant="active">
        Active
      </Status>
    ),
  },
  {
    name: {
      user: "Yara Morgan",
      email: "yara.m@example.com",
    },
    office: {
      companyName: "Altitude Transport",
      address: "2424 Walnut St, Greentown, USA",
    },
    workgroups: "Inventory",
    seatAssignment: "Office 7 - Inventory",
    status: (
      <Status sizes="primary" variant="active">
        Active
      </Status>
    ),
  },
  {
    name: {
      user: "Zane Nelson",
      email: "zane.n@example.com",
    },
    office: {
      companyName: "Peak Freight",
      address: "2525 Fir St, Highland, USA",
    },
    workgroups: "Management",
    seatAssignment: "Cubicle 10 - Management",
    status: (
      <Status sizes="primary" variant="deactive">
        Deactive
      </Status>
    ),
  },
];

const Page = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [data, setData] = useState({
    data: dataSet,
    total: dataSet.length,
    perPage: 5,
  });

  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 5,
    totalRows: dataSet.length,
  });

  const [searchTerm, setSearchTerm] = useState("");

  // const fetch = useCallback(async() => {

  // })

  // useEffect(() => {
  //   // write your code
  //   fetch();
  // }, [fetch])

  useEffect(() => {
    // Update pagination total rows whenever data changes
    setPagination((prev) => ({
      ...prev,
      totalRows: filteredData.length,
    }));
  }, [data, searchTerm]);

  // Filter data based on search term
  const filteredData = data.data.filter(
    (item) =>
      item.name.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.office.companyName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      item.seatAssignment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePageChange = (page) => {
    setPagination((prevPagination) => ({ ...prevPagination, page }));
  };

  const handlePerPageChange = (perPage) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      perPage,
      page: 1, // Reset to page 1 on perPage change
    }));
  };

  const paginatedData = filteredData.slice(
    (pagination.page - 1) * pagination.perPage,
    pagination.page * pagination.perPage
  );

  const router = useRouter();
  const handleActionMenu = (data) => {
    const { type } = data;

    if (type === "VIEW") {
      router.push(`${USER?.GET_USER_DEATILS}/id-${data?.row?.age}`);
    }
  };

  console.log("Drawer open state:", isDrawerOpen);

  

  return (
    <>
      {/* Overlay */}
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-black opacity-50 z-40 transition-all duration-100"></div>
      )}

      {/* Page Content */}
      <div className="z-30 relative">
        <h1 className="text-3xl font-bold mb-6">Users Management</h1>
        <div className="flex items-center justify-between mb-6">
          <div>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-1 p-2 border border-gray-300 rounded"
            />
            <p className="text-sm mb-4 text-slate-500">
              Search User by name, email or username
            </p>
          </div>

          <div>
            <Button
              variant="base"
              size="large"
              iconLeft={<BiPlus size={20} />}
              onClick={openModal}
            >
              Create New User
            </Button>
          </div>
        </div>

        <DataList
          rows={paginatedData}
          pagination={pagination}
          handlePageChange={handlePageChange}
          handlePerPageChange={handlePerPageChange}
          handleActionMenu={handleActionMenu}
        />
      </div>

      {/* Drawer */}
      <RightDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        style="w-[40%] h-[100vh] bg-white"
      ></RightDrawer>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <CreateUserForm onClose={closeModal} />
      </Modal>
    </>
  );
};

export default Page;
