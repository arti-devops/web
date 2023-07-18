import axios from '@axios'
import { BASE_URL } from '@projectConfig'
import { defineStore } from 'pinia'

export const useDeviceListStore = defineStore('DeviceListStore', {
  actions: {
    // 👉 Fetch devices data
    fetchDevices(params) { return axios.post(`${BASE_URL}/devices/q`, {
      filter: params, 
    } ) },

    // 👉 Add New Device
    addDevice(deviceData) {
      return new Promise((resolve, reject) => {
        axios.post(`${BASE_URL}/devices`, {
          device: deviceData,
        }).then(response => resolve(response))
          .catch(error => reject(error))
      })
    },

    // 👉 Fetch single device
    fetchDevice(id) {
      return new Promise((resolve, reject) => {
        axios.get(`${BASE_URL}/devices/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },

    // 👉 Update Device
    updateDevice(deviceData) {
      return new Promise(async (resolve, reject) => {
        await axios.put(`${BASE_URL}/devices/${deviceData.id}`, { device: deviceData.device }).then(response => resolve(response)).catch(error => reject(error))
      })
    },

    // 👉 Delete Device
    deleteDevice(id) {
      return new Promise(async (resolve, reject) => {
        await axios.delete(`${BASE_URL}/devices/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },
  },
})
