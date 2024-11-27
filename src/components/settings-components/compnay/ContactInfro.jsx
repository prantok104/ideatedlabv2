"use client";

import { FaPen } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import RightDrawer from "@/components/rightDrawer/RightDrawer";
import TextInput from "@/components/form/TextInput";
import Button from "@/components/button/Button";
import { NOTIFY_MESSAGE_WARNING } from "@/utils/helper";

const contacts = [
  {
    id: 1,
    name: "Contact 1",
    phone: "+1 254 6544785",
    email: "example1@gmail.com",
  },
  {
    id: 2,
    name: "Contact 2",
    phone: "+1 254 6544786",
    email: "example2@gmail.com",
  },
  {
    id: 3,
    name: "Contact 2",
    phone: "+1 254 6544786",
    email: "example2@gmail.com",
  },
];

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone: Yup.string().required("Phone is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const ContactInfo = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [smashCard, setSmashCard] = useState(contacts);
  const [ editCard, setEditCard] = useState(null);


  const handleRemoveCard = (id) => {
    setSmashCard(smashCard.filter((card) => card.id !== id));
    NOTIFY_MESSAGE_WARNING("Contact deleted successfully");
  };

  const handleEditCard = (id) => {
    setEditCard(smashCard.find((card) => card.id === id));
    setIsDrawerOpen(true);
  }



  const handleSubmit = (values) => {
    // If we are editing an existing contact, update it
    if (editCard) {
      setSmashCard((prevCards) =>
        prevCards.map((card) =>
          card.id === editCard.id ? { ...card, ...values } : card
        )
      );
    } else {
      // If no editCard is present, it's a new contact
      setSmashCard([...smashCard, { id: Date.now(), ...values }]);
    }
  
    // Close the drawer after saving
    setIsDrawerOpen(false);
  };
  

  return (
    <>
      <div className="w-full p-4 mb-3 bg-white rounded-xl">
        <div className="flex justify-between">
          <div className="text-[#454f5b] text-xl font-semibold leading-7">
            Contact
          </div>
          <div>
            <Button
              variant="stroke"
              size="small"
              onClick={() => setIsDrawerOpen(true)}
            >
              Add Contact
            </Button>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-3.5">
          {smashCard.length === 0 ? (
            <div className="text-[#637381] text-xs font-normal leading-tight">
              No contacts found
            </div>
          ) : (
            smashCard.map((contact) => (
              <div
                key={contact.id}
                className="px-4 py-3 bg-white rounded-lg shadow flex flex-col justify-start items-start gap-1"
              >
                <div className="self-stretch flex justify-between items-start gap-1">
                  <div className="flex-col justify-start items-start">
                    <div className="text-[#454f5b] text-base font-semibold leading-normal">
                      {contact.name}
                    </div>
                    <div className="text-[#637381] text-xs font-normal leading-tight">
                      Phone: {contact.phone}
                    </div>
                    <div className="text-[#637381] text-xs font-normal leading-tight">
                      Email: {contact.email}
                    </div>
                  </div>
                  <div className="flex justify-end items-center gap-2">
                    <button onClick={() => handleEditCard(contact.id)}>
                      <FaPen className="text-[#73C002]" />
                    </button>
                    <button onClick={() => handleRemoveCard(contact.id)}>
                      <ImBin className="text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <RightDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          style="w-1/3"
        >
          <h2 className="text-lg font-semibold mt-10 mb-10">Add New Contact</h2>

          <Formik
             initialValues={{
              name: editCard?.name || "",
              phone: editCard?.phone || "",
              email: editCard?.email || "",
            }}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, isValid, values, resetForm }) => (
              <Form>
                <div className="mb-4">
                  <TextInput
                    label="Name"
                    name="name"
                    type="text"
                    placeholder="Enter first name"
                  />
                </div>

                <div className="mb-4">
                  <TextInput
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter email"
                  />
                </div>

                <div className="mb-2">
                  <TextInput
                    label="Phone"
                    name="phone"
                    type="text"
                    placeholder="Enter phone number"
                  />
                </div>

                <div className="mt-40 flex justify-center gap-2">
                  <div className="w-full">
                    <Button
                      variant="stroke"
                      size="small"
                      onClick={() => {
                        setIsDrawerOpen(false);
                        resetForm();
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                  <div className="w-full">
                    <Button variant="base" size="small" type="submit">
                      Save
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </RightDrawer>
      </div>
    </>
  );
};

export default ContactInfo;
