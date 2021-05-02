import Handsontable from "handsontable";

export default {
    name: "ExcelTable",
    props: {},
    data(){
        return {};
    },
    computed: {
        setting(){
            const ipValidatorRegexp = /^(?:\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b|null)$/;
            const emailValidator = function (value, callback) {
                setTimeout(function(){
                    if (/.+@.+/.test(value)) {
                        callback(true);
                    }
                    else {
                        callback(false);
                    }
                }, 1000);
            };
            return {
                data: [
                    {id: 1, name: {first: 'Joe', last: 'Fabiano'}, ip: '0.0.0.1', email: 'Joe.Fabiano@ex.com', price: 25},
                    {id: 2, name: {first: 'Fred', last: 'Wecler'}, ip: '0.0.0.1', email: 'Fred.Wecler@ex.com', price: 15},
                    {id: 3, name: {first: 'Steve', last: 'Wilson'}, ip: '0.0.0.1', email: 'Steve.Wilson@ex.com', price: 24},
                    {id: 4, name: {first: 'Maria', last: 'Fernandez'}, ip: '0.0.0.1', email: 'M.Fernandez@ex.com', price: 13},
                    {id: 5, name: {first: 'Pierre', last: 'Barbault'}, ip: '0.0.0.1', email: 'Pierre.Barbault@ex.com', price: 89},
                    {id: 6, name: {first: 'Nancy', last: 'Moore'}, ip: '0.0.0.1', email: 'Nancy.Moore@ex.com', price: 4},
                    {id: 7, name: {first: 'Barbara', last: 'MacDonald'}, ip: '0.0.0.1', email: 'B.MacDonald@ex.com', price: 71},
                    {id: 8, name: {first: 'Wilma', last: 'Williams'}, ip: '0.0.0.1', email: 'Wilma.Williams@ex.com', price: 30},
                    {id: 9, name: {first: 'Sasha', last: 'Silver'}, ip: '0.0.0.1', email: 'Sasha.Silver@ex.com', price: 22},
                    {id: 10, name: {first: 'Don', last: 'Pérignon'}, ip: '0.0.0.1', email: 'Don.Pérignon@ex.com', price: 76},
                    {id: 11, name: {first: 'Aaron', last: 'Kinley'}, ip: '0.0.0.1', email: 'Aaron.Kinley@ex.com', price: 91},
                    {id: null, name: {first: null, last: null}, ip: null, email: null, price: null}
                ],
                beforeValidate(){
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
                },
                colHeaders: ['ID', 'First name', 'Last name', 'IP', 'E-mail', 'price'],
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
                        // 指定计算列
                        sourceColumn: 5,
                        // 指定结果行，从下往上数
                        reversedRowCoords: true,
                        destinationRow: 0,
                        // 指定结果列
                        destinationColumn: 1,
                        // 求最大值
                        type: 'max',
                        // 值强制转number
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
    mounted(){
        this.table = new Handsontable(this.$refs.table, this.setting);
    },
    render(){
        return (
            <div>
                <div ref="table" />
                <div ref="info" />
            </div>
        );
    }
};