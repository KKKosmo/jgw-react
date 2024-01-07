"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Home = function (props) {
    console.log(props);
    return (react_1.default.createElement("div", null, props.user ? 'Hi ' + props.user : 'You are not logged in'));
};
exports.default = Home;
