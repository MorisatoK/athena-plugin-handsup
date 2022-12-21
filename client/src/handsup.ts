import * as alt from 'alt-client';
import * as native from 'natives';
import { KeybindController } from '@AthenaClient/events/keyup';
import { loadAnimation } from '@AthenaClient/systems/animations';
import { ANIMATION_FLAGS } from '@AthenaShared/flags/animationFlags';
import { HANDSUP_CONFIG } from '../../shared/config';

const HandsUpInternal = {
    isHandsUp: false,
    init() {
        KeybindController.registerKeybind({ key: HANDSUP_CONFIG.KEYBIND, singlePress: HandsUpInternal.handleKeyPress });
    },
    handleKeyPress() {
        if (!alt.Player.local || !alt.Player.local.valid || alt.Player.local.isDead || alt.Player.local.vehicle) {
            return;
        }

        if (!HandsUpInternal.isHandsUp) {
            HandsUpInternal.handsUp();
        } else {
            HandsUpInternal.handsDown();
        }
    },
    async handsUp() {
        try {
            await loadAnimation('missminuteman_1ig_2');

            // Using the native here instead of Athenas `playAnimation` because we need to tune some speed settings
            native.taskPlayAnim(
                alt.Player.local.scriptID,
                'missminuteman_1ig_2',
                'handsup_base',
                HANDSUP_CONFIG.ANIM_SPEED,
                HANDSUP_CONFIG.ANIM_SPEED,
                -1,
                ANIMATION_FLAGS.REPEAT | ANIMATION_FLAGS.UPPERBODY_ONLY | ANIMATION_FLAGS.ENABLE_PLAYER_CONTROL,
                0,
                false,
                false,
                false,
            );
        } catch (e) {
            alt.log(e);
        }
        HandsUpInternal.isHandsUp = true;
    },
    handsDown() {
        native.clearPedTasks(alt.Player.local.scriptID);
        HandsUpInternal.isHandsUp = false;
    },
};

export const HandsUp = {
    init() {
        HandsUpInternal.init();
    },
};
