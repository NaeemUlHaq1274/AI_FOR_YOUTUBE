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

export const CATEGORIES = [
    'Gaming',
    'Education',
    'Entertainment',
    'Technology',
];

export const SUBCATEGORIES: { [key: string]: string[] } = {
    Gaming: ['Action', 'Adventure', 'Strategy', 'RPG'],
    Education: ['Science', 'Math', 'History', 'Languages'],
    Entertainment: ['Movies', 'TV Shows', 'Comedy', 'Vlogs'],
    Technology: ['Gadgets', 'Software', 'Programming', 'Reviews'],
};

export const additionalOptions = [
    { title: 'Language', icon: ICONS_PATHS.LANGUAGE },
    { title: 'Region', icon: ICONS_PATHS.REGION },
    { title: 'Channel Category', icon: ICONS_PATHS.CHANNEL_CATEGORY },
    { title: 'Audience Target', icon: ICONS_PATHS.AUDIENCE_TARGET },
    { title: 'Your Channel Name', icon: ICONS_PATHS.YOUR_CHANNEL },
    { title: 'Content details', icon: ICONS_PATHS.CONTENT },
];
