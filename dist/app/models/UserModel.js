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
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const RankingsModel_1 = require("./RankingsModel");
const AppointmentsModel_1 = require("./AppointmentsModel");
const CabinetModel_1 = require("./CabinetModel");
const bcrypt = require('bcryptjs');
let UserModel = class UserModel {
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 10);
    }
    validateHashedPass(unencryptedPassword) {
        // return bcrypt.compareSync(unencryptedPassword, this.password);
        return bcrypt.compareSync(unencryptedPassword, this.password); // true
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], UserModel.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ unique: true, nullable: true }),
    __metadata("design:type", String)
], UserModel.prototype, "email", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255, nullable: true }),
    __metadata("design:type", String)
], UserModel.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255, nullable: true }),
    __metadata("design:type", String)
], UserModel.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255, nullable: true }),
    __metadata("design:type", String)
], UserModel.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ unique: true, nullable: true }),
    class_validator_1.Length(4, 100),
    __metadata("design:type", String)
], UserModel.prototype, "username", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Date)
], UserModel.prototype, "dob", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], UserModel.prototype, "points", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], UserModel.prototype, "bloodType", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], UserModel.prototype, "houseNumber", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], UserModel.prototype, "streetName", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], UserModel.prototype, "town", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], UserModel.prototype, "postcode", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], UserModel.prototype, "badgeCounter", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Boolean)
], UserModel.prototype, "isReferred", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], UserModel.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.OneToOne(() => RankingsModel_1.RankingsModel, rankings => rankings.user),
    __metadata("design:type", RankingsModel_1.RankingsModel)
], UserModel.prototype, "rankings", void 0);
__decorate([
    typeorm_1.OneToMany(() => AppointmentsModel_1.AppointmentsModel, appointment => appointment.user),
    __metadata("design:type", Array)
], UserModel.prototype, "appointments", void 0);
__decorate([
    typeorm_1.OneToMany(() => CabinetModel_1.CabinetModel, cabinetBadge => cabinetBadge.user),
    __metadata("design:type", Array)
], UserModel.prototype, "cabinetBadge", void 0);
UserModel = __decorate([
    typeorm_1.Entity()
], UserModel);
exports.UserModel = UserModel;
//# sourceMappingURL=UserModel.js.map