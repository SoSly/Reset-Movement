export function initSettings() {
    game.settings.register('reset-movement', 'animationEnabled', {
        name: "Animate Movement During Resest",
        hint: "",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });
}