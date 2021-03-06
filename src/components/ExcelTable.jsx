import Handsontable from "handsontable";
import "./RewriteNestedHeaders.js";

export default {
    name: "ExcelTable",
    props: {},
    data() {
        return {};
    },
    computed: {
        setting() {
            const ipValidatorRegexp = /^(?:\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b|null)$/;
            const emailValidator = function (value, callback) {
                setTimeout(function () {
                    if (/.+@.+/.test(value)) {
                        callback(true);
                    } else {
                        callback(false);
                    }
                }, 1000);
            };
            return {
                data: [
                    {
                        id: 1,
                        name: {first: 'Joe', last: 'Fabiano'},
                        ip: '0.0.0.1',
                        email: 'Joe.Fabiano@ex.com',
                        price: 25
                    },
                    {
                        id: 2,
                        name: {first: 'Fred', last: 'Wecler'},
                        ip: '0.0.0.1',
                        email: 'Fred.Wecler@ex.com',
                        price: 15
                    },
                    {
                        id: 3,
                        name: {first: 'Steve', last: 'Wilson'},
                        ip: '0.0.0.1',
                        email: 'Steve.Wilson@ex.com',
                        price: 24
                    },
                    {
                        id: 4,
                        name: {first: 'Maria', last: 'Fernandez'},
                        ip: '0.0.0.1',
                        email: 'M.Fernandez@ex.com',
                        price: 13
                    },
                    {
                        id: 5,
                        name: {first: 'Pierre', last: 'Barbault'},
                        ip: '0.0.0.1',
                        email: 'Pierre.Barbault@ex.com',
                        price: 89
                    },
                    {
                        id: 6,
                        name: {first: 'Nancy', last: 'Moore'},
                        ip: '0.0.0.1',
                        email: 'Nancy.Moore@ex.com',
                        price: 4
                    },
                    {
                        id: 7,
                        name: {first: 'Barbara', last: 'MacDonald'},
                        ip: '0.0.0.1',
                        email: 'B.MacDonald@ex.com',
                        price: 71
                    },
                    {
                        id: 8,
                        name: {first: 'Wilma', last: 'Williams'},
                        ip: '0.0.0.1',
                        email: 'Wilma.Williams@ex.com',
                        price: 30
                    },
                    {
                        id: 9,
                        name: {first: 'Sasha', last: 'Silver'},
                        ip: '0.0.0.1',
                        email: 'Sasha.Silver@ex.com',
                        price: 22
                    },
                    {
                        id: 10,
                        name: {first: 'Don', last: 'P??rignon'},
                        ip: '0.0.0.1',
                        email: 'Don.P??rignon@ex.com',
                        price: 76
                    },
                    {
                        id: 11,
                        name: {first: 'Aaron', last: 'Kinley'},
                        ip: '0.0.0.1',
                        email: 'Aaron.Kinley@ex.com',
                        price: 91
                    },
                    {id: null, name: {first: null, last: null}, ip: null, email: null, price: null}
                ],
                // ???????????????
                /*mergeCells: [
                    {row: 1, col: 1, rowspan: 3, colspan: 3},
                    {row: 3, col: 4, rowspan: 2, colspan: 2}
                ],*/
                // ????????????
                /*cell: [
                    {row: 0, col: 1, comment: {value: 'A read-only comment.', readOnly: true}},
                    {row: 0, col: 3, comment: {value: 'You can edit this comment!'}}
                ],*/
                // ????????????
                nestedHeaders: false,
                rewriteNestedHeaders: [
                    [{label: 'A', rowspan: 4}, {label: 'B', colspan: 8}, 'C'],
                    [{label: '', hidden: true}, {label: 'E', colspan: 4}, {label: 'F', colspan: 4}, 'G'],
                    [{label: '', hidden: true}, {label: 'I', colspan: 2}, {label: 'J', colspan: 2}, {label: 'K', colspan: 2}, {
                        label: 'L',
                        colspan: 2
                    }, 'M'],
                    [{label: '', hidden: true}, 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W']
                ],
                // colHeaders: ['ID', 'First name', 'Last name', 'IP', 'E-mail', 'price'],
                // ?????????????????????
                /*colHeaders: function (col, a, b, c) {
                    var txt;

                    switch (col) {
                        case 0:
                            return '<b>Bold</b> and <em>Beautiful</em>';

                        case 1:
                            txt = "Some <input type='checkbox' class='checker' ";
                            txt += 'checked="checked"';
                            txt += "> checkbox";

                            return txt;
                    }
                },*/
                rowHeaders: true,
                height: 200,
                /*beforeValidate(){
                    console.log(333)
                },
                afterValidate(isValid){
                    console.log(444)
                },
                beforeChange: function (changes, source) {
                    for (var i = changes.length - 1; i >= 0; i--) {
                        console.log(999999999999, this.getSourceDataAtRow(changes[i][0]))
                        const rowData = this.getSourceDataAtRow(changes[i][0]);
                        rowData.ip = "0.0.0.225";
                        // gently don't accept the word "foo" (remove the change at index i)
                        if (changes[i][3] === 'foo') {
                            changes.splice(i, 1);
                        }
                        // if any of pasted cells contains the word "nuke", reject the whole paste
                        else if (changes[i][3] === 'nuke') {
                            return false;
                        }
                        // capitalise first letter in column 1 and 2
                        else if ((changes[i][1] === 'name.first' || changes[i][1] === 'name.last') && (changes[i][3] && changes[i][3].charAt(0))) {
                            changes[i][3] = changes[i][3].charAt(0).toUpperCase() + changes[i][3].slice(1);
                        }
                    }
                },
                afterChange: (changes, source) => {
                    console.log(222)
                    if (source !== 'loadData') {
                        this.$refs.info.innerText = JSON.stringify(changes);
                    }
                },*/
                columns: [
                    {data: 'id', type: 'numeric'},
                    {data: 'name.first'},
                    {data: 'name.last'},
                    {data: 'ip', validator: ipValidatorRegexp, allowInvalid: true},
                    {data: 'email', validator: emailValidator, allowInvalid: false},
                    {data: 'price'}
                ],
                columnSummary: [
                    {
                        destinationRow: 0,
                        destinationColumn: 0,
                        reversedRowCoords: true,
                        type: 'count'
                    },
                    {
                        // ???????????????
                        sourceColumn: 5,
                        // ?????????????????????????????????
                        reversedRowCoords: true,
                        destinationRow: 0,
                        // ???????????????
                        destinationColumn: 1,
                        // ????????????
                        type: 'max',
                        // ????????????number
                        forceNumeric: true
                    },
                    {
                        destinationRow: 0,
                        destinationColumn: 5,
                        reversedRowCoords: true,
                        type: 'sum',
                        ranges: [
                            [0, 2], [6], [8, 9]
                        ]
                    }
                ]
            };
        }
    },
    mounted() {
        this.table = new Handsontable(this.$refs.table, this.setting);
        /*setTimeout(() => {
            const thead = this.$refs.table.querySelectorAll("thead")[1];
            console.log(thead, 333);
            const th1 = thead.querySelector("tr:nth-of-type(1) > th:nth-of-type(1)");
            const th2 = thead.querySelector("tr:nth-of-type(2) > th:nth-of-type(1)");
            th1.setAttribute("rowspan", "2");
            th1.setAttribute("style", "height: 50px;");
            console.log(th2.parentNode)
            th2.parentNode.removeChild(th2);
        }, 1000);*/


    },
    render() {
        return (
            <div>
                <div ref="table"/>
                <div ref="info"/>
            </div>
        );
    }
};