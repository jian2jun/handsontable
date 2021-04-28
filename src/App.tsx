import {Vue, Component} from "vue-property-decorator";
import {namespace} from "vuex-class";
import Handsontable from "handsontable";
import "handsontable/dist/handsontable.full.css";
import "@/assets/main.css";

@Component
export default class App extends Vue{
    handsontable: any = null;
    setting: any = {
        // 语言
        language: "zh-CN", // en-US, zh-TW
        // 自动生成1000行1000列数据
        data: Handsontable.helper.createSpreadsheetData(100, 100),
        // data: Handsontable.helper.createSpreadsheetData(100, 6),
        // 表格占容器100%宽
        width: '100%',
        // 表格高320
        height: 320,
        // 显示行头
        rowHeaders: true,
        // 显示列头
        // colHeaders: true,
        // 定制列头
        // colHeaders: ['A', 'B', 'Long column header label', 'D', 'Another long label', 'E', 'F'],
        // 列头下拉菜单
        // dropdownMenu: true,
        // 定制列头下拉菜单
        dropdownMenu: [
            'remove_col',
            '---------',
            'make_read_only',
            '---------',
            'alignment'
        ],
        // 多行列头
        nestedHeaders: [
            ['A', {label: 'B', colspan: 8}, 'C'],
            ['D', {label: 'E', colspan: 4}, {label: 'F', colspan: 4}, 'G'],
            ['H', {label: 'I', colspan: 2}, {label: 'J', colspan: 2}, {label: 'K', colspan: 2}, {label: 'L', colspan: 2}, 'M'],
            ['N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W']
        ],
        // 列宽
        colWidths: 50,
        // 分别指定列宽
        // colWidths: [45, 100, 160, 60, 80, 80, 80],
        // colWidths: [null, null, 100, null, 100, null, null],
        // 行高25
        rowHeights: 25,
        // 分别指定行高
        // rowHeights: [50, 40, 100],
        // 顶部两行固定
        // fixedRowsTop: 2,
        // 底部两行固定
        // fixedRowsBottom: 2,
        // 左边两列固定
        // fixedColumnsLeft: 2,
        // 列宽可调节
        manualColumnResize: true,
        // 行高可调节
        manualRowResize: true,
        // 列可移动
        manualColumnMove: true,
        // 行可移动
        manualRowMove: true,
        // 头跟着行一起移动
        bindRowsWithHeaders: "strict",
        // 头提示
        // headerTooltips: true,
        // 头提示定制
        headerTooltips: {
            rows: false, // 行提示
            columns: true, // 列提示
            onlyTrimmed: true // 只提示被截取内容
        },
        // 环境菜单
        contextMenu: true,
        // 自定义环境菜单
        // contextMenu: ['row_above', 'row_below', 'remove_row', 'freeze_column', 'unfreeze_column'],
        // 拉伸最后一列
        // stretchH: 'last',
        // 拉伸所有列
        // stretchH: 'all',
        // 不拉伸
        // stretchH: 'none',
        // 开启列固定环境菜单，对列固定/解固操作
        // manualColumnFreeze: true,
        // 隐藏行
        /*hiddenRows: {
            rows: [3, 5, 9], // 行数
            indicators: true // 标记隐藏位置
        },*/
        // 隐藏列
        /*hiddenColumns: {
            columns: [3, 5, 9], // 列数
            indicators: true // 标记隐藏位置
        },*/
        // 截除行
        // trimRows: [1, 2, 5],
        // 没提供data的默认行数
        startRows: 10,
        // 没提供data的默认列数
        startCols: 10,
        // data后增加一个空行
        minSpareRows: 1,
        // 列排序
        // columnSorting: true,
        // 定制列排序
        columnSorting: {
            sortEmptyCells: true, // 空单元排序
            initialConfig: {
                column: 2, // 默认第三列
                sortOrder: 'asc' //desc
            }
        },
        // 列宣染的数据与类型
        /*columns: [
            { data: 'brand', columnSorting: {
                indicator: false, // 无排序标识
                headerAction: false, // 无列头行为
                compareFunctionFactory: function compareFunctionFactory(sortOrder, columnMeta) {
                    return function comparator(value, nextValue) {
                        return 0; // 不排序.
                    };
                }
            }},
            {data: 'model'},
            {data: 'maxSpeed', type: 'numeric'},
            {data: 'range', type: 'numeric'},
            {data: 'seats', type: 'numeric'},
            {data: 'price', type: 'numeric', numericFormat: {
                pattern: '$ 0,0.00',
                culture: 'en-US'
            }},
            {data: 'productionDate', type: 'date', dateFormat: 'MM/DD/YYYY', correctFormat: true, defaultDate: '01/01/1900'}
        ],*/
        // 多列排序
        // multiColumnSorting: true,
        // 定制多列排序
        /*multiColumnSorting: {
            sortEmptyCells: true, // 计算空单元
            initialConfig: [{ // 初始多列排序设置
                column: 0,
                sortOrder: 'asc'
            }, {
                column: 2,
                sortOrder: 'desc'
            }]
        }*/
        // 定制多列排序
        columns: [
            { data: 'brand', multiColumnSorting: {
                    indicator: false, // 无排序标识
                    headerAction: false, // 无列头行为
                    compareFunctionFactory: function compareFunctionFactory(sortOrder, columnMeta) {
                        return function comparator(value, nextValue) {
                            return 0; // 不排序.
                        };
                    }
                }},
            {data: 'model'}
        ],

    }
    /*
    *
    * 搜索功能1
    * */

    /*
    var data = [
        ['Tesla', 2017, 'black', 'black'],
        ['Nissan', 2018, 'blue', 'blue'],
        ['Chrysler', 2019, 'yellow', 'black'],
        ['Volvo', 2020, 'yellow', 'gray']
    ],
    example = document.getElementById('example1'),
    searchFiled = document.getElementById('search_field'),
    hot;

    hot = new Handsontable(example, {
        data: data,
        colHeaders: true,
        search: true
    });

    Handsontable.dom.addEvent(searchFiled, 'keyup', function (event) {
        var search = hot.getPlugin('search');
        var queryResult = search.query(this.value);

        console.log(queryResult);
        hot.render();
    });
    */

    $refs: any

    mounted(){
        this.handsontable = new Handsontable(this.$refs.excelTable, this.setting);
    }

    render(){
        return (
            <div ref="excelTable" />
        );
    }
}