import axios from '@axios'
import { BASE_URL } from '@projectConfig'
import { defineStore } from 'pinia'

export const useCheckinStore = defineStore('CheckinStore', {
  actions: {
    // 👉 Fetch users data
    fetchCheckin(sdate, edate) { return axios.get(`${BASE_URL}/logs/mlc/${sdate}:${edate}`) },

    fetchDailyLog(ddate) {return axios.get(`${BASE_URL}/logs/dailylog/${ddate}`) },
  },


})
