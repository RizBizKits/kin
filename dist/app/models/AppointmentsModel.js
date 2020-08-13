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
const CentresModel_1 = require("./CentresModel");
const UserModel_1 = require("./UserModel");
let AppointmentsModel = class AppointmentsModel {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], AppointmentsModel.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: "datetime", nullable: true }),
    __metadata("design:type", Date)
], AppointmentsModel.prototype, "appointmentSlot", void 0);
__decorate([
    typeorm_1.Column({ default: null, nullable: true }),
    __metadata("design:type", Boolean)
], AppointmentsModel.prototype, "isBooked", void 0);
__decorate([
    typeorm_1.ManyToOne(() => CentresModel_1.CentresModel, centres => centres.appointments),
    __metadata("design:type", CentresModel_1.CentresModel)
], AppointmentsModel.prototype, "centre", void 0);
__decorate([
    typeorm_1.ManyToOne(() => UserModel_1.UserModel, users => users.appointments),
    __metadata("design:type", UserModel_1.UserModel)
], AppointmentsModel.prototype, "user", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], AppointmentsModel.prototype, "createdAt", void 0);
AppointmentsModel = __decorate([
    typeorm_1.Entity()
], AppointmentsModel);
exports.AppointmentsModel = AppointmentsModel;
//# sourceMappingURL=AppointmentsModel.js.map