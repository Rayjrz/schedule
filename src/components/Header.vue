<template>
    <a-layout-header style="background: #fff; padding: 0">
      <a-page-header :title="room ? room : 'Select Room'">
        <template #subTitle>
          <a-cascader :options="roomList" @change="onRoomChange">
            <a href="#">Change Room</a>
          </a-cascader>
        </template>
      </a-page-header>
    </a-layout-header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      roomList: [
        {
          value: 'MT',
          label: 'MengTak Building',
          children: [
            {
              value: 'M504',
              label: 'M504'
            }
          ]
        },
        {
          value: 'CU',
          label: 'Chi Un Building',
          children: [
            {
              value: 'A202',
              label: 'A202'
            },
            {
              value: 'A203',
              label: 'A203'
            },
            {
              value: 'A213',
              label: 'A213'
            }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapState([
      'room'
    ])
  },
  methods: {
    onRoomChange (selected) {
      const roomNumber = selected[selected.length - 1]

      this.$router.push({
        name: 'room-schedule',
        params: {
          number: roomNumber
        }
      })
    }
  }
}
</script>
