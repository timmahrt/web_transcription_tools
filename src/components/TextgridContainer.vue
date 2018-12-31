<template>
  <div class="container">
    <div class="">
      List of file names: <br>
      <div v-for="name in fnNameList" v-bind:key="name" v-text="name">
      </div>
    </div>
    <div>
      Base tier: <br>
      <tier-name-list v-show="tierNameList.length > 0" :tier-name-list="tierNameList"></tier-name-list>
    </div>
  </div>
</template>

<script>
import TierNameList from './TierNameList.vue'
export default {
  name: 'TextgridContainer',
  components: {
    TierNameList
  },
  props: {
    tierNameList: {
      type: Array,
      required: true
    },
    fnNameList: {
      type: Array,
      required: true
    }
  },
  mounted () {
    console.log(this.tierNameList)
  }
}
</script>

<style>
.container {
  display: flex;
}
</style>
