"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Precondition = void 0;
const pieces_1 = require("@sapphire/pieces");
const PreconditionError_1 = require("../errors/PreconditionError");
const Result_1 = require("../utils/Result");
class Precondition extends pieces_1.Piece {
    ok() {
        return Result_1.ok();
    }
    error(typeOrMessage, rawMessage, rawExtras) {
        const [type, message, extras] = typeof rawMessage === 'string' ? [typeOrMessage, rawMessage, rawExtras] : [this.name, typeOrMessage, rawMessage];
        return Result_1.err(new PreconditionError_1.PreconditionError(this, type, message, extras));
    }
}
exports.Precondition = Precondition;
//# sourceMappingURL=Precondition.js.map