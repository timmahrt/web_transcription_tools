<template>
  <div>
    <div v-for="name in tierNameList" v-bind:key="name">
      <div>
        <input type="checkbox" :id="name" :value="name" v-model="checkedList" v-on:change="emitResults">
        <label :for="name" v-text="name"></label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      checkedList: this.tierNameList
    }
  },
  props: {
    tierNameList: {
      type: Array,
      required: true
    }
  },
  computed: {
    orderedCheckedItems: function () {
      return this.tierNameList.filter((name) => this.checkedList.includes(name))
    }
  },
  methods: {
    emitResults: function () {
      this.$emit('interface', this.orderedCheckedItems);
    }
  }
}
</script>

<style>

</style>
