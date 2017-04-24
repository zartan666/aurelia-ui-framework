var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "../../utils/ui-event", "../../data/ui-data-source", "lodash"], function (require, exports, aurelia_framework_1, ui_event_1, ui_data_source_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIDgCell = (function () {
        function UIDgCell(element, container, compiler) {
            this.element = element;
            this.container = container;
            this.compiler = compiler;
        }
        UIDgCell.prototype.attached = function () {
            if (this.element.innerHTML)
                return;
            var template = '';
            if (this.type == 'subview') {
                if (isFunction(this.parent.subview))
                    template = this.parent.subview({ record: this.record });
                else
                    template = this.parent.subview;
            }
            else if (this.col.type == 'normal')
                template = "<div><span class=\"${col.class}\" innerhtml.bind='col.getValue(record[col.dataId],record)'></span></div>";
            else if (this.col.type == 'glyph')
                template = "<div title.bind=\"col.getTooltip(record[col.dataId],record)\">\n        <ui-glyph class=\"${col.class} ${col.getGlyph(record[col.dataId],record)}\" glyph.bind=\"col.getGlyph(record[col.dataId],record)\"></ui-glyph>\n        </div>";
            else if (this.col.type == 'link')
                template = "<div>\n        <a class=\"ui-link ${col.class} ${col.isDisabled(record[col.dataId],record)?'ui-disabled':''}\" click.trigger=\"col.fireClick($event,record[col.dataId],record)\">\n          <ui-glyph glyph.bind=\"col.getGlyph(record[col.dataId],record)\" if.bind=\"col.glyph\"></ui-glyph>\n          <span innerhtml.bind=\"col.getLabel(record[col.dataId],record)\"></span>\n        </a>\n        </div>";
            else if (this.col.type == 'button')
                template = "<div class=\"btn-fix\">\n        <ui-button click.trigger=\"col.fireClick($event,record[col.dataId],record)\" theme.bind=\"col.getTheme(record[col.dataId],record)\" small square glyph.bind=\"col.getGlyph(record[col.dataId],record)\" disabled.bind=\"col.isDisabled(record[col.dataId],record)\" dropdown.bind=\"col.dropdown\" menuopen.trigger=\"col.fireMenuOpen($event, record)\">\n          <span innerhtml.bind=\"col.getLabel(record[col.dataId],record)\"></span>\n        </ui-button>\n        </div>";
            var viewFactory = this.compiler.compile("<template>" + template + "</template>");
            var view = viewFactory.create(this.container);
            view.bind(this);
            var slot = new aurelia_framework_1.ViewSlot(this.element, true);
            slot.add(view);
            slot.attached();
        };
        return UIDgCell;
    }());
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UIDgCell.prototype, "col", void 0);
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UIDgCell.prototype, "type", void 0);
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UIDgCell.prototype, "record", void 0);
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UIDgCell.prototype, "parent", void 0);
    UIDgCell = __decorate([
        aurelia_framework_1.autoinject(),
        aurelia_framework_1.inlineView("<template></template>"),
        aurelia_framework_1.customElement('ui-dg-cell'),
        __metadata("design:paramtypes", [Element, aurelia_framework_1.Container, aurelia_framework_1.ViewCompiler])
    ], UIDgCell);
    exports.UIDgCell = UIDgCell;
    var UIDgRow = (function () {
        function UIDgRow() {
            this.level = 0;
        }
        UIDgRow.prototype.expand = function (evt) {
            this.record.isOpen = !this.record.isOpen;
            evt.stopPropagation();
            evt.preventDefault();
            return false;
        };
        UIDgRow.prototype.getSubdata = function () {
            if (isFunction(this.record.subdata))
                return this.record.subdata(this.record);
            return this.record.subdata;
        };
        return UIDgRow;
    }());
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UIDgRow.prototype, "level", void 0);
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UIDgRow.prototype, "record", void 0);
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UIDgRow.prototype, "parent", void 0);
    UIDgRow = __decorate([
        aurelia_framework_1.inlineView("<template><tr class=\"level-${level} ${record.isOpen?'ui-expanded':''} ${parent.selected==record?'ui-selected':''}\" click.delegate=\"parent.fireSelect(parent.selected=record)\">\n  <td class=\"ui-expander\" if.bind=\"parent.handleSize>0\">\n    <div><a if.bind=\"record.subdata || parent.subview\" click.trigger=\"expand($event)\"><ui-glyph glyph.bind=\"record.isOpen?'glyph-icon-minus':'glyph-icon-plus'\"></ui-glyph></a></div>\n  </td>\n  <td repeat.for=\"col of parent.cols\" class=\"${col.locked==0?'ui-locked':''} ${col.align}\" css.bind=\"{left: col.left+'px'}\"\n    col.bind=\"col\" parent.bind=\"parent\" record.bind=\"record\" as-element=\"ui-dg-cell\">\n  </td>\n  <td class=\"filler\"><div>&nbsp;</div></td></tr>\n\n  <ui-dg-row containerless if.bind=\"!parent.subview && record.subdata && record.isOpen\" level.bind=\"level+1\" parent.bind=\"parent\"\n    record.bind=\"rec\" repeat.for=\"rec of getSubdata()\" class=\"${$last?'ui-last-inner':''}\">\n  </ui-dg-row>\n\n  <tr if.bind=\"parent.subview && record.isOpen\" class=\"filler\">\n  <td class=\"ui-expander\" if.bind=\"parent.handleSize>0\"><div></div></td>\n  <td colspan=\"${parent.cols.length}\"><div parent.bind=\"parent\"\n    record.bind=\"record\" type=\"subview\" as-element=\"ui-dg-cell\"></div></td>\n  <td class=\"filler\"><div>&nbsp;</div></td></tr>\n</template>"),
        aurelia_framework_1.customElement('ui-dg-row')
    ], UIDgRow);
    exports.UIDgRow = UIDgRow;
    var UIDatagrid = (function () {
        function UIDatagrid(element) {
            this.element = element;
            this.summaryRow = false;
            this.cols = [];
            this.headCols = [];
            this.headCols2 = [];
            this.tableWidth = '20px';
            this.virtual = false;
            this.isBusy = false;
            this.handleSize = 30;
            this.isRtl = false;
            this.resizing = false;
            this.virtual = element.hasAttribute('virtual');
            if (!element.hasAttribute('scroll'))
                this.element.classList.add('ui-auto-size');
            if (!element.hasAttribute('row-expander'))
                this.handleSize = 0;
        }
        UIDatagrid.prototype.bind = function (bindingContext, overrideContext) {
            var _this = this;
            if (this.pager) {
                if (!(this.pager instanceof UIPager))
                    throw new Error('Pager must be instance of UIPager');
                this.obPageChange = ui_event_1.UIEvent.observe(this.pager, 'page', function (pg) { return _this.store.loadPage(pg); });
            }
            if (!(this.store instanceof ui_data_source_1.BaseDataSource))
                this.store = new ui_data_source_1.UILocalDS(this.store);
            if (this.subview)
                this.handleSize = 30;
        };
        UIDatagrid.prototype.attached = function () {
            var _this = this;
            ui_event_1.UIEvent.queueTask(function () {
                _this.columnsChanged(_this.columns);
                _this.scrolling();
            });
        };
        UIDatagrid.prototype.detached = function () {
            if (this.obPageChange)
                this.obPageChange.dispose();
        };
        UIDatagrid.prototype.columnsChanged = function (newValue) {
            this.headCols = _.sortBy(this.columns, 'locked');
            this.headCols2 = _.flatMap(this.headCols, function (c) { return c.columns || []; });
            this.cols = _.sortBy(_.flatMap(this.columns, function (c) { return c.columns || [c]; }), 'locked');
        };
        UIDatagrid.prototype.storeChanged = function (newValue) {
            var _this = this;
            if (!(newValue instanceof ui_data_source_1.BaseDataSource))
                this.store = new ui_data_source_1.UILocalDS(newValue);
            else
                this.store = newValue;
            if (!this.store.isLoaded)
                ui_event_1.UIEvent.queueTask(function () { return (_this.pager ? _this.store.loadPage(_this.pager.page = 0) : _this.store.fetchData()); });
        };
        UIDatagrid.prototype.scrolling = function () {
            this.dgHead.style.transform = "translateX(-" + this.scroller.scrollLeft + "px)";
            if (this.dgFoot)
                this.dgFoot.style.transform = this.dgHead.style.transform;
        };
        UIDatagrid.prototype.doSort = function (col) {
            if (!col.sortable)
                return;
            var sortOrder = 'asc';
            if (this.store.sortBy == col.dataId)
                sortOrder = this.store.orderBy == 'asc' ? 'desc' : 'asc';
            this.store.sort(col.dataId, sortOrder);
        };
        UIDatagrid.prototype.calculateWidth = function (cols) {
            var w = this.handleSize;
            _.forEach(cols, function (c) { c.left = w; w += c.getWidth(); });
            return (this.tableWidth = (w + 20) + 'px');
        };
        UIDatagrid.prototype.fireSelect = function (record) {
            this.selected = record;
            ui_event_1.UIEvent.fireEvent('rowselect', this.element, ({ record: record }));
        };
        UIDatagrid.prototype.resizeColumn = function (evt, col, next) {
            var _this = this;
            if (evt.button != 0)
                return true;
            this.isRtl = window.isRtl(this.element);
            this.diff = 0;
            this.colResize = col;
            this.colNext = next;
            this.resizing = true;
            this.startX = (evt.x || evt.clientX);
            this.ghost.style[this.isRtl ? 'right' : 'left'] = (col.left + parseInt(col.width) - (col.locked == 0 ? 0 : this.scroller.scrollLeft)) + 'px';
            document.addEventListener('mouseup', this.stop = function (evt) { return _this.resizeEnd(evt); });
            document.addEventListener('mousemove', this.move = function (evt) { return _this.resize(evt); });
        };
        UIDatagrid.prototype.resize = function (evt) {
            var x = (evt.x || evt.clientX) - this.startX;
            x = (this.isRtl ? -1 : 1) * x;
            if (x < 0 && (parseInt(this.colResize.width) + this.diff) <= (this.colResize.minWidth || 80))
                return;
            if (x > 0 && (parseInt(this.colResize.width) + this.diff) >= (500))
                return;
            this.startX = (evt.x || evt.clientX);
            this.diff += x;
            this.ghost.style[this.isRtl ? 'right' : 'left'] = (parseInt(this.ghost.style[this.isRtl ? 'right' : 'left']) + x) + 'px';
        };
        UIDatagrid.prototype.resizeEnd = function (evt) {
            this.resizing = false;
            if (this.colNext)
                this.colNext.left += this.diff;
            this.colResize.width = (parseInt(this.colResize.width) + this.diff);
            document.removeEventListener('mousemove', this.move);
            document.removeEventListener('mouseup', this.stop);
            evt.stopPropagation();
            return false;
        };
        return UIDatagrid;
    }());
    __decorate([
        aurelia_framework_1.children('ui-dg-column-group,ui-dg-column,ui-dg-button,ui-dg-link,ui-dg-glyph'),
        __metadata("design:type", Object)
    ], UIDatagrid.prototype, "columns", void 0);
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UIDatagrid.prototype, "store", void 0);
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UIDatagrid.prototype, "pager", void 0);
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UIDatagrid.prototype, "subview", void 0);
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UIDatagrid.prototype, "summaryRow", void 0);
    UIDatagrid = __decorate([
        aurelia_framework_1.autoinject(),
        aurelia_framework_1.inlineView("<template class=\"ui-datagrid\"><div class=\"ui-hidden\"><slot></slot></div>\n<div show.bind=\"resizing\" ref=\"ghost\" class=\"ui-dg-ghost\"></div>\n<div ref=\"dgHead\">\n<table width.bind=\"tableWidth\" css.bind=\"{'table-layout': tableWidth?'fixed':'auto' }\">\n  <colgroup>\n    <col width=\"${handleSize}\" if.bind=\"handleSize>0\"/>\n    <col repeat.for=\"col of cols\" data-index.bind=\"$index\" width.bind=\"col.width\"/>\n    <col/>\n  </colgroup>\n  <thead><tr>\n    <td class=\"ui-expander\" if.bind=\"handleSize>0\" rowspan.bind=\"headCols2.length?2:''\"><div>&nbsp;</div></td>\n    <td repeat.for=\"col of headCols\" mouseup.trigger=\"doSort(col)\" class=\"${col.sortable?'ui-sortable':''} ${col.locked==0?'ui-locked':''}\" css.bind=\"{left: col.left+'px'}\" rowspan.bind=\"headCols2.length?(col.isGroup?1:2):''\" colspan.bind=\"col.isGroup?col.columns.length:1\">\n    <div if.bind=\"!col.isGroup\">\n      <span class=\"ui-dg-header\" innerhtml.bind='col.getTitle()'></span>\n      <span class=\"ui-filter\" if.bind=\"col.filter\"><ui-glyph glyph=\"glyph-funnel\"></ui-glyph></span>\n      <span class=\"ui-sort ${col.dataId==store.sortBy ? store.orderBy:''}\" if.bind=\"col.sortable\"></span>\n      <span class=\"ui-resizer\" if.bind=\"col.resize\" mousedown.trigger=\"resizeColumn($event,col,cols[$index+1])\"></span>\n    </div><div if.bind=\"col.isGroup\" class=\"ui-dg-group\"><span class=\"ui-dg-header\" innerhtml.bind='col.getTitle()'></span></div></td>\n    <td class=\"filler\" rowspan.bind=\"headCols2.length?2:''\"><div><span class=\"ui-dg-header\">&nbsp;</span></div></td>\n  </tr><tr show.bind=\"headCols2.length\"><td repeat.for=\"col of headCols2\" mouseup.trigger=\"doSort(col)\" class=\"${col.sortable?'ui-sortable':''} ${col.locked==0?'ui-locked':''}\" css.bind=\"{left: col.left+'px'}\" if.bind=\"col\"><div>\n    <span class=\"ui-dg-header\" innerhtml.bind='col.getTitle()'></span>\n    <span class=\"ui-filter\" if.bind=\"col.filter\"><ui-glyph glyph=\"glyph-funnel\"></ui-glyph></span>\n    <span class=\"ui-sort ${col.dataId==store.sortBy ? store.orderBy:''}\" if.bind=\"col.sortable\"></span>\n    <span class=\"ui-resizer\" if.bind=\"col.resize\" mousedown.trigger=\"resizeColumn($event,col,cols[$index+1])\"></span>\n  </div></td></tr></thead>\n</table>\n</div>\n<div show.bind=\"store.isEmpty\" class=\"ui-dg-empty\"><slot name=\"dg-empty\"></slot></div>\n<div class=\"ui-dg-wrapper\" ref=\"scroller\" scroll.trigger=\"scrolling() & debounce:1\">\n<table width.bind=\"calculateWidth(cols,resizing)\" css.bind=\"{'table-layout': tableWidth?'fixed':'auto' }\" ref=\"mainTable\">\n  <colgroup>\n    <col width=\"${handleSize}\" if.bind=\"handleSize>0\"/>\n    <col repeat.for=\"col of cols\" data-index.bind=\"$index\" width.bind=\"col.width\"/>\n    <col/>\n  </colgroup>\n  <tbody if.bind=\"!virtual\" class=\"${$even?'even':'odd'}\" parent.bind=\"$parent\"\n    as-element=\"ui-dg-row\" record.bind=\"record\" repeat.for=\"record of store.data\">\n  </tbody>\n  <tbody if.bind=\"virtual\" class=\"${$even?'even':'odd'}\" parent.bind=\"$parent\"\n    as-element=\"ui-dg-row\" record.bind=\"record\" virtual-repeat.for=\"record of store.data\">\n  </tbody>\n</table>\n<table width.bind=\"tableWidth\" class=\"filler\" css.bind=\"{'table-layout': tableWidth?'fixed':'auto', height:((scroller.offsetHeight<mainTable.offsetHeight?0:scroller.offsetHeight-mainTable.offsetHeight)+'px') }\">\n  <colgroup>\n    <col width=\"${handleSize}\" if.bind=\"handleSize>0\"/>\n    <col repeat.for=\"col of cols\" data-index.bind=\"$index\" width.bind=\"col.width\"/>\n    <col/>\n  </colgroup>\n  <tbody class=\"odd\"><tr class=\"filler\">\n    <td class=\"ui-expander\" if.bind=\"handleSize>0\"><div>&nbsp;</div></td>\n    <td repeat.for=\"col of cols\" class=\"${col.locked==0?'ui-locked':''}\" css.bind=\"{left: col.left+'px'}\"><div>&nbsp;</div></td>\n    <td class=\"filler\"><div>&nbsp;</div></td>\n  </tr></tbody>\n</table></div>\n<div>\n<table ref=\"dgFoot\" width.bind=\"tableWidth\" css.bind=\"{'table-layout': tableWidth?'fixed':'auto' }\">\n  <colgroup>\n    <col width=\"${handleSize}\" if.bind=\"handleSize>0\"/>\n    <col repeat.for=\"col of cols\" data-index.bind=\"$index\" width.bind=\"col.width\"/>\n    <col/>\n  </colgroup>\n  <tfoot if.bind=\"summaryRow\"><tr>\n    <td class=\"ui-expander\" if.bind=\"handleSize>0\"><div>&nbsp;</div></td>\n    <td repeat.for=\"col of cols\" class=\"${col.locked==0?'ui-locked':''} ${col.align}\" css.bind=\"{left: col.left+'px'}\"><div innerhtml.bind='col.getSummary(summaryRow, store.data)'></div></td>\n    <td class=\"filler\"><div>&nbsp;</div></td>\n  </tr></tfoot>\n</table>\n</div>\n<div class=\"ui-dg-loader\" if.bind=\"store.isLoading\">\n  <div class=\"ui-loader-div\">\n    <ui-glyph class=\"ui-anim-loader\" glyph=\"glyph-loader\"></ui-glyph>\n  </div>\n</div></template>"),
        aurelia_framework_1.customElement('ui-datagrid'),
        __metadata("design:paramtypes", [Element])
    ], UIDatagrid);
    exports.UIDatagrid = UIDatagrid;
    var UIDGEmpty = (function () {
        function UIDGEmpty() {
        }
        return UIDGEmpty;
    }());
    UIDGEmpty = __decorate([
        aurelia_framework_1.containerless(),
        aurelia_framework_1.customElement('ui-dg-empty'),
        aurelia_framework_1.inlineView("<template><div slot=\"dg-empty\"><slot></slot></div></template>")
    ], UIDGEmpty);
    exports.UIDGEmpty = UIDGEmpty;
    var UIPager = (function () {
        function UIPager(element) {
            this.element = element;
            this.page = 0;
            this.style = "chevron";
            this.totalPages = 1;
        }
        UIPager.prototype.bind = function (bindingContext, overrideContext) {
            if (this.store)
                this.totalPages = this.store.totalPages;
        };
        UIPager.prototype.attached = function () {
            var _this = this;
            if (this.store && !this.store.isLoaded)
                ui_event_1.UIEvent.queueTask(function () { return _this.store.loadPage(_this.page); });
        };
        UIPager.prototype.fireChange = function () {
            if (this.store)
                this.store.loadPage(this.page);
            ui_event_1.UIEvent.fireEvent('change', this.element, this.page);
        };
        return UIPager;
    }());
    __decorate([
        aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
        __metadata("design:type", Object)
    ], UIPager.prototype, "page", void 0);
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UIPager.prototype, "style", void 0);
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UIPager.prototype, "store", void 0);
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UIPager.prototype, "totalPages", void 0);
    UIPager = __decorate([
        aurelia_framework_1.autoinject(),
        aurelia_framework_1.inlineView("<template class=\"ui-pager\">\n  <a class=\"pg-first ${page==0?'disabled':''}\" click.trigger=\"fireChange(page=0)\"><ui-glyph glyph=\"glyph-${style}-double-left\"></ui-glyph></a>\n  <a class=\"pg-prev ${page==0?'disabled':''}\" click.trigger=\"fireChange(page=page-1)\" click.trigger=\"fireChange(page=totalPages)\"><ui-glyph glyph=\"glyph-${style}-left\"></ui-glyph></a>\n  <span class=\"pg-input\">${page+1} of ${totalPages}</span>\n  <a class=\"pg-next ${page+1>=totalPages?'disabled':''}\" click.trigger=\"fireChange(page=page+1)\"><ui-glyph glyph=\"glyph-${style}-right\"></ui-glyph></a>\n  <a class=\"pg-last ${page+1>=totalPages?'disabled':''}\" click.trigger=\"fireChange(page=totalPages-1)\"><ui-glyph glyph=\"glyph-${style}-double-right\"></ui-glyph></a>\n</template>"),
        aurelia_framework_1.customElement('ui-pager'),
        __metadata("design:paramtypes", [Element])
    ], UIPager);
    exports.UIPager = UIPager;
    var UIDGFilter = (function () {
        function UIDGFilter(element) {
            this.element = element;
        }
        return UIDGFilter;
    }());
    UIDGFilter = __decorate([
        aurelia_framework_1.autoinject(),
        aurelia_framework_1.inlineView("<template class=\"ui-filter\"></template>"),
        aurelia_framework_1.customElement('ui-dg-filter'),
        __metadata("design:paramtypes", [Element])
    ], UIDGFilter);
    exports.UIDGFilter = UIDGFilter;
});
