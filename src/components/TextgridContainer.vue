<template>
  <div class="container">
    <div class="column file-name-column">
      <div class="table-column-header">List of file names:</div>
      <div class="table-column-content">
        <div v-for="name in fnNameList" v-bind:key="name" v-text="name">
        </div>
      </div>
    </div>
    <div class="column tier-selection-column">
      <div class="table-column-header">Base tier:</div>
      <div class="table-column-content">
        <tier-name-list v-show="tierNameList.length > 0" :tier-name-list="tierNameList" @interface="updateSelectedTiers">
        </tier-name-list>
      </div>
    </div>
    <div class="column pivot-tier-selection-column">
      <div class="table-column-header">Pivot tier:</div>
      <select v-model="pivotTier">
        <option v-for="name in tierNameList" :name="name" v-bind:key="name">
          <span v-text="name"></span>
        </option>
      </select>
    </div>
    <div class="column">
      <input v-model="fileName" :placeholder="defaultFileName" class="filename-textbox">
      <button
        class='download-button'
        v-on:click="download()">
        Download CSV
      </button>
    </div>
  </div>
</template>

<script>
import TierNameList from './TierNameList.vue'
import { serializeTextgridToCsv } from 'praatio/lib/textgrid_io';
export default {
  name: 'TextgridContainer',
  data () {
    return {
      defaultFileName: 'auto-extracted_durations.csv',
      fileName: 'auto-extracted_durations.csv',
      contentType: 'text/plain',
      pivotTier: this.tierNameList.length > 0 ? this.tierNameList[0] : '',
      selectedTiers: this.tierNameList
    }
  },
  computed: {
    saveFileName: function () {
      return this.fileName !== '' ? this.fileName : this.defaultFileName
    }
  },
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
    },
    tgDict: {
      type: Object,
      required: true
    }
  },
  methods: {
    updateSelectedTiers (newSelectedTiers) {
      this.selectedTiers = newSelectedTiers
    },
    download () {
      let outputTexts = [];
      let printHeader = true;
      for (let i = 0; i < this.fnNameList.length; i++) {
        let fnName = this.fnNameList[i];
        let a = serializeTextgridToCsv(this.tgDict[fnName], this.pivotTier, this.selectedTiers, printHeader);
        printHeader = false;
        if (a.length > 0) {
          a = fnName + ',' + a;
          a = a.replace(/(\n)+/g, '\n' + fnName + ',');
          outputTexts.push(a);
        }
      }

      let outputTxt = outputTexts.join('\n');

      // https://stackoverflow.com/questions/34156282/how-do-i-save-json-to-local-text-file
      var a = document.createElement('a');
      var file = new Blob([outputTxt], {type: this.contentType});
      a.href = URL.createObjectURL(file);
      a.download = this.saveFileName;
      a.click();
    }
  }
}
</script>

<style>
.container {
  display: flex;
  border: 2px solid #6885b7;
  padding: 12px;
  margin: 12px;
  border-radius: 36px;
  min-width: 720px;
}
.column {
  margin: 20px;
}
.table-column-header {
  font-weight: 600;
  margin-bottom: 5px;
}
.table-column-content {
  text-align: left;
}

.filename-textbox {
  margin-top: 25px;
  display: block;
  width: 180px;
}
.download-button {
  height: 30px;
  width: auto;
  margin: 25px;
  border-radius: 5px;
  background-color: #F0F0F0;
  border: 1px solid black;
}
.download-button:hover {
  background-color: #6d98e6
}
.download-button:active {
  background-color: #B0B0B0;
}
</style>
