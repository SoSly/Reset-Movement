export function initRMTool() {
    Hooks.on("getSceneControlButtons", (controls) => {
        if (!game.user.isGM) return;

        const bar = controls.find(c => c.name === "token");
        bar.tools.push({
            name: "RM Tool",
            title: "Reset Movement",
            icon: "fas fa-sync-alt",
            onClick: () => resetMovement(),
            button: true
        });

        if (game.settings.get('reset-movement', 'previousMovement')) {
            bar.tools.push({
                name: "PM Tool",
                title: "Previous Movement",
                icon: "fas fa-undo-alt",
                onClick: () => previousMovement(),
                button: true
            });
        }
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
    if (game.settings.get('reset-movement', 'previousMovement')) {
        await currentToken.setFlag("reset-movement", "positionHistory", [startPosition]);
    }
}

async function previousMovement() {
    const currentToken = canvas.tokens.get(game.combat.combatant.token._id);
    const positionHistory = currentToken.getFlag("reset-movement", "positionHistory");
    if (positionHistory.length === 1) return;
    if (positionHistory.length < 3) {
        resetMovement();
        return;
    }
    const previousPosition = positionHistory[positionHistory.length - 2];
    await currentToken.update({
        x: previousPosition.x,
        y: previousPosition.y,
        rotation: previousPosition.rotation
    }, { animate: game.settings.get("reset-movement", "animationEnabled") });
    positionHistory.pop();
    positionHistory.pop();
    await currentToken.setFlag("reset-movement", "positionHistory", positionHistory);
}