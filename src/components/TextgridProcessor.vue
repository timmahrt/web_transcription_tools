<template>
  <div>
    <div class="dropzone" id="dropzone">
      Drop textgrid files here
    </div>
    <div v-show="tierNameList.length > 0">
      <textgrid-container :tier-name-list="tierNameList" :fn-name-list="textgridFnList"></textgrid-container>
      <div class="displayarea" id="displayarea">
      </div>
    </div>
  </div>
</template>

<script>
import TextgridContainer from './TextgridContainer.vue'
import {textgridToCsv} from 'praatio/textgrid.js'
import readTextgrid from 'praatio/textgrid_io.js'
export default {
  name: 'TextgridProcessor',
  data () {
    return {
      tierNameList: [],
      textgridFnList: []
    }
  },
  components: {
    TextgridContainer
  },
  methods: {
    loadFromLocal (file, handler) {
      let reader = new FileReader();
      reader.onload = function (fd) {
        let data = fd.target.result;
        handler(file, data);
      };
      reader.readAsText(file);
    },

    tgLoaded (file, data) {
      // let outputFn = file.name.split('.')[0] + '.csv';
      let tg = readTextgrid(data);
      this.tierNameList = tg.tierNameList;
      let csv = textgridToCsv(tg, 'Vowel', ['Word', 'Vowel', 'Syllableid', 'Stress', 'Error']);
      document.getElementById('displayarea').innerText = csv;
      // download(csv, outputFn, 'text/plain');
    },

    download (content, fileName, contentType) {
      // https://stackoverflow.com/questions/34156282/how-do-i-save-json-to-local-text-file
      var a = document.createElement('a');
      var file = new Blob([content], {type: contentType});
      a.href = URL.createObjectURL(file);
      a.download = fileName;
      a.click();
    },

    onDrop (event) {
      event.preventDefault();
      this.className = 'dropzone';

      // var fileInput = document.getElementById('dropzone');
      // var fileDisplayArea = document.getElementById('displayarea');

      var files = event.dataTransfer.files;

      this.textgridFnList = [];
      for (var i = 0; i < files.length; i++) {
        var name = files[i].name;
        this.textgridFnList.push(name);

        if (name.toLowerCase().includes('.textgrid')) {
          this.loadFromLocal(files[i], this.tgLoaded)
        }
      }
    },

    onDragover () {
      this.className = 'dropzone dragover';
      return false;
    },

    onDragleave () {
      this.className = 'dropzone';
      return false;
    }
  },
  mounted () {
    let dropzone = document.getElementById('dropzone');
    dropzone.ondrop = this.onDrop;
    console.log(dropzone);
    console.log('ready!');
    dropzone.ondragover = this.onDragover;
    dropzone.ondragleave = this.onDragleave;
  }
}
</script>

<style>
.dropzone {
    height: 100px;
    width: 200px;
    border: 1px solid black;
}

.displayarea {
    width: 1000px;
    height: 400px;
    border: 1px solid black;
}
</style>
