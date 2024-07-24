// ========= files exports ====================
export * from "./ScreensNames"
export * from "./Validation"
export * from "./ImagesPaths"


// ========== constants ===================
import { adjust } from "@utils";

export const MY_COLORS = {
    PRIMARY:'#4DC9D5',
    SECONDARY: '#FF5A70',
    TXT_PRIMARY: '#333333',
    TXT_SECONDARY: '#858597',
    TXT_DIM: '#8F8E94'
};


export const LAYOUT = {
    SHADOW: { shadowColor: '#000', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 3, },
    SPACING_SMALL: adjust(10),
    SPACING_MEDIUM: adjust(20),
    SPACING_LARGE: adjust(30),
    SPACING_EXTRA_SMALL: adjust(5),
    BORDER_RADIUS_MEDIUM: adjust(10),
};
