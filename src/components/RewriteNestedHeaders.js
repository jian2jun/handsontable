import Handsontable from "handsontable";
const { plugins, dom, helper } = Handsontable;
const {removeClass, addClass, empty, fastInnerHTML} = dom;
const { objectEach, rangeEach } = helper;

class RewriteNestedHeaders extends plugins.NestedHeaders{

    isEnabled() {
        return !!this.hot.getSettings().rewriteNestedHeaders;
    }

    enablePlugin() {
        if (this.enabled) {
            return;
        }

        this.settings = this.hot.getSettings().rewriteNestedHeaders;

        this.addHook("afterGetColumnHeaderRenderers", array => this.onAfterGetColumnHeaderRenderers(array));
        this.addHook("afterInit", () => this.onAfterInit());
        this.addHook("afterOnCellMouseDown", (event, coords) => this.onAfterOnCellMouseDown(event, coords));
        this.addHook("beforeOnCellMouseOver", (event, coords, TD, blockCalculations) => this.onBeforeOnCellMouseOver(event, coords, TD, blockCalculations));
        this.addHook("afterViewportColumnCalculatorOverride", calc => this.onAfterViewportColumnCalculatorOverride(calc));
        this.addHook("modifyColWidth", (width, column) => this.onModifyColWidth(width, column));

        this.setupColspanArray();
        this.checkForFixedColumnsCollision();

        this.columnHeaderLevelCount = this.hot.view ? this.hot.view.wt.getSetting("columnHeaders").length : 0;

        super.enablePlugin();
    }

    setupColspanArray() {
        function checkIfExists(array, index) {
            if (!array[index]) {
                array[index] = [];
            }
        }

        objectEach(this.settings, (levelValues, level) => {
            objectEach(levelValues, (val, col, levelValue) => {
                checkIfExists(this.colspanArray, level);

                if(typeof levelValue[col] !== "object" ){
                    this.colspanArray[level].push({
                        label: levelValue[col] || "",
                        colspan: 1,
                        rowspan: 1,
                        hidden: false
                    });
                } else {
                    const colspan = levelValue[col].colspan || 1;
                    this.colspanArray[level].push({
                        label: levelValue[col].label || "",
                        colspan,
                        rowspan: levelValue[col].rowspan || 1,
                        hidden: levelValue[col].hidden || false
                    });
                    if(colspan > 1){
                        this.fillColspanArrayWithDummies(colspan, level);
                    }
                }
            });
        });
    }

    fillColspanArrayWithDummies(colspan, level) {
        rangeEach(0, colspan - 2, () => {
            this.colspanArray[level].push({
                label: "",
                colspan: 1,
                rowspan: 1,
                hidden: true,
            });
        });
    }

    fillTheRemainingColspans() {
        objectEach(this.settings, (levelValue, level) => {
            rangeEach(this.colspanArray[level].length - 1, this.hot.countCols() - 1, (col) => {
                this.colspanArray[level].push({
                    label: levelValue[col] || "",
                    colspan: 1,
                    rowspan: 1,
                    hidden: false
                });
            }, true);
        });
    }

    getNestedParent(level, column) {
        if (level < 0) {
            return false;
        }

        const colspan = this.colspanArray[level][column] ? this.colspanArray[level][column].colspan : 1;
        const hidden = this.colspanArray[level][column] ? this.colspanArray[level][column].hidden : false;

        if (colspan > 1 || (colspan === 1 && hidden === false)) {
            return column;

        }
        let parentCol = column - 1;

        do {
            if(parentCol < 0 ){
                parentCol = 0;
                break;
            }

            if (this.colspanArray[level][parentCol].colspan > 1) {
                break;
            }

            parentCol -= 1;
        } while (column >= 0);

        return parentCol;
    }

    headerRendererFactory(headerRow) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const _this = this;

        return function(index, TH) {
            const { rootDocument } = _this.hot;
            TH.removeAttribute('colspan');
            removeClass(TH, 'hiddenHeader');

            // header row is the index of header row counting from the top (=> positive values)
            if (_this.colspanArray[headerRow][index] && _this.colspanArray[headerRow][index].colspan) {
                const colspan = _this.colspanArray[headerRow][index].colspan;
                const fixedColumnsLeft = _this.hot.getSettings().fixedColumnsLeft || 0;
                const { leftOverlay, topLeftCornerOverlay } = _this.hot.view.wt.wtOverlays;
                const isInTopLeftCornerOverlay = topLeftCornerOverlay ? topLeftCornerOverlay.clone.wtTable.THEAD.contains(TH) : false;
                const isInLeftOverlay = leftOverlay ? leftOverlay.clone.wtTable.THEAD.contains(TH) : false;

                if (colspan > 1) {
                    TH.setAttribute('colspan', isInTopLeftCornerOverlay || isInLeftOverlay ? Math.min(colspan, fixedColumnsLeft - index) : colspan);
                }

                if (isInTopLeftCornerOverlay || isInLeftOverlay && index === fixedColumnsLeft - 1) {
                    addClass(TH, 'overlayEdge');
                }
            }

            if(_this.colspanArray[headerRow][index] && _this.colspanArray[headerRow][index].rowspan){
                const rowspan = _this.colspanArray[headerRow][index].rowspan;
                if(rowspan > 1){
                    TH.setAttribute('rowspan', rowspan);
                }
            }

            if (_this.colspanArray[headerRow][index] && _this.colspanArray[headerRow][index].hidden) {
                addClass(TH, 'hiddenHeader');
            }

            empty(TH);

            const divEl = rootDocument.createElement('DIV');
            addClass(divEl, 'relative');
            const spanEl = rootDocument.createElement('SPAN');
            addClass(spanEl, 'colHeader');

            fastInnerHTML(spanEl, _this.colspanArray[headerRow][index] ? _this.colspanArray[headerRow][index].label || '' : '');

            divEl.appendChild(spanEl);

            TH.appendChild(divEl);

            _this.hot.runHooks('afterGetColHeader', index, TH);
        };
    }

}

plugins.registerPlugin("rewriteNestedHeaders", RewriteNestedHeaders);