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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
var react_bootstrap_1 = require("react-bootstrap");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var ITEMS_PER_PAGE = 10;
var Home = function (_a) {
    var user = _a.user;
    var _b = (0, react_1.useState)([]), data = _b[0], setData = _b[1];
    var _c = (0, react_1.useState)('id'), sortColumn = _c[0], setSortColumn = _c[1];
    var _d = (0, react_1.useState)('desc'), sortOrder = _d[0], setSortOrder = _d[1];
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _e = (0, react_1.useState)(null), selectedItem = _e[0], setSelectedItem = _e[1];
    var _f = (0, react_1.useState)(false), showModal = _f[0], setShowModal = _f[1];
    var _g = (0, react_1.useState)(1), currentPage = _g[0], setCurrentPage = _g[1];
    var _h = (0, react_1.useState)(0), totalItems = _h[0], setTotalItems = _h[1]; // State for total items
    var _j = (0, react_1.useState)(0), totalPages = _j[0], setTotalPages = _j[1]; // State for total pages
    var _k = (0, react_1.useState)(''), nameFilter = _k[0], setNameFilter = _k[1];
    var _l = (0, react_1.useState)(''), selectedMonth = _l[0], setSelectedMonth = _l[1];
    var _m = (0, react_1.useState)(''), startDate = _m[0], setStartDate = _m[1];
    var _o = (0, react_1.useState)(''), endDate = _o[0], setEndDate = _o[1];
    var _p = (0, react_1.useState)([]), roomSelection = _p[0], setRoomSelection = _p[1];
    var _q = (0, react_1.useState)(false), dateFiltersVisible = _q[0], setDateFiltersVisible = _q[1];
    var handleToggleDateFilters = function () {
        setDateFiltersVisible(!dateFiltersVisible);
    };
    var handleRoomChange = function (room) {
        var updatedSelection = roomSelection.includes(room)
            ? roomSelection.filter(function (selectedRoom) { return selectedRoom !== room; })
            : __spreadArray(__spreadArray([], roomSelection, true), [room], false);
        setRoomSelection(updatedSelection);
    };
    var handleStartDateChange = function (event) {
        setStartDate(event.target.value);
    };
    var handleEndDateChange = function (event) {
        setEndDate(event.target.value);
    };
    var handleMonthChange = function (event) {
        var selectedValue = event.target.value;
        if (selectedValue == 'none') {
            setSelectedMonth("");
            setStartDate('');
            setEndDate('');
        }
        else {
            var _a = selectedValue.split(' '), numericMonth = _a[0], year = _a[1];
            var selectedStartDate = new Date("".concat(year, "-").concat(numericMonth, "-01"));
            selectedStartDate.setHours(16);
            var lastDayOfMonth = new Date(parseInt(year, 10), parseInt(numericMonth, 10), 0);
            lastDayOfMonth.setHours(16);
            setSelectedMonth("".concat(numericMonth, " ").concat(year));
            setStartDate(selectedStartDate.toISOString().split('T')[0]);
            setEndDate(lastDayOfMonth.toISOString().split('T')[0]);
        }
    };
    var generateMonthOptions = function () {
        var options = [];
        var currentYear = new Date().getFullYear();
        var currentMonth = new Date().getMonth() + 1;
        var startYear = 2023;
        var startMonth = 12;
        // Calculate the difference in months between the current date and December 2023
        var monthsDifference = (currentYear - startYear) * 12 + currentMonth - startMonth + 1;
        for (var i = 0; i < monthsDifference + 3; i++) {
            var monthValue = (startMonth + i) % 12 || 12; // Ensure values are between 1 and 12
            var year = startYear + Math.floor((startMonth + i - 1) / 12);
            var optionValue = "".concat(monthValue, " ").concat(year);
            options.push(react_1.default.createElement("option", { key: "".concat(year, "-").concat(monthValue), value: optionValue }, new Date(year, monthValue - 1, 1).toLocaleDateString('en-US', {
                month: 'short', // Use 'short' for abbreviated month name (MMM)
                year: 'numeric',
            })));
        }
        return options;
    };
    var handleExpand = function (item) {
        setSelectedItem(item);
        setShowModal(true);
    };
    var closeModal = function () {
        setShowModal(false);
    };
    var defaultOrders = {
        id: 'desc',
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
    (0, react_1.useEffect)(function () {
        fetchData();
    }, [sortColumn, sortOrder, currentPage]);
    var handleResetFilters = function () {
        setNameFilter('');
        setSelectedMonth('none');
        setStartDate('');
        setEndDate('');
        setRoomSelection([]);
        setSortColumn('id');
        setSortOrder('desc');
    };
    var handleNameChange = function (event) {
        setNameFilter(event.target.value);
    };
    var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
        var roomFilter, response, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    roomFilter = roomSelection.join(',');
                    return [4 /*yield*/, fetch("http://localhost:8000/api/main?sort=".concat(sortColumn, "&order=").concat(sortOrder, "&page=").concat(currentPage, "&perPage=").concat(ITEMS_PER_PAGE, "&name=").concat(nameFilter, "&startDate=").concat(startDate, "&endDate=").concat(endDate, "&rooms=").concat(roomFilter), {
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
                    setData(result.data || []);
                    setTotalItems(result.total || 0);
                    setTotalPages(Math.ceil(result.total / ITEMS_PER_PAGE));
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error fetching data:', error_1.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
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
                    console.log(data_1);
                    if (data_1.message === 'Record deleted successfully') {
                        closeModal();
                        alert("Record id: " + id + " deleted successfully.");
                    }
                    fetchData();
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    alert('Error deleting record: ' + error_2);
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
    var handlePageChange = function (page) {
        setCurrentPage(page);
    };
    var handleFilter = function () {
        // Trigger fetching data with the updated name filter
        fetchData();
    };
    var renderSortIcon = function (column) {
        if (column === sortColumn) {
            return sortOrder === 'asc' ? react_1.default.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faSortUp }) : react_1.default.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faSortDown });
        }
        else {
            return react_1.default.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faSort });
        }
    };
    var renderHeader = function () {
        return (react_1.default.createElement("tr", null,
            react_1.default.createElement("th", { onClick: function () { return handleSort('id'); }, className: "header-cell" },
                "ID ",
                renderSortIcon('id')),
            react_1.default.createElement("th", { onClick: function () { return handleSort('dateInserted'); }, className: "header-cell" },
                "Date Inserted ",
                renderSortIcon('dateInserted')),
            react_1.default.createElement("th", { onClick: function () { return handleSort('name'); }, className: "header-cell" },
                "Name ",
                renderSortIcon('name')),
            react_1.default.createElement("th", { onClick: function () { return handleSort('pax'); }, className: "header-cell" },
                "Pax ",
                renderSortIcon('pax')),
            react_1.default.createElement("th", { onClick: function () { return handleSort('room'); }, className: "header-cell" },
                "Room ",
                renderSortIcon('room')),
            react_1.default.createElement("th", { onClick: function () { return handleSort('vehicle'); }, className: "header-cell" },
                "Vehicle ",
                renderSortIcon('vehicle')),
            react_1.default.createElement("th", { onClick: function () { return handleSort('pets'); }, className: "header-cell" },
                "Pets ",
                renderSortIcon('pets')),
            react_1.default.createElement("th", { onClick: function () { return handleSort('videoke'); }, className: "header-cell" },
                "Videoke ",
                renderSortIcon('videoke')),
            react_1.default.createElement("th", { onClick: function () { return handleSort('partial_payment'); }, className: "header-cell" },
                "Partial Payment ",
                renderSortIcon('partial_payment')),
            react_1.default.createElement("th", { onClick: function () { return handleSort('full_payment'); }, className: "header-cell" },
                "Full Payment ",
                renderSortIcon('full_payment')),
            react_1.default.createElement("th", { onClick: function () { return handleSort('balance'); }, className: "header-cell" },
                "Balance ",
                renderSortIcon('balance')),
            react_1.default.createElement("th", { onClick: function () { return handleSort('paid'); }, className: "header-cell" },
                "Fully Paid ",
                renderSortIcon('paid')),
            react_1.default.createElement("th", { onClick: function () { return handleSort('checkIn'); }, className: "header-cell" },
                "Check In ",
                renderSortIcon('checkIn')),
            react_1.default.createElement("th", { onClick: function () { return handleSort('checkOut'); }, className: "header-cell" },
                "Check Out ",
                renderSortIcon('checkOut')),
            react_1.default.createElement("th", { onClick: function () { return handleSort('user'); }, className: "header-cell" },
                "User ",
                renderSortIcon('user'))));
    };
    var renderRows = function () {
        return data.map(function (item, index) { return (react_1.default.createElement("tr", { key: item.id, onClick: function () { return handleExpand(item); }, className: "table-row ".concat(index % 2 === 0 ? 'even-row' : 'odd-row') },
            react_1.default.createElement("td", { className: "table-cell" }, item.id),
            react_1.default.createElement("td", { className: "table-cell" }, item.dateInserted),
            react_1.default.createElement("td", { className: "table-cell" }, item.name),
            react_1.default.createElement("td", { className: "table-cell" }, item.pax),
            react_1.default.createElement("td", { className: "table-cell" }, item.room),
            react_1.default.createElement("td", { className: "table-cell" }, item.vehicle),
            react_1.default.createElement("td", { className: "table-cell" }, item.pets ? 'Yes' : 'No'),
            react_1.default.createElement("td", { className: "table-cell" }, item.videoke ? 'Yes' : 'No'),
            react_1.default.createElement("td", { className: "table-cell" }, item.partial_payment),
            react_1.default.createElement("td", { className: "table-cell" }, item.full_payment),
            react_1.default.createElement("td", { className: "table-cell" }, item.balance),
            react_1.default.createElement("td", { className: "table-cell" }, item.paid ? 'Yes' : 'No'),
            react_1.default.createElement("td", { className: "table-cell" }, item.checkIn),
            react_1.default.createElement("td", { className: "table-cell" }, item.checkOut),
            react_1.default.createElement("td", { className: "table-cell" }, item.user))); });
    };
    return (react_1.default.createElement("div", null,
        user ? 'Hi ' + user : 'You are not logged in',
        react_1.default.createElement("h1", null, "Main List"),
        react_1.default.createElement("div", { className: "filter-box" },
            react_1.default.createElement("h2", null, "Filter Check-in Date"),
            react_1.default.createElement("div", { className: "filter-container" },
                react_1.default.createElement("label", { htmlFor: "nameFilter" }, "Name:"),
                react_1.default.createElement("input", { type: "text", id: "nameFilter", value: nameFilter, onChange: handleNameChange }),
                react_1.default.createElement("label", { htmlFor: "monthSelector" }, "Select Month:"),
                react_1.default.createElement("select", { id: "monthSelector", value: selectedMonth, onChange: handleMonthChange },
                    react_1.default.createElement("option", { value: "none" }, "none"),
                    generateMonthOptions()),
                react_1.default.createElement("button", { onClick: handleToggleDateFilters }, dateFiltersVisible ? 'Hide Advanced Date Filters' : 'Show Advanced Date Filters'),
                dateFiltersVisible && (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement("label", { htmlFor: "startDate" }, "Start Date:"),
                    react_1.default.createElement("input", { type: "date", id: "startDate", value: startDate, onChange: handleStartDateChange }),
                    react_1.default.createElement("label", { htmlFor: "endDate" }, "End Date:"),
                    react_1.default.createElement("input", { type: "date", id: "endDate", value: endDate, onChange: handleEndDateChange }))),
                react_1.default.createElement("label", null, "Rooms:"),
                ['J', 'G', 'K1', 'K2', 'A', 'E'].map(function (room) { return (react_1.default.createElement("label", { key: room },
                    react_1.default.createElement("input", { type: "checkbox", value: room, checked: roomSelection.includes(room), onChange: function () { return handleRoomChange(room); } }),
                    room)); }),
                react_1.default.createElement("button", { onClick: handleFilter }, "Apply Filters"),
                react_1.default.createElement("button", { onClick: handleResetFilters }, "Reset Filters"))),
        react_1.default.createElement(react_bootstrap_1.Table, { responsive: true, bordered: true, hover: true },
            react_1.default.createElement("thead", null, renderHeader()),
            react_1.default.createElement("tbody", null, renderRows())),
        react_1.default.createElement(react_bootstrap_1.Pagination, null,
            react_1.default.createElement(react_bootstrap_1.Pagination.Prev, { onClick: function () { return handlePageChange(currentPage - 1); }, disabled: currentPage === 1 }),
            react_1.default.createElement(react_bootstrap_1.Pagination.Next, { onClick: function () { return handlePageChange(currentPage + 1); }, disabled: currentPage === totalPages }),
            Array.from({ length: totalPages }, function (_, index) { return (react_1.default.createElement(react_bootstrap_1.Pagination.Item, { key: index + 1, active: index + 1 === currentPage, onClick: function () { return handlePageChange(index + 1); } }, index + 1)); }),
            react_1.default.createElement("div", { className: "pagination-info" },
                react_1.default.createElement("span", null,
                    "Page ",
                    currentPage,
                    " of ",
                    totalPages),
                react_1.default.createElement("br", null),
                react_1.default.createElement("span", null,
                    "Total of ",
                    totalItems,
                    " Records"))),
        react_1.default.createElement(react_bootstrap_1.Modal, { show: showModal, onHide: closeModal },
            react_1.default.createElement(react_bootstrap_1.Modal.Header, { closeButton: true },
                react_1.default.createElement(react_bootstrap_1.Modal.Title, null, "Details")),
            react_1.default.createElement(react_bootstrap_1.Modal.Body, null, selectedItem && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("p", null,
                    react_1.default.createElement("strong", null, "ID:"),
                    " ",
                    selectedItem.id),
                react_1.default.createElement("p", null,
                    react_1.default.createElement("strong", null, "Date Inserted:"),
                    " ",
                    selectedItem.dateInserted),
                react_1.default.createElement("p", null,
                    react_1.default.createElement("strong", null, "Name:"),
                    " ",
                    selectedItem.name),
                react_1.default.createElement("p", null,
                    react_1.default.createElement("strong", null, "Pax:"),
                    " ",
                    selectedItem.pax),
                react_1.default.createElement("p", null,
                    react_1.default.createElement("strong", null, "Room:"),
                    " ",
                    selectedItem.room),
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
                    react_1.default.createElement("strong", null, "User:"),
                    " ",
                    selectedItem.user)))),
            react_1.default.createElement(react_bootstrap_1.Modal.Footer, null,
                react_1.default.createElement(react_bootstrap_1.Button, { variant: "primary", onClick: function () { var _a; return handleEdit((_a = selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.id) !== null && _a !== void 0 ? _a : 0); } }, "Edit"),
                react_1.default.createElement(react_bootstrap_1.Button, { variant: "danger", onClick: function () { var _a; return handleDelete((_a = selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.id) !== null && _a !== void 0 ? _a : 0); } }, "Delete"),
                react_1.default.createElement(react_bootstrap_1.Button, { variant: "secondary", onClick: closeModal }, "Close")))));
};
exports.default = Home;
