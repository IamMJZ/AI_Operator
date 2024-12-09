import { useEffect, useState } from "react";
import { getProjectById } from "../services/networkService";
import avatar from "./../assets/avatar.png";

interface Project {
  id?: number;
  client?: string;
  director?: string;
  cost?: string;
  start_date?: string;
  end_date?: string;
  status?: string;
  stage?: string;
}

const GeneralInformation: React.FC<{ id: string }> = ({ id }) => {
  const [project, setProject] = useState<Project>({});

  useEffect(() => {
    getProjectById(id as string)
      .then((res) => {
        // setInfo(res);
        // console.log(res);
        setProject(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="bg-white p-4 flex gap-4">
        <div className="flex flex-1 items-center gap-3">
          <img
            className="w-[60px] h-[60px] rounded-full border border-gray-200"
            src={avatar}
          />
          <div className="text-sm italic flex flex-col gap-1">
            <p className="text-[16px]">{project.client}</p>
            <p className="text-blue-400">Заказчик</p>
          </div>
        </div>
        <div className="flex flex-1 items-center gap-3">
          <img
            className="w-[60px] h-[60px] rounded-full border border-gray-200"
            src={avatar}
          />
          <div className="text-sm italic flex flex-col gap-1">
            <p className="text-[16px]">{project.director}</p>
            <p className="text-blue-400">Руководитель Проекта </p>
          </div>
        </div>
      </div>

      <section className="flex w-full mt-3">
        <div className="p-6 shadow-md mb-3 w-48 bg-white">
          <div className="flex justify-between ">
            <div className="text-black font-bold">Статус</div>
          </div>
          <div className="text-[#cc7722] text-[1rem] font-bold capitalize">
            {project.status === "active" ? "Активный" : ""}
            {project.status === "canceled" ? "Отменённый" : ""}
            {project.status === "on_hold" ? "Приостановлен" : ""}
            {project.status === "perspective" ? "Приоритетный" : ""}
          </div>
        </div>
        <div className="p-6  shadow-md mb-3 w-52 bg-white">
          <div className="flex justify-between">
            <div className="text-black font-bold">Бюджет</div>
          </div>
          <div className="text-[#cc7722] text-[1rem] font-bold">
            {project.cost} uzs
          </div>
        </div>
        <div className="p-6 shadow-md mb-3 w-64 bg-white">
          <div className="flex justify-between">
            <div className="text-black font-bold">Начало проекта</div>
          </div>
          <div>
            <div>
              <p className="text-[#cc7722] text-[1rem] font-bold">
                {project.start_date}
              </p>
              {/* <p className="flex text-sm italic text-[#a7a7a7] mt-11">
              на 19.02.2020 15:05{" "}
              <span className="ml-2 mt-1">
                <FiRefreshCcw />
              </span>
            </p> */}
            </div>
          </div>
        </div>
        <div className="p-6 shadow-md mb-3 w-64 bg-white">
          <div className="flex justify-between">
            <div className="text-black font-bold">Разница</div>
          </div>
          <div>
            <div>
              <p className="text-[#cc7722] text-[1rem] font-bold">
                {calculateDaysDifference(
                  project.start_date as string,
                  project.end_date as string
                )}{" "}
                ДН
              </p>
              {/* <p className="flex text-sm italic text-[#a7a7a7] mt-11">
              на 19.02.2020 15:05{" "}
              <span className="ml-2 mt-1">
                <FiRefreshCcw />
              </span>
            </p> */}
            </div>
          </div>
        </div>
        <div className="p-6 shadow-md mb-3 w-64 bg-white">
          <div className="flex justify-between">
            <div className="text-black font-bold">Завершения Проекта</div>
            <div>{/* <MdOutlineCalendarMonth /> */}</div>
          </div>
          <div>
            <div className="text-[#cc7722] text-[1rem] font-bold">
              {project.end_date}
              {/* <span className="text-sm font-thin">в 9:00</span> */}
            </div>
            {/* <div className="mt-2">
            <p>на 19.02.2020 15:05 </p>
          </div> */}
          </div>
        </div>
        {/* <div className="p-6  shadow-md mb-3 w-64 bg-white">
          <div className="flex justify-between">
            <div className="text-black font-bold">Завершение</div>
          </div>
          <div>
            <div className="text-[#cc7722] text-[1.3rem] font-bold">
              12.08.2020
            </div>
          </div>
        </div> */}
      </section>

      <div className="bg-white p-6 shadow-md mb-6">
        <div className="flex justify-between mb-4">
          <div className="text-lg font-bold">Жизненный цикл проекта</div>
          <div className="flex flex-col items-center justify-center">
            {/* <div className="flex space-x-4">
              <button
                // onClick={prevPage}
                className="px-4 py-2 text-black rounded inline-block hover:bg-slate-400"
              >
                <div className="flex items-center">
                  <IoIosArrowRoundBack /> <p>Предыдущий</p>
                </div>
              </button>
              <button
                // onClick={nextPage}
                className="px-4 py-2 text-black  rounded hover:bg-slate-400"
              >
                <div className="flex items-center">
                  <p>Следующий</p>
                  <IoIosArrowRoundForward />
                </div>
              </button>
            </div> */}
          </div>
        </div>
        <div className="flex space-x-4">
          <div
            className={`flex-1 bg-green-400 text-white text-center py-4 rounded-bl-full rounded-tr-full relative ${
              project.stage === "initiation" ||
              project.stage === "planning" ||
              project.stage === "implementation" ||
              project.stage === "completion"
                ? "animate-select-glow"
                : ""
            }`}
          >
            1. Инициация
            <div className="curve-border"></div>
          </div>

          <div
            className={`flex-1 bg-blue-400 text-white text-center py-4 rounded-bl-full rounded-tr-full relative ${
              project.stage === "planning" ||
              project.stage === "implementation" ||
              project.stage === "completion"
                ? "animate-select-glow"
                : ""
            }`}
          >
            2. Планирование
            <div className="curve-border"></div>
          </div>
          <div
            className={`flex-1 bg-orange-400 text-center py-4 rounded-bl-full rounded-tr-full relative ${
              project.stage === "implementation" ||
              project.stage === "completion"
                ? "animate-select-glow"
                : ""
            }`}
          >
            3. Реализация
            <div className="curve-border"></div>
          </div>
          <div
            className={`flex-1 bg-red-400 text-center py-4 rounded-bl-full rounded-tr-full ${
              project.stage === "completion" ? "animate-select-glow" : ""
            }`}
          >
            4. Завершение
            <div className="curve-border"></div>
          </div>
        </div>
      </div>

      {/* <ProjectInfo />

      <ProjectLifecycle /> */}
    </div>
  );
};

export default GeneralInformation;

function calculateDaysDifference(date1: string, date2: string): number {
  const firstDate = new Date(date1);
  const secondDate = new Date(date2);

  const timeDifference = secondDate.getTime() - firstDate.getTime();

  const dayDifference = timeDifference / (1000 * 3600 * 24);

  return dayDifference;
}
