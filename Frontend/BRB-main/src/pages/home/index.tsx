import { useEffect, useState } from "react";
import avatar from "./../../assets/avatar.png";
import emptyBox from "./../../assets/empty_box.json";
import Lottie from "lottie-react";
import ReactAudioPlayer from "react-audio-player";
import audio from "./../../assets/test.mp3";
import ClipLoader from "react-spinners/ClipLoader";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { FaPhoneAlt } from "react-icons/fa";
import { HiOutlineInbox } from "react-icons/hi2";
import agent from "./../../assets/agent.png";

function formatDate(dateString: string) {
  const date = new Date(dateString);

  // Get the two-digit year
  const year = date.getFullYear().toString();

  // Get the month and day with leading zeros if necessary
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  // Get the hours and minutes
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Determine AM or PM
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  hours = hours % 12 || 12;

  // Format the final output string
  const formattedDate = `${year}.${month}.${day}, ${hours}:${minutes} ${ampm}`;
  return formattedDate;
}

function formatNumberWithSpaces(number: number) {
  return new Intl.NumberFormat("en-US", { useGrouping: true })
    .format(number)
    .replace(/,/g, " ");
}

// const baseUsers = [
//   {
//     name: "Akbar Tohirov",
//     status: "bad",
//     date: "10.10.2024, 10:21pm",
//     id: 1,
//   },
//   {
//     name: "Emily Johnson",
//     status: "good",
//     date: "09.15.2024, 3:45pm",
//     id: 2,
//   },
//   {
//     name: "John Doe",
//     status: "bad",
//     date: "08.02.2024, 11:30am",
//     id: 3,
//   },
//   {
//     name: "Jane Smith",
//     status: "good",
//     date: "07.18.2024, 4:12pm",
//     id: 4,
//   },
//   {
//     name: "Michael Brown",
//     status: "best",
//     date: "06.21.2024, 2:05pm",
//     id: 5,
//   },
//   {
//     name: "Sarah Davis",
//     status: "bad",
//     date: "05.11.2024, 9:18am",
//     id: 6,
//   },
//   {
//     name: "David Wilson",
//     status: "good",
//     date: "04.25.2024, 8:00pm",
//     id: 7,
//   },
//   {
//     name: "Laura Martinez",
//     status: "best",
//     date: "03.30.2024, 7:45am",
//     id: 8,
//   },
//   {
//     name: "James Taylor",
//     status: "good",
//     date: "02.14.2024, 1:27pm",
//     id: 9,
//   },
//   {
//     name: "Patricia Garcia",
//     status: "bad",
//     date: "01.05.2024, 12:11pm",
//     id: 10,
//   },
// ];

interface User {
  _id: string;
  first_name: string;
  email: string;
  middle_name: string;
  last_name: string;
  phone_number: PhoneNumber;
  family_status: string;
  age: number;
  address: Address;
  debt_info: DebtInfo;
  status: string;
  fullname: string;
}

interface PhoneNumber {
  number: string;
}

interface Address {
  city: string;
  country: string;
  district: string;
  street: string;
}

interface DebtInfo {
  amount_init: number;
  amount_left: number;
  amount_payed: number;
  init_date: string;
  type: string;
}

export default function Home() {
  const [inputText, setInputText] = useState("");

  const [baseUsers, setBaseUsers] = useState<User[] | null>(null);
  const [users, setUsers] = useState<User[] | null>(null);
  const [selectedIndex, setSelectedIndex] = useState("");

  const [availableConnections, setAvailableConnections] = useState<
    AvailableConnections[]
  >([]);

  useEffect(() => {
    getContacts()
      .then((res) => {
        console.log(res);
        // console.log(res.offline_users);
        const resultArray = Object.values(res.available_connection);
        setAvailableConnections(Object.values(res.available_connection));
        console.log(resultArray);
        const offlineUsers = res.offline_users.map((i: User) => ({
          ...i,
          status: "offline",
          fullname: i.first_name + " " + i.last_name,
        }));

        const onlineUsers = res.online_users.map((i: User) => ({
          ...i,
          status: "online",
          fullname: i.first_name + " " + i.last_name,
        }));

        // console.log();

        setBaseUsers([...onlineUsers, ...offlineUsers]);
        setUsers([...onlineUsers, ...offlineUsers]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setSelectedIndex("");
    if (baseUsers) {
      setUsers(
        baseUsers.filter((user) =>
          user.fullname.toLocaleLowerCase().includes(inputText.toLowerCase())
        )
      );
    }
  }, [inputText]);

  return (
    <div className="flex">
      <div className="min-w-[300px] border-r border-b">
        <form className="p-2">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="search"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="block w-full p-[10px] ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Search"
              required
              autoComplete="off"
            />
          </div>
        </form>
        <div className="mt-1 overflow-y-auto max-h-[540px]">
          {users !== null &&
            users.map((user) => (
              <div
                key={user._id}
                onClick={() => {
                  setSelectedIndex(user._id);
                }}
                className={`${
                  user._id === selectedIndex ? "bg-gray-600 text-white" : ""
                } flex gap-2 cursor-pointer border-b relative p-2`}
              >
                <div className="relative">
                  {/* <img
                    src={avatar}
                    className="w-[40px] h-[40px] rounded-full border border-blue-300 shadow"
                    alt="Avatar"
                  /> */}

                  <div className="w-[50px] h-[50px] rounded-full border  bg-[#BFADFB] shadow flex items-center justify-center">
                    <span className="font-bold">
                      {user.first_name.charAt(0)}
                      {user.last_name.charAt(0)}
                    </span>
                  </div>

                  <div
                    className={`rounded-full w-[15px] h-[15px] absolute bottom-[-2px] right-[-2px] ${
                      user.status === "online"
                        ? "bg-green-500"
                        : user._id === selectedIndex
                        ? "bg-white"
                        : "bg-gray-500"
                    }  border`}
                  ></div>
                </div>
                <div className="flex flex-col gap-0.5 justify-center ">
                  <p className="text-sm">
                    {user.first_name} {user.last_name}
                  </p>
                  <p className="text-xs">{user.email}</p>
                </div>

                {/* <div
                className={`${user.status === "bad" ? "bg-red-500 " : ""} ${
                  user.status === "good" ? "bg-yellow-500 " : ""
                } ${
                  user.status === "best" ? "bg-green-500 " : ""
                } absolute right-8 top-5 rounded shadow-md h-4 w-8`}
              ></div> */}
              </div>
            ))}
          {users === null && (
            <div className="p-6 w-[300px] flex justify-center items-center">
              <ClipLoader
                color={"#4da6ff"}
                size={100}
                aria-label="Loading Spinner"
                data-testid="loader"
                className="text-blue-300"
              />
            </div>
          )}
          {users !== null && users.length === 0 && (
            <div className=" p-6 w-[300px]">
              <Lottie animationData={emptyBox} loop={true} />
              <p className="text-center font-bold text-lg italic text-blue-400">
                Empty
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="flex-1">
        {selectedIndex !== "" && (
          <div className=" p-4 ">
            <div className="">
              {users !== null && (
                <CenteredTabs
                  user={users.filter((u) => u._id === selectedIndex)[0]}
                  availableConnections={availableConnections}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface History {
  connection?: Connection;
  content_of_conversation: Conversation[];
}

interface Conversation {
  role: string;
  content: string;
}

interface Connection {
  start_time: string;
}

import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {
  getContacts,
  getContactsHistory,
  makeCall,
} from "../../services/networkService";

type CenteredTabsProps = {
  user: User;
  availableConnections: AvailableConnections[];
};

type AvailableConnections = {
  ConnectionInfo: ConnectionInfo;
};

type ConnectionInfo = {
  id: string;
  user_id: string;
};

function formatTimestamp(isoString: string) {
  const date = new Date(isoString);

  // Format the date as DD.MM.YYYY
  const formattedDate = date.toLocaleDateString("en-GB").replace(/\//g, ".");

  // Format the time as hh:mm am/pm
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  // Combine date and time
  return `${formattedDate}, ${formattedTime}`;
}

const CenteredTabs: React.FC<CenteredTabsProps> = ({
  user,
  availableConnections,
}) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [open, setOpen] = useState(false);
  const [openCall, setOpenCall] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const [history, setHistory] = useState<History[] | null>(null);

  useEffect(() => {
    setValue(0);
    getContactsHistory(user._id)
      .then((res) => {
        // console.log(formatTimestamp(res.history[0].connection.start_time));
        // console.log(res.history.length);
        setHistory(res.history);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  return (
    <div className="relative">
      <p className="text-2xl font-bold ml-2 mt-3">{user.first_name}</p>
      <div className="absolute left-0 w-[770px]">
        <Box sx={{ width: "100%" }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab
              sx={{ fontWeight: "bold", fontSize: "12px" }}
              label="Shaxsiy ma'lumotlar"
            />
            <Tab
              sx={{ fontWeight: "bold", fontSize: "12px" }}
              label="Qarz ma'lumotlari"
            />
            <Tab
              sx={{ fontWeight: "bold", fontSize: "12px" }}
              label="Suhbarlar tarixi"
            />
            <Tab
              sx={{ fontWeight: "bold", fontSize: "12px" }}
              label="Qo'ng'iroqlarni rejalashtirish"
            />
          </Tabs>
        </Box>
      </div>

      <div className="h-[56px]"></div>

      <div className="">
        {value === 0 && (
          <div className="relative">
            <p className="font-bold text-xl mt-4 ml-1">Shaxsiy ma'lumotlar</p>

            <div className="grid grid-cols-3 gap-2 w-full ">
              <div className="p-4 flex flex-col gap-2">
                <p className="font-bold text-md">Ism</p>
                <p className="text-md">
                  {user.first_name ? user.first_name : "-"}
                </p>
              </div>
              <div className="p-4 flex flex-col gap-2">
                <p className="font-bold text-md">Sharif</p>
                <p className="text-md">
                  {user.middle_name ? user.middle_name : "-"}
                </p>
              </div>
              <div className="p-4 flex flex-col gap-2">
                <p className="font-bold text-md">Familiya</p>

                <p className="text-md">
                  {user.last_name ? user.last_name : "-"}
                </p>
              </div>
              <div className="p-4 flex flex-col gap-2">
                <p className="font-bold text-md">Telifon raqam</p>
                <p className="text-md">
                  {user.phone_number.number ? user.phone_number.number : "-"}
                </p>
              </div>
              {/* <div className="p-4 flex flex-col gap-2">
                <p className="font-bold text-md">Ikkilamchi telifon</p>
                <p className="text-md">-</p>
              </div> */}
              <div className="p-4 flex flex-col gap-2">
                <p className="font-bold text-md">Email</p>
                <p className="text-md">{user.email ? user.email : "-"}</p>
              </div>
              <div className="p-4 flex flex-col gap-2">
                <p className="font-bold text-md">Oilaviy holat</p>
                <p className="text-md">
                  {/* {user.family_status ? user.family_status : "-"} */}
                  {user.family_status == "married" ? "Oilali" : "Oilasiz"}
                </p>
              </div>
              <div className="p-4 flex flex-col gap-2">
                <p className="font-bold text-md">Yosh</p>

                <p className="text-md">{user.age ? user.age + 20 : "-"}</p>
              </div>
            </div>

            <p className="font-bold text-xl mt-2 ml-1">Manzil</p>

            <div className="grid grid-cols-3 gap-4 w-full ">
              <div className="p-4 flex flex-col gap-2">
                <p className="font-bold text-md">
                  Shahar(Viloyat):{" "}
                  <span className="font-normal">
                    {user.address.city ? user.address.city : "-"}
                  </span>{" "}
                </p>
              </div>
              <div className="p-4 flex flex-col gap-2">
                <p className="font-bold text-md">
                  Tuman:{" "}
                  <span className="font-normal">
                    {user.address.district ? user.address.district : "-"}
                  </span>
                </p>
              </div>
              <div className="p-4 flex flex-col gap-2">
                <p className="font-bold text-md">
                  Manzil:{" "}
                  <span className="font-normal">
                    {user.address.street ? user.address.street : "-"}
                  </span>
                </p>
              </div>
            </div>
            <div className="text-right mt-12 mr-4">
              <button
                onClick={() => {
                  const con = availableConnections.filter(
                    (con: AvailableConnections) =>
                      con.ConnectionInfo.user_id === user._id
                  );
                  makeCall(con[0].ConnectionInfo.id)
                    .then((res) => {
                      console.log(res, "salom");
                      toast.info(
                        <>
                          Performed call to{" "}
                          <span className="font-bold">{`${user.first_name} ${user.last_name}`}</span>
                        </>,
                        {
                          position: "top-center",
                        }
                      );
                    })
                    .catch((err) => {
                      console.log(err);
                      toast.error("Problem to make a call, please try again!");
                    });
                }}
                type="button"
                className={`bg-blue-500 ${
                  user.status === "online" ? "" : "hidden"
                } text-white p-4 rounded-full shadow-lg hover:bg-blue-600 hover:scale-105 transform transition-transform duration-300 ease-in-out focus:ring-4 focus:ring-blue-300`}
              >
                <FaPhoneAlt className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
        {value === 1 && (
          <>
            <p className="font-bold text-xl mt-4 ml-1">Qarz ma'lumotlari</p>

            <div className="grid grid-cols-3 gap-2 w-full ">
              <div className="p-4 flex flex-col gap-2">
                <p className="font-bold text-md">Ism</p>
                <p className="text-md">
                  {user.first_name ? user.first_name : "-"}
                </p>
              </div>
              <div className="p-4 flex flex-col gap-2">
                <p className="font-bold text-md">Sharif</p>
                <p className="text-md">
                  {user.middle_name ? user.middle_name : "-"}
                </p>
              </div>
              <div className="p-4 flex flex-col gap-2">
                <p className="font-bold text-md">Familiya</p>

                <p className="text-md">
                  {user.last_name ? user.last_name : "-"}
                </p>
              </div>
              <div className="p-4 flex flex-col gap-2">
                <p className="font-bold text-md">Kredit turi</p>
                <p className="text-md">
                  {/* {user.phone_number.number ? user.phone_number.number : "-"} */}
                  {user.debt_info.type}
                </p>
              </div>
              <div className="p-4 flex flex-col gap-2">
                <p className="font-bold text-md">
                  Kredit rasmiylashtirilgan sana:
                </p>
                <p className="text-md">
                  {formatDate(user.debt_info.init_date)}
                </p>
              </div>
              <div className="p-4 flex flex-col gap-2">
                <p className="font-bold text-md">Rasmiylashtirilgan summa:</p>
                <p className="text-md">
                  {formatNumberWithSpaces(user.debt_info.amount_init)} so'm
                </p>
              </div>
              <div className="p-4 flex flex-col gap-2">
                <p className="font-bold text-md">Qarzdorlik summasi</p>
                <p className="text-md">{user.debt_info.amount_left} so'm</p>
              </div>
              <div className="p-4 flex flex-col gap-2">
                <p className="font-bold text-md">To'langan</p>

                <p className="text-md">
                  {formatNumberWithSpaces(user.debt_info.amount_payed)} so'm
                </p>
              </div>
            </div>
          </>
        )}
        {value === 2 && (
          <>
            <p className="font-bold text-xl my-4 ml-1 ">Suhbatlar tarixi</p>

            {history && history.length === 0 && (
              <div className="text-center text-gray-500 flex flex-col items-center justify-center my-3 shadow-lg border-t-[0.5px] p-4">
                <HiOutlineInbox className="w-[30px] h-[30px]" />
                <p>Empty</p>
              </div>
            )}

            {/* {history.length !== 0 && (
              <History items={history[0]?.content_of_conversation} />
            )} */}

            {history && history.length !== 0 ? (
              <>
                {history.map((his, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setOpenCall((prev) => !prev);
                    }}
                    className="hover:shadow-xl duration-200 transform cursor-pointer border-b shadow select-none"
                  >
                    <div className="flex justify-between   p-2  ">
                      <div className="flex flex-col gap-0.5 ml-2">
                        <p className="font-bold tex">Audio</p>
                        <p>{formatTimestamp(his!.connection!.start_time)}</p>
                      </div>
                      <ReactAudioPlayer src={audio} controls />
                    </div>
                    <div
                      className={`${
                        openCall
                          ? "p-8 opacity-100 translate-y-0"
                          : "opacity-0 -translate-y-4"
                      } transition-opacity transform duration-500 ease-in-out`}
                    >
                      <div className={`${openCall ? "block" : "hidden"}`}>
                        <History
                          items={his!.content_of_conversation}
                          name={user?.fullname}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <></>
            )}

            {/* {history.length !== 0 && (
              // {history.map(his => (
              // <div className="flex justify-between border-b shadow p-2">
              //   <div className="flex flex-col gap-0.5">
              //     <p className="font-bold tex">Audio</p>
              //     <p>10.10.1996, 10:00 pm</p>
              //   </div>
              //   <ReactAudioPlayer src={audio} controls />
              // </div>
              // ))}
            )} */}
          </>
        )}
        {value === 3 && (
          <>
            <div className="">
              <p></p>
              <button
                onClick={onOpenModal}
                className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white "
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                  Add New Schedule
                </span>
              </button>
            </div>
          </>
        )}
      </div>
      <Modal open={open} onClose={onCloseModal} center>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDateTimePicker
            orientation="landscape"
            onAccept={onCloseModal}
            onClose={onCloseModal}
          />
        </LocalizationProvider>
      </Modal>
    </div>
  );
};

// import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { toast } from "react-toastify";

// function StaticDateTimePickerLandscape() {
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <StaticDateTimePicker orientation="landscape" />
//     </LocalizationProvider>
//   );
// }

interface CreateHistory {
  items: Conversation[];
  name: string;
}

const History: React.FC<CreateHistory> = ({ items, name }) => {
  return (
    <>
      {items.map((item, index) => (
        <div key={index}>
          {item.role === "agent" && (
            <div className="flex gap-3 items-top m-2 border-b pb-2">
              <img
                src={agent}
                alt="Agent Image"
                className="w-[52px] h-[52px] rounded-full border border-gray-300"
              />
              <div className="flex flex-col justify-top">
                <p className="font-bold">Agent</p>
                <p>{item.content}</p>
              </div>
            </div>
          )}
          {item.role === "user" && (
            <div className="flex gap-3 items-top m-2 border-b pb-2">
              <img
                src={avatar}
                alt="Agent Image"
                className="w-[52px] h-[52px] rounded-full border border-gray-300"
              />
              <div className="flex flex-col justify-top">
                <p className="font-bold">{name}</p>
                <p>{item.content}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
};
