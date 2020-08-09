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
const AppointmentsModel_1 = require("./AppointmentsModel");
let CentresModel = class CentresModel {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], CentresModel.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255, nullable: true }),
    __metadata("design:type", String)
], CentresModel.prototype, "centreName", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], CentresModel.prototype, "houseNumber", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], CentresModel.prototype, "streetName", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], CentresModel.prototype, "town", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], CentresModel.prototype, "postcode", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255, nullable: true }),
    __metadata("design:type", String)
], CentresModel.prototype, "contactNumber", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255, nullable: true }),
    __metadata("design:type", String)
], CentresModel.prototype, "email", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255, nullable: true }),
    __metadata("design:type", String)
], CentresModel.prototype, "websiteURL", void 0);
__decorate([
    typeorm_1.OneToMany(() => AppointmentsModel_1.AppointmentsModel, appointment => appointment.centre),
    __metadata("design:type", Array)
], CentresModel.prototype, "appointments", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], CentresModel.prototype, "createdAt", void 0);
CentresModel = __decorate([
    typeorm_1.Entity()
], CentresModel);
exports.CentresModel = CentresModel;
//# sourceMappingURL=CentresModel.js.map