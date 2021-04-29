import Vue from "vue";
import Handsontable from "handsontable";

class InputEditor extends Handsontable.editors.BaseEditor {
    init(){
        console.log("init:", this);
    }
    prepare(...args) {
        super.prepare(...args);
    }
    setValue(newValue) {
        console.log("setValue:", this);
        const el = this.hot.rootDocument.createElement("div");
        Handsontable.dom.empty(this.TD);
        this.TD.appendChild(el);

        this.editor = new Vue({
            el,
            data: {
                value: newValue
            },
            render(){
                return (
                    /*<el-date-picker
                        ref="picker"
                        type="date"
                        placeholder="选择日期"
                        v-model={this.value}
                    />*/
                    <el-input
                        ref="current"
                        v-model={this.value}
                        placeholder="请输入内容"
                    />
                );
            }
        });

    }
    open(){
        console.log("open:", this);
    }
    focus() {
        console.log("focus:", this);
        this.editor.$refs.current.focus();
    }
    finishEditing(...args){
        super.finishEditing(...args);
        console.log("finishEditing:", this);
    }
    getValue() {
        console.log("getValue:", this.editor.value);
        return this.editor.value;
    }
    close() {
        console.log("close:", this);
        this.editor.$destroy();
    }
}

Handsontable.editors.registerEditor("InputEditor", InputEditor);



class SelectEditor extends Handsontable.editors.BaseEditor {
    init(){
        console.log("init:", this);
    }
    prepare(...args) {
        super.prepare(...args);
    }
    setValue(newValue) {
        console.log("setValue:", this);
        const el = this.hot.rootDocument.createElement("div");
        Handsontable.dom.empty(this.TD);
        this.TD.appendChild(el);
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const that = this;

        this.editor = new Vue({
            el,
            data: {
                options: this.cellProperties.selectOptions,
                value: newValue
            },
            methods: {
                change(val){
                    console.log(val, 444444444444444)
                    that.saveValue(val);
                }
            },
            render(){
                return (
                    <el-select
                        ref="current"
                        v-model={this.value}
                        placeholder="请选择"
                        onChange={this.change}
                    >
                        {this.options.map(item => {
                            return (
                                <el-option
                                    key={item}
                                    label={item}
                                    value={item}
                                />
                            );
                        })}
                    </el-select>
                );
            }
        });

    }
    open(){
        console.log("open:", this);
        setTimeout(() => {
            this.editor.$refs.current.$el.click();
        });
    }
    focus() {
        console.log("focus:", this);
    }
    finishEditing(...args){
        super.finishEditing(...args);
        console.log("finishEditing:", this);
    }
    getValue() {
        console.log("getValue:", this.editor.value);
        return this.editor.value;
    }
    close() {
        console.log("close:", this);
        setTimeout(() => {
            this.editor.$destroy();
        }, 300);

    }
}

Handsontable.editors.registerEditor("SelectEditor", SelectEditor);