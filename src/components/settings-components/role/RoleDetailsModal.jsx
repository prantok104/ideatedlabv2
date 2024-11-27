"use client";

import React from "react";
import Modal from "@/components/modal/Modal";
import Status from "@/components/status/Status";

const RoleDetailsModal = ({ isOpen, onClose, role }) => {
  console.log("Modal isOpen:", isOpen);
  if (!role) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Role Details"
      maxWidth={"max-w-4xl"}
    >
      <div className=" mx-auto bg-white rounded ">
        <h1 className="text-xl font-bold text-gray-800 mb-4">{role.title}</h1>
        <div className="text-sm text-gray-600">
          <p className="mb-2">
            <span className="font-semibold">Description:</span>{" "}
            <span dangerouslySetInnerHTML={{ __html: role.description }}></span>
          </p>
          <p className="mb-2">
            <span className="font-semibold">Role Code:</span> {role.code}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Resource Type:</span>{" "}
            {role.resourceType}
          </p>
          <p className="mb-2 flex gap-2">
            <span className="font-semibold">Status:</span>{" "}
            {role.docStatus === "Active" ? (
              <Status sizes="primary" variant="active">
                Active
              </Status>
            ) : (
              <Status sizes="primary" variant="deactive">
                Inactive
              </Status>
            )}
          </p>
          <div className="flex">
            <div className="mb-2">
              <h3 className="font-semibold">Assigned Permissions:</h3>
              <ul className="list-disc ml-6">
                {role.assignedPermissions?.map((perm) => (
                  <li key={perm._id}>
                    {perm.title} - {perm.description}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-2">
              <h3 className="font-semibold">All Permissions:</h3>
              <ul className="list-disc ml-6">
                {role.allPermissions?.map((perm) => (
                  <li key={perm._id}>
                    {perm.title} - {perm.description}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RoleDetailsModal;
