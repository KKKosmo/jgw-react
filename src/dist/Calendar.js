"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Calendar = function (_a) {
    var calendarData = _a.calendarData, calendarMonth = _a.calendarMonth;
    // Function to chunk the array into rows
    var chunkArray = function (array, size) {
        return Array.from({ length: Math.ceil(array.length / size) }, function (_, index) {
            return array.slice(index * size, index * size + size);
        });
    };
    // Chunk the calendarData array into rows of 7 columns
    var calendarRows = chunkArray(calendarData, 7);
    return (react_1.default.createElement("div", { className: "container" },
        react_1.default.createElement("h1", { id: 'calendarMonth' }, calendarMonth),
        react_1.default.createElement("div", { className: "row days-row" },
            react_1.default.createElement("div", { className: "col" }, "Sun"),
            react_1.default.createElement("div", { className: "col" }, "Mon"),
            react_1.default.createElement("div", { className: "col" }, "Tue"),
            react_1.default.createElement("div", { className: "col" }, "Wed"),
            react_1.default.createElement("div", { className: "col" }, "Thu"),
            react_1.default.createElement("div", { className: "col" }, "Fri"),
            react_1.default.createElement("div", { className: "col" }, "Sat")),
        calendarRows.map(function (row, rowIndex) { return (react_1.default.createElement("div", { key: rowIndex, className: "row", style: { marginBottom: '10px' } }, row.map(function (item, columnIndex) { return (react_1.default.createElement("div", { key: columnIndex, className: "col calendar-cell ".concat(item.availability ? 'available' : 'unavailable') },
            react_1.default.createElement("div", { className: "day-number-container" }, item.dayNumber),
            react_1.default.createElement("div", { className: "data" }, item.data.split(',').map(function (word, wordIndex) { return (react_1.default.createElement("div", { key: wordIndex, className: "data-row" }, word.trim())); })))); }))); })));
};
exports.default = Calendar;
