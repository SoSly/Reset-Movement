import { initRMTool } from './RMTool.js';
import { initSettings } from './settings.js';

Hooks.once("init", () => {
    console.log("RM | initializing");
    initSettings();
    initRMTool();
})
Hooks.on("updateCombat", async (combat, changed, options, userId) => {
    const currentToken = canvas.tokens.get(combat.combatant.token._id);
    await currentToken.setFlag("reset-movement","x",currentToken.x);
    await currentToken.setFlag("reset-movement","y",currentToken.y);
});