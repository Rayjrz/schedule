<template>
  <a-layout>
  <!-- a-row :gutter="[16, 16]" type="flex" justify="space-between">
    <a-col>
      <a-button-group>
        <a-button>&lt;</a-button>
        <a-button>&gt;</a-button>
      </a-button-group>
    </a-col>
    <a-col>
      <a-button-group>
        <a-button>Week</a-button>
        <a-button>Day</a-button>
      </a-button-group>
    </a-col>
  </a-row -->

  <a-card>
    <div class="loading-overlay" v-if="loading">
      <a-spin v-if="!errorLoading"/>
      <div v-else>
        <p>Failed To Load</p>
        <a-button @click="loadSchedule">Try Again</a-button>
      </div>
    </div>
    <vue-cal 
      class="vuecal-theme"
      style="margin: -24px"
      :disable-views="['years', 'year', 'month']"
      @view-change="onCalendarViewChange"
      :events="events"/>
  </a-card>

  </a-layout>
</template>

<script>
import { getRoomSchedule } from '@/api/schedule'
import { mapMutations } from 'vuex'
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import moment from 'moment'
import crc32 from 'crc/crc32';


export default {
  data () {
    return {
      loading: true,
      errorLoading: false,
      filter: null,
      schedule: []
    }
  },
  components: {
    VueCal
  },
  watch: {
    '$route': function () {
      this.loadSchedule()
    },
    'filter': function () {
      this.loadSchedule()
    }
  },
  computed: {
    events () {
      return this.schedule.map((event) => {
        return {
          start: this.getNormalDateTime(event.meeting_date, event.start_time),
          end: this.getNormalDateTime(event.meeting_date, event.end_time),
          title: event.course_ename
        }
      })
    }
  },
  mounted () {
    this.loadSchedule()
  },
  methods: {
    onCalendarViewChange(evt) {
      this.filter = {
        startDate: moment(evt.startDate).format('YYYY-MM-DD'),
        endDate: moment(evt.endDate).format('YYYY-MM-DD')
      } 
    },
    getNormalDateTime (date, time) {
      return moment(`${date} ${time}`, 'DD-MMM-YYYY HHmm').toDate()
    },
    ...mapMutations([
      'setRoom'
    ]),
    loadSchedule () {
      const roomNumber = this.$route.params.number
      if (this.$route.params.hashcode.toString(16).toUpperCase() == crc32(roomNumber).toString(16).toUpperCase()){
      this.setRoom(roomNumber)
      this.loading = true
      this.errorLoading = false
      return getRoomSchedule(roomNumber, this.filter?.startDate, this.filter?.endDate).then(({data}) => {
        this.schedule = data
        this.loading = false
      }).catch(() => {
        this.errorLoading = true
      })
    }
    else{this.errorLoading = true}
  }
  }
}
</script>

<style lang="scss">
.loading-overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.vuecal-theme {
  box-shadow: unset;
    .vuecal__menu, .vuecal__cell-events-count {background-color: #fff; }
      .vuecal__menu li.active {background-color: #fff;}
        .vuecal__title, .vuecal__title-bar {background-color: #fff;}
          .vuecal__cell.today, .vuecal__cell.current {background-color: rgba(240, 240, 255, 0.4);}
            &:not(.vuecal--day-view) .vuecal__cell.selected {background-color: rgba(255, 236, 202, 0.4);}
              .vuecal__cell.selected:before {border-color: rgba(235, 216, 182, 0.5);}
              
}
</style>
