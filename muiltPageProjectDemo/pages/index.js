// require('../css/index.css');
// var $ = require('jquery');
// console.log($);
// $('body').css({
//     background: 'green',
// })
// console.log('index的入口文件')
/*
Es6的模块化语法
*/
import "../css/index.css";
import $ from "jquery";
import util, {
    add,
    increment
} from "../common/util";
import Person from "../common/Person";

import * as api from "../common/api";
import {
    getShopList,
    getShopDetail
} from "../common/api";

console.log(api);

console.log(util, add, increment);
console.log(new Person());