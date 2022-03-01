import { initRMTool } from './RMTool.js';

Hooks.once("init", () => {
    console.log("RM | initializing");

    game.settings.register('reset-movement', 'animationEnabled', {
        name: game.i18n.localize("reset-movement.settings.animationEnabled"),
        hint: "",
        scope: "world",
        config: true,
        type: Boolean,
        default: true
    });
    
    game.settings.register('reset-movement', 'gmOnly', {
        name: game.i18n.localize("reset-movement.settings.gmOnly"),
        hint: "",
        scope: "world",
        config: true,
        type: Boolean,
        default: true
    });

    initRMTool();
});

Hooks.once("ready", () => {
    Hooks.on("updateCombat", async (combat, changed, options, userId) => {
        if ((game.settings.get("reset-movement", "gmOnly") && !game.user.isGM) || !combat.combatant) return;
        const currentToken = canvas.tokens.get(combat.combatant.token.id);
        if (game.user.id === game.users.find(u => u.active && u.isGM)?.id) {
            await currentToken.document.setFlag("reset-movement", "startPosition", { x: currentToken.x, y: currentToken.y, rotation: currentToken.rotation });
            await currentToken.document.setFlag("reset-movement", "positionHistory", [currentToken.document.getFlag("reset-movement", "startPosition")]);
        }
    });

    Hooks.on("deleteCombat", async () => {
        if (game.settings.get("reset-movement", "gmOnly") && !game.user.isGM) return;
        for (let tkn of canvas.tokens.placeables) {
            if (game.user.id === game.users.find(u => u.active && u.isGM)?.id) {
                await tkn.document.unsetFlag("reset-movement", "startPosition");
                await tkn.document.unsetFlag("reset-movement", "positionHistory");
            }
        }
    });
})
