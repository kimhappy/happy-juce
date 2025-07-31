# HAPPY-JUCE
*happy-juce* provides TypeScript + [Zustand](https://github.com/pmndrs/zustand) bindings for [JUCE](https://github.com/juce-framework/JUCE) framework WebView components.

## Installation
```sh
bun add happy-juce
```
When *happy-juce* is installed, JUCE is automatically cloned in `node_modules/happy-juce/JUCE`. Since this behavior uses the `postinstall` script in *package.json*, you need to either run `bun pm trust happy-juce` or add *happy-juce* to the `trustedDependencies` in your *package.json* manually before installation.

## Environment Variables
You can customize the JUCE cloning behavior using the following environment variables:

| Name | Default | Description |
| - | - | - |
| `HAPPY_JUCE_REPOSITORY_URL` | `https://github.com/juce-framework/JUCE` | JUCE repository URL to clone from |
| `HAPPY_JUCE_BRANCH` | `master` | Git branch to checkout |

## Related Links
- [JUCE + React Plugin Template](https://github.com/kimhappy/happy-plugin-template)
- [JUCE Official Website](https://juce.com)
- [JUCE Repository](https://github.com/juce-framework/JUCE)
- [JUCE Documentation](https://docs.juce.com)
