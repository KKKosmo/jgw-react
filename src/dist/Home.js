"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
var react_bootstrap_1 = require("react-bootstrap");
var Home = function (_a) {
    var user = _a.user;
    var _b = (0, react_1.useState)([]), data = _b[0], setData = _b[1];
    var _c = (0, react_1.useState)('id'), sortColumn = _c[0], setSortColumn = _c[1];
    var _d = (0, react_1.useState)('asc'), sortOrder = _d[0], setSortOrder = _d[1];
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _e = (0, react_1.useState)(null), selectedItem = _e[0], setSelectedItem = _e[1]; // Track selected item for modal
    var _f = (0, react_1.useState)(false), showModal = _f[0], setShowModal = _f[1];
    var handleExpand = function (item) {
        setSelectedItem(item);
        setShowModal(true);
    };
    var closeModal = function () {
        setShowModal(false);
    };
    var defaultOrders = {
        id: 'asc',
        dateInserted: 'desc', // Set to 'desc' for dateInserted
        name: 'asc',
        pax: 'asc',
        vehicle: 'asc',
        pets: 'desc', // Set to 'desc' for pets
        videoke: 'desc', // Set to 'desc' for videoke
        partial_payment: 'asc',
        full_payment: 'asc',
        balance: 'desc',
        paid: 'asc',
        checkIn: 'desc', // Set to 'desc' for checkIn
        checkOut: 'desc', // Set to 'desc' for checkOut
        room: 'asc',
        user: 'asc',
    };
    var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("http://localhost:8000/api/main?sort=".concat(sortColumn, "&order=").concat(sortOrder), {
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
                    result = _a.sent();
                    setData(result || []);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error fetching data:', error_1.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    (0, react_1.useEffect)(function () {
        // Call fetchData when the component mounts or when sortColumn/sortOrder changes
        fetchData();
    }, [sortColumn, sortOrder]);
    var handleEdit = function (id) {
        navigate("/edit/".concat(id));
    };
    var handleDelete = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var response, data_1, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("http://localhost:8000/api/main/".concat(id), {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            credentials: 'include',
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data_1 = _a.sent();
                    console.log('Response:', data_1);
                    // Reload data after deletion
                    fetchData();
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error('Error deleting record:', error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleSort = function (column) {
        if (column != sortColumn) {
            setSortOrder(defaultOrders[column]);
        }
        else {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        }
        setSortColumn(column);
    };
    var renderHeader = function () {
        return (react_1.default.createElement("tr", null,
            react_1.default.createElement("th", { onClick: function () { return handleSort('id'); } }, "ID"),
            react_1.default.createElement("th", { onClick: function () { return handleSort('dateInserted'); } }, "Date Inserted"),
            react_1.default.createElement("th", { onClick: function () { return handleSort('name'); } }, "Name"),
            react_1.default.createElement("th", { onClick: function () { return handleSort('pax'); } }, "Pax"),
            react_1.default.createElement("th", { onClick: function () { return handleSort('vehicle'); } }, "Vehicle"),
            react_1.default.createElement("th", { onClick: function () { return handleSort('pets'); } }, "Pets"),
            react_1.default.createElement("th", { onClick: function () { return handleSort('videoke'); } }, "Videoke"),
            react_1.default.createElement("th", { onClick: function () { return handleSort('partial_payment'); } }, "Partial Payment"),
            react_1.default.createElement("th", { onClick: function () { return handleSort('full_payment'); } }, "Full Payment"),
            react_1.default.createElement("th", { onClick: function () { return handleSort('balance'); } }, "Balance"),
            react_1.default.createElement("th", { onClick: function () { return handleSort('paid'); } }, "Fully Paid"),
            react_1.default.createElement("th", { onClick: function () { return handleSort('checkIn'); } }, "Check In"),
            react_1.default.createElement("th", { onClick: function () { return handleSort('checkOut'); } }, "Check Out"),
            react_1.default.createElement("th", { onClick: function () { return handleSort('room'); } }, "Room"),
            react_1.default.createElement("th", { onClick: function () { return handleSort('user'); } }, "User")));
    };
    var renderRows = function () {
        return data.map(function (item, index) { return (react_1.default.createElement("tr", { key: item.id, onClick: function () { return handleExpand(item); }, style: { backgroundColor: index % 2 === 0 ? '#f5f5f5' : 'white' } },
            react_1.default.createElement("td", { style: { whiteSpace: 'nowrap' } }, item.id),
            react_1.default.createElement("td", { style: { whiteSpace: 'nowrap' } }, item.dateInserted),
            react_1.default.createElement("td", { style: { whiteSpace: 'nowrap' } }, item.name),
            react_1.default.createElement("td", { style: { whiteSpace: 'nowrap' } }, item.pax),
            react_1.default.createElement("td", { style: { whiteSpace: 'nowrap' } }, item.vehicle),
            react_1.default.createElement("td", { style: { whiteSpace: 'nowrap' } }, item.pets ? 'Yes' : 'No'),
            react_1.default.createElement("td", { style: { whiteSpace: 'nowrap' } }, item.videoke ? 'Yes' : 'No'),
            react_1.default.createElement("td", { style: { whiteSpace: 'nowrap' } }, item.partial_payment),
            react_1.default.createElement("td", { style: { whiteSpace: 'nowrap' } }, item.full_payment),
            react_1.default.createElement("td", { style: { whiteSpace: 'nowrap' } }, item.balance),
            react_1.default.createElement("td", { style: { whiteSpace: 'nowrap' } }, item.paid ? 'Yes' : 'No'),
            react_1.default.createElement("td", { style: { whiteSpace: 'nowrap' } }, item.checkIn),
            react_1.default.createElement("td", { style: { whiteSpace: 'nowrap' } }, item.checkOut),
            react_1.default.createElement("td", { style: { whiteSpace: 'nowrap' } }, item.room),
            react_1.default.createElement("td", { style: { whiteSpace: 'nowrap' } }, item.user))); });
    };
    return (react_1.default.createElement("div", null,
        user ? 'Hi ' + user : 'You are not logged in',
        react_1.default.createElement("h1", null, "Main List"),
        react_1.default.createElement(react_bootstrap_1.Table, { responsive: true },
            react_1.default.createElement("thead", null, renderHeader()),
            react_1.default.createElement("tbody", null, renderRows())),
        react_1.default.createElement(react_bootstrap_1.Modal, { show: showModal, onHide: closeModal },
            react_1.default.createElement(react_bootstrap_1.Modal.Header, { closeButton: true },
                react_1.default.createElement(react_bootstrap_1.Modal.Title, null, "Details")),
            react_1.default.createElement(react_bootstrap_1.Modal.Body, null, selectedItem && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("p", null,
                    react_1.default.createElement("strong", null, "Name:"),
                    " ",
                    selectedItem.name),
                react_1.default.createElement("p", null,
                    react_1.default.createElement("strong", null, "Pax:"),
                    " ",
                    selectedItem.pax),
                react_1.default.createElement("p", null,
                    react_1.default.createElement("strong", null, "Vehicle:"),
                    " ",
                    selectedItem.vehicle),
                react_1.default.createElement("p", null,
                    react_1.default.createElement("strong", null, "Pets:"),
                    " ",
                    selectedItem.pets ? 'Yes' : 'No'),
                react_1.default.createElement("p", null,
                    react_1.default.createElement("strong", null, "Videoke:"),
                    " ",
                    selectedItem.videoke ? 'Yes' : 'No'),
                react_1.default.createElement("p", null,
                    react_1.default.createElement("strong", null, "Partial Payment:"),
                    " ",
                    selectedItem.partial_payment),
                react_1.default.createElement("p", null,
                    react_1.default.createElement("strong", null, "Full Payment:"),
                    " ",
                    selectedItem.full_payment),
                react_1.default.createElement("p", null,
                    react_1.default.createElement("strong", null, "Balance:"),
                    " ",
                    selectedItem.balance),
                react_1.default.createElement("p", null,
                    react_1.default.createElement("strong", null, "Fully Paid:"),
                    " ",
                    selectedItem.paid ? 'Yes' : 'No'),
                react_1.default.createElement("p", null,
                    react_1.default.createElement("strong", null, "Check In:"),
                    " ",
                    selectedItem.checkIn),
                react_1.default.createElement("p", null,
                    react_1.default.createElement("strong", null, "Check Out:"),
                    " ",
                    selectedItem.checkOut),
                react_1.default.createElement("p", null,
                    react_1.default.createElement("strong", null, "Room:"),
                    " ",
                    selectedItem.room),
                react_1.default.createElement("p", null,
                    react_1.default.createElement("strong", null, "User:"),
                    " ",
                    selectedItem.user)))),
            react_1.default.createElement(react_bootstrap_1.Modal.Footer, null,
                react_1.default.createElement(react_bootstrap_1.Button, { variant: "primary", onClick: function () { var _a; return handleEdit((_a = selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.id) !== null && _a !== void 0 ? _a : 0); } }, "Edit"),
                react_1.default.createElement(react_bootstrap_1.Button, { variant: "danger", onClick: function () { var _a; return handleDelete((_a = selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.id) !== null && _a !== void 0 ? _a : 0); } }, "Delete"),
                react_1.default.createElement(react_bootstrap_1.Button, { variant: "secondary", onClick: closeModal }, "Close")))));
};
exports.default = Home;
