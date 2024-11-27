import { Form, Formik } from 'formik'
import React from 'react'
import Chats from '@/components/chats/Chats'
import { IoSend } from 'react-icons/io5'


const Messages = () => {
  return (
    <div className="relative w-full h-[88vh]">
      <h5 className='text-center border-b'>Conversations</h5>
      <Chats />
      <div className="form-area absolute z-10 left-0 bottom-[-35px] w-full">
        <Formik>
          {({ values }) => (
            <Form className="flex items-center p-4 bg-white rounded-lg shadow-md">
              {/* Input */}
              <div className="flex-1">
                <input
                  type="text"
                  name="message"
                  placeholder="Type your message..."
                  className="w-full px-4 py-2 text-sm bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#73c002]"
                />
              </div>

              {/* Send Button */}
              <button
                type="submit"
                className="p-2 ml-2 text-white bg-[#73c002] rounded-full shadow-lg hover:bg-[#73c002] focus:outline-none focus:ring-2 focus:ring-[#73c002]"
              >
                <IoSend size={20} />
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Messages