import {ChevronDoubleDownIcon} from "@heroicons/react/20/solid";
import {ActionFunction, LoaderFunction} from "@remix-run/node";
import {Form, useActionData} from "@remix-run/react";
import {useLoaderData} from "react-router";
import {getDealerForCity} from "~/backend/dealer.server";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {FooterSocialLogosAndCopywrite} from "~/components/footerComponent";
import {HeaderComponent} from "~/components/headerComponent";
import {LandingPage3Carousel} from "~/components/landingPage3Carousel";
import {StickyLandingPageBottomBar} from "~/components/landingPageBottomBar";
import {CoverImage} from "~/global-common-typescript/components/coverImage";
import {ImageCdnProvider} from "~/global-common-typescript/components/growthJockeyImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {getNonEmptyStringFromUnknown} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {ContactUsCta, DealerLocator, FaqSection, TransformingLives} from "~/routes";
import {ExploreStarProducts, JodiSection} from "~/routes/campaigns/landingPage2";
import {DealerLocatorPage} from "~/routes/dealer-locator";
import {PowerPlannerTeaser} from "~/routes/load-calculator";
import {getUserPreferencesFromCookies} from "~/server/userPreferencesCookieHelper.server";
import {Dealer, UserPreferences} from "~/typeDefinitions";
import {getRedirectToUrlFromRequest} from "~/utilities";
import {getVernacularString} from "~/vernacularProvider";

// TODO: Rework for fetcher
type DealerLocatorActionData = {
    dealerList: Array<Dealer>;
    path: string;
    error: string;
};

export const action: ActionFunction = async ({request, params}) => {
    const body = await request.formData();

    const city = getNonEmptyStringFromUnknown(body.get("dealerLocation")) as string;
    const dealerList = await getDealerForCity(city);

    const actionData: DealerLocatorActionData = {
        dealerList: dealerList,
        error: dealerList == null ? "No Dealer Present For Selected Location" : "",
        path: "/dealer-locator",
    };

    return actionData;
};

type LoaderData = {
    userPreferences: UserPreferences;
    redirectTo: string;
};

export const loader: LoaderFunction = async ({request}) => {
    const userPreferences = await getUserPreferencesFromCookies(request);
    if (userPreferences instanceof Error) {
        throw userPreferences;
    }

    const loaderData: LoaderData = {
        userPreferences: userPreferences,
        redirectTo: getRedirectToUrlFromRequest(request),
    };

    return loaderData;
};

export default function () {
    const {userPreferences, redirectTo} = useLoaderData() as LoaderData;

    const actionData = useActionData();

    return (
        <>
            <HeaderComponent
                userPreferences={userPreferences}
                redirectTo={redirectTo}
                showMobileMenuIcon={false}
            />
            <LandingPage
                userPreferences={userPreferences}
                actionData={actionData}
            />
            <FooterSocialLogosAndCopywrite userPreferences={userPreferences} />
            <StickyLandingPageBottomBar userPreferences={userPreferences} />
        </>
    );
}

function LandingPage({userPreferences, actionData}: {userPreferences: UserPreferences; actionData: DealerLocatorActionData}) {
    return (
        <>
            <HeroSection userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <JodiSection userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <DealerLocator
                userPreferences={userPreferences}
                showCtaButton={true}
            />

            <VerticalSpacer className="tw-h-10" />

            <PowerPlannerTeaser userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <ExploreStarProducts userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-12" />

            <TapIntoEfficiency userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <TransformingLives userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <FaqSection userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />
        </>
    );
}

function HeroSection({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div className="tw-h-[calc(100vh-var(--lg-header-height)-var(--lg-mobile-ui-height)-7.5rem)] tw-grid tw-grid-rows-[1.5rem_3rem_minmax(0,1fr)_auto_0.5rem_auto_1rem_auto_1rem_minmax(0,1fr)_auto_1.5rem] tw-justify-items-center tw-text-center">
            <CoverImage
                relativePath="/livguard/landingPages/2/hero_image.jpg"
                className="tw-row-[1/span_12] tw-col-start-1"
                imageCdnProvider={ImageCdnProvider.Imgix}
            />

            <DefaultTextAnimation className="tw-row-start-4 tw-col-start-1">
                <div
                    dangerouslySetInnerHTML={{__html: getVernacularString("landingPage3S1T1", userPreferences.language)}}
                    className="lg-text-banner lg-px-screen-edge tw-text-white"
                />
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-6 tw-col-start-1">
                <div
                    dangerouslySetInnerHTML={{__html: getVernacularString("landingPage3S1T2", userPreferences.language)}}
                    className="lg-text-title1 lg-px-screen-edge tw-text-white"
                />
            </DefaultTextAnimation>

            <DefaultElementAnimation className="tw-row-[8] tw-col-start-1">
                <ContactUsCta
                    userPreferences={userPreferences}
                    textVernacId="landingPage3S1T3"
                    className="tw-z-10"
                />
            </DefaultElementAnimation>

            <ChevronDoubleDownIcon className="tw-row-[11] tw-col-start-1 tw-w-12 tw-h-12 lg-text-primary-500 tw-animate-bounce" />
        </div>
    );
}

export function TapIntoEfficiency({userPreferences}: {userPreferences: UserPreferences}) {
    const sectionData = [
        {
            imageRelativePath: "/livguard/landingPages/3/1.jpg",
            titleTextContentPiece: "landingPage3S7Slide1Heading",
            bodyTextContentPiece: "landingPage3S7Slide1Content",
        },
        {
            imageRelativePath: "/livguard/landingPages/3/2.jpg",
            titleTextContentPiece: "landingPage3S7Slide2Heading",
            bodyTextContentPiece: "landingPage3S7Slide2Content",
        },
        {
            imageRelativePath: "/livguard/landingPages/3/3.jpg",
            titleTextContentPiece: "landingPage3S7Slide3Heading",
            bodyTextContentPiece: "landingPage3S7Slide3Content",
        },
    ];

    return (
        <div className="tw-flex tw-flex-col tw-justify-center tw-items-center">
            <div className="lg-text-headline">
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("landingPage3S7HT1", userPreferences.language)}} />
                </DefaultTextAnimation>
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("landingPage3S7HT2", userPreferences.language)}} />4
                </DefaultTextAnimation>
            </div>
            <VerticalSpacer className="tw-h-6" />
            <LandingPage3Carousel
                userPreferences={userPreferences}
                items={sectionData}
            />
            <VerticalSpacer className="tw-h-8 tw-flex-1" />

            <ContactUsCta
                userPreferences={userPreferences}
                textVernacId="landingPage3S7BT"
                className="tw-z-10"
            />
        </div>
    );
}

export function FaqSection({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div className="lg-px-screen-edge">
            <div className="tw-flex tw-flex-col">
                <div className="lg-text-headline tw-text-center">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS9H1T1", userPreferences.language)}} />
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS9H1T2", userPreferences.language)}} />
                </div>

                <VerticalSpacer className="tw-h-4" />

                <div className="lg-text-body tw-text-center">
                    <div>{getVernacularString("homeS9T2P1", userPreferences.language)}</div>
                    <div>{getVernacularString("homeS9T2P2", userPreferences.language)}</div>
                </div>

                <VerticalSpacer className="tw-h-4" />

                <div className="tw-flex tw-flex-col tw-gap-y-3">
                    <ItemBuilder
                        items={[
                            {
                                question: "landingPage3Q1Q",
                                answer: "landingPage3Q1A",
                            },
                            {
                                question: "landingPage3Q2Q",
                                answer: "landingPage3Q2A",
                            },
                            {
                                question: "landingPage3Q3Q",
                                answer: "landingPage3Q3A",
                            },
                            {
                                question: "landingPage3Q4Q",
                                answer: "landingPage3Q4A",
                            },
                            {
                                question: "landingPage3Q5Q",
                                answer: "landingPage3Q5A",
                            },
                        ]}
                        itemBuilder={(item, itemIndex) => (
                            <Accordion
                                title={getVernacularString(item.question, userPreferences.language)}
                                panelItem={
                                    <div
                                        className="lg-text-secondary-900"
                                        key={itemIndex}
                                    >
                                        <div dangerouslySetInnerHTML={{__html: getVernacularString(item.answer, userPreferences.language)}} />
                                    </div>
                                }
                                key={itemIndex}
                            />
                        )}
                    />
                </div>

                <VerticalSpacer className="tw-h-4" />

                <div className="lg-text-body tw-text-center">
                    <div>{getVernacularString("homeS9T3P1", userPreferences.language)}</div>
                    <div>
                        {getVernacularString("homeS9T3P2", userPreferences.language)}{" "}
                        <a
                            href="tel:18001025551"
                            className="tw-underline"
                        >
                            {getVernacularString("homeS9T3P3", userPreferences.language)}
                        </a>{" "}
                        {getVernacularString("homeS9T3P4", userPreferences.language)}
                    </div>
                </div>
            </div>
        </div>
    );
}
