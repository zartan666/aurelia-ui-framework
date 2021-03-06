var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject, customElement, bindable, bindingMode, inlineView } from 'aurelia-framework';
import { UIEvent } from "../../utils/ui-event";
let UIChip = class UIChip {
    constructor(element) {
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
    remove() {
        UIEvent.fireEvent('remove', this.element, this.id);
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIChip.prototype, "id", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIChip.prototype, "label", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIChip.prototype, "color", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIChip.prototype, "width", void 0);
UIChip = __decorate([
    autoinject(),
    inlineView(`<template class="ui-chip" css.bind="{minWidth:width}"><span class="ui-chip-label" css.bind="{backgroundColor:color}">\${label}</span><span class="ui-chip-value"><slot></slot></span><a click.trigger="remove()" class="ui-chip-close" if.bind="canClose">&times</a></template>`),
    customElement('ui-chip'),
    __metadata("design:paramtypes", [Element])
], UIChip);
export { UIChip };
let UIBreadcrumb = class UIBreadcrumb {
    constructor(element) {
        this.element = element;
    }
    fireChange($event) {
        $event.cancelBubble = true;
        $event.stopPropagation();
        if (!isEmpty($event.detail))
            UIEvent.fireEvent('change', this.element, $event.detail);
        return false;
    }
};
UIBreadcrumb = __decorate([
    autoinject(),
    inlineView(`<template class="ui-breadcrumb" click.delegate="fireChange($event)"><slot></slot></template>`),
    customElement('ui-breadcrumb'),
    __metadata("design:paramtypes", [Element])
], UIBreadcrumb);
export { UIBreadcrumb };
let UICrumb = class UICrumb {
    constructor(element) {
        this.element = element;
        this.id = '';
        this.href = 'javascript:;';
    }
    fireClick($event) {
        $event.cancelBubble = true;
        $event.stopPropagation();
        UIEvent.fireEvent('click', this.element, this.id);
        return false;
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UICrumb.prototype, "id", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UICrumb.prototype, "href", void 0);
UICrumb = __decorate([
    autoinject(),
    inlineView(`<template class="ui-crumb"><a href="crumb.href || 'javascript:;'" click.trigger="fireClick($event)"><slot></slot></a></template>`),
    customElement('ui-crumb'),
    __metadata("design:paramtypes", [Element])
], UICrumb);
export { UICrumb };
let UIPager = class UIPager {
    constructor(element) {
        this.element = element;
        this.page = 0;
        this.style = "chevron";
        this.totalPages = 1;
    }
    bind(bindingContext, overrideContext) {
        if (this.store)
            this.totalPages = this.store.totalPages;
    }
    fireChange() {
        if (this.store)
            this.store.loadPage(this.page);
        UIEvent.fireEvent('change', this.element, this.page);
    }
};
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    __metadata("design:type", Object)
], UIPager.prototype, "page", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIPager.prototype, "store", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIPager.prototype, "style", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIPager.prototype, "totalPages", void 0);
UIPager = __decorate([
    autoinject(),
    inlineView(`<template class="ui-pager">
  <a class="pg-first \${page==0?'disabled':''}" click.trigger="fireChange(page=0)"><ui-glyph glyph="glyph-\${style}-double-left"></ui-glyph></a>
  <a class="pg-prev \${page==0?'disabled':''}" click.trigger="fireChange(page=page-1)" click.trigger="fireChange(page=totalPages)"><ui-glyph glyph="glyph-\${style}-left"></ui-glyph></a>
  <span class="pg-input">\${page+1} of \${totalPages}</span>
  <a class="pg-next \${page+1>=totalPages?'disabled':''}" click.trigger="fireChange(page=page+1)"><ui-glyph glyph="glyph-\${style}-right"></ui-glyph></a>
  <a class="pg-last \${page+1>=totalPages?'disabled':''}" click.trigger="fireChange(page=totalPages-1)"><ui-glyph glyph="glyph-\${style}-double-right"></ui-glyph></a>
</template>`),
    customElement('ui-pager'),
    __metadata("design:paramtypes", [Element])
], UIPager);
export { UIPager };
