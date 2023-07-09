import axios from '@axios'
import { defineStore } from 'pinia'

export const useDeviceListStore = defineStore('DeviceListStore', {
  actions: {
    // 👉 Fetch devices data
    fetchDevices(params) { return axios.post('http://localhost:8000/devices/q', {
      filter: params,
    } ) },

    // 👉 Add New Device
    addDevice(deviceData) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:8000/devices', {
          device: deviceData,
        }).then(response => resolve(response))
          .catch(error => reject(error))
      })
    },

    // 👉 Fetch single device
    fetchDevice(id) {
      return new Promise((resolve, reject) => {
        axios.get(`http://localhost:8000/devices/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },

    // 👉 Update Device
    updateDevice(deviceData) {
      return new Promise(async (resolve, reject) => {
        await axios.put(`http://localhost:8000/devices/${deviceData.id}`, { device: deviceData.device }).then(response => resolve(response)).catch(error => reject(error))
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
