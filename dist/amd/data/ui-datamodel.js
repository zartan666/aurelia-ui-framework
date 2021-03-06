var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "aurelia-logging", "aurelia-metadata", "lodash"], function (require, exports, aurelia_framework_1, aurelia_logging_1, aurelia_metadata_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIDataModel = (function () {
        function UIDataModel(id) {
            this.busy = false;
            this.loaded = false;
            this.idProperty = 'id';
            this.metadata = aurelia_metadata_1.metadata.get(aurelia_metadata_1.metadata.properties, Object.getPrototypeOf(this));
            Object.defineProperties(this, this.metadata.propertyDefs);
            this.metadata.original = _.cloneDeep(this.serialize());
            this.metadata.updated = _.cloneDeep(this.serialize());
            Object.defineProperties(this, {
                id: {
                    enumerable: true,
                    writable: true
                },
                apiUrl: {
                    enumerable: false,
                    writable: true
                },
                idProperty: {
                    enumerable: false,
                    writable: true
                },
                loaded: {
                    enumerable: false
                },
                busy: {
                    enumerable: false
                },
                logger: {
                    value: aurelia_logging_1.getLogger(this.constructor.name),
                    enumerable: false
                },
                metadata: {
                    enumerable: false
                }
            });
            this.logger.info('Model created');
            if (id)
                this.get(id);
        }
        UIDataModel.prototype.get = function (id) {
            var _this = this;
            if (!this.apiUrl)
                return Promise.reject({ errorCode: 'AUF-DM:000', message: "API route required" });
            ;
            return this.callPreHook('preGet', id)
                .then(function (result) {
                if (result !== false) {
                    return _this.doGet(id);
                }
                Promise.reject({ errorCode: 'AUF-DM:001', message: "Get rejected" });
            }).then(function (response) { return _this.postGet(response); });
        };
        UIDataModel.prototype.save = function () {
            var _this = this;
            if (!this.apiUrl)
                return Promise.reject({ errorCode: 'AUF-DM:000', message: "API route required" });
            return this.callPreHook('preSave')
                .then(function (result) {
                if (result !== false) {
                    if (_this.loaded)
                        return _this.doPut();
                    else
                        return _this.doPost();
                }
                Promise.reject({ errorCode: 'AUF-DM:002', message: "Save rejected" });
            }).then(function (response) {
                _this.loaded = true;
                _this.deserialize(_this.serialize());
                _this.postSave(response);
            });
        };
        UIDataModel.prototype.delete = function () {
            var _this = this;
            if (!this.apiUrl)
                return Promise.reject({ errorCode: 'AUF-DM:000', message: "API route required" });
            ;
            if (!this.loaded)
                return Promise.reject({ errorCode: 'AUF-DM:009', message: "Unknown id for model object" });
            ;
            return this.callPreHook('preDelete')
                .then(function (result) {
                if (result !== false) {
                    return _this.doDelete();
                }
                Promise.reject({ errorCode: 'AUF-DM:003', message: "Delete rejected" });
            }).then(function (response) { return _this.postDelete(response); });
        };
        UIDataModel.prototype.preGet = function () { };
        UIDataModel.prototype.preSave = function () { };
        UIDataModel.prototype.preDelete = function () { };
        UIDataModel.prototype.postGet = function (response) { };
        UIDataModel.prototype.postSave = function (response) { };
        UIDataModel.prototype.postDelete = function (response) { };
        UIDataModel.prototype.update = function () {
            this.metadata.updated = _.cloneDeep(this.serialize());
        };
        UIDataModel.prototype.reset = function () {
            this.metadata.updated = Object.assign({}, this.metadata.original);
            this.discard();
        };
        UIDataModel.prototype.discard = function () {
            var _this = this;
            this.metadata.dirtyProps = [];
            var updated = _.cloneDeep(this.metadata.updated);
            this.metadata.serializableProps.forEach(function (prop) { return _this[prop] = updated[prop]; });
        };
        UIDataModel.prototype.serialize = function () {
            var _this = this;
            var POJO = {};
            this.metadata.serializableProps.forEach(function (prop) { return POJO[prop] = UIDataModel.serializeProperty(_this[prop]); });
            return POJO;
        };
        UIDataModel.prototype.deserialize = function (json) {
            var _this = this;
            this.loaded = true;
            this.metadata.original = _.cloneDeep(json);
            this.metadata.updated = _.cloneDeep(json);
            this.metadata.serializableProps.forEach(function (prop) { return _this[prop] = json[prop]; });
        };
        UIDataModel.serializeObject = function (o) {
            var _this = this;
            var _pojo = {};
            if (o instanceof UIDataModel) {
                return o.serialize();
            }
            else if (o instanceof Map) {
                o.forEach(function (obj, key) { return _pojo[key] = _this.serializeProperty(obj); });
            }
            else {
                Object.keys(o)
                    .forEach(function (key) { return _pojo[key] = _this.serializeProperty(o[key]); });
            }
            return _pojo;
        };
        UIDataModel.serializeProperty = function (p) {
            if (_.isObject(p)) {
                return this.serializeObject(p);
            }
            else if (_.isArray(p)) {
                return p.join(',');
            }
            else {
                return isEmpty(p) ? null : p;
            }
        };
        Object.defineProperty(UIDataModel.prototype, "isDirty", {
            get: function () {
                return !!this.metadata.dirtyProps.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIDataModel.prototype, "dirtyProps", {
            get: function () {
                var ret = {};
                this.metadata.dirtyProps.forEach(function (prop) { return ret[prop] = true; });
                return ret;
            },
            enumerable: true,
            configurable: true
        });
        UIDataModel.prototype.generateId = function () {
            return Math.round(Math.random() * new Date().getTime()).toString(18);
        };
        UIDataModel.prototype.propertyGetter = function (prop) {
            return function () {
                return this['_' + prop];
            };
        };
        UIDataModel.prototype.propertySetter = function (prop) {
            return function (v) {
                this['_' + prop] = v;
                this.updateDirty(prop, v);
                return v;
            };
        };
        UIDataModel.prototype.updateDirty = function (prop, value) {
            var hasDirty = !!(~this.metadata.dirtyProps.indexOf(prop));
            var isDirty = this.metadata.original[prop] !== (value === '' ? null : value);
            if (!hasDirty && isDirty)
                this.metadata.dirtyProps.push(prop);
            if (hasDirty && !isDirty)
                this.metadata.dirtyProps.splice(this.metadata.dirtyProps.indexOf(prop), 1);
        };
        UIDataModel.prototype.callPreHook = function (hook, data) {
            var result = this[hook](data);
            if (result instanceof Promise) {
                return result;
            }
            if (result !== null && result !== undefined) {
                return Promise.resolve(result);
            }
            return Promise.resolve(true);
        };
        UIDataModel.prototype.doGet = function (id) {
        };
        UIDataModel.prototype.doPost = function () {
        };
        UIDataModel.prototype.doPut = function () {
        };
        UIDataModel.prototype.doDelete = function () {
        };
        UIDataModel.prototype.doUpdate = function () {
            this.id = this[this.idProperty] || this.generateId();
            this.metadata.dirtyProps = [];
            this.metadata.original = _.cloneDeep(this.serialize());
            this.metadata.updated = _.cloneDeep(this.serialize());
        };
        __decorate([
            aurelia_framework_1.computedFrom('metadata.dirtyProps.length'),
            __metadata("design:type", Boolean),
            __metadata("design:paramtypes", [])
        ], UIDataModel.prototype, "isDirty", null);
        __decorate([
            aurelia_framework_1.computedFrom('metadata.dirtyProps.length'),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [])
        ], UIDataModel.prototype, "dirtyProps", null);
        return UIDataModel;
    }());
    exports.UIDataModel = UIDataModel;
    function serializable(defaultValue) {
        if (defaultValue === void 0) { defaultValue = null; }
        return function (target, property) {
            if (!property)
                throw Error('Decorator should be used on property only!');
            var meta = aurelia_metadata_1.metadata.getOrCreateOwn(aurelia_metadata_1.metadata.properties, ModelMetadata, target);
            meta.serializableProps.push(property);
            meta.propertyDefs[property] = {
                get: target.propertyGetter(property),
                set: target.propertySetter(property),
                enumerable: true
            };
            meta.propertyDefs['_' + property] = {
                value: defaultValue,
                enumerable: false,
                writable: true
            };
        };
    }
    exports.serializable = serializable;
    var ModelMetadata = (function () {
        function ModelMetadata() {
            this.serializableProps = [];
            this.dirtyProps = [];
            this.observers = [];
            this.propertyDefs = {};
            this.updated = {};
            this.original = {};
        }
        return ModelMetadata;
    }());
});
