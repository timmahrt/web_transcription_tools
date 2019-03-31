<template>
  <div class="textgrid-processor">
    <span class="title-text">
      Textgrid Duration Extractor
    </span>
    <div class="simple-description">
      This is a tool for automatically extracting and aggregating the durations of labeled intervals in Textgrid transcripts.
    </div>
    <div class="preamble">
      <ol class="instructions">
        <li>Drop your textgrids into the box below (one at a time, or all at once).</li>
        <li>Textgrids with the same tier names will appear grouped together below (point tiers are not included in the analysis).</li>
        <li>For one group, choose a pivot tier.</li>
        <li>Optionally, you can unselect tiers that you don't want to appear in the output.</li>
        <li>
          Click "Get Durations".  This will download a .csv file with durations for each of the selected tiers.
          One row will appear for each labeled segment in your textgrid.
        </li>
        <li>The output is in the form: 'file name, pivot tier name, pivot label, pivot start time, pivot stop time, pivot duration, tier1 name, tier1  </li>
      </ol>
      <textgrid-loader
        v-on:textgrid-loaded='addTextgrid'>
      </textgrid-loader>
    </div>
    <div v-for="{tierNameList, textgridNameList, tgDict, id} in sortedTextgridSets" :key="id">
      <textgrid-container
        :tier-name-list='tierNameList'
        :fn-name-list='textgridNameList'
        :tg-dict='tgDict'>
      </textgrid-container>
    </div>
    <span>
      Don't have any .TextGrid files?  Feel free to play with these:
        <ul>
          <li><a href="./resources/bobby.TextGrid" download>bobby.TextGrid</a></li>
          <li><a href="./resources/mary.TextGrid" download>mary.TextGrid</a></li>
          <li><a href="./resources/conversation.TextGrid" download>conversation.TextGrid</a></li>
        <ul>
    </span>
    <span class="notice">
      This tool is powered by your computer.  After the page is loaded, you can go offline and continue to use the tool as long as this page remains open.
    </span>
  </div>
</template>

<script>
import TextgridContainer from './TextgridContainer.vue'
import TextgridLoader from './TextgridLoader.vue'
import { INTERVAL_TIER } from 'praatio/lib/textgrid';

export default {
  name: 'TextgridProcessor',
  data () {
    return {
      textgridSets: [],
      textgridFnList: []
    }
  },
  components: {
    TextgridContainer,
    TextgridLoader
  },
  computed: {
    sortedTextgridSets: function () {
      function compare (fn1, fn2) {
        if (fn1 < fn2) return -1;
        if (fn1 > fn2) return 1;
        return 0;
      }
      let sortedArray = [];
      for (let i = 0; i < this.textgridSets.length; i++) {
        let tierNameList = this.textgridSets[i]['tierNameList'];
        let textgridNameList = this.textgridSets[i]['textgridNameList'];
        let tgDict = this.textgridSets[i]['tgDict'];
        textgridNameList.sort(compare)
        sortedArray.push({tierNameList: tierNameList, textgridNameList: textgridNameList, tgDict: tgDict});
      }

      return sortedArray;
    }
  },
  methods: {
    listsAreEqual (listA, listB) {
      if (listA.length !== listB.length) return false;

      for (let i = 0; i < listA.length; i++) {
        if (listA[i] !== listB[i]) return false;
      }

      return true;
    },

    addTextgrid (name, tg) {
      let matchedI = 0;
      let tierNameList = tg.tierNameList.filter(function (val, i) {
        return tg.tierDict[val].tierType === INTERVAL_TIER
      });
      if (this.textgridSets.length === 0) {
        this.textgridSets.push({tierNameList: tierNameList, textgridNameList: [name], tgDict: {}});
      }
      else {
        matchedI = null;
        for (let i = 0; i < this.textgridSets.length; i++) {
          if (this.listsAreEqual(tierNameList, this.textgridSets[i]['tierNameList'])) {
            matchedI = i;
          }
        }

        if (matchedI === null) {
          this.textgridSets.push({tierNameList: tierNameList, textgridNameList: [name], tgDict: {}});
          matchedI = this.textgridSets.length - 1;
        }
        else {
          if (name in this.textgridSets[matchedI]['tgDict']) return
          this.textgridSets[matchedI]['textgridNameList'].push(name);
        }
      }
      this.textgridSets[matchedI]['tgDict'][name] = tg;
    }
  }
}
</script>

<style>
.simple-description {
  width: 500px;
  margin: 10px;
  color: grey;
}
.title-text {
  width: 100%;
  border-top: 5px solid #ebf5fe;
  border-bottom: 5px solid #ebf5fe;
  font-size: 20px;
  font-weight: 600;
  color: #101b9c;
}
.preamble {
  display: flex;
  align-items: center;
}
.instructions {
  width: 500px;
  text-align: left;
}
.instructions li {
  margin-bottom: 5px;
}
.textgrid-processor {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.displayarea {
  width: 1000px;
  height: 400px;
  border: 1px solid black;
}
.notice {
  margin-top: 5px;
}
</style>
