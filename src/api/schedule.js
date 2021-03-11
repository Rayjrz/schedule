import { axios } from '@/plugins/axios'

const GET_ROOM_SCHEDULE = 'szkwdta.get_room_schedule'

export function getRoomSchedule (roomNo, startDate, endDate) {
  return axios.get(GET_ROOM_SCHEDULE, {
    params: {
      P_ROOM: roomNo,
      ...(startDate && {P_START_DATE: startDate}),
      ...(endDate && {P_END_DATE: endDate })
    }
  })
}
