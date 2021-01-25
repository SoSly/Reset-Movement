export function initRMTool() {
    Hooks.on("getSceneControlButtons", (controls) => {
        if (!game.user.isGM) return;

        const bar = controls.find(c => c.name === "token");
        bar.tools.push({
            name: "RM Tool",
            title: "Reset Movemnt",
            icon: "fas fa-walking",
            onClick: () => resetMovement(),
            button: true
        });
    });
}

async function resetMovement() {
    const currentToken = canvas.tokens.get(game.combat.combatant.token._id);
    await currentToken.update({
        x: currentToken.getFlag("reset-movement", "x"),
        y: currentToken.getFlag("reset-movement", "y")
    }, { animate : game.settings.get("reset-movement", "animationEnabled")});
}