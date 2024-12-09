import BarChart from "../../components/BarChart";
import { useNavigate } from "react-router-dom";
import { calls } from "./calls.ts";

// export const calls = [
//   {
//     id: 1,
//     callId: "call_29.30.1.32abcsdc",
//     status: "successful",
//     date: "31 Sep",
//   },
//   {
//     id: 2,
//     callId: "call_45.21.4.87xyz1234",
//     status: "successful",
//     date: "31 Sep",
//   },
//   {
//     id: 3,
//     callId: "call_98.12.7.54mnop5678",
//     status: "successful",
//     date: "30 Sep",
//   },
//   {
//     id: 4,
//     callId: "call_77.19.2.45qrst9101",
//     status: "unsuccessful",
//     date: "30 Sep",
//   },
//   {
//     id: 5,
//     callId: "call_31.22.9.76uvwab567",
//     status: "successful",
//     date: "29 Sep",
//   },
//   {
//     id: 6,
//     callId: "call_56.88.3.23ghijkl90",
//     status: "unsuccessful",
//     date: "28 Sep",
//   },
//   {
//     id: 7,
//     callId: "call_63.11.8.39lmnxyz78",
//     status: "successful",
//     date: "27 Sep",
//   },
//   {
//     id: 8,
//     callId: "call_48.53.2.14cde78912",
//     status: "successful",
//     date: "27 Sep",
//   },
//   {
//     id: 9,
//     callId: "call_91.34.5.23fghijklm",
//     status: "unsuccessful",
//     date: "26 Sep",
//   },
//   {
//     id: 10,
//     callId: "call_66.44.7.21opqrs234",
//     status: "successful",
//     date: "26 Sep",
//   },
//   {
//     id: 11,
//     callId: "call_13.77.6.55rstuvw56",
//     status: "successful",
//     date: "25 Sep",
//   },
// ];

export default function Analyzes() {
  const navigate = useNavigate();
  return (
    <div
      className="w-full mx-auto"
      style={{ paddingLeft: "40px", paddingRight: "40px" }}
    >
      <p className="text-center mt-10 font-bold text-2xl">Analytics</p>
      <div className="max-w-[1000px] mx-auto">
        <BarChart />
      </div>

      <div className="relative overflow-x-auto my-8 ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                N
              </th>
              <th scope="col" className="px-6 py-3">
                Call Id
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {calls.map((call) => (
              <tr
                onClick={() => {
                  navigate(`/analyzes/${call.callId}`);
                }}
                key={call.callId}
                className="bg-white border-b hover:cursor-pointer hover:bg-gray-100 group transition duration-200 ease-in-out transform hover:scale-[1.02]"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap"
                >
                  {call.id}.
                </th>
                <td className="px-6 py-4">{call.callId}</td>
                <td className="px-6 py-4">{call.date}</td>
                <td className="px-6 py-4">{call.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
