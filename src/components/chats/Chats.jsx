import React from 'react'
const ChatLeft = ({ avatar, name, message, time }) => {
  return (
    <div className="flex items-start mb-4">
      {/* Avatar */}
      <img
        src={avatar}
        alt={`${name}'s avatar`}
        className="w-10 h-10 rounded-full mr-3"
      />
      <div className='text-left'>
        {/* Name and Time */}
        <div className="text-sm text-gray-500 mb-1">
          <span className="font-semibold text-gray-800">{name}</span> • {time}
        </div>
        {/* Message */}
        <div className="bg-gray-200 text-gray-900 py-2 px-4 rounded-lg max-w-xs break-words">
          {message}
        </div>
      </div>
    </div>
  );
};
const ChatRight = ({ avatar, name, message, time }) => {
  return (
    <div className="flex items-start justify-end mb-4">
      <div>
        {/* Name and Time */}
        <div className="text-sm text-gray-500 mb-1 text-right">
          <span className="font-semibold text-gray-800">{name}</span> • {time}
        </div>
        {/* Message */}
        <div className="bg-[#73c002] text-white py-2 px-4 rounded-lg max-w-xs break-words">
          {message}
        </div>
      </div>
      {/* Avatar */}
      <img
        src={avatar}
        alt={`${name}'s avatar`}
        className="w-10 h-10 rounded-full ml-3"
      />
    </div>
  );
};

const Chats = () => {
    const conversation = [
      {
        id: 1,
        message: "Hello, how are you?",
        sender: "right",
        name: "John",
        avatar: "https://via.placeholder.com/40",
        time: "10:00 AM",
      },
      {
        id: 2,
        message: "I'm good, thanks! How about you?",
        sender: "left",
        name: "Jane",
        avatar: "https://via.placeholder.com/40",
        time: "10:01 AM",
      },
      {
        id: 3,
        message: "Doing great, just working on some Tailwind designs. 😊",
        sender: "right",
        name: "John",
        avatar: "https://via.placeholder.com/40",
        time: "10:02 AM",
      },
      {
        id: 4,
        message: "That sounds fun! I’ve been working on a project too.",
        sender: "left",
        name: "Jane",
        avatar: "https://via.placeholder.com/40",
        time: "10:03 AM",
      },
      {
        id: 5,
        message: "Yeah, it’s exciting! I love how flexible Tailwind is.",
        sender: "right",
        name: "John",
        avatar: "https://via.placeholder.com/40",
        time: "10:04 AM",
      },
      {
        id: 6,
        message: "I agree! It’s such a game changer for UI development.",
        sender: "left",
        name: "Jane",
        avatar: "https://via.placeholder.com/40",
        time: "10:05 AM",
      },
      {
        id: 7,
        message: "Have you tried using the new features in Tailwind CSS v3?",
        sender: "right",
        name: "John",
        avatar: "https://via.placeholder.com/40",
        time: "10:06 AM",
      },
      {
        id: 8,
        message:
          "Yes, I’ve been experimenting with the new JIT mode. It’s amazing!",
        sender: "left",
        name: "Jane",
        avatar: "https://via.placeholder.com/40",
        time: "10:07 AM",
      },
      {
        id: 10,
        message: "Definitely! I’m looking forward to the next release. 😎",
        sender: "left",
        name: "Jane",
        avatar: "https://via.placeholder.com/40",
        time: "10:09 AM",
      },
     
      {
        id: 15,
        message:
          "Totally! I think it’s the best part of working in frontend development.",
        sender: "right",
        name: "John",
        avatar: "https://via.placeholder.com/40",
        time: "10:14 AM",
      },
      {
        id: 16,
        message:
          "Yeah, frontend dev is so rewarding! I love seeing everything come together.",
        sender: "left",
        name: "Jane",
        avatar: "https://via.placeholder.com/40",
        time: "10:15 AM",
      },
      {
        id: 17,
        message:
          "It’s the best part, for sure! Makes all the hard work feel worth it.",
        sender: "right",
        name: "John",
        avatar: "https://via.placeholder.com/40",
        time: "10:16 AM",
      },
      {
        id: 19,
        message: "Absolutely! That’s why I love working on side projects too.",
        sender: "right",
        name: "John",
        avatar: "https://via.placeholder.com/40",
        time: "10:18 AM",
      },
      {
        id: 20,
        message:
          "Me too! Side projects are a great way to experiment and learn new things.",
        sender: "left",
        name: "Jane",
        avatar: "https://via.placeholder.com/40",
        time: "10:19 AM",
      },
    ];


  return (
    <div className="chat-area bg-gray-100 h-full p-4 overflow-y-auto">
      {conversation.map((chat) =>
        chat.sender === "right" ? (
          <ChatRight
            key={chat.id}
            avatar={chat.avatar}
            name={chat.name}
            message={chat.message}
            time={chat.time}
          />
        ) : (
          <ChatLeft
            key={chat.id}
            avatar={chat.avatar}
            name={chat.name}
            message={chat.message}
            time={chat.time}
          />
        )
      )}
    </div>
  );
}

export default Chats