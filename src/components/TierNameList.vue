<template>
  <div>
    <div v-for="name in tierNameList" v-bind:key="name">
      <tier-name-row :tierName="name" :checked="true"></tier-name-row>
    </div>
  </div>
</template>

<script>
import TierNameRow from './TierNameRow.vue'
export default {
  components: {
    TierNameRow
  },
  data () {
    return {
    }
  },
  props: {
    tierNameList: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>

</style>
