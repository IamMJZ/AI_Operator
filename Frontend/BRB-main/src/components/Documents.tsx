import { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";
import { getDocuments2 } from "../services/networkService";

interface Project {
  id: number;
  project: string;
  document_title: string;
  document_link: string;
}

export default function Documents() {
  const [documents, setDocuments] = useState<Project[]>([]);
  function getData() {
    getDocuments2()
      .then((res) => {
        setDocuments(res);
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {documents.length > 0 && (
        <div className="p-2 grid sm:grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {documents.map((document) => (
            <div
              key={document.id}
              onClick={() => {
                window.open(
                  document.document_link,
                  "_blank",
                  "noopener,noreferrer"
                );
              }}
              className="flex cursor-pointer relative flex-col p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 "
            >
              <div>
                <p className=" font-normal text-end text-gray-700 ">
                  {document.project}
                </p>
              </div>
              <hr className="mt-6" />
              <div className="flex items-center">
                <p className="mb-3 ml-1 mt-4 text-left font-normal text-gray-700 ">
                  {document.document_title}
                </p>
              </div>
              <div className="absolute top-[-0.7rem] left-1 text-[3rem] text-blue-500">
                <FaDownload />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
