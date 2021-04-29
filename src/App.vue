<template>
  <div ref="excel"></div>
</template>

<script lang="ts">
  import {Vue, Component} from "vue-property-decorator";
  import {namespace} from "vuex-class";
  import Handsontable from "handsontable";
  import "@/components/editor.jsx";

  @Component
  export default class App extends Vue{
    hot: any = null;
    $refs: any;
    mounted(){
      this.hot = new Handsontable(this.$refs.excel, {
        data: [
          {id: 1, name: 'Ted', isActive: true, color: 'orange', date: '2015-01-01'},
          {id: 2, name: 'John', isActive: false, color: 'black', date: null},
          {id: 3, name: 'Al', isActive: true, color: 'red', date: null},
          {id: 4, name: 'Ben', isActive: false, color: 'blue', date: null}
        ],
        colHeaders: true,
        colWidths: 200,
        rowHeights: 45,
        columns: [
          {data: "id", type: 'text'},
          {data: "name", editor: "InputEditor"},
          {data: "isActive", type: 'checkbox'},
          {data: "date", type: 'date', dateFormat: 'YYYY-MM-DD'},
          {
            data: "color",
            editor: "SelectEditor",
            selectOptions: ["yellow", "red", "orange", "green", "blue", "gray", "black", "white"]
          }
        ],
      });
    }
  }
</script>

<style lang="less">

</style>
