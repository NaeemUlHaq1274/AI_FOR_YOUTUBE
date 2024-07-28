// ========= files exports ====================
export * from "./ScreensNames"
export * from "./Validation"
export * from "./ImagesPaths"


// ========== constants ===================
import { adjust } from "@utils";

export const MY_COLORS = {
    PRIMARY:'#E4644B',
    BLACK: '#2C2C2C',
    WHITE: '#FBFBFA',
};


export const LAYOUT = {
    SHADOW: { shadowColor: '#000', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 3, },
    SPACING_SMALL: adjust(10),
    SPACING_MEDIUM: adjust(20),
    SPACING_LARGE: adjust(30),
    SPACING_EXTRA_SMALL: adjust(5),
    BORDER_RADIUS_MEDIUM: adjust(10),
};
