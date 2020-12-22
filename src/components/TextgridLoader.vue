<template>
    <div class="dropzone" id="dropzone">
      Drop textgrid files here
    </div>
</template>

<script>
import { parseTextgrid } from 'praatio/lib/textgrid_io';
export default {
  mounted () {
    let dropzone = document.getElementById('dropzone');
    dropzone.ondrop = this.onDrop;
    dropzone.ondragover = this.onDragover;
    dropzone.ondragleave = this.onDragleave;
  },

  methods: {
    loadFromLocal (file, handler) {
      let reader = new FileReader();
      console.log(reader)
      reader.onload = function (fd) {
        console.log(file)
        console.log(fd)
        let data = fd.target.result;
        handler(file, data);
      };
      reader.readAsText(file);
    },

    onDrop (event) {
      event.preventDefault();
      this.className = 'dropzone';

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
    },

    tgLoaded (file, data) {
      let tg = parseTextgrid(data);
      this.$emit('textgrid-loaded', file.name, tg)
    }
  }
}
</script>

<style>
.dropzone {
    height: 100px;
    width: 200px;
    border: 3px dashed black;
    background-color: #c5d4ef;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 16px;
}
</style>
