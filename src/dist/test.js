"use strict";
// TestComponent.tsx
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var TestComponent = function () {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, "Hello, This is a Test Component!"),
        react_1.default.createElement("p", null, "This is a simple HTML content within a React component."),
        react_1.default.createElement("ul", null,
            react_1.default.createElement("li", null, "Item 1"),
            react_1.default.createElement("li", null, "Item 2"),
            react_1.default.createElement("li", null, "Item 3"))));
};
exports.default = TestComponent;
