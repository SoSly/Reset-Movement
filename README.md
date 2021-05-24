![All Downloads](https://img.shields.io/github/downloads/jessev14/Reset-Movement/total?style=for-the-badge)

[![Forge Installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Freset-movement&colorB=4aa94a)](https://forge-vtt.com/bazaar#package=reset-movement)


# Reset Movement

Reset Movement (RM) is a FoundryVTT module that allows GM users to reset the current combatant's position to their position at the start of their turn.

<img src="/RM-preview.gif" width="700">

## Usage

The current combatant's starting position is stored as flags on the token at the start of their token's turn.

GM users can click a button on the Token Layer toolbar to reset the current combatant to the saved position.

Movement animation during reset can be disabled in module settings.

Ctrl+Z can reproduce much of this module's functionality, but is not specific to the current combatant.

For an alternative method of tracking a token's position at the start of its turn, consider the start turn marker feature of [Next Up](https://foundryvtt.com/packages/Next-Up/).
