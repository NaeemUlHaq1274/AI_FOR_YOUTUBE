import { Image, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { MyButton, MyScrollableContainer, MyText, PaywallContainer, PressableImage } from '@components'
import { LOGIN_IMAGES_PATH, MY_COLORS, PAY_WALL_SCREEN } from '@constants'

const SubscriptionScreen = () => {
    const BASIC_PLAN_FEATURES = ['200 tokens', 'save 20% on content creation with Premium.', 'unused tokens rollover (max 200 tokens)', 'Earn 4 tokens per rewarded ad (max 5 ads per daily)', 'save upto $5/month vs buying tokens.']
    const PREMIUM_PLAN_FEATURES = ['300 tokens', 'save 40% on content creation with Premium.', 'unused tokens rollover (max 300 tokens)', 'Earn 5 tokens per rewarded ad (max 5 ads per daily)', 'save upto $15/month vs buying tokens.']
    const EXPANDABLE_ITEMS = [
        {
            title: 'Save 40% on Content Creation ',
            content: 'Save 40% on Content Creation with PremiumWith CreatorBoost Premium, you use 40% fewer tokens for the same features. Spend less and get more value with our premium plan!',
        },
        {
            title: 'Understanding Tokens',
            content: 'Tokens are the currency in CreatorBoost. Each action, like making a title or thumbnail, uses tokens. This way, you only pay for what you use.',
        },
        {
            title: 'Token Rollover',
            content: 'Unused tokens roll over to the next month. Build up your tokens and use them whenever you need, ensuring no waste!',
        },
    ];
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(prevState => !prevState);
    };

    return (
        <MyScrollableContainer contentContainerStyle={{ gap: 48 }} >
            <PaywallContainer />

            <View style={{ height: 1, width: "60%", backgroundColor: "white", alignSelf: "center" }} />
            <CenteredContent title="Thumnbail Design" description="Create eye-catching thumbnails that stand out and boost click-through rates." image={LOGIN_IMAGES_PATH.THUMBNAIL_IMAGE} />
            <View style={{ height: 1, width: "60%", backgroundColor: "white", alignSelf: "center" }} />
            <CenteredContent title="Script & Audio Creation" description="Craft engaging scripts and produce high-quality audio files for your videos." image={LOGIN_IMAGES_PATH.AUDIO_IMAGE} />
            <View style={{ height: 1, width: "60%", backgroundColor: "white", alignSelf: "center" }} />
            <CenteredContent title="Video Optimization" description="Generate captivating titles, SEO-rich descriptions, and targeted tags for maximum visibility" image={LOGIN_IMAGES_PATH.VIDEO_OPTIMIZATION_IMAGE} />
            <View style={{ height: 1, width: "60%", backgroundColor: "white", alignSelf: "center" }} />

            <View style={{ gap: 20, paddingHorizontal: 20, borderColor: MY_COLORS.PRIMARY, borderWidth: 1, borderRadius: 10, paddingVertical: 12 }}>
                <View>
                    <MyText p bold>Basic Plan</MyText>
                    <MyText h1 bold>$9.99/month</MyText>
                </View>
                <View style={{ gap: 10 }}>
                    {BASIC_PLAN_FEATURES.map((feature, index) => (
                        <View key={index} style={{ flexDirection: "row", alignItems: "center", gap: 8, width: "90%" }}>
                            <Image source={PAY_WALL_SCREEN.PAY_WALL_TICK} />
                            <MyText p>{feature}</MyText>
                        </View>
                    ))}
                </View>
                <MyButton title="Buy Now" onPress={() => { }} />
                <MyText fp style={{ textAlign: "center" }}>Subscription will renew automatically and can be cancelled at any time.</MyText>
            </View>

            <View style={{ height: 1, width: "60%", backgroundColor: "white", alignSelf: "center" }} />
            <View style={{ gap: 20, paddingHorizontal: 20, borderColor: MY_COLORS.PRIMARY, borderWidth: 1, borderRadius: 10, paddingVertical: 12 }}>
                <View>
                    <MyText p bold>Premium Plan</MyText>
                    <MyText h1 bold>$24.99/month</MyText>
                </View>
                <View style={{ gap: 10 }}>
                    {PREMIUM_PLAN_FEATURES.map((feature, index) => (
                        <View key={index} style={{ flexDirection: "row", alignItems: "center", gap: 8, width: "90%" }}>
                            <Image source={PAY_WALL_SCREEN.PAY_WALL_TICK} />
                            <MyText p>{feature}</MyText>
                        </View>
                    ))}
                </View>
                <MyButton title="Buy Now" onPress={() => { }} />
                <MyText fp style={{ textAlign: "center" }}>Subscription will renew automatically and can be cancelled at any time.</MyText>
            </View>

            <View style={{ height: 1, width: "60%", backgroundColor: "white", alignSelf: "center" }} />
            <View style={{ gap: 10 }}>
                {EXPANDABLE_ITEMS.map((item, index) => (
                    <View style={{ backgroundColor: MY_COLORS.DARK_GRAY, borderRadius: 10 }}>
                        <ExpandableItem key={index} titleItems={item.title} contentItems={item.content} />
                    </View>
                ))}
            </View>

        </MyScrollableContainer>
    )
}

export default SubscriptionScreen

const styles = StyleSheet.create({})


interface CenteredContentProps {
    title: string;
    description: string;
    image: any;
}

const CenteredContent: React.FC<CenteredContentProps> = ({ title, description, image }) => {
    return (
        <View style={{ alignItems: "center", gap: 12, alignSelf: "center" }}>
            <MyText h2 bold>{title}</MyText>
            <MyText p style={{ textAlign: "center" }}>{description}</MyText>
            <Image source={image} />
        </View>
    );
};
interface ExpandableItemProps {
    titleItems: string,
    contentItems: string
}
const ExpandableItem = ({ titleItems, contentItems }: ExpandableItemProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded((prevState) => !prevState);
    };

    return (
        <View>
            {isExpanded ? (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                    <MyText style={{ width: "90%" }} onPress={toggleExpand}>{contentItems}</MyText>
                    <PressableImage source={PAY_WALL_SCREEN.MINUS_EXPANDABLE} onPress={toggleExpand} />

                </View>
            ) : (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                    <MyText style={{ width: "90%" }} onPress={toggleExpand}>{titleItems}</MyText>
                    <PressableImage source={PAY_WALL_SCREEN.PLUS_EXPANDABLE} onPress={toggleExpand} />
                </View>
            )}
        </View>
    );
};