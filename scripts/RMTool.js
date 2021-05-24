export function initRMTool() {
    Hooks.on("getSceneControlButtons", (controls) => {
        if (!game.user.isGM) return;

        const bar = controls.find(c => c.name === "token");
        bar.tools.push({
            name: "RM Tool",
            title: game.i18n.localize("reset-movement.tool.title"),
            icon: "fas fa-sync-alt",
            onClick: () => resetMovement(),
            button: true
        });
    });
}

async function resetMovement() {
    const currentToken = canvas.tokens.get(game.combat.combatant.token._id);
    const startPosition = currentToken.getFlag("reset-movement", "startPosition");
    await currentToken.update({
        x: startPosition.x,
        y: startPosition.y,
        rotation: startPosition.rotation
    }, { animate: game.settings.get("reset-movement", "animationEnabled") });

}
