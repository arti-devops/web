import axios from '@axios'
import { defineStore } from 'pinia'

export const useDeviceListStore = defineStore('DeviceListStore', {
  actions: {
    // 👉 Fetch devices data
    fetchDevices(params) { return axios.post('http://localhost:8000/devices/search', {
      q: params.q,
      brand: params.brand,
      status: params.status,
      options: params.options,
    } ) },

    // 👉 Search devices data
    searchDevices(payload) { return axios.get('/apps/devices/list', { filter: payload }) },

    // 👉 Add Device
    addDevice(deviceData) {
      return new Promise((resolve, reject) => {
        axios.post('/apps/devices/device', {
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
      return new Promise((resolve, reject) => {
        axios.delete(`http://localhost:8000/devices/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },
  },
})
