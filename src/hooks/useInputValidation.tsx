import { useNetInfo } from '@react-native-community/netinfo';
import { showToast } from '@utils';

const useInputValidation = () => {
    const BADWORDS = [
        'anal', 'anus', 'arse', 'ass', 'balls', 'bastard', 'biatch', 'bitch', 'blow job', 'boob', 'bum', 'butt',
        'buttplug', 'clitoris', 'cock', 'dick', 'dildo', 'f u c k', 'feck', 'felching', 'fellate', 'fuck', 'jerk',
        'jizz', 'knob end', 'knobend', 'labia', 'lmao', 'lmfao', 'pussy', 'shit', 'sex', 'sh1t', 'slut', 'wank',
        'whore', 'wtf', 'porn', 'fucking', 'fucker', 'fucked', 'sister fucker', 'mother fucker', 'tits', 'booty',
        'creampie', 'gangbang', 'milf', 'asshole', 'pornhub', 'pornography', 'boobs', 'sexy', 'vagina', 'penis',
        'orgasm', 'masturbate', 'cunt', 'bastard', 'shithead', 'douchebag', 'twat', 'cockhead', 'piss', 'bugger',
        'bollocks', 'sod off', 'damn', 'darn', 'hell', 'bitchy', 'asswipe', 'assclown', 'jackass', 'piss off',
        'bloody', 'crap', 'asshat', 'arsehole', 'wanker', 'wanksta', 'fanny', 'titfuck', 'titty', 'clit', 'wankjob',
        'blowjob', 'blowme', 'blowhard', 'blowup', 'bitching', 'dickhead', 'dickwad', 'pussywhipped', 'twatface',
        'whorebag', 'whorehouse', 'whoremonger', 'whoreface', 'dumbass', 'dipshit', 'cuntbag', 'cuntface', 'cockblock',
        'cockhead', 'cockbite', 'fuckup', 'fucktard', 'fuckface', 'fuckhead', 'fucknut', 'fuckwit', 'motherfucker',
        'motherfucking', 'asswipe', 'asswad', 'assclown', 'asshat', 'asslicker', 'assmaster', 'asswipe', 'asswad',
        'assclown', 'asshat', 'asslicker', 'assmaster', 'assmunch', 'assmuncher', 'bastard', 'bitch', 'bitchass',
        'bitchtits', 'bullshit', 'bitch', 'bitchass', 'bitchtits', 'bullshit', 'cock', 'cockass', 'cockbite',
        'cocksucker', 'coochie', 'coochy', 'crap', 'cunt', 'dick', 'dickass', 'dickbag', 'dickbite', 'dickhead',
        'dickhole', 'dickless', 'dicksucker', 'dickwad', 'dickweed', 'dickwod', 'douche', 'douchebag', 'douche-fag',
        'douchewaffle', 'dumass', 'dumb ass', 'dumbass', 'dumbfuck', 'dumbshit', 'fag', 'fagbag', 'fagfucker',
        'faggit', 'faggot', 'faggotcock', 'fagtard', 'fatass', 'fuckass', 'fuckbag', 'fuckboy', 'fuckbrain',
        'fuckbutt', 'fucker', 'fucknut', 'fuckoff', 'fuckstick', 'fucktard', 'fuckup', 'fuckwad', 'fuckwit', 'fuckwitt',
        'gay', 'gayass', 'gayfuck', 'gaylord', 'gaytard', 'goddamn', 'goddamnit', 'hardon', 'jackass', 'jizz',
        'jizzbag', 'jizzed', 'jizzmopper', 'jizzster', 'kike', 'kooch', 'kootch', 'kunt', 'lesbian', 'lesbo', 'lezzie',
        'motherfucker', 'mother'
    ];
    const netInfo = useNetInfo();

    const containsProhibitedWords = (query: string) => {
        const words = query.trim().toLowerCase().split(' ');
        const foundBadWords = words.filter((word) => BADWORDS.includes(word));
        return foundBadWords.length > 0;
    };

    const containsEmoji = (text: string) => {
        const emojiRegex = /[\u{1F000}-\u{1F9F4}]/gu;
        return emojiRegex.test(text);
    };
    const isInternetConnected = () => {
        if (!netInfo.isConnected) {
            showToast('No network connectivity.');
            return false;
        }
        return true
    };

    const isInputValid = (param: string) => {
        const query = param.trim()
        if (!query) {
            showToast('Enter text to generate.');
            return false;
          }
          
        // Check for prohibited words
        if (containsProhibitedWords(query)) {
            showToast('Contains prohibited words');
            return false;
        }

        // Check for emoji
        if (containsEmoji(query)) {
            showToast('Contains emoji');
            return false;
        }

        // Check input query length
        if (query.length < 5) {
            showToast('Minimum length is 5');
            return false;
        }

        if (!isInternetConnected()) return false;

        return true;
    };

    return {isInputValid,isInternetConnected };
};

export default useInputValidation;