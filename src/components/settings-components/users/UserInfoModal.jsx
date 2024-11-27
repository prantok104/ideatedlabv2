// components/settings-components/users/UserInfoModal.js
'use client'

import React from 'react';
import Modal from '@/components/modal/Modal';
import Status from '@/components/status/Status';

const UserInfoModal = ({ isOpen, onClose, user }) => {
  if (!user) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="User Details">
      <div className="max-w-md mx-auto bg-white p-4 rounded">
        <h1 className="text-xl font-bold text-gray-800 mb-4">{user.name.user}</h1>
        <div className="text-sm text-gray-600">
          <p className="mb-2">
            <span className="font-semibold">Email:</span> {user.name.email}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Company:</span> {user.office.companyName}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Workgroups:</span> {user.workgroups || 'None'}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Seat Assignment:</span> {user.seatAssignment}
          </p>
          <p className="mb-2 flex items-center">
            <span className="font-semibold">Status:</span> {user.status}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default UserInfoModal;
