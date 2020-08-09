"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const UserModel_1 = require("./UserModel");
let RankingsModel = class RankingsModel {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], RankingsModel.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], RankingsModel.prototype, "date", void 0);
__decorate([
    typeorm_1.OneToOne(() => UserModel_1.UserModel, user => user.rankings),
    typeorm_1.JoinColumn(),
    __metadata("design:type", UserModel_1.UserModel)
], RankingsModel.prototype, "user", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], RankingsModel.prototype, "createdAt", void 0);
RankingsModel = __decorate([
    typeorm_1.Entity()
], RankingsModel);
exports.RankingsModel = RankingsModel;
//# sourceMappingURL=RankingsModel.js.map