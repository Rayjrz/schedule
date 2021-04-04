<template>
    <a-layout-header style="background: #f2f2f2; padding: 0">
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
import crc32 from 'crc/crc32';

export default {
  data () {
    return {
      roomList: [

        {
          value: 'A',
          label: 'Chi Un Building - Wing A',
          children: [
            {
  value: 'A106',
  label: 'A106'
},
{
  value: 'A107',
  label: 'A107'
},
{
  value: 'A108',
  label: 'A108'
},
{
  value: 'A110',
  label: 'A110'
},
{
  value: 'A111',
  label: 'A111'
},
{
  value: 'A112',
  label: 'A112'
},
{
  value: 'A113',
  label: 'A113'
},
{
  value: 'A114',
  label: 'A114'
},
{
  value: 'A115',
  label: 'A115'
},
{
  value: 'A116',
  label: 'A116'
},
{
  value: 'A202',
  label: 'A202'
},
{
  value: 'A203',
  label: 'A203'
},
{
  value: 'A205',
  label: 'A205'
},
{
  value: 'A206',
  label: 'A206'
},
{
  value: 'A207',
  label: 'A207'
},
{
  value: 'A210',
  label: 'A210'
},
{
  value: 'A211',
  label: 'A211'
},
{
  value: 'A212',
  label: 'A212'
},
{
  value: 'A214',
  label: 'A214'
},
{
  value: 'A215',
  label: 'A215'
},
{
  value: 'A216',
  label: 'A216'
},
{
  value: 'A301',
  label: 'A301'
},
{
  value: 'A302',
  label: 'A302'
},
{
  value: 'A306',
  label: 'A306'
},
{
  value: 'A307',
  label: 'A307'
},
{
  value: 'A309',
  label: 'A309'
},
{
  value: 'A310',
  label: 'A310'
},
{
  value: 'A311',
  label: 'A311'
},
{
  value: 'A312',
  label: 'A312'
},
{
  value: 'A315',
  label: 'A315'
},
{
  value: 'A316',
  label: 'A316'
},
{
  value: 'A317',
  label: 'A317'
},
{
  value: 'A318',
  label: 'A318'
},
{
  value: 'A321',
  label: 'A321'
},
]},

{
          value: 'B',
          label: 'Chi Un Building - Wing B',
          children: [
          {
  value: 'B103',
  label: 'B103'
},
{
  value: 'B105',
  label: 'B105'
},
{
  value: 'B107',
  label: 'B107'
},
{
  value: 'B108',
  label: 'B108'
},
{
  value: 'B301',
  label: 'B301'
},
{
  value: 'B302',
  label: 'B302'
},
{
  value: 'B303',
  label: 'B303'
},
{
  value: 'B304',
  label: 'B304'
},
{
  value: 'B305',
  label: 'B305'
},
{
  value: 'B306',
  label: 'B306'
},
{
  value: 'B307',
  label: 'B307'
},
{
  value: 'B308',
  label: 'B308'
},
{
  value: 'B309',
  label: 'B309'
},
          ]},
{
          value: 'M',
          label: 'Meng Tak Building',
          children: [
            {
  value: 'M603',
  label: 'M603'
},
{
  value: 'M604',
  label: 'M604'
},
{
  value: 'M607',
  label: 'M607'
},
{
  value: 'M608',
  label: 'M608'
},
{
  value: 'M609',
  label: 'M609'
},
{
  value: 'M610',
  label: 'M610'
},
{
  value: 'M611',
  label: 'M611'
},
{
  value: 'M612',
  label: 'M612'
},
{
  value: 'M613',
  label: 'M613'
},
{
  value: 'M614',
  label: 'M614'
},
{
  value: 'M718',
  label: 'M718'
},
{
  value: 'M719',
  label: 'M719'
},
{
  value: 'M720',
  label: 'M720'
},
{
  value: 'M722',
  label: 'M722'
},
{
  value: 'M723',
  label: 'M723'
},
{
  value: 'M724',
  label: 'M724'
},
{
  value: 'M802',
  label: 'M802'
},
{
  value: 'M806',
  label: 'M806'
},
{
  value: 'M808',
  label: 'M808'
},
{
  value: 'M809',
  label: 'M809'
},
{
  value: 'M810',
  label: 'M810'
},
{
  value: 'M811',
  label: 'M811'
},
          ]
        },
        {
          value: 'N',
          label: 'Wui Chi Building',
          children: [          {
  value: 'N_54',
  label: 'N_54'
},
                    ]
        },
        {
          value: 'P',
          label: 'MPI Multi-sport Pavilion',
          children: [{

  value: 'P103',
  label: 'P103'
},
{
  value: 'P104',
  label: 'P104'
},
{
  value: 'P105',
  label: 'P105'
},
{
  value: 'P117',
  label: 'P117'
},
{
  value: 'P118',
  label: 'P118'
},
{
  value: 'P119',
  label: 'P119'
},


          ]},

                  {
          value: 'R',
          label: 'Research and Development Building, Taipa Campus',
          children: [
          {
  value: 'R1F05',
  label: 'R1F05'
},
{
  value: 'R3F01',
  label: 'R3F01'
},
{
  value: 'R3F03',
  label: 'R3F03'
},
{
  value: 'R3F04',
  label: 'R3F04'
},
{
  value: 'R3F05',
  label: 'R3F05'
},
{
  value: 'R3F06',
  label: 'R3F06'
},
{
  value: 'R3F07',
  label: 'R3F07'
},
{
  value: 'R3F08',
  label: 'R3F08'
},
{
  value: 'R3F09',
  label: 'R3F09'
},
{
  value: 'R4F01',
  label: 'R4F01'
},
{
  value: 'R4F02a',
  label: 'R4F02a'
},
{
  value: 'R4F02',
  label: 'R4F02'
},
{
  value: 'R4F03',
  label: 'R4F03'
},
{
  value: 'R4F04',
  label: 'R4F04'
},
{
  value: 'R4F05a',
  label: 'R4F05a'
},
{
  value: 'R4F10',
  label: 'R4F10'
},
{
  value: 'R4F11a',
  label: 'R4F11a'
},
{
  value: 'R4F12a',
  label: 'R4F12a'
},
{
  value: 'RGF01',
  label: 'RGF01'
},
{
  value: 'RGF02',
  label: 'RGF02'
},
{
  value: 'RGF03',
  label: 'RGF03'
},
{
  value: 'RLG101',
  label: 'RLG101'
},
{
  value: 'RLG102',
  label: 'RLG102'
},
{
  value: 'RLG103',
  label: 'RLG103'
},
{
  value: 'RLG104',
  label: 'RLG104'
},
{
  value: 'RLG107',
  label: 'RLG107'
},
{
  value: 'RLG109',
  label: 'RLG109'
},
{
  value: 'RLG110',
  label: 'RLG110'
},
{
  value: 'RLG304',
  label: 'RLG304'
},
{
  value: 'RLG305',
  label: 'RLG305'
},
{
  value: 'RLG306',
  label: 'RLG306'
},
{
  value: 'RLG307b',
  label: 'RLG307b'
},
{
  value: 'RLG307',
  label: 'RLG307'
},
{
  value: 'RLG309b',
  label: 'RLG309b'
},
{
  value: 'RLG309',
  label: 'RLG309'
},

          ]},
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
      const hashcrc = crc32(roomNumber + "MPI_TIMESCHEDULE").toString(16).toUpperCase()

      this.$router.push({
        name: 'room-schedule',
        params: {
          number: roomNumber,
          hashcode: hashcrc
        }
      })
    }
  }
}
</script>
