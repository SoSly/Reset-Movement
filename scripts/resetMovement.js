import { initRMTool } from './RMTool.js';
import { initSettings } from './settings.js';

Hooks.once("init", () => {
    console.log("RM | initializing");
    initSettings();
    initRMTool();
});

Hooks.once("ready", () => {
    Hooks.on("updateCombat", async (combat, changed, options, userId) => {
        if (!game.user.isGM) return;
        const currentToken = canvas.tokens.get(combat.combatant.token._id);
        await currentToken.setFlag("reset-movement", "startPosition", {x: currentToken.x, y: currentToken.y, rotation: currentToken.data.rotation});
        await currentToken.setFlag("reset-movement", "positionHistory", [currentToken.getFlag("reset-movement", "startPosition")]);
    });

    if (game.settings.get("reset-movement", "previousMovement")) {
        Hooks.on("updateToken", async (scene, token, diff, options, id) => {
            if (!game.user.isGM) return;
            const currentToken = canvas.tokens.get(token._id);
            if (game.combat.combatant.tokenId === currentToken.id && ('x' in diff || 'y' in diff)) {
                const positionHistory = currentToken.getFlag("reset-movement", "positionHistory");
                positionHistory.push({x: token.x, y: token.y, rotation: token.rotation});
                currentToken.setFlag("reset-movement", "positionHistory", positionHistory);
            }
        });
    }

    Hooks.on("deleteCombat", async () => {
        for (let tkn of canvas.tokens.placeables) {
            await tkn.unsetFlag("reset-movement", "startPosition");
            await tkn.unsetFlag("reset-movement", "positionHistory");
        }
    });
})