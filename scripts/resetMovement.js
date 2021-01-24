import { initRMTool } from './RMTool.js';

Hooks.once("init", () => {
    console.log("RM | initializing");
    initRMTool();
})
Hooks.on("updateCombat", async (combat, changed, options, userId) => {
    const currentToken = canvas.tokens.get(combat.combatant.token._id);
    console.log(currentToken)
    await currentToken.setFlag("reset-movement","x",currentToken.x);
    await currentToken.setFlag("reset-movement","y",currentToken.y);
});