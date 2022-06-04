"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = void 0;
const octokit_1 = require("octokit");
const config = require('config');
const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));
exports.sleep = sleep;
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = config.get('githubAccessToken');
    const octokit = new octokit_1.Octokit({ auth: token });
    const { data } = yield octokit.rest.issues.listForRepo({
        owner: 'Haianh9999',
        repo: 'Keypace',
        page: 2,
    });
    let index = 0;
    while (index <= data.length - 1) {
        const d = data[index];
        const title = d.title;
        const body = (_a = d.body) !== null && _a !== void 0 ? _a : '';
        yield (0, exports.sleep)(5000);
        octokit.rest.issues.create({
            owner: 'Keypace',
            repo: 'Keypace',
            title,
            body,
        });
        console.log('created', title, body);
        index++;
    }
});
exports.default = run();
