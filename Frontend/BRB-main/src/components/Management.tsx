import { useEffect, useState } from "react";
import avatar from "./../assets/avatar.png";
import { getManagements } from "../services/networkService";

interface Manager {
  id: number;
  position: string;
  project: string;
  person_image: string;
  person?: Person;
}

interface Person {
  email?: string;
  fullname?: string;
}

const Management: React.FC<{ id: string }> = ({ id }) => {
  const [managers, setManagers] = useState<Manager[]>([]);

  useEffect(() => {
    getManagements(id as string)
      .then((res) => {
        // console.log(res);
        setManagers(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <p className="text-xl font-bold my-4 mx-4">
        Руководство проекта
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2">
        {managers.map((i) => (
          <div key={i.id} className="border flex shadow">
            <img
              src={i.person_image && avatar}
              className="h-24 w-24 m-4 outline-none rounded-full border-blue-300 border bg-gray-300"
              // alt={i.person}
            />
            <div>
              <p className="font-bold text-blue-400 mt-3 text-sm">
                {(i.person as Person).fullname}
              </p>
              <p className="text-gray-400 text-[13px] font-semibold my-1">
                {i.project}
              </p>
              <p className="text-gray-400 text-[13px] my-1">{i.position}</p>
              <p className="text-blue-400 text-[13px]">
                {(i.person as Person).email}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Management;
