<template>
  <div>
    <input type="checkbox" :checked='checked'>
    <span v-text="tierName"></span>
  </div>
</template>

<script>
export default {
  props: {
    tierName: {
      type: String,
      required: true
    },
    checked: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style>

</style>
