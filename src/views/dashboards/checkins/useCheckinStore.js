import { readUserData } from '@/plugins/helpers'
import axios from '@axios' 
import { BASE_URL } from '@projectConfig'
import { defineStore } from 'pinia'

export const useCheckinStore = defineStore('CheckinStore', {
  actions: {
    // 👉 Fetch users data
    fetchCheckin(selectedDate) { return axios.get(`${BASE_URL}/dashboard/checkins/${selectedDate}`,
      { 
        headers: { "X-Filter": readUserData().direction },
      },
    ) },
  },
})
