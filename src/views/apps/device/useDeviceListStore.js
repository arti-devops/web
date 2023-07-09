import axios from '@axios'
import { defineStore } from 'pinia'

export const useDeviceListStore = defineStore('DeviceListStore', {
  actions: {
    // 👉 Fetch devices data
    fetchDevices(params) { return axios.post('http://localhost:8000/devices/search', {
      filter: params,
    } ) },

    // 👉 Search devices data
    searchDevices(payload) { return axios.get('/apps/devices/list', { filter: payload }) },

    // 👉 Add Device
    addDevice(deviceData) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:8000/devices', {
          device: deviceData,
        }).then(response => resolve(response))
          .catch(error => reject(error))
      })
    },

    // 👉 fetch single device
    fetchDevice(id) {
      return new Promise((resolve, reject) => {
        axios.get(`/apps/devices/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },

    // 👉 Delete Device
    deleteDevice(id) {
      return new Promise(async (resolve, reject) => {
        await axios.delete(`http://localhost:8000/devices/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },
  },
})
