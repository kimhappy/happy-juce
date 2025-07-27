# HAPPY-JUCE
*happy-juce* provides [Zustand](https://github.com/pmndrs/zustand) bindings for [JUCE](https://github.com/juce-framework/JUCE) framework WebView components.

## Installation
When *happy-juce* is installed, JUCE is automatically cloned alongside it. Since it uses the `postinstall` script in package.json, you need to either add *happy-juce* to the `trustedDependencies` in your package.json or run `bun pm trust happy-juce` before installation.
```sh
bun add happy-juce
```

## Environment Variables
You can customize the JUCE cloning behavior using the following environment variables:

| Variable | Description | Default Value |
|----------|-------------|---------------|
| `HAPPY_JUCE_REPOSITORY_URL` | JUCE repository URL to clone from | `https://github.com/juce-framework/JUCE` |
| `HAPPY_JUCE_BRANCH` | Git branch or tag to checkout | `master` |

## Related Links
- [JUCE Official Website](https://juce.com)
- [JUCE Repository](https://github.com/juce-framework/JUCE)
- [JUCE Documentation](https://docs.juce.com)
