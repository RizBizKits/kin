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
const BadgesModel_1 = require("./BadgesModel");
let CabinetModel = class CabinetModel {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], CabinetModel.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], CabinetModel.prototype, "badgeEarned", void 0);
__decorate([
    typeorm_1.ManyToOne(() => UserModel_1.UserModel, users => users.cabinetBadge),
    __metadata("design:type", UserModel_1.UserModel)
], CabinetModel.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne(() => BadgesModel_1.BadgesModel, users => users.badgeInCabinet),
    __metadata("design:type", BadgesModel_1.BadgesModel)
], CabinetModel.prototype, "badge", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], CabinetModel.prototype, "createdAt", void 0);
CabinetModel = __decorate([
    typeorm_1.Entity()
], CabinetModel);
exports.CabinetModel = CabinetModel;
//# sourceMappingURL=CabinetModel.js.map