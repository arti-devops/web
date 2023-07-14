import axios from '@axios'
import { BASE_URL } from '@projectConfig'
import { defineStore } from 'pinia'

export const useProjectListStore = defineStore('ProjectListStore', {
  actions: {
    // 👉 Fetch Projects data
    fetchProjects() { return axios.get(`${BASE_URL}/projects`)},

    // 👉 Fetch Projects data
    queryProjects(params) { return axios.post(`${BASE_URL}/projects/q`, {
      filter: params, 
    } ) },

    // 👉 Add New Project
    addProject(projectData) {
      return new Promise((resolve, reject) => {
        axios.post(`${BASE_URL}/projects`, {
          project: projectData,
        }).then(response => resolve(response))
          .catch(error => reject(error))
      })
    },

    // 👉 Fetch single Project
    fetchProject(id) {
      return new Promise((resolve, reject) => {
        axios.get(`${BASE_URL}/projects/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },

    // 👉 Update Project
    updateProject(projectData) {
      return new Promise(async (resolve, reject) => {
        await axios.put(`${BASE_URL}/projects/${projectData.id}`, { project: projectData.project }).then(response => resolve(response)).catch(error => reject(error))
      })
    },

    // 👉 Delete Project
    deleteProject(id) {
      return new Promise(async (resolve, reject) => {
        await axios.delete(`${BASE_URL}/projects/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },
  },
})
