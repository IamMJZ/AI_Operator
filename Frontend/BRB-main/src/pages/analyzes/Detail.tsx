import { useParams } from "react-router-dom";
import { FaDownload } from "react-icons/fa6";
import pdf from "./../../assets/2024-08-19 15_05_43-transcript.pdf";
import { calls } from "./calls";

export default function Detail() {
  const { id } = useParams();
  const call = calls.filter((call) => call.callId === id)[0];

  return (
    <div className="p-7">
      <p className="font-bold text-xl mb-4 text-gray-800">
        Call Id: <em className="text-black">{id}</em>
      </p>
      <hr />
      <div className="my-5"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="">
          <div
            onClick={() => {
              window.open(pdf, "_blank");
            }}
            className="font-bold ml-2 flex gap-2 items-center hover:text-green-500 cursor-pointer border rounded-md p-3 shadow-md hover:shadow"
          >
            Transcripts: <FaDownload />
          </div>
        </div>
        <div className="">
          <div className="font-bold ml-2 flex gap-2 items-center border rounded-md p-3 shadow-md hover:shadow">
            {call.date}
          </div>
        </div>
        <div className="">
          <div className="font-bold ml-2 flex gap-2 items-center border rounded-md p-3 shadow-md hover:shadow">
            {call.status}
          </div>
        </div>
      </div>

      <div className="my-8"></div>
      <hr />

      {call.status === "unsuccessful" && (
        <>
          <p className="font-bold m-4 text-xl">Reason:</p>
          <p>
            I have recently been experiencing a significant illness that has
            impacted my ability to manage my banking affairs, including
            accessing my credit and handling other related tasks. Due to my
            current health condition, I have been unable to attend to my
            financial responsibilities as promptly as I would normally.
          </p>
        </>
      )}
    </div>
  );
}
