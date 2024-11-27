"use client";

import WithAuthorization from '@/app/HigherOrderComponents/WithAuthorization';
import PostShipmentForm from './components/PostShipmentForm'
import { POST_SHIPMENT } from '@/utils/permission';
import ShipmentPostForm from './components/ShipmentPostForm';


const PostNewShipment = () => {
  return (
    <>
      <ShipmentPostForm />
    </>
  );
};

export default WithAuthorization(PostNewShipment, [
  POST_SHIPMENT
]);