export function initSettings() {
    game.settings.register('reset-movement', 'animationEnabled', {
        name: "Animate Movement During Resest",
        hint: "",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register('reset-movement', 'previousMovement', {
        name: "Enable Moving Token to Previous Position",
        hint: "",
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
        onChange: () => window.location.reload()
    });
}