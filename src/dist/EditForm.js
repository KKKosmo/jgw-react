"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/components/MainFormSubmit.js
var react_1 = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
var Calendar_1 = __importDefault(require("./Calendar"));
var EditForm = function (props) {
    var navigate = (0, react_router_dom_1.useNavigate)();
    var user = props.user;
    var id = (0, react_router_dom_1.useParams)().id; // Get the ID from the route parameters
    var monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    var _a = (0, react_1.useState)(function () {
        return Array.from({ length: 42 }, function (_, index) { return ({
            dayNumber: String(index + 1),
            data: 'data,data,data,data,data,data,',
            availability: true,
        }); });
    }), calendarData = _a[0], setCalendarData = _a[1];
    var _b = (0, react_1.useState)({
        user: '',
        name: '',
        pax: 0,
        vehicle: 0,
        pets: false,
        videoke: false,
        partial_payment: 0.0,
        full_payment: 0.0,
        paid: false,
        checkIn: '',
        checkOut: '',
        room: '',
    }), formData = _b[0], setFormData = _b[1];
    var _c = (0, react_1.useState)([]), selectedRooms = _c[0], setSelectedRooms = _c[1];
    (0, react_1.useEffect)(function () {
        var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, result_1, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch("http://localhost:8000/api/main/".concat(id), {
                                headers: {
                                    'Content-Type': 'application/json',
                                    'X-Requested-With': 'XMLHttpRequest',
                                },
                                credentials: 'include',
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("HTTP error! Status: ".concat(response.status));
                        }
                        return [4 /*yield*/, response.json()];
                    case 2:
                        result_1 = _a.sent();
                        setFormData(function (prevData) { return (__assign(__assign(__assign({}, prevData), result_1), { videoke: Boolean(result_1.videoke), pets: Boolean(result_1.pets) })); });
                        setSelectedRooms(result_1.room.split(',').map(function (room) { return room.trim().toUpperCase(); }));
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Error fetching data:', error_1.message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        fetchData();
    }, [id]);
    var _d = (0, react_1.useState)(new Date()), currentDate = _d[0], setCurrentDate = _d[1];
    var _e = (0, react_1.useState)(), calendarMonth = _e[0], setCalendarMonth = _e[1];
    (0, react_1.useEffect)(function () {
        setCalendarMonth("".concat(monthNames[currentDate.getMonth()]));
        getNewSet(currentDate.toDateString(), currentDate.toDateString());
        return function () {
        };
    }, [currentDate]);
    var handlePrevMonth = function () {
        var prevMonth = new Date(currentDate);
        prevMonth.setMonth(prevMonth.getMonth() - 1);
        setCurrentDate(prevMonth);
    };
    var handleNextMonth = function () {
        var nextMonth = new Date(currentDate);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        setCurrentDate(nextMonth);
    };
    var checkForm = function (startDate, endDate, room) { return __awaiter(void 0, void 0, void 0, function () {
        var link, response, errorData, errorMessage, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    link = "http://localhost:8000/api/main/checkEditForm?startDate=".concat(startDate, "&endDate=").concat(endDate, "&room=").concat(room, "&id=").concat(id);
                    console.log(link);
                    return [4 /*yield*/, fetch(link, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'X-Requested-With': 'XMLHttpRequest',
                            },
                            credentials: 'include',
                        })];
                case 1:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    errorData = _a.sent();
                    errorMessage = errorData.error;
                    throw new Error("".concat(errorMessage));
                case 3: return [4 /*yield*/, response.json()];
                case 4:
                    data = _a.sent();
                    if (data.available === 'true') {
                        return [2 /*return*/, true];
                    }
                    else if (data.available === 'false') {
                        alert("Error: Room " + formData.room + " is/are not available for " + formData.checkIn + " to " + formData.checkOut);
                        return [2 /*return*/, false];
                    }
                    else {
                        throw new Error("Unexpected response: ".concat(data.available));
                    }
                    return [3 /*break*/, 6];
                case 5:
                    error_2 = _a.sent();
                    console.error('ERROR:', error_2);
                    alert(error_2);
                    return [2 /*return*/, false];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var getNewSet = function (startDate, endDate) { return __awaiter(void 0, void 0, void 0, function () {
        var link, response, jsonData_1, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    link = "http://localhost:8000/api/main/getNewSetEdit?startDate=".concat(startDate, "&endDate=").concat(endDate, "&id=").concat(id);
                    return [4 /*yield*/, fetch(link, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'X-Requested-With': 'XMLHttpRequest',
                            },
                            credentials: 'include',
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error! Status: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    jsonData_1 = _a.sent();
                    setCalendarData(function (prevCalendarData) {
                        var updatedData = prevCalendarData.map(function (item, index) {
                            var dayNumber = jsonData_1.dayNumber[index] || '';
                            var data = jsonData_1.data[index] || '';
                            var blockData = data.split(',').map(function (item) { return item.trim(); });
                            var isBlockDataValid = true;
                            for (var _i = 0, selectedRooms_1 = selectedRooms; _i < selectedRooms_1.length; _i++) {
                                var element = selectedRooms_1[_i];
                                if (!blockData.includes(element)) {
                                    isBlockDataValid = false;
                                    break;
                                }
                            }
                            return __assign(__assign({}, item), { dayNumber: dayNumber, data: data, availability: isBlockDataValid });
                        });
                        return updatedData;
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.error('Error fetching data from the API:', error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    (0, react_1.useEffect)(function () {
        if (formData.checkIn) {
            var checkInDate = new Date(formData.checkIn);
            if (!formData.checkOut && calendarMonth !== monthNames[checkInDate.getMonth()]) {
                getNewSet(formData.checkIn, formData.checkIn);
                setCurrentDate(new Date(formData.checkIn));
            }
        }
    }, [formData.checkIn]);
    (0, react_1.useEffect)(function () {
        if (formData.checkOut) {
            var checkOutDate = new Date(formData.checkOut);
            if (!formData.checkIn && calendarMonth !== monthNames[checkOutDate.getMonth()]) {
                getNewSet(formData.checkOut, formData.checkOut);
                setCurrentDate(new Date(formData.checkOut));
            }
        }
    }, [formData.checkOut]);
    (0, react_1.useEffect)(function () {
        // if (formData.checkIn && formData.checkOut) {
        setCalendarData(function (prevCalendarData) {
            var updatedData = prevCalendarData.map(function (item) {
                var blockData = item.data.split(',').map(function (item) { return item.trim(); });
                var isBlockDataValid = true;
                for (var _i = 0, selectedRooms_2 = selectedRooms; _i < selectedRooms_2.length; _i++) {
                    var element = selectedRooms_2[_i];
                    if (!blockData.includes(element)) {
                        isBlockDataValid = false;
                        break;
                    }
                }
                return __assign(__assign({}, item), { availability: isBlockDataValid });
            });
            return updatedData;
        });
        // }
    }, [selectedRooms]);
    var handleInputChange = function (e) {
        var _a = e.target, name = _a.name, value = _a.value, type = _a.type;
        setFormData(function (prevData) {
            var _a;
            return (__assign(__assign({}, prevData), (_a = {}, _a[name] = type === 'radio' ? value === 'true' : value, _a)));
        });
    };
    var handleCheckboxChange = function (e) {
        var _a = e.target, name = _a.name, checked = _a.checked;
        if (name === 'e' && checked) {
            setSelectedRooms(['E']);
        }
        else {
            setSelectedRooms(function (prevRooms) {
                if (checked) {
                    return __spreadArray(__spreadArray([], prevRooms.filter(function (room) { return room !== 'E'; }), true), [name.toUpperCase()], false);
                }
                else {
                    return prevRooms.filter(function (room) { return room !== name.toUpperCase(); });
                }
            });
        }
    };
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var formattedRoom, response, data, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    formattedRoom = selectedRooms.join(', ');
                    formData.room = formattedRoom;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, checkForm(formData.checkIn, formData.checkOut, formData.room)];
                case 2:
                    if (!_a.sent()) return [3 /*break*/, 5];
                    return [4 /*yield*/, fetch("http://localhost:8000/api/main/".concat(id), {
                            method: 'PUT', // Use PUT method for updating
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            credentials: 'include',
                            body: JSON.stringify(formData),
                        })];
                case 3:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 4:
                    data = _a.sent();
                    if (data.message === 'Record updated successfully') {
                        navigate('/');
                    }
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_4 = _a.sent();
                    console.error('Error updating record:', error_4);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h2", null, "Edit Form"),
        react_1.default.createElement("form", { onSubmit: handleSubmit, className: "form" },
            react_1.default.createElement("label", { className: "label" },
                "Name:",
                react_1.default.createElement("input", { className: "input", type: "text", name: "name", value: formData.name, onChange: handleInputChange, required: true })),
            react_1.default.createElement("label", { className: "label" },
                "Pax:",
                react_1.default.createElement("input", { className: "input", type: "number", name: "pax", min: "0", value: formData.pax, onChange: handleInputChange, required: true })),
            react_1.default.createElement("label", { className: "label" },
                "Vehicle:",
                react_1.default.createElement("input", { className: "input", type: "number", name: "vehicle", min: "0", value: formData.vehicle, onChange: handleInputChange, required: true })),
            react_1.default.createElement("label", { className: "label" },
                "Pets:",
                react_1.default.createElement("input", { className: "input", type: "radio", name: "pets", value: "true", checked: formData.pets === true, onChange: handleInputChange }),
                " Yes",
                react_1.default.createElement("input", { className: "input", type: "radio", name: "pets", value: "false", checked: formData.pets === false, onChange: handleInputChange }),
                " No"),
            react_1.default.createElement("label", { className: "label" },
                "Videoke:",
                react_1.default.createElement("input", { className: "input", type: "radio", name: "videoke", value: "true", checked: formData.videoke === true, onChange: handleInputChange }),
                " Yes",
                react_1.default.createElement("input", { className: "input", type: "radio", name: "videoke", value: "false", checked: formData.videoke === false, onChange: handleInputChange }),
                " No"),
            react_1.default.createElement("label", { className: "label" },
                "Partial Payment:",
                react_1.default.createElement("input", { className: "input", type: "number", step: "0.01", min: "0", name: "partial_payment", value: formData.partial_payment, onChange: handleInputChange, required: true })),
            react_1.default.createElement("label", { className: "label" },
                "Full Payment:",
                react_1.default.createElement("input", { className: "input", type: "number", step: "0.01", min: "0", name: "full_payment", value: formData.full_payment, onChange: handleInputChange, required: true })),
            react_1.default.createElement("label", { className: "label" },
                "Check In:",
                react_1.default.createElement("input", { className: "input", type: "date", name: "checkIn", value: formData.checkIn, onChange: handleInputChange, required: true })),
            react_1.default.createElement("label", { className: "label" },
                "Check Out:",
                react_1.default.createElement("input", { className: "input", type: "date", name: "checkOut", value: formData.checkOut, onChange: handleInputChange, required: true })),
            react_1.default.createElement("label", { className: "label" },
                "Room:",
                react_1.default.createElement("input", { className: "input", type: "checkbox", name: "J", checked: selectedRooms.includes('J'), onChange: handleCheckboxChange }),
                "J",
                react_1.default.createElement("input", { className: "input", type: "checkbox", name: "G", checked: selectedRooms.includes('G'), onChange: handleCheckboxChange }),
                "G",
                react_1.default.createElement("input", { className: "input", type: "checkbox", name: "a", checked: selectedRooms.includes('A'), onChange: handleCheckboxChange }),
                "ATTIC",
                react_1.default.createElement("input", { className: "input", type: "checkbox", name: "k1", checked: selectedRooms.includes('K1'), onChange: handleCheckboxChange }),
                "KUBO 1",
                react_1.default.createElement("input", { className: "input", type: "checkbox", name: "k2", checked: selectedRooms.includes('K2'), onChange: handleCheckboxChange }),
                "KUBO 2",
                react_1.default.createElement("input", { className: "input", type: "checkbox", name: "e", checked: selectedRooms.includes('E'), onChange: handleCheckboxChange }),
                "EXCLUSIVE"),
            react_1.default.createElement("button", { type: "submit", className: "submit-button" }, "Update")),
        react_1.default.createElement("div", null,
            react_1.default.createElement("button", { onClick: handlePrevMonth }, "Previous Month"),
            react_1.default.createElement("button", { onClick: handleNextMonth }, "Next Month"),
            react_1.default.createElement("h1", { id: 'calendarMonth' },
                react_1.default.createElement("span", null, "".concat(monthNames[currentDate.getMonth()], " ").concat(currentDate.getFullYear())))),
        react_1.default.createElement(Calendar_1.default, { calendarData: calendarData })));
};
exports.default = EditForm;
