var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "../../utils/ui-event"], function (require, exports, aurelia_framework_1, ui_event_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIChip = (function () {
        function UIChip(element) {
            this.element = element;
            this.id = '';
            this.label = '';
            this.color = '';
            this.width = 'auto';
            this.canClose = false;
            if (element.hasAttribute('large'))
                element.classList.add('ui-large');
            if (element.hasAttribute('small'))
                element.classList.add('ui-small');
            this.canClose = element.hasAttribute('removable') || element.hasAttribute('remove.trigger');
        }
        UIChip.prototype.remove = function () {
            ui_event_1.UIEvent.fireEvent('remove', this.element, this.id);
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIChip.prototype, "id", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIChip.prototype, "label", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIChip.prototype, "color", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIChip.prototype, "width", void 0);
        UIChip = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-chip\" css.bind=\"{minWidth:width}\"><span class=\"ui-chip-label\" css.bind=\"{backgroundColor:color}\">${label}</span><span class=\"ui-chip-value\"><slot></slot></span><a click.trigger=\"remove()\" class=\"ui-chip-close\" if.bind=\"canClose\">&times</a></template>"),
            aurelia_framework_1.customElement('ui-chip'),
            __metadata("design:paramtypes", [Element])
        ], UIChip);
        return UIChip;
    }());
    exports.UIChip = UIChip;
    var UIBreadcrumb = (function () {
        function UIBreadcrumb(element) {
            this.element = element;
        }
        UIBreadcrumb.prototype.fireChange = function ($event) {
            $event.cancelBubble = true;
            $event.stopPropagation();
            if (!isEmpty($event.detail))
                ui_event_1.UIEvent.fireEvent('change', this.element, $event.detail);
            return false;
        };
        UIBreadcrumb = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-breadcrumb\" click.delegate=\"fireChange($event)\"><slot></slot></template>"),
            aurelia_framework_1.customElement('ui-breadcrumb'),
            __metadata("design:paramtypes", [Element])
        ], UIBreadcrumb);
        return UIBreadcrumb;
    }());
    exports.UIBreadcrumb = UIBreadcrumb;
    var UICrumb = (function () {
        function UICrumb(element) {
            this.element = element;
            this.id = '';
            this.href = 'javascript:;';
        }
        UICrumb.prototype.fireClick = function ($event) {
            $event.cancelBubble = true;
            $event.stopPropagation();
            ui_event_1.UIEvent.fireEvent('click', this.element, this.id);
            return false;
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UICrumb.prototype, "id", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UICrumb.prototype, "href", void 0);
        UICrumb = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-crumb\"><a href=\"crumb.href || 'javascript:;'\" click.trigger=\"fireClick($event)\"><slot></slot></a></template>"),
            aurelia_framework_1.customElement('ui-crumb'),
            __metadata("design:paramtypes", [Element])
        ], UICrumb);
        return UICrumb;
    }());
    exports.UICrumb = UICrumb;
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
        UIPager.prototype.fireChange = function () {
            if (this.store)
                this.store.loadPage(this.page);
            ui_event_1.UIEvent.fireEvent('change', this.element, this.page);
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UIPager.prototype, "page", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIPager.prototype, "store", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIPager.prototype, "style", void 0);
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
        return UIPager;
    }());
    exports.UIPager = UIPager;
});
