"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BucketType = exports.PluginHook = exports.CooldownLevel = void 0;
var CooldownLevel;
(function (CooldownLevel) {
    CooldownLevel["Author"] = "author";
    CooldownLevel["Channel"] = "channel";
    CooldownLevel["Guild"] = "guild";
})(CooldownLevel = exports.CooldownLevel || (exports.CooldownLevel = {}));
var PluginHook;
(function (PluginHook) {
    PluginHook["PreGenericsInitialization"] = "preGenericsInitialization";
    PluginHook["PreInitialization"] = "preInitialization";
    PluginHook["PostInitialization"] = "postInitialization";
    PluginHook["PreLogin"] = "preLogin";
    PluginHook["PostLogin"] = "postLogin";
})(PluginHook = exports.PluginHook || (exports.PluginHook = {}));
/**
 * The level the cooldown applies to
 */
var BucketType;
(function (BucketType) {
    /**
     * Per channel cooldowns
     */
    BucketType[BucketType["Channel"] = 0] = "Channel";
    /**
     * Global cooldowns
     */
    BucketType[BucketType["Global"] = 1] = "Global";
    /**
     * Per guild cooldowns
     */
    BucketType[BucketType["Guild"] = 2] = "Guild";
    /**
     * Per user cooldowns
     */
    BucketType[BucketType["User"] = 3] = "User";
})(BucketType = exports.BucketType || (exports.BucketType = {}));
//# sourceMappingURL=Enums.js.map