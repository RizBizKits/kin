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
let ArticlesModel = class ArticlesModel {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ArticlesModel.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ unique: true, nullable: true }),
    __metadata("design:type", String)
], ArticlesModel.prototype, "articleName", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255, nullable: true }),
    __metadata("design:type", String)
], ArticlesModel.prototype, "articleDesc", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255, nullable: true }),
    __metadata("design:type", String)
], ArticlesModel.prototype, "articleURL", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], ArticlesModel.prototype, "createdAt", void 0);
ArticlesModel = __decorate([
    typeorm_1.Entity()
], ArticlesModel);
exports.ArticlesModel = ArticlesModel;
//# sourceMappingURL=ArticlesModel.js.map