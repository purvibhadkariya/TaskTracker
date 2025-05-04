import axios from "axios"

const url = 'http://localhost:3000'

export const signup = (data, headers) => {
    return axios.post(url + '/auth/signup/', data, headers)
}

export const login = async (data) => {
    return axios.post(url + '/auth/login', data)
}

export const addProject = async (data, headers) => {
    return axios.post(url + '/project/create-project', data, headers)
}

export const getProjects = async (headers) => {
    return axios.get(url + `/project/get-all`, headers)
}

export const getAllTasks = async (headers) => {
    return axios.get(url + `/tasks/all`, headers)
}


export const getProjectTasks = async (projectId, headers) => {
    return axios.get(url + `/tasks/project-tasks?projectId=${projectId}` , headers)
}

export const createTask =async (Title, Description, completionDate, projectId , headers) => {
    return axios.post(url + '/tasks/create-task', { Title, Description,completionDate, projectId   }, headers)
}

export const updateTask = async (id,Title, Description,completionDate, projectId , status, headers) => {
    return axios.put(url + `/tasks/update-task/${id}`, { Title, Description,completionDate, projectId, status  }, headers)
}


export const markCompleted = async (id,Title, Description, projectId , status, headers) => {
    return axios.put(url + `/tasks/update-task/${id}`, { Title, Description, projectId, status:'completed'  }, headers)
}


export const deleteTask = async (id,headers) => {
    return axios.delete(url + `/tasks/delete-task/${id}`, headers)
}

export const userDetails = async (headers) => {
    return axios.get(url + '/project/user-details', headers)
}

export const deleteProject = async (id, headers) => {
  return axios.delete(url + `/project/delete-project/${id}`, headers);
};

export const updateProject = async (
  id,
  projectId,
  headers
) => {
  return axios.put(
    url + `edit-project/${id}`,
    { projectId },
    headers
  );
};