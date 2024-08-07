// ========= files exports ====================
export * from "./ScreensNames"
export * from "./Validation"
export * from "./ImagesPaths"


// ========== constants ===================
import { adjust } from "@utils";
import { ICONS_PATHS } from "./ImagesPaths";

export const MY_COLORS = {
    PRIMARY: '#E4644B',
    BLACK: '#2C2C2C',
    WHITE: '#FBFBFA',
    DARK_GRAY: '#919191',
    TXT_PRIMARY: '#FBFBFA',
    TXT_DIM: '#A9A9A9',
};


export const LAYOUT = {
    SHADOW: { shadowColor: '#000', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 3, },
    SPACING_SMALL: adjust(10),
    SPACING_MEDIUM: adjust(20),
    SPACING_LARGE: adjust(30),
    SPACING_EXTRA_SMALL: adjust(5),
    BORDER_RADIUS_MEDIUM: adjust(10),
};

export const DASHBOARD_ITEMS = ['Include Title', 'Include Description', 'Include Tags', 'Include Script', 'Include Audio', 'Include Thumbnail'];



export const ADDITIONAL_OPTIONS = [
    { title: 'Language', iconPath: ICONS_PATHS.LANGUAGE },
    { title: 'Region', iconPath: ICONS_PATHS.REGION },
    { title: 'Channel Category', iconPath: ICONS_PATHS.CHANNEL_CATEGORY },
    { title: 'Audience Target', iconPath: ICONS_PATHS.AUDIENCE_TARGET },
    { title: 'Your Channel Name', iconPath: ICONS_PATHS.YOUR_CHANNEL },
    { title: 'Content details', iconPath: ICONS_PATHS.CONTENT },
];
