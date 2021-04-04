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
      <h3>{{tmp}}</h3>    
      <hr>
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
      :time-from="9 * 60"
      :time-to="20 * 60"
      :time-step="30"
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
      schedule: [],
      tmp:null
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
    //this.tmp=crc32('A301'+'MPI_TIMESCHEDULE').toString(16).toUpperCase();
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
    getCrc(){
      //return crc32('A301').toString(16).toUpperCase();
    },
    loadSchedule () {
      const roomNumber = this.$route.params.number
      if (this.$route.params.hashcode.toUpperCase() == crc32(roomNumber + "MPI_TIMESCHEDULE").toString(16).toUpperCase()){
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
  background: rgba(20, 184, 102,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.vuecal-theme {
  box-shadow: unset;
/* Green-theme. */
.vuecal__menu, .vuecal__cell-events-count {background-color: #42b983;}
.vuecal__title-bar {background-color: #e4f5ef;}
.vuecal__cell--today, .vuecal__cell--current {background-color: rgba(211, 255, 117, 0.4);}
.vuecal:not(.vuecal--day-view) .vuecal__cell--selected {background-color: rgba(235, 255, 245, 0.4);}
.vuecal__cell--selected:before {border-color: rgba(66, 185, 131, 0.5);}
/* Cells and buttons get highlighted when an event is dragged over it. */
.vuecal__cell--highlighted:not(.vuecal__cell--has-splits),
.vuecal__cell-split--highlighted {background-color: rgba(195, 255, 225, 0.5);}
.vuecal__arrow.vuecal__arrow--highlighted,
.vuecal__view-btn.vuecal__view-btn--highlighted {background-color: rgba(136, 236, 191, 0.25);}
              
}
</style>
