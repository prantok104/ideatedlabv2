"use client";
import Button from "@/components/button/Button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BiPencil, BiUpload } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import userAvatar from "../../../../public/asset/user-avatar.png";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import TextInput from "@/components/form/TextInput";
import { toast } from "react-toastify";
import SearchableSelect from "@/components/form/SearchableSelect";
import { useApp } from "@/contexts/AppContext";
import apiClient from "@/lib/axios";
import { apiEndpoint } from "@/utils/api-endpoint";
import PersonalInfoForm from "./_componenets/PersonalInfoForm";
import LoginInfoForm from "./_componenets/LoginInfoForm";

// Validation schema


const UserProfile = () => {
  const [profileEdit, setProfileEdit] = useState(false);
  const { user } = useApp();

  





  return (
    <section>
      <div className="container mx-auto flex flex-col gap-4">
        <h1 className="text-xl font-semibold leading-7 py-3">User Profile</h1>

        <div className="p-6 bg-white rounded-md shadow-sm">
          <div className="grid grid-cols-2 justify-items-stretch">
            <div className="flex gap-6 justify-start items-center">
              <div className="relative w-[54px] h-[54px]">
                <Image
                  src={userAvatar}
                  alt="Profile image"
                  width={54}
                  height={54}
                  className="rounded-full"
                />
                <label
                  htmlFor="file-upload"
                  className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black bg-opacity-50 rounded-full"
                >
                  <BiUpload className="text-white w-6 h-6" />
                  <input
                    type="file"
                    id="file-upload"
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              </div>
              <div>
                <h1 className="text-xl font-semibold leading-7 pb-2 text-[#454F5B]">
                  {user.firstName + " " + user.lastName}
                </h1>
                <p className="text-xs font-medium text-[#637381] leading-5">
                  {user?.userType}
                </p>
                <p className="text-xs font-medium text-[#637381] leading-5">
                  {user?.address || "No address"}
                </p>
              </div>
            </div>
            <div className="justify-self-end">
              <Button
                variant={profileEdit ? "removeBtn" : "stroke"}
                size="medium"
                iconLeft={profileEdit ? <RiDeleteBin6Line /> : <BiPencil />}
                onClick={() => setProfileEdit(!profileEdit)}
              >
                {profileEdit ? "Cancel" : "Edit"}
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-md shadow-sm mt-4">
          <PersonalInfoForm/>
        </div>

        <div className="p-6 bg-white rounded-md shadow-sm mt-4">
          <LoginInfoForm/>
        </div>

        
      </div> 
    </section>
  );
};

export default UserProfile;
