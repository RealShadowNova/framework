export declare const enum CooldownLevel {
    Author = "author",
    Channel = "channel",
    Guild = "guild"
}
export declare const enum PluginHook {
    PreGenericsInitialization = "preGenericsInitialization",
    PreInitialization = "preInitialization",
    PostInitialization = "postInitialization",
    PreLogin = "preLogin",
    PostLogin = "postLogin"
}
/**
 * The level the cooldown applies to
 */
export declare const enum BucketType {
    /**
     * Per channel cooldowns
     */
    Channel = 0,
    /**
     * Global cooldowns
     */
    Global = 1,
    /**
     * Per guild cooldowns
     */
    Guild = 2,
    /**
     * Per user cooldowns
     */
    User = 3
}
//# sourceMappingURL=Enums.d.ts.map