<template>
  <div id="example"></div>
</template>

<script lang="ts">
  import {Vue, Component} from "vue-property-decorator";
  import Handsontable from "handsontable";
  import "handsontable/dist/handsontable.full.css";

  @Component
  export default class App extends Vue{
    hot!: Handsontable;
    mounted(){
      /*const container: any = document.getElementById("example");
      this.hot = new Handsontable(container, {
        data: [
          ['', 'Ford', 'Tesla', 'Toyota', 'Honda'],
          ['2017', 10, 11, 12, 13],
          ['2018', 20, 11, 14, 13],
          ['2019', 30, 15, 12, 13]
        ],
        rowHeaders: true, //显示行头
        colHeaders: true, //显示列头
        minSpareRows: 1, // data后增加一个空行
        startRows: 10, //没提供data的默认行数
        startCols: 10, //没提供data的默认列数
      });
      this.hot.setDataAtCell(0, 0, 'aaaaaaaaaaaaaaa');*/

      /*let
              container: any = document.getElementById('example'),
              hot6;

      hot6 = new Handsontable(container, {
        data: [],
        dataSchema: {id: null, name: {first: null, last: null}, address: null},
        startRows: 5,
        startCols: 4,
        colHeaders: ['ID', 'First Name', 'Last Name', 'Address'],
        columns: [
          {data: 'id'},
          {data: 'name.first'},
          {data: 'name.last'},
          {data: 'address'}
        ],
        minSpareRows: 1
      });*/

      var
              nestedObjects = [
                {id: 1, name: {first: "Ted", last: "Right"}, address: ""},
                {id: 2, address: ""}, // HOT will create missing properties on demand
                {id: 3, name: {first: "Joan", last: "Well"}, address: ""}
              ],
              container5: any = document.getElementById('example'),
              hot5;

      hot5 = new Handsontable(container5, {
        data: nestedObjects,
        colHeaders: true,
        columns: [
          {data: 'id'},
          {data: 'name.first'},
          {data: 'name.last'},
          {data: 'address'}
        ],
        minSpareRows: 1
      });
    }
  }
</script>

<style lang="less">

</style>
