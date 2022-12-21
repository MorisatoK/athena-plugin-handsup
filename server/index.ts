import * as alt from 'alt-server';
import { PluginSystem } from '@AthenaServer/systems/plugins';

const PLUGIN_NAME = 'Athena Hands Up';

PluginSystem.registerPlugin(PLUGIN_NAME, () => {
    alt.log(`~lg~${PLUGIN_NAME} was Loaded`);
});
