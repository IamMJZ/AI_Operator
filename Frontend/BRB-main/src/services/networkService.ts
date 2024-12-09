import axiosInstance from "./axios-instance";

// https://smarty.smartbank.uz/calls/agent/contacts/observe

export const getContacts = async () => {
  return await axiosInstance
    .get(`/agent/contacts/observe`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const makeCall = async (connectionID: string) => {
  console.log(connectionID);
  return await axiosInstance
    .get(`/agent/contacts/make_call?connection_id=${connectionID}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const getContactsHistory = async (id: string) => {
  return await axiosInstance
    .get(`/agent/contacts/${id}/history`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const getProjects = async () => {
  return await axiosInstance
    .get(`project/`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const getManagements = async (id: string) => {
  return await axiosInstance
    .get(`project_management/?project_id=${id}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const getDocuments = async (id: string) => {
  return await axiosInstance
    .get(`project_document/?project_id=${id}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const getProjectById = async (id: string) => {
  return await axiosInstance
    .get(`project/${id}/`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};
// export const getProjectsByType = async () => {
//   return await axiosInstance
//     .get(`project_by_type`)
//     .then((res) => res.data)
//     .catch((err) => {
//       throw err;
//     });
// };
export const getProjectsDetailByType = async (id: string) => {
  return await axiosInstance
    .get(`project_by_type/?project_type=${id}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const getDocuments2 = async () => {
  return await axiosInstance
    .get(`project_document/`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};
