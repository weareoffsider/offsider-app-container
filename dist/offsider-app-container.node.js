'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var i18next = require('i18next');
var moment = require('moment');
var lodash = require('lodash');
var Route = _interopDefault(require('route-parser'));

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var LocalizeSpawner = function () {
    function LocalizeSpawner(translationResources) {
        classCallCheck(this, LocalizeSpawner);

        this.translationResources = translationResources;
    }

    createClass(LocalizeSpawner, [{
        key: 'loadLocale',
        value: function loadLocale(langCode) {
            var i18n = i18next.init({
                lng: langCode,
                resources: this.translationResources,
                parseMissingKeyHandler: function parseMissingKeyHandler(key) {
                    console.log("langCode missing: ", key);
                    return "{l10n absent: " + key + "}";
                }
            });
            var localMoment = moment().locale(langCode);
            return new LocalizeContext(langCode, i18n);
        }
    }]);
    return LocalizeSpawner;
}();

var LocalizeContext = function () {
    function LocalizeContext(langCode, i18n) {
        classCallCheck(this, LocalizeContext);

        this.langCode = langCode;
        this.i18n = i18n;
        this.translate = this.translate.bind(this);
        this.customDatetime = this.customDatetime.bind(this);
        this.time = this.time.bind(this);
        this.fullDatetime = this.fullDatetime.bind(this);
        this.abbrDatetime = this.abbrDatetime.bind(this);
        this.fullDate = this.fullDate.bind(this);
        this.abbrDate = this.abbrDate.bind(this);
        this.numericDate = this.numericDate.bind(this);
    }

    createClass(LocalizeContext, [{
        key: 'translate',
        value: function translate(key, params) {
            return this.i18n.t(key, params);
        }
    }, {
        key: 'formatMoment',
        value: function formatMoment(datetime, format) {
            return moment(datetime).locale(this.langCode).format(format);
        }
    }, {
        key: 'customDatetime',
        value: function customDatetime(datetime, format) {
            return this.formatMoment(datetime, format);
        }
    }, {
        key: 'time',
        value: function time(datetime) {
            return this.formatMoment(datetime, "LT");
        }
    }, {
        key: 'fullDatetime',
        value: function fullDatetime(datetime) {
            return this.formatMoment(datetime, "LLL");
        }
    }, {
        key: 'abbrDatetime',
        value: function abbrDatetime(datetime) {
            return this.formatMoment(datetime, "lll");
        }
    }, {
        key: 'fullDate',
        value: function fullDate(datetime) {
            return this.formatMoment(datetime, "LL");
        }
    }, {
        key: 'abbrDate',
        value: function abbrDate(datetime) {
            return this.formatMoment(datetime, "ll");
        }
    }, {
        key: 'numericDate',
        value: function numericDate(datetime) {
            return this.formatMoment(datetime, "L");
        }
    }]);
    return LocalizeContext;
}();

var RequestNotFoundError = function (_Error) {
    inherits(RequestNotFoundError, _Error);

    function RequestNotFoundError(message, request) {
        classCallCheck(this, RequestNotFoundError);

        var _this = possibleConstructorReturn(this, (RequestNotFoundError.__proto__ || Object.getPrototypeOf(RequestNotFoundError)).call(this, message));

        _this.message = message;
        _this.request = request;
        _this.name = "RequestNotFoundError";
        return _this;
    }

    return RequestNotFoundError;
}(Error);
var RequestClientError = function (_Error2) {
    inherits(RequestClientError, _Error2);

    function RequestClientError(message, request) {
        classCallCheck(this, RequestClientError);

        var _this2 = possibleConstructorReturn(this, (RequestClientError.__proto__ || Object.getPrototypeOf(RequestClientError)).call(this, message));

        _this2.message = message;
        _this2.request = request;
        _this2.name = "RequestClientError";
        return _this2;
    }

    return RequestClientError;
}(Error);
var RequestForbiddenError = function (_Error3) {
    inherits(RequestForbiddenError, _Error3);

    function RequestForbiddenError(message, request) {
        classCallCheck(this, RequestForbiddenError);

        var _this3 = possibleConstructorReturn(this, (RequestForbiddenError.__proto__ || Object.getPrototypeOf(RequestForbiddenError)).call(this, message));

        _this3.message = message;
        _this3.request = request;
        _this3.name = "RequestForbiddenError";
        return _this3;
    }

    return RequestForbiddenError;
}(Error);
var RequestOfflineError = function (_Error4) {
    inherits(RequestOfflineError, _Error4);

    function RequestOfflineError(message, request) {
        classCallCheck(this, RequestOfflineError);

        var _this4 = possibleConstructorReturn(this, (RequestOfflineError.__proto__ || Object.getPrototypeOf(RequestOfflineError)).call(this, message));

        _this4.message = message;
        _this4.request = request;
        _this4.name = "RequestOfflineError";
        return _this4;
    }

    return RequestOfflineError;
}(Error);
var RequestServerError = function (_Error5) {
    inherits(RequestServerError, _Error5);

    function RequestServerError(message, request) {
        classCallCheck(this, RequestServerError);

        var _this5 = possibleConstructorReturn(this, (RequestServerError.__proto__ || Object.getPrototypeOf(RequestServerError)).call(this, message));

        _this5.message = message;
        _this5.request = request;
        _this5.name = "RequestServerError";
        return _this5;
    }

    return RequestServerError;
}(Error);

var CommsChannelStatus;
(function (CommsChannelStatus) {
    CommsChannelStatus[CommsChannelStatus["Offline"] = 0] = "Offline";
    CommsChannelStatus[CommsChannelStatus["Idle"] = 1] = "Idle";
    CommsChannelStatus[CommsChannelStatus["Active"] = 2] = "Active";
})(CommsChannelStatus || (CommsChannelStatus = {}));
function defaultErrorProcessing(req, commData) {
    console.log("ERROR PROCESS", req);
    if (req.status === 404) {
        return new RequestNotFoundError(req.responseURL, req);
    }
    if (req.status === 403) {
        return new RequestForbiddenError(req.responseURL, req);
    }
    if (req.status === 400) {
        return new RequestClientError(req.responseURL, req);
    }
    if (req.status >= 500) {
        return new RequestServerError(req.responseURL, req);
    }
    if (req.status === 0) {
        return new RequestOfflineError(req.responseURL, req);
    }
    return null;
}

var CommsChannel = function () {
    function CommsChannel(name, urlRoot, commData, prepareRequest, processSuccess, processError) {
        classCallCheck(this, CommsChannel);

        this.name = name;
        this.urlRoot = urlRoot;
        this.commData = commData;
        this.prepareRequest = prepareRequest;
        this.processSuccess = processSuccess;
        this.processError = processError;
        this.nextRequestKey = 0;
        this.state = {
            requests: [],
            status: CommsChannelStatus.Idle,
            statusString: CommsChannelStatus[CommsChannelStatus.Idle]
        };
        if (!this.processError) {
            this.processError = defaultErrorProcessing;
        }
    }

    createClass(CommsChannel, [{
        key: 'setStateSetter',
        value: function setStateSetter(func) {
            this.updateCommsState = func;
        }
    }, {
        key: 'getState',
        value: function getState() {
            return this.state;
        }
    }, {
        key: 'updateRequestState',
        value: function updateRequestState(key, request) {
            var nextRequests = this.state.requests.slice();
            var status = void 0;
            nextRequests[key] = request;
            if (this.state.status === CommsChannelStatus.Offline) {
                if (request.status !== 0 && request.progress === 1) {
                    if (nextRequests.every(function (r) {
                        return r.progress === 1;
                    })) {
                        status = CommsChannelStatus.Idle;
                    } else {
                        status = CommsChannelStatus.Active;
                    }
                } else {
                    status = CommsChannelStatus.Offline;
                }
            } else {
                if (request.status === 0) {
                    status = CommsChannelStatus.Offline;
                } else if (nextRequests.every(function (r) {
                    return r.progress === 1;
                })) {
                    status = CommsChannelStatus.Idle;
                } else {
                    status = CommsChannelStatus.Active;
                }
            }
            this.state = {
                requests: nextRequests, status: status,
                statusString: CommsChannelStatus[status]
            };
            this.updateCommsState(this.name, this.state);
        }
    }, {
        key: 'post',
        value: function post(url, data) {
            var _this = this;

            var key = this.nextRequestKey++;
            var method = 'POST';
            return new Promise(function (resolve, reject) {
                console.log('comms :: ' + _this.name + ' :: post - ' + url);
                var req = new XMLHttpRequest();
                _this.updateRequestState(key, { url: url, method: method, progress: 0 });
                req.addEventListener("load", function () {
                    if (req.status >= 400) {
                        var result = _this.processError(req, _this.commData);
                        _this.updateRequestState(key, { url: url, method: method, status: req.status,
                            progress: 1, result: result });
                        reject(result);
                    } else {
                        var _result = _this.processSuccess(req, _this.commData);
                        _this.updateRequestState(key, { url: url, method: method, status: req.status,
                            progress: 1, result: _result });
                        resolve(_result);
                    }
                }, false);
                req.addEventListener("error", function () {
                    var result = _this.processError(req, _this.commData);
                    _this.updateRequestState(key, { url: url, method: method, status: 0,
                        progress: 1, result: result });
                    reject(result);
                }, false);
                req.open("POST", '' + _this.urlRoot + url, true);
                _this.prepareRequest(req, _this.commData);
                if (data) {
                    req.setRequestHeader("content-type", "application/json");
                    req.send(JSON.stringify(data));
                } else {
                    req.send();
                }
            });
        }
    }, {
        key: 'upload',
        value: function upload(url, data) {
            var _this2 = this;

            var method = arguments.length <= 2 || arguments[2] === undefined ? "POST" : arguments[2];

            var key = this.nextRequestKey++;
            return new Promise(function (resolve, reject) {
                console.log('comms :: ' + _this2.name + ' :: upload via ' + method + ' - ' + url);
                var form = new FormData();
                lodash.forOwn(data, function (val, key) {
                    form.append(key, val);
                });
                var req = new XMLHttpRequest();
                _this2.updateRequestState(key, { url: url, method: method, progress: 0 });
                req.addEventListener("load", function () {
                    if (req.status >= 400) {
                        var result = _this2.processError(req, _this2.commData);
                        _this2.updateRequestState(key, { url: url, method: method, status: req.status,
                            progress: 1, result: result });
                        reject(result);
                    } else {
                        var _result2 = _this2.processSuccess(req, _this2.commData);
                        _this2.updateRequestState(key, { url: url, method: method, status: req.status,
                            progress: 1, result: _result2 });
                        resolve(_result2);
                    }
                }, false);
                req.addEventListener("error", function () {
                    var result = _this2.processError(req, _this2.commData);
                    _this2.updateRequestState(key, { url: url, method: method, status: 0,
                        progress: 1, result: result });
                    reject(result);
                }, false);
                req.open(method, '' + _this2.urlRoot + url, true);
                _this2.prepareRequest(req, _this2.commData);
                if (form) {
                    req.send(form);
                } else {
                    req.send();
                }
            });
        }
    }, {
        key: 'put',
        value: function put(url, data) {
            var _this3 = this;

            var key = this.nextRequestKey++;
            var method = 'PUT';
            return new Promise(function (resolve, reject) {
                console.log('comms :: ' + _this3.name + ' :: put - ' + url);
                var req = new XMLHttpRequest();
                _this3.updateRequestState(key, { url: url, method: method, progress: 0 });
                req.addEventListener("load", function () {
                    if (req.status >= 400) {
                        var result = _this3.processError(req, _this3.commData);
                        _this3.updateRequestState(key, { url: url, method: method, status: req.status,
                            progress: 1, result: result });
                        reject(result);
                    } else {
                        var _result3 = _this3.processSuccess(req, _this3.commData);
                        _this3.updateRequestState(key, { url: url, method: method, status: req.status,
                            progress: 1, result: _result3 });
                        resolve(_result3);
                    }
                }, false);
                req.addEventListener("error", function () {
                    var result = _this3.processError(req, _this3.commData);
                    _this3.updateRequestState(key, { url: url, method: method, status: 0,
                        progress: 1, result: result });
                    reject(result);
                }, false);
                req.open("PUT", '' + _this3.urlRoot + url, true);
                _this3.prepareRequest(req, _this3.commData);
                if (data) {
                    req.setRequestHeader("content-type", "application/json");
                    req.send(JSON.stringify(data));
                } else {
                    req.send();
                }
            });
        }
    }, {
        key: 'delete',
        value: function _delete(url, data) {
            var _this4 = this;

            var key = this.nextRequestKey++;
            var method = 'DELETE';
            return new Promise(function (resolve, reject) {
                console.log('comms :: ' + _this4.name + ' :: delete - ' + url);
                var req = new XMLHttpRequest();
                _this4.updateRequestState(key, { url: url, method: method, progress: 0 });
                req.addEventListener("load", function () {
                    if (req.status >= 400) {
                        var result = _this4.processError(req, _this4.commData);
                        _this4.updateRequestState(key, { url: url, method: method, status: req.status,
                            progress: 1, result: result });
                        reject(result);
                    } else {
                        var _result4 = _this4.processSuccess(req, _this4.commData);
                        _this4.updateRequestState(key, { url: url, method: method, status: req.status,
                            progress: 1, result: _result4 });
                        resolve(_result4);
                    }
                }, false);
                req.addEventListener("error", function () {
                    var result = _this4.processError(req, _this4.commData);
                    _this4.updateRequestState(key, { url: url, method: method, status: 0,
                        progress: 1, result: result });
                    reject(result);
                }, false);
                req.open("DELETE", '' + _this4.urlRoot + url, true);
                _this4.prepareRequest(req, _this4.commData);
                if (data) {
                    req.setRequestHeader("content-type", "application/json");
                    req.send(JSON.stringify(data));
                } else {
                    req.send();
                }
            });
        }
    }, {
        key: 'get',
        value: function get(url, data) {
            var _this5 = this;

            var key = this.nextRequestKey++;
            var method = 'GET';
            return new Promise(function (resolve, reject) {
                console.log('comms :: ' + _this5.name + ' :: get - ' + url);
                var req = new XMLHttpRequest();
                _this5.updateRequestState(key, { url: url, method: method, progress: 0 });
                req.addEventListener("load", function () {
                    if (req.status >= 400) {
                        var result = _this5.processError(req, _this5.commData);
                        _this5.updateRequestState(key, { url: url, method: method, status: req.status,
                            progress: 1, result: result });
                        reject(result);
                    } else {
                        var _result5 = _this5.processSuccess(req, _this5.commData);
                        _this5.updateRequestState(key, { url: url, method: method, status: req.status,
                            progress: 1, result: _result5 });
                        resolve(_result5);
                    }
                }, false);
                req.addEventListener("error", function () {
                    var result = _this5.processError(req, _this5.commData);
                    _this5.updateRequestState(key, { url: url, method: method, status: 0,
                        progress: 1, result: result });
                    reject(result);
                }, false);
                req.open("GET", '' + _this5.urlRoot + url);
                _this5.prepareRequest(req, _this5.commData);
                if (data) {
                    req.setRequestHeader("content-type", "application/json");
                    req.send(JSON.stringify(data));
                } else {
                    req.send();
                }
            });
        }
    }, {
        key: 'actions',
        value: function actions() {
            return {
                get: this.get.bind(this),
                post: this.post.bind(this),
                put: this.put.bind(this),
                upload: this.upload.bind(this),
                delete: this.delete.bind(this)
            };
        }
    }]);
    return CommsChannel;
}();

var FormError = function (_Error) {
    inherits(FormError, _Error);

    function FormError(message) {
        classCallCheck(this, FormError);

        var _this = possibleConstructorReturn(this, (FormError.__proto__ || Object.getPrototypeOf(FormError)).call(this, message));

        _this.message = message;
        _this.name = "FormError";
        return _this;
    }

    return FormError;
}(Error);
var FormWarning = function (_Error2) {
    inherits(FormWarning, _Error2);

    function FormWarning(message) {
        classCallCheck(this, FormWarning);

        var _this2 = possibleConstructorReturn(this, (FormWarning.__proto__ || Object.getPrototypeOf(FormWarning)).call(this, message));

        _this2.message = message;
        _this2.name = "FormWarning";
        return _this2;
    }

    return FormWarning;
}(Error);
function fieldRequired(value, formState, stateData) {
    if (value === null || value === undefined || value === "") {
        return Promise.reject(new FormError('field_required'));
    }
    return Promise.resolve(true);
}
function emailValidate(value, formState, stateData) {
    if (!value) {
        return Promise.resolve(true);
    }
    var hasAt = value.indexOf('@') > 0;
    var hasDot = hasAt ? value.split('@')[1].indexOf('.') > 0 : false;
    if (!hasAt || !hasDot) {
        return Promise.reject(new FormError('invalid_email'));
    }
    return Promise.resolve(true);
}

(function (FormValidationStyle) {
    FormValidationStyle[FormValidationStyle["WhileEditing"] = 0] = "WhileEditing";
    FormValidationStyle[FormValidationStyle["OnBlur"] = 1] = "OnBlur";
    FormValidationStyle[FormValidationStyle["OnStepEnd"] = 2] = "OnStepEnd";
})(exports.FormValidationStyle || (exports.FormValidationStyle = {}));

var FormDefinition = function () {
    function FormDefinition(name) {
        classCallCheck(this, FormDefinition);

        this.name = name;
        this.steps = {};
        this.stepOrder = [];
    }

    createClass(FormDefinition, [{
        key: "addStep",
        value: function addStep(stepName, step) {
            this.steps[stepName] = step;
            this.stepOrder.push(stepName);
        }
    }, {
        key: "getInitState",
        value: function getInitState() {
            var _this = this;

            var steps = {};
            this.stepOrder.forEach(function (stepKey) {
                steps[stepKey] = _this.steps[stepKey].getInitState();
            });
            return {
                // formType,
                // formKey,
                currentStep: this.stepOrder[0],
                complete: false,
                steps: steps
            };
        }
    }]);
    return FormDefinition;
}();

var FormStepDefinition = function () {
    function FormStepDefinition(name) {
        classCallCheck(this, FormStepDefinition);

        this.name = name;
        this.fields = {};
        this.fieldOrder = [];
    }

    createClass(FormStepDefinition, [{
        key: "addField",
        value: function addField(fieldName, field) {
            this.fields[fieldName] = field;
            this.fieldOrder.push(fieldName);
        }
    }, {
        key: "getInitState",
        value: function getInitState() {
            var stepState = {
                data: {},
                errors: {},
                warnings: {}
            };
            this.fieldOrder.forEach(function (fieldKey) {
                stepState.data[fieldKey] = undefined;
                stepState.errors[fieldKey] = [];
                stepState.warnings[fieldKey] = [];
            });
            return stepState;
        }
    }]);
    return FormStepDefinition;
}();
var FormFieldDefinition = function FormFieldDefinition(fieldType) {
    var required = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
    var validationStyle = arguments.length <= 2 || arguments[2] === undefined ? exports.FormValidationStyle.OnStepEnd : arguments[2];
    var extraValidators = arguments.length <= 3 || arguments[3] === undefined ? [] : arguments[3];
    classCallCheck(this, FormFieldDefinition);

    this.fieldType = fieldType;
    this.required = required;
    this.validationStyle = validationStyle;
    this.validators = [];
    if (required) {
        this.validators.push(fieldRequired);
    }
    if (fieldType === 'email') {
        this.validators.push(emailValidate);
    }
    this.validators = this.validators.concat(extraValidators);
};

var FormInstance = function () {
    function FormInstance(formDefinition, validationData, onUpdate) {
        classCallCheck(this, FormInstance);

        this.formDefinition = formDefinition;
        this.validationData = validationData;
        this.onUpdate = onUpdate;
        this.formData = formDefinition.getInitState();
    }

    createClass(FormInstance, [{
        key: "updateFormState",
        value: function updateFormState(newData) {
            this.formData = newData;
            this.onUpdate(newData);
        }
    }, {
        key: "updateValidationData",
        value: function updateValidationData(valData) {
            this.validationData = valData;
        }
    }, {
        key: "updateField",
        value: function updateField(stepKey, fieldKey, value) {
            var formState = lodash.cloneDeep(this.formData);
            var form = this.formDefinition;
            var field = form.steps[stepKey].fields[fieldKey];
            formState.steps[stepKey].data[fieldKey] = value;
            this.updateFormState(formState);
            if (field.validationStyle === exports.FormValidationStyle.WhileEditing) {
                this.validateField(stepKey, fieldKey);
            }
        }
    }, {
        key: "blurField",
        value: function blurField(stepKey, fieldKey) {
            var formState = lodash.cloneDeep(this.formData);
            var form = this.formDefinition;
            var field = form.steps[stepKey].fields[fieldKey];
            if (field.validationStyle === exports.FormValidationStyle.OnBlur || field.validationStyle === exports.FormValidationStyle.WhileEditing) {
                this.validateField(stepKey, fieldKey);
            }
        }
    }, {
        key: "validateField",
        value: function validateField(stepKey, fieldKey) {
            var _this = this;

            var startState = lodash.cloneDeep(this.formData);
            var form = this.formDefinition;
            var field = form.steps[stepKey].fields[fieldKey];
            var value = startState.steps[stepKey].data[fieldKey];
            console.log("FormInstance :: validating " + stepKey + "." + fieldKey + ":", value);
            return Promise.all(field.validators.map(function (validator) {
                return validator(value, startState, _this.validationData);
            })).then(function (results) {
                var formState = lodash.cloneDeep(_this.formData);
                formState.steps[stepKey].errors[fieldKey] = [];
                formState.steps[stepKey].warnings[fieldKey] = [];
                _this.updateFormState(formState);
                return true;
            }, function (error) {
                var formState = lodash.cloneDeep(_this.formData);
                if (error.name === "FormError") {
                    formState.steps[stepKey].errors[fieldKey] = [error.message];
                } else if (error.name === "FormWarning") {
                    formState.steps[stepKey].warnings[fieldKey] = [error.message];
                }
                _this.updateFormState(formState);
                return error;
            });
        }
    }, {
        key: "addFieldError",
        value: function addFieldError(stepKey, fieldKey, errorText) {
            var formState = lodash.cloneDeep(this.formData);
            formState.steps[stepKey].errors[fieldKey] = [errorText];
            this.updateFormState(formState);
        }
    }, {
        key: "submitStep",
        value: function submitStep(stepKey) {
            var _this2 = this;

            var formState = lodash.cloneDeep(this.formData);
            var form = this.formDefinition;
            var fieldKeys = Object.keys(form.steps[stepKey].fields);
            return Promise.all(fieldKeys.map(function (fieldKey) {
                return _this2.validateField(stepKey, fieldKey);
            })).then(function (results) {
                var formState = lodash.cloneDeep(_this2.formData);
                if (results.every(function (r) {
                    return r === true;
                })) {
                    var currentIx = form.stepOrder.indexOf(formState.currentStep);
                    if (currentIx < form.stepOrder.length - 1) {
                        formState.currentStep = form.stepOrder[currentIx + 1];
                    } else {
                        formState.complete = true;
                    }
                    _this2.updateFormState(formState);
                    return Promise.resolve(formState);
                } else {
                    return Promise.reject(formState.steps[stepKey].errors);
                }
            });
        }
    }]);
    return FormInstance;
}();

/* RouteTable
 *
 * A class for managing a set of path routes in the UI Context. View names
 * must correlate to Views in this UI Context's ViewSet.
 */

var RouteTable = function () {
    function RouteTable() {
        var routeBase = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
        classCallCheck(this, RouteTable);

        this.routeBase = routeBase;
        this.routes = [];
    }
    // add a route to the set, they are parsed in sequence so higher
    // priority routes should be added first


    createClass(RouteTable, [{
        key: "addRoute",
        value: function addRoute(routePath, viewName, routeName) {
            var route = new RouteMatcher(routePath, viewName, routeName);
            this.routes.push(route);
        }
        // take a path and match it to a route, otherwise returning null

    }, {
        key: "matchPath",
        value: function matchPath(fullPath) {
            var scopedPath = fullPath.replace(this.routeBase, "");
            var match = this.routes.find(function (route) {
                return route.match(scopedPath);
            });
            return match ? match : null;
        }
        // get a path from a provided routeName and parameters

    }, {
        key: "getPath",
        value: function getPath(routeName, params) {
            if (!params) {
                params = {};
            }
            var route = this.routes.find(function (route) {
                return route.routeName == routeName;
            });
            if (route) {
                return "" + this.routeBase + route.reverse(params);
            } else {
                return "/route-not-found";
            }
        }
    }]);
    return RouteTable;
}();

var RouteMatcher = function () {
    function RouteMatcher(route, viewName, routeName) {
        classCallCheck(this, RouteMatcher);

        if (route && viewName) {
            this.routeMatcher = new Route(route);
            this.viewName = viewName;
            this.routeName = routeName ? routeName : viewName;
        }
    }

    createClass(RouteMatcher, [{
        key: "attachPath",
        value: function attachPath(path) {
            var urlBase = arguments.length <= 1 || arguments[1] === undefined ? "" : arguments[1];

            var matcher = new RouteMatcher();
            matcher.routeMatcher = this.routeMatcher;
            matcher.viewName = this.viewName;
            matcher.routeName = this.routeName;
            matcher.params = this.routeMatcher.match(path.replace(urlBase, ""));
            matcher.path = path;
            return matcher;
        }
    }, {
        key: "match",
        value: function match(path) {
            return this.routeMatcher.match(path);
        }
    }, {
        key: "reverse",
        value: function reverse(params) {
            return this.routeMatcher.reverse(params);
        }
    }]);
    return RouteMatcher;
}();

var AppActor = function () {
    function AppActor() {
        classCallCheck(this, AppActor);
    }

    createClass(AppActor, [{
        key: "setStateGetter",
        value: function setStateGetter(func) {
            this.getAppState = func;
        }
    }, {
        key: "setActionsGetter",
        value: function setActionsGetter(func) {
            this.getAppActions = func;
        }
    }, {
        key: "setBusinessDispatch",
        value: function setBusinessDispatch(func) {
            this.businessDispatch = func;
        }
    }, {
        key: "setUiDispatch",
        value: function setUiDispatch(func) {
            this.uiDispatch = func;
        }
    }]);
    return AppActor;
}();

var ViewDefinition = function () {
    function ViewDefinition(options) {
        classCallCheck(this, ViewDefinition);

        this.options = options;
    }

    createClass(ViewDefinition, [{
        key: "spawnView",
        value: function spawnView(container, route) {
            return new View(container, route, this.options);
        }
    }]);
    return ViewDefinition;
}();

var View = function () {
    function View(container, route, options) {
        classCallCheck(this, View);

        this.container = container;
        this.route = route;
        this.options = options;
    }

    createClass(View, [{
        key: "preLoadData",
        value: function preLoadData(state, actions) {
            var _this = this;

            return (this.options.preLoad ? this.options.preLoad(state, actions) : Promise.resolve(true)).then(function (value) {
                _this.loaded = true;
                return value;
            });
        }
    }, {
        key: "postLoadData",
        value: function postLoadData(state, actions) {
            return this.options.postLoad ? this.options.postLoad(state, actions) : Promise.resolve(true);
        }
    }, {
        key: "create",
        value: function create(state, chromeData, actions) {
            if (!this.loaded) {
                return chromeData;
            }
            this.viewData = this.options.createView(this.container, state, actions);
            return this.options.updateChrome ? this.options.updateChrome(state, chromeData, this.viewData) : chromeData;
        }
    }, {
        key: "update",
        value: function update(state, chromeData, actions) {
            if (!this.loaded) {
                return chromeData;
            }
            this.viewData = this.options.updateView(this.container, state, actions, this.viewData);
            return this.options.updateChrome ? this.options.updateChrome(state, chromeData, this.viewData) : chromeData;
        }
    }, {
        key: "destroy",
        value: function destroy() {
            this.options.destroyView(this.container, this.viewData);
            this.container.parentNode.removeChild(this.container);
        }
    }]);
    return View;
}();

var ChromeDefinition = function () {
    function ChromeDefinition(options) {
        classCallCheck(this, ChromeDefinition);

        this.options = options;
    }

    createClass(ChromeDefinition, [{
        key: "getOptions",
        value: function getOptions() {
            return this.options;
        }
    }]);
    return ChromeDefinition;
}();

var Chrome = function () {
    function Chrome(container, options) {
        classCallCheck(this, Chrome);

        this.container = container;
        this.options = options;
    }

    createClass(Chrome, [{
        key: "create",
        value: function create(state, chromeProps, actions) {
            this.chromeData = this.options.createChrome(this.container, state, chromeProps, actions);
        }
    }, {
        key: "update",
        value: function update(state, chromeProps, actions) {
            this.chromeData = this.options.updateChrome(this.container, state, chromeProps, actions, this.chromeData);
        }
    }, {
        key: "destroy",
        value: function destroy() {
            this.options.destroyChrome(this.container, this.chromeData);
        }
    }]);
    return Chrome;
}();

var ScreenDefinition = function () {
    function ScreenDefinition(options) {
        classCallCheck(this, ScreenDefinition);

        this.options = options;
    }

    createClass(ScreenDefinition, [{
        key: "getOptions",
        value: function getOptions() {
            return this.options;
        }
    }]);
    return ScreenDefinition;
}();

var Screen = function () {
    function Screen(id, container, options, popScreenFunc, screenGuard) {
        classCallCheck(this, Screen);

        this.id = id;
        this.container = container;
        this.options = options;
        this.screenGuard = screenGuard;
        this.screenProps = {
            screenId: this.id,
            popScreen: popScreenFunc
        };
    }

    createClass(Screen, [{
        key: "getId",
        value: function getId() {
            return this.id;
        }
    }, {
        key: "create",
        value: function create(state, actions) {
            this.screenData = this.options.createScreen(this.container, state, actions, this.screenProps);
        }
    }, {
        key: "update",
        value: function update(state, actions) {
            this.screenData = this.options.updateScreen(this.container, state, actions, this.screenProps, this.screenData);
        }
    }, {
        key: "destroy",
        value: function destroy() {
            this.options.destroyScreen(this.container, this.screenData);
            this.container.parentNode.removeChild(this.container);
            if (this.screenGuard) {
                this.screenGuard.parentNode.removeChild(this.screenGuard);
            }
        }
    }]);
    return Screen;
}();

var UIContext = function () {
    function UIContext(urlBase) {
        classCallCheck(this, UIContext);

        this.viewSet = {};
        this.chromeSet = {};
        this.activeChrome = {};
        this.nextScreenID = 0;
        this.visibleViews = {};
        this.screenStack = [];
        this.urlBase = urlBase;
        this.routeTable = new RouteTable(urlBase);
    }

    createClass(UIContext, [{
        key: 'addView',
        value: function addView(key, viewOptions) {
            this.viewSet[key] = new ViewDefinition(viewOptions);
        }
    }, {
        key: 'addChrome',
        value: function addChrome(key, chromeOptions) {
            this.chromeSet[key] = new ChromeDefinition(chromeOptions);
        }
    }, {
        key: 'pushScreen',
        value: function pushScreen(screenOptions) {
            var guard = void 0;
            var screenDef = new ScreenDefinition(screenOptions);
            var screenContainer = document.createElement("div");
            var screenId = this.nextScreenID++;
            var popScreenFunc = this.popScreen.bind(this, screenId);
            if (screenOptions.renderScreenGuard) {
                guard = screenOptions.renderScreenGuard(popScreenFunc);
            }
            if (guard) {
                this.screenStackContainer.appendChild(guard);
            }
            this.screenStackContainer.appendChild(screenContainer);
            var scrn = new Screen(screenId, screenContainer, screenOptions, popScreenFunc, guard);
            screenContainer.className = this.contextKey + '-screen ' + this.contextKey + '-screen-' + scrn.getId();
            this.screenStack.push(scrn);
            scrn.create(this.getLatestAppState(), this.getLatestAppActions());
        }
    }, {
        key: 'popScreen',
        value: function popScreen(id) {
            var scrn = this.screenStack.filter(function (s) {
                return s.getId() === id;
            })[0];
            if (!scrn) {
                console.warn('pop screen, not found:', id);
            }
            var scrnIx = this.screenStack.indexOf(scrn);
            scrn.destroy();
            this.screenStack.splice(scrnIx, 1);
        }
    }, {
        key: 'screenActions',
        value: function screenActions() {
            return {
                push: this.pushScreen.bind(this),
                pop: this.popScreen.bind(this)
            };
        }
    }, {
        key: 'addRoute',
        value: function addRoute(routePath, viewName, routeName) {
            this.routeTable.addRoute(routePath, viewName, routeName);
        }
    }, {
        key: 'getMatchFromRoute',
        value: function getMatchFromRoute(path) {
            var match = this.routeTable.matchPath(path);
            return match ? match.attachPath(path, this.urlBase) : null;
        }
    }, {
        key: 'setRenderOrder',
        value: function setRenderOrder(newOrder) {
            this.renderOrder = newOrder;
        }
    }, {
        key: 'setContextKey',
        value: function setContextKey(contextKey) {
            this.contextKey = contextKey;
        }
    }, {
        key: 'setStateGetter',
        value: function setStateGetter(getter) {
            this.getLatestAppState = getter;
        }
    }, {
        key: 'setActionsGetter',
        value: function setActionsGetter(getter) {
            this.getLatestAppActions = getter;
        }
    }, {
        key: 'initialize',
        value: function initialize(container, props, chromeProps, appActions) {
            var _this = this;

            console.log("UIContext INIT", this.renderOrder, this.chromeSet, this.viewSet, props);
            this.chromeState = chromeProps;
            this.renderOrder.forEach(function (name) {
                if (name !== "**views") {
                    var chromeContainer = document.createElement("div");
                    chromeContainer.id = _this.contextKey + '-' + name;
                    container.appendChild(chromeContainer);
                    _this.activeChrome[name] = new Chrome(chromeContainer, _this.chromeSet[name].getOptions());
                    _this.activeChrome[name].create(props, chromeProps, appActions);
                } else {
                    var viewsContainer = document.createElement("div");
                    viewsContainer.id = _this.contextKey + '-viewsContainer';
                    container.appendChild(viewsContainer);
                    _this.viewContainer = viewsContainer;
                }
            });
            var screenStackContainer = document.createElement("div");
            screenStackContainer.id = this.contextKey + '-screenStack';
            container.appendChild(screenStackContainer);
            this.screenStackContainer = screenStackContainer;
            if (props.route) {
                this.loadRoute(props.route, props, chromeProps, appActions);
            }
        }
    }, {
        key: 'update',
        value: function update(state, appActions) {
            var _this2 = this;

            if (state.route.path !== this.activeView.route.path) {
                this.loadRoute(state.route, state, this.chromeState, appActions);
                // loadRoute promises may mutate the state, so recollect
                // state to ensure it's up to date
                state = this.getLatestAppState();
            }
            this.chromeState = this.activeView.update(state, this.chromeState, appActions);
            Object.keys(this.activeChrome).forEach(function (name) {
                var chrome = _this2.activeChrome[name];
                chrome.update(state, _this2.chromeState, appActions);
            });
            this.screenStack.forEach(function (scrn) {
                scrn.update(state, appActions);
            });
        }
    }, {
        key: 'renderErrorView',
        value: function renderErrorView(viewName, container, route, props, chromeProps, appActions, cb) {
            var _this3 = this;

            var errorView = this.viewSet[viewName].spawnView(container, route);
            this.visibleViews[route.path] = errorView;
            this.activeView = errorView;
            errorView.preLoadData(this.getLatestAppState(), appActions).then(function (viewState) {
                errorView.create(_this3.getLatestAppState(), chromeProps, appActions);
                cb(errorView);
            });
        }
    }, {
        key: 'loadRoute',
        value: function loadRoute(route, props, chromeProps, appActions) {
            var _this4 = this;

            if (!route.path) {
                throw new Error("Route views can only be loaded with paths.");
            }
            if (this.activeView) {
                this.exitingView = this.activeView;
            }
            var container = document.createElement("div");
            container.className = this.contextKey + '-' + route.viewName;
            this.viewContainer.appendChild(container);
            var view = this.viewSet[route.viewName].spawnView(container, route);
            this.visibleViews[route.path] = view;
            this.activeView = view;
            var viewReadyPromise = new Promise(function (resolve, reject) {
                view.preLoadData(props, appActions).then(function (state) {
                    console.log("Creating View", view);
                    _this4.chromeState = view.create(_this4.getLatestAppState(), chromeProps, appActions);
                    Object.keys(_this4.activeChrome).forEach(function (name) {
                        var chrome = _this4.activeChrome[name];
                        chrome.update(_this4.getLatestAppState(), _this4.chromeState, appActions);
                    });
                    view.postLoadData(_this4.getLatestAppState(), appActions);
                    resolve(view);
                }, function (error) {
                    console.log(error);
                    console.log(error.name);
                    if (error.name === "RequestNotFoundError" && _this4.viewSet["**404"]) {
                        return _this4.renderErrorView("**404", container, route, props, chromeProps, appActions, resolve);
                    } else if (error.name === "RequestForbiddenError" && _this4.viewSet["**403"]) {
                        return _this4.renderErrorView("**403", container, route, props, chromeProps, appActions, resolve);
                    } else if (error.name === "RequestClientError" && _this4.viewSet["**400"]) {
                        return _this4.renderErrorView("**400", container, route, props, chromeProps, appActions, resolve);
                    } else if (error.name === "RequestServerError" && _this4.viewSet["**500"]) {
                        return _this4.renderErrorView("**500", container, route, props, chromeProps, appActions, resolve);
                    } else if (error.name === "RequestOfflineError" && _this4.viewSet["**offline"]) {
                        return _this4.renderErrorView("**offline", container, route, props, chromeProps, appActions, resolve);
                    } else {
                        console.log("Errored Out", error, view);
                    }
                    container.innerHTML = '\n            UNHANDLED ERROR IN APPLICATION<br/>\n            You are missing an error view handler, **404, **403, **500 or offline\n          ';
                    resolve(error);
                });
            });
            console.log("Loading route", route);
            this.transitionViews(this.activeView, viewReadyPromise, this.exitingView);
        }
    }, {
        key: 'setTransitionHandler',
        value: function setTransitionHandler(func) {
            this.transitionHandler = func;
        }
    }, {
        key: 'transitionViews',
        value: function transitionViews(entering, loadingPromise, exiting) {
            var _this5 = this;

            if (this.transitionHandler) {
                this.transitionHandler(entering, loadingPromise, exiting);
            } else {
                (function () {
                    // default transition handling
                    var enterContainer = entering.container;
                    var enterClass = _this5.contextKey + '-enteringView';
                    var exitClass = _this5.contextKey + '-exitingView';
                    enterContainer.classList.add(enterClass);
                    if (exiting) {
                        var exitContainer = exiting.container;
                        exitContainer.style.opacity = "0.5";
                        exitContainer.classList.add(exitClass);
                        loadingPromise.then(function (result) {
                            exiting.destroy();
                            enterContainer.classList.remove(enterClass);
                        });
                    }
                })();
            }
        }
    }]);
    return UIContext;
}();

var OffsideAppContainer = function () {
    function OffsideAppContainer() {
        classCallCheck(this, OffsideAppContainer);

        this.uiContexts = {};
        this.commsChannels = {};
        this.appActor = new AppActor();
        this.appActor.setStateGetter(this.getState.bind(this));
        this.appActor.setActionsGetter(this.getActions.bind(this));
        this.appActions = {
            ui: {},
            business: {},
            comms: {},
            routes: {
                goTo: this.goToRoute.bind(this)
            }
        };
    }

    createClass(OffsideAppContainer, [{
        key: 'setBusinessDispatch',
        value: function setBusinessDispatch(func) {
            this.appActor.setBusinessDispatch(func);
        }
    }, {
        key: 'bindActor',
        value: function bindActor(leaf) {
            var _this = this;

            if ((typeof leaf === 'undefined' ? 'undefined' : _typeof(leaf)) === "object") {
                var _ret = function () {
                    var funcs = {};
                    Object.keys(leaf).forEach(function (funcKey) {
                        funcs[funcKey] = _this.bindActor(leaf[funcKey]);
                    });
                    return {
                        v: funcs
                    };
                }();

                if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
            } else if (typeof leaf === "function") {
                return leaf.bind(this.appActor);
            } else {
                return leaf;
            }
        }
    }, {
        key: 'setBusinessActions',
        value: function setBusinessActions(actionObject) {
            this.appActions.business = this.bindActor(actionObject);
        }
    }, {
        key: 'addCommsChannel',
        value: function addCommsChannel(commsChannel) {
            this.commsChannels[commsChannel.name] = commsChannel;
            this.appActions.comms[commsChannel.name] = commsChannel.actions();
            commsChannel.setStateSetter(this.updateCommsState.bind(this));
        }
    }, {
        key: 'setUiDispatch',
        value: function setUiDispatch(func) {
            this.appActor.setUiDispatch(func);
        }
    }, {
        key: 'setUiActions',
        value: function setUiActions(actionObject) {
            this.appActions.ui = this.bindActor(actionObject);
        }
    }, {
        key: 'setupLocalisation',
        value: function setupLocalisation(translationResources) {
            this.localizeSpawner = new LocalizeSpawner(translationResources);
        }
    }, {
        key: 'addUIContext',
        value: function addUIContext(name, context) {
            this.uiContexts[name] = context;
        }
    }, {
        key: 'loadUIContext',
        value: function loadUIContext(contextName) {
            this.activeUI = this.uiContexts[contextName];
            this.activeUI.setContextKey(contextName);
            this.appActions.screenStack = this.activeUI.screenActions();
        }
    }, {
        key: 'initializeAppState',
        value: function initializeAppState(lang, businessData, uiData, chromeData) {
            var _this2 = this;

            if (!this.activeUI) {
                throw new Error("UI Context must be loaded before initializing app.");
            }
            var l10n = this.localizeSpawner.loadLocale(lang);
            var route = this.activeUI.getMatchFromRoute(window.location.pathname);
            var comms = {};
            Object.keys(this.commsChannels).forEach(function (name) {
                comms[name] = _this2.commsChannels[name].getState();
            });
            var routes = this.activeUI.routeTable;
            this.appState = { l10n: l10n, uiData: uiData, businessData: businessData, route: route, routes: routes, comms: comms };
            this.chromeState = chromeData;
        }
    }, {
        key: 'getState',
        value: function getState() {
            return this.appState;
        }
    }, {
        key: 'getActions',
        value: function getActions() {
            return this.appActions;
        }
    }, {
        key: 'getActor',
        value: function getActor() {
            return this.appActor;
        }
    }, {
        key: 'initializeUI',
        value: function initializeUI(container) {
            this.activeUI.setStateGetter(this.getState.bind(this));
            this.activeUI.setActionsGetter(this.getActions.bind(this));
            this.setupRouteListeners();
            this.activeUI.initialize(container, this.appState, this.chromeState, this.appActions);
        }
    }, {
        key: 'updateCommsState',
        value: function updateCommsState(key, state) {
            var _this3 = this;

            var nextComms = {};
            Object.keys(this.appState.comms).forEach(function (name) {
                nextComms[name] = _this3.appState.comms[name];
            });
            nextComms[key] = state;
            this.updateAppState("comms", nextComms);
        }
    }, {
        key: 'updateAppState',
        value: function updateAppState(key, updateValue) {
            var nextState = {
                l10n: this.appState.l10n,
                route: this.appState.route,
                routes: this.appState.routes,
                comms: this.appState.comms,
                uiData: this.appState.uiData,
                businessData: this.appState.businessData
            };
            // short circuit if no actual changes given
            if (nextState[key] === updateValue) {
                return;
            }
            if (key === "route") {
                nextState.route = updateValue;
            }
            if (key === "comms") {
                nextState.comms = updateValue;
            }
            if (key === "uiData") {
                nextState.uiData = updateValue;
            }
            if (key === "businessData") {
                nextState.businessData = updateValue;
            }
            this.appState = nextState;
            this.activeUI.update(nextState, this.appActions);
        }
    }, {
        key: 'setupRouteListeners',
        value: function setupRouteListeners() {
            var _this4 = this;

            document.addEventListener("click", function (e) {
                var target = e.target;
                while (target && target.tagName !== 'A') {
                    target = target.parentNode;
                }
                if (target && target.getAttribute("href") && !target.getAttribute("download") && !target.getAttribute("target")) {
                    var path = target.getAttribute("href");
                    if (path.indexOf("http") === 0) {
                        return;
                    }
                    var route = _this4.activeUI.getMatchFromRoute(path);
                    if (route) {
                        e.preventDefault();
                        window.history.pushState(null, "", path);
                        _this4.updateAppState("route", route);
                    }
                }
            });
            window.onpopstate = function (event) {
                var path = window.location.pathname;
                var route = _this4.activeUI.getMatchFromRoute(path);
                _this4.updateAppState("route", route);
            };
            window.onpageshow = function (event) {
                var path = window.location.pathname;
                var route = _this4.activeUI.getMatchFromRoute(path);
                _this4.updateAppState("route", route);
            };
        }
    }, {
        key: 'goToRoute',
        value: function goToRoute(path) {
            if (window.location.pathname != path) {
                var route = this.activeUI.getMatchFromRoute(path);
                window.history.pushState(null, "", path);
                this.updateAppState("route", route);
            }
        }
    }]);
    return OffsideAppContainer;
}();

var OffsideAppContainerObject = {
    OffsideAppContainer: OffsideAppContainer,
    UIContext: UIContext,
    CommsChannel: CommsChannel,
    CommsDefaultErrorProcessing: defaultErrorProcessing,
    RequestServerError: RequestServerError, RequestOfflineError: RequestOfflineError,
    RequestForbiddenError: RequestForbiddenError, RequestNotFoundError: RequestNotFoundError,
    RequestClientError: RequestClientError,
    Localize: LocalizeSpawner,
    AppActor: AppActor,
    FormInstance: FormInstance,
    FormDefinition: FormDefinition,
    FormStepDefinition: FormStepDefinition,
    FormFieldDefinition: FormFieldDefinition,
    FormValidationStyle: exports.FormValidationStyle,
    FormError: FormError,
    FormWarning: FormWarning,
    RouteTable: RouteTable,
    RouteMatcher: RouteMatcher
};
if (typeof window !== "undefined") {
    window['OffsideAppContainer'] = OffsideAppContainerObject;
}

exports['default'] = OffsideAppContainer;
exports.UIContext = UIContext;
exports.CommsChannel = CommsChannel;
exports.defaultErrorProcessing = defaultErrorProcessing;
exports.RequestServerError = RequestServerError;
exports.RequestOfflineError = RequestOfflineError;
exports.RequestForbiddenError = RequestForbiddenError;
exports.RequestNotFoundError = RequestNotFoundError;
exports.RequestClientError = RequestClientError;
exports.Localize = LocalizeSpawner;
exports.AppActor = AppActor;
exports.FormInstance = FormInstance;
exports.FormDefinition = FormDefinition;
exports.FormStepDefinition = FormStepDefinition;
exports.FormFieldDefinition = FormFieldDefinition;
exports.FormError = FormError;
exports.FormWarning = FormWarning;
exports.RouteTable = RouteTable;
exports.RouteMatcher = RouteMatcher;