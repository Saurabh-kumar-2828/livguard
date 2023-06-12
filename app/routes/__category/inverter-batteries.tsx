import {ChevronDoubleDownIcon} from "@heroicons/react/20/solid";
import type {LinksFunction, LoaderFunction, MetaFunction} from "@remix-run/node";
import {useState} from "react";
import {Clock, HandThumbsUpFill, Lightning, Wallet} from "react-bootstrap-icons";
import {useResizeDetector} from "react-resize-detector";
import {useLoaderData} from "react-router";
import {CarouselStyle4} from "~/components/carouselStyle4";
import {OurSuggestionsComponent, ProductCardComponent, ProductOverviewComponent, SocialHandles, WhatsBestForYouComponent} from "~/components/category/common";
import {CategoryCarousel1} from "~/components/categoryCarousel1";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {FaqSectionInternal} from "~/components/faqs";
import {CoverImage} from "~/components/images/coverImage";
import {FixedWidthImage} from "~/components/images/fixedWidthImage";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {PageScaffold} from "~/components/pageScaffold";
import {ProductAndCategoryBottomBar} from "~/components/productAndCategoryBottomBar";
import {EmptyFlexFiller} from "~/global-common-typescript/components/emptyFlexFiller";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {DealerLocator} from "~/routes";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import type {UserPreferences} from "~/typeDefinitions";
import {Language} from "~/typeDefinitions";
import {appendSpaceToString, getRedirectToUrlFromRequest, getUrlFromRequest} from "~/utilities";
import {getVernacularString} from "~/vernacularProvider";

export const meta: MetaFunction = ({data}: {data: LoaderData}) => {
    const userPreferences: UserPreferences = data.userPreferences;
    if (userPreferences.language == Language.English) {
        return {
            title: "Buy Inverter Battery Online at Best Prices In India",
            description: "Invest in the best inverter batteries for your home with Livguard. Experience efficiency and comfort with the battery's long life",
            "og:title": "Buy Inverter Battery Online at Best Prices In India",
            "og:site_name": "Livguard",
            "og:url": "https://www.livguard.com/inverter-batteries/",
            "og:description": "Invest in the best inverter batteries for your home with Livguard. Experience efficiency and comfort with the battery's long life",
            "og:type": "product",
            "og:image": "https://growthjockey.imgix.net/livguard/category/batteries/2/1.jpg?w=764.140625",
        };
    } else if (userPreferences.language == Language.Hindi) {
        return {
            title: "भारत में सर्वोत्तम मूल्य पर इनवर्टर बैटरी ऑनलाइन खरीदें",
            description: "लिवगार्ड के साथ अपने घर के लिए सर्वश्रेष्ठ इनवर्टर बैटरी में निवेश करें। बैटरी के लंबे जीवन के साथ क्षमता और आराम का अनुभव करें",
            "og:title": "भारत में सर्वोत्तम मूल्य पर इनवर्टर बैटरी ऑनलाइन खरीदें",
            "og:site_name": "Livguard",
            "og:url": "https://www.livguard.com/inverter-batteries/",
            "og:description": "लिवगार्ड के साथ अपने घर के लिए सर्वश्रेष्ठ इनवर्टर बैटरी में निवेश करें। बैटरी के लंबे जीवन के साथ क्षमता और आराम का अनुभव करें",
            "og:type": "product",
            "og:image": "https://growthjockey.imgix.net/livguard/category/batteries/2/1.jpg?w=764.140625",
        };
    } else {
        throw Error(`Undefined language ${userPreferences.language}`);
    }
};

export const links: LinksFunction = () => {
    return [{rel: "canonical", href: "https://www.livguard.com/inverter-batteries/"}];
};

type LoaderData = {
    userPreferences: UserPreferences;
    redirectTo: string;
    pageUrl: string;
};

export const loader: LoaderFunction = async ({request}) => {
    const userPreferences = await getUserPreferencesFromCookiesAndUrlSearchParameters(request);
    if (userPreferences instanceof Error) {
        throw userPreferences;
    }

    const loaderData: LoaderData = {
        userPreferences: userPreferences,
        redirectTo: getRedirectToUrlFromRequest(request),
        pageUrl: getUrlFromRequest(request),
    };

    return loaderData;
};

export default function () {
    const {userPreferences, redirectTo, pageUrl} = useLoaderData() as LoaderData;

    const utmSearchParameters = useUtmSearchParameters();

    return (
        <>
            <PageScaffold
                userPreferences={userPreferences}
                redirectTo={redirectTo}
                showMobileMenuIcon={true}
                utmParameters={utmSearchParameters}
                breadcrumbs={[
                    {contentId: "cfab263f-0175-43fb-91e5-fccc64209d36", link: "/"},
                    {contentId: "09b8631b-98e0-4ae8-bafb-65bb57001872", link: "#"},
                ]}
            >
                <CategoryPage
                    userPreferences={userPreferences}
                    utmParameters={utmSearchParameters}
                />
            </PageScaffold>

            <ProductAndCategoryBottomBar
                userPreferences={userPreferences}
                utmParameters={utmSearchParameters}
                pageUrl={pageUrl}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: `
                        {
                            "@context": "https://schema.org",
                            "@type": "BreadcrumbList",
                            "itemListElement": [
                                {
                                    "@type": "ListItem",
                                    "position": 1,
                                    "name": "LivGuard",
                                    "item": "https://www.livguard.com/",
                                    "description": " We Are One of A Kind With Livguard, you are always in trusted hands. In just 9 years, Livguard has become the fastest-growing Energy Storage Solutions brand. Our zeal to develop a complete and connected ecosystem of happy customers, committed partners, & the best quality every time has made us the choice of people nationwide.",
                                    "image": [
                                        " https://files.growthjockey.com/livguard/icons/logo-dark.svg"
                                    ]
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 2,
                                    "name": "Inverters Batteries",
                                    "item": "https://www.livguard.com/inverter-batteries",
                                    "description": " Inverter batteries with a powerful backup, made to empower your home with limitless energy whenever you need",
                                    "image": [
                                        "https://growthjockey.imgix.net/livguard/category/batteries/2/3.jpg?w=714.7166748046875"
                                    ]
                                },
                                {
                                    "@type": "SiteNavigationElement",
                                    "name": "Livguard",
                                    "url": "https://www.livguard.com/",
                                    "description": " We Are One of A Kind With Livguard, you are always in trusted hands. In just 9 years, Livguard has become the fastest-growing Energy Storage Solutions brand. Our zeal to develop a complete and connected ecosystem of happy customers, committed partners, & the best quality every time has made us the choice of people nationwide.",
                                    "image": [
                                        "https://files.growthjockey.com/livguard/icons/logo-dark.svg"
                                    ]
                                },
                                {
                                    "@type": "SiteNavigationElement",
                                    "name": "Inverters Batteries",
                                    "url": "https://www.livguard.com/inverter-batteries",
                                    "description": "Inverter batteries with a powerful backup, made to empower your home with limitless energy whenever you need",
                                    "image": [
                                        "https://growthjockey.imgix.net/livguard/category/batteries/2/3.jpg?w=714.7166748046875"
                                    ]
                                }
                            ]
                        }
                    `,
                }}
            />
        </>
    );
}

function CategoryPage({userPreferences, utmParameters}: {userPreferences: UserPreferences; utmParameters: {[searchParameter: string]: string}}) {
    return (
        <>
            <HeroSection userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            <BatteriesAreMeantToLast
                userPreferences={userPreferences}
                className="lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            <OurBatteriesSection
                userPreferences={userPreferences}
                className="lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            <OurSuggestionsSection
                userPreferences={userPreferences}
                className="lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            {/* <SideBySideOverviewSection userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" /> */}

            <SuggestedJodiSection
                userPreferences={userPreferences}
                className="lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-h-10 llg:tw-h-20" />

            <div className="tw-grid tw-grid-cols-1 tw-grid-rows-2 lg:tw-items-center lg:tw-grid-cols-[minmax(0,2fr),minmax(0,3fr)] lg:tw-grid-rows-1 tw-gap-y-10 lg:tw-gap-x-4 lg:tw-px-[72px] xl:tw-px-[120px]">
                <DealerLocator
                    userPreferences={userPreferences}
                    showCtaButton={true}
                    className="tw-row-start-1 tw-col-start-1 lg:tw-row-span-full lg:tw-col-start-1 lg:tw-h-full lg:tw-min-h-[36rem]"
                />

                <ChooseBestInverterBattery
                    userPreferences={userPreferences}
                    utmParameters={utmParameters}
                    className="tw-row-start-2 lg:tw-col-start-2 lg:tw-row-start-1"
                />
            </div>

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            <FaqSection
                userPreferences={userPreferences}
                className="lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            <SocialHandles
                userPreferences={userPreferences}
                heading={{text1: "dealerLocatorSocialHT1", text2: "dealerLocatorSocialHT2"}}
                className="lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />
        </>
    );
}

function HeroSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const {width: containerWidth, height: containerHeight, ref} = useResizeDetector();

    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-h-[calc(100vh-var(--lg-header-height)-var(--lg-mobile-ui-height))-4.5rem] lg:tw-h-[calc(100vh-var(--lg-header-height)-var(--lg-mobile-ui-height))] tw-min-h-[calc(100vw*7/16)] tw-grid tw-grid-rows-[1.5rem_3rem_minmax(0,1fr)_auto_0.5rem_auto_1rem_auto_1rem_minmax(0,1fr)_auto_1.5rem] tw-justify-items-center tw-text-center",
                className,
            )}
            ref={ref}
        >
            {/* <CoverImage
                relativePath="/livguard/category/batteries/1/1.jpg"
                className="tw-row-[1/span_12] tw-col-start-1"
                alt="Inverter battery"
            /> */}

            {/* {containerWidth == null || containerHeight == null ? null : (
                <CoverImage
                    relativePath={
                        containerHeight > containerWidth || containerWidth < 640
                            ? userPreferences.language == Language.English
                                ? "/livguard/category/batteries/1/desktop_hero.jpg"
                                : "/livguard/category/batteries/1/.jpg"
                            : userPreferences.language == Language.English
                            ? "/livguard/category/batteries/1/.jpg"
                            : "/livguard/category/batteries/1/.jpg"
                    }
                    className="tw-row-start-1 tw-col-start-1 tw-row-span-full"
                    key={
                        containerHeight > containerWidth || containerWidth < 640
                            ? userPreferences.language == Language.English
                                ? "/livguard/category/batteries/1/.jpg"
                                : "/livguard/category/batteries/1/.jpg"
                            : userPreferences.language == Language.English
                            ? "/livguard/category/batteries/1/.jpg"
                            : "/livguard/category/batteries/1/.jpg"
                    }
                />
            )} */}

            {containerWidth == null || containerHeight == null ? null : (
                <CoverImage
                    relativePath={containerHeight > containerWidth || containerWidth < 640 ? "/livguard/category/batteries/1/mobile_hero.jpg" : "/livguard/category/batteries/1/desktp_hero.jpg"}
                    className="tw-row-start-1 tw-col-start-1 tw-row-span-full"
                    key={containerHeight > containerWidth || containerWidth < 640 ? "/livguard/category/batteries/1/mobile_hero.jpg" : "/livguard/category/batteries/1/desktp_hero.jpg"}
                />
            )}

            <DefaultTextAnimation className="tw-row-start-4 tw-col-start-1">
                <div className="lg-text-banner lg-px-screen-edge tw-text-secondary-900-dark">{getVernacularString("categoryBatteriesS1T1", userPreferences.language)}</div>
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-6 tw-col-start-1">
                <div className="lg-text-title1 lg-px-screen-edge tw-text-secondary-900-dark">{getVernacularString("categoryBatteriesS1T2", userPreferences.language)}</div>
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-[8] tw-col-start-1">
                <h2 className="lg-text-body lg-px-screen-edge !tw-text-secondary-900-dark">{getVernacularString("categoryBatteriesS1T3", userPreferences.language)}</h2>
            </DefaultTextAnimation>

            <ChevronDoubleDownIcon className="tw-row-[11] tw-col-start-1 tw-w-12 tw-h-12 lg-text-primary-500 tw-animate-bounce" />
        </div>
    );
}

function BatteriesAreMeantToLast({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const sectionData: Array<{titleTextContentPiece: string; bodyTextContentPiece: string; imageRelativePath: string}> = [
        {
            titleTextContentPiece: "categoryBatteriesS2Slide1Heading",
            bodyTextContentPiece: "categoryBatteriesS2Slide1Description",
            imageRelativePath: "/livguard/category/batteries/2/1.jpg",
        },
        {
            titleTextContentPiece: "categoryBatteriesS2Slide2Heading",
            bodyTextContentPiece: "categoryBatteriesS2Slide2Description",
            imageRelativePath: "/livguard/category/batteries/2/2.jpg",
        },
        {
            titleTextContentPiece: "categoryBatteriesS2Slide3Heading",
            bodyTextContentPiece: "categoryBatteriesS2Slide3Description",
            imageRelativePath: "/livguard/category/batteries/2/3.jpg",
        },
        {
            titleTextContentPiece: "categoryBatteriesS2Slide4Heading",
            bodyTextContentPiece: "categoryBatteriesS2Slide4Description",
            imageRelativePath: "/livguard/category/batteries/2/4.jpg",
        },
    ];

    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-flex tw-flex-col", className)}>
            <h2 className="lg-text-headline tw-text-center">
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: appendSpaceToString(getVernacularString("categoryBatteriesS2HT1", userPreferences.language))}} />
                </DefaultTextAnimation>
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("categoryBatteriesS2HT2", userPreferences.language)}} />
                </DefaultTextAnimation>
            </h2>

            <VerticalSpacer className="tw-h-6" />

            <CategoryCarousel1
                userPreferences={userPreferences}
                items={sectionData}
                className="tw-max-w-7xl tw-mx-auto"
            />
        </div>
    );
}

// function ChooseYourBattery({userPreferences}: {userPreferences: UserPreferences}) {
//     return (
//         <div className="lg-px-screen-edge">
//             <div className="tw-flex tw-flex-col tw-items-center">
//                 <div className="lg-text-headline tw-text-center">
//                     <DefaultTextAnimation>
//                         <div dangerouslySetInnerHTML={{__html: getVernacularString("categoryBatteriesS3HT1", userPreferences.language)}} />
//                     </DefaultTextAnimation>
//                     <DefaultTextAnimation>
//                         <div dangerouslySetInnerHTML={{__html: getVernacularString("categoryBatteriesS3HT2", userPreferences.language)}} />
//                     </DefaultTextAnimation>
//                 </div>

//                 <VerticalSpacer className="tw-h-6" />

//                 <DefaultTextAnimation>
//                     <div className="lg-text-title2 tw-text-center">{getVernacularString("categoryBatteriesS4Heading", userPreferences.language)}</div>
//                 </DefaultTextAnimation>

//                 <div className="tw-grid tw-grid-cols-[minmax(0,1fr),minmax(0,1fr)] tw-gap-4">
//                     <DefaultElementAnimation>
//                         {/* <div
//                             className={concatenateNonNullStringsWithSpaces(
//                                 "tw-col-start-1 tw-flex tw-flex-row tw-items-center tw-rounded-lg hover:tw-cursor-pointer tw-p-2 tw-gap-2",
//                                 `${selectedBatteryType == BatteryType.flat ? "lg-bg-primary-500 lg-text-secondary-900" : "lg-bg-secondary-700 lg-text-secondary-100"} `,
//                             )}
//                             onClick={() => setSelectedBatteryType(BatteryType.flat)}
//                         >
//                             <div className="tw-h-6 tw-w-6">
//                                 <FullWidthImage
//                                     relativePath="/livguard/icons/flatPlate.png"
////                                 />
//                             </div>
//                             <div className={concatenateNonNullStringsWithSpaces("tw-text-body", `${selectedBatteryType == BatteryType.flat ? "lg-text-secondary-900" : "lg-text-secondary-100"}`)}>
//                                 {getVernacularString("categoryBatteriesS4BTFlat", userPreferences.language)}
//                             </div>
//                         </div> */}
//                     </DefaultElementAnimation>

//                     <DefaultElementAnimation>
//                         {/* <div
//                             className={concatenateNonNullStringsWithSpaces(
//                                 "tw-col-start-2 tw-flex tw-flex-row tw-items-center tw-rounded-lg hover:tw-cursor-pointer tw-p-2 tw-gap-2",
//                                 `${selectedBatteryType == BatteryType.tubular ? "lg-bg-primary-500 lg-text-secondary-900" : "lg-bg-secondary-700 lg-text-secondary-100"} `,
//                             )}
//                             onClick={() => setSelectedBatteryType(BatteryType.tubular)}
//                         >
//                             <div className="tw-h-6 tw-w-6 tw-overflow-hidden">
//                                 <FullWidthImage
//                                     relativePath="/livguard/icons/tallTubular.png"
////                                 />
//                             </div>
//                             <div className={concatenateNonNullStringsWithSpaces("tw-text-body", `${selectedBatteryType == BatteryType.tubular ? "lg-text-secondary-900" : "lg-text-secondary-100"}`)}>
//                                 {getVernacularString("categoryBatteriesS4BTTubular", userPreferences.language)}
//                             </div>
//                         </div> */}
//                     </DefaultElementAnimation>
//                 </div>

//                 <VerticalSpacer className="tw-h-4" />

//                 {/* <OurSuggestionsComponent
//                     vernacularContent={selectedBatteryType == BatteryType.flat ? sectionData[0] : sectionData[1]}
//                     backgroundColor={selectedBatteryType == BatteryType.flat ? "primary-500" : "secondary-100"}
//                 /> */}

//                 <VerticalSpacer className="tw-h-10" />

//                 <DefaultElementAnimation>
//                     <div className="lg-cta-button ">{getVernacularString("categoryBatteriesS4BT", userPreferences.language)}</div>
//                 </DefaultElementAnimation>
//             </div>
//         </div>
//     );
// }

export function OurBatteriesSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const highlightedBatteries = [
        {name: "Tall Tubular", image: "/livguard/products/batteries/it1584tt/thumbnail.png"},
        {name: "Short Tubular", image: "/livguard/products/batteries/it1048st/thumbnail.png"},
        {name: "Short Tall Tubular", image: "/livguard/products/batteries/it1560stt/thumbnail.png"},
        {name: "Short Tubular Jumbo", image: "/livguard/products/batteries/it1636stj/thumbnail.png"},
    ];

    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-cols-1 tw-justify-items-center lg-px-screen-edge tw-max-w-7xl tw-mx-auto", className)}>
            <h2 className="lg-text-headline tw-text-center">
                <div dangerouslySetInnerHTML={{__html: appendSpaceToString(getVernacularString("categoryBatteriesS3T1", userPreferences.language))}} />
                <div dangerouslySetInnerHTML={{__html: getVernacularString("categoryBatteriesS3T2", userPreferences.language)}} />
            </h2>

            <VerticalSpacer className="tw-h-6" />

            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-rows-[auto_auto_auto] lg:tw-grid-cols-[minmax(0,2fr),minmax(0,3fr)] tw-items-center tw-justify-items-center lg:tw-justify-items-start lg:lg-bg-secondary-100 lg:tw-p-4 lg:tw-rounded-lg">
                <div className="tw-row-start-1 tw-col-start-1 lg:tw-row-start-1 lg:tw-col-start-2 lg-text-title1 tw-text-center">
                    {getVernacularString("8f342209-314d-41f9-ac39-3370d9d96fcb", userPreferences.language)}
                </div>

                <VerticalSpacer className="tw-h-6 tw-hidden lg:tw-block" />

                {/* 31ca68bd-891d-47f3-b0ef-32b21bd9017f: Temporary hack until we can get a proper cropped-thumbnail image for each product */}
                <div className="tw-row-start-2 tw-col-start-1 lg:tw-row-start-1 lg:tw-col-start-1 lg:tw-row-span-2 tw-w-full tw-aspect-[4/3] tw-justify-self-center tw-self-start tw-max-w-[30rem]">
                    <CoverImage relativePath="/livguard/products/batteries/it1560stt/thumbnail.png" />
                </div>
                {/* /31ca68bd-891d-47f3-b0ef-32b21bd9017f */}

                <div className="tw-row-start-3 tw-col-start-1 lg:tw-row-start-2 lg:tw-col-start-2 tw-flex tw-flex-col">
                    <VerticalSpacer className="tw-h-4" />

                    <div>{getVernacularString("dd873e80-f5f5-48a6-8429-04efadff2720", userPreferences.language)}</div>

                    <VerticalSpacer className="tw-h-6" />

                    <div className="tw-grid tw-grid-cols-1 tw-gap-y-4">
                        <ItemBuilder
                            items={[
                                {
                                    contentId: "0593d2e0-e3ec-41c2-9ea8-5bf5fe8e1940",
                                    iconComponent: Clock,
                                },
                                {
                                    contentId: "59681e39-779a-4a64-be41-6272b33277e4",
                                    iconComponent: Lightning,
                                },
                                {
                                    contentId: "5b9b5e8e-558b-46b5-aed4-8694bdcf47ab",
                                    iconComponent: Wallet,
                                },
                                {
                                    contentId: "c04c64d1-8625-41c1-b2a1-aea0ec578adb",
                                    iconComponent: HandThumbsUpFill,
                                },
                            ]}
                            itemBuilder={(item, itemIndex) => (
                                <div
                                    className="tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-x-2 tw-items-center"
                                    key={itemIndex}
                                >
                                    <div className="tw-w-12 tw-h-12 lg-bg-secondary-300 tw-rounded-full tw-p-3">
                                        <item.iconComponent className="tw-w-6 tw-h-6" />
                                    </div>
                                    <div>{getVernacularString(item.contentId, userPreferences.language)}</div>
                                </div>
                            )}
                        />
                    </div>
                </div>

                <VerticalSpacer className="tw-row-start-4 tw-col-start-1 tw-h-6 lg:tw-hidden" />

                <CarouselStyle4
                    items={highlightedBatteries.map((item, itemIndex) => (
                        <div
                            className="tw-w-full tw-h-full lg-bg-secondary-300 tw-rounded-lg tw-flex lg:tw-max-w-[200px] tw-flex-col tw-p-4 tw-gap-y-2 lg:tw-justify-center lg:tw-items-center"
                            key={itemIndex}
                        >
                            <div className="tw-w-full lg-text-body-bold tw-text-center">{item.name}</div>
                            <EmptyFlexFiller />
                            <FullWidthImage relativePath={item.image} />
                        </div>
                    ))}
                    className="tw-row-start-5 tw-col-start-1 tw-max-w-[27.5rem] lg:tw-hidden"
                />

                <div className="tw-col-span-2 tw-justify-self-center tw-hidden lg:tw-grid tw-w-full tw-grid-cols-[repeat(4,200px)] tw-gap-x-4 tw-justify-center tw-justify-items-center">
                    <ItemBuilder
                        items={highlightedBatteries}
                        itemBuilder={(item, itemIndex) => (
                            <div
                                className="tw-w-full tw-h-full lg-bg-secondary-300 tw-rounded-lg tw-flex lg:tw-max-w-[200px] tw-flex-col tw-p-4 tw-gap-y-2 lg:tw-justify-center lg:tw-items-center"
                                key={itemIndex}
                            >
                                <div className="tw-w-full lg-text-body-bold tw-text-center">{item.name}</div>
                                <EmptyFlexFiller />
                                <FullWidthImage relativePath={item.image} />
                            </div>
                        )}
                    />
                </div>
            </div>

            {/* <OurBatteriesSectionInternal userPreferences={userPreferences} /> */}
        </div>
    );
}

export function OurBatteriesSectionInternal({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div>
            <div className="lg-px-screen-edge tw-grid tw-grid-rows-[repeat(7,auto)] tw-grid-cols-[4.5rem_minmax(0,1fr)] lg:tw-grid-cols-[4.5rem_22rem] tw-gap-x-2">
                {/* <div className="tw-row-start-1 tw-col-start-1 tw-row-span-full tw-w-full tw-h-full tw-bg-gradient-to-l tw-from-[#F25F60] tw-to-[#EB2A2B] tw-rounded-lg" /> */}

                {/* <div className="tw-row-start-1 tw-col-start-2 tw-row-span-full tw-w-full tw-h-full lg-bg-secondary-100 tw-rounded-lg" /> */}

                <div className="tw-row-start-1 tw-col-start-2 tw-row-span-full tw-w-full tw-h-full lg-bg-secondary-300 tw-rounded-lg" />

                {/* <div className="tw-row-start-1 tw-col-start-2 tw-px-5">
                    <div className="tw-flex lg:tw-hidden tw-justify-center tw-items-center">
                        <FullWidthImage
                            relativePath="/livguard/category/batteries/4/1.png"
                        />
                    </div>
                    <div className="tw-hidden lg:tw-flex tw-justify-center tw-items-center">
                        <FixedWidthImage
                            relativePath="/livguard/category/batteries/4/1.png"
                            width="10rem"
                        />
                    </div>
                </div> */}

                <div className="tw-row-start-1 tw-col-start-2 tw-px-5">
                    <div className="tw-flex lg:tw-hidden tw-justify-center tw-items-center">
                        <FullWidthImage relativePath="/livguard/products/batteries/it1584tt/thumbnail.png" />
                    </div>
                    <div className="tw-hidden lg:tw-flex tw-justify-center tw-items-center">
                        <FixedWidthImage
                            relativePath="/livguard/products/batteries/it1584tt/thumbnail.png"
                            width="10rem"
                        />
                    </div>
                </div>

                {/* <div className="tw-row-start-2 tw-col-start-2 tw-px-4 lg-text-title2 tw-pb-3 tw-text-center">{getVernacularString("categoryBatteriesS3R1C2", userPreferences.language)}</div> */}

                <div className="tw-row-start-2 tw-col-start-2 tw-px-4 lg-text-title2 tw-pb-3 tw-text-center">{getVernacularString("categoryBatteriesS3R1C3", userPreferences.language)}</div>

                <div className="tw-row-start-3 tw-col-start-1 tw-mx-2 tw-py-3 lg-text-icon tw-border-solid tw-border-b tw-border-secondary-900-dark tw-border-opacity-50 tw-text-secondary-900">
                    {getVernacularString("categoryBatteriesS3R2C1", userPreferences.language)}
                </div>

                {/* <div className="tw-row-start-3 tw-col-start-2 tw-mx-4 tw-py-3 tw-text-center tw-border-solid tw-border-b tw-border-secondary-300-dark tw-border-opacity-50">
                    {getVernacularString("categoryBatteriesS3R2C2", userPreferences.language)}
                </div> */}

                <div className="tw-row-start-3 tw-col-start-2 tw-mx-4 tw-py-3 tw-text-center tw-border-solid tw-border-b tw-border-secondary-100-dark tw-border-opacity-50">
                    {getVernacularString("categoryBatteriesS3R2C3", userPreferences.language)}
                </div>

                <div className="tw-row-start-4 tw-col-start-1 tw-mx-2 tw-py-3 lg-text-icon tw-border-solid tw-border-b tw-border-secondary-900-dark tw-border-opacity-50 tw-text-secondary-900">
                    {getVernacularString("categoryBatteriesS3R3C1", userPreferences.language)}
                </div>

                {/* <div className="tw-row-start-4 tw-col-start-2 tw-mx-4 tw-py-3 tw-text-center tw-border-solid tw-border-b tw-border-secondary-300-dark tw-border-opacity-50">
                    {getVernacularString("categoryBatteriesS3R3C2", userPreferences.language)}
                </div> */}

                <div className="tw-row-start-4 tw-col-start-2 tw-mx-4 tw-py-3 tw-text-center tw-border-solid tw-border-b tw-border-secondary-100-dark tw-border-opacity-50">
                    {getVernacularString("categoryBatteriesS3R3C3", userPreferences.language)}
                </div>

                <div className="tw-row-start-5 tw-col-start-1 tw-mx-2 tw-py-3 lg-text-icon tw-border-solid tw-border-b tw-border-secondary-900-dark tw-border-opacity-50 tw-text-secondary-900">
                    {getVernacularString("categoryBatteriesS3R4C1", userPreferences.language)}
                </div>

                {/* <div className="tw-row-start-5 tw-col-start-2 tw-mx-4 tw-py-3 tw-text-center tw-border-solid tw-border-b tw-border-secondary-300-dark tw-border-opacity-50">
                    {getVernacularString("categoryBatteriesS3R4C2", userPreferences.language)}
                </div> */}

                <div className="tw-row-start-5 tw-col-start-2 tw-mx-4 tw-py-3 tw-text-center tw-border-solid tw-border-b tw-border-secondary-100-dark tw-border-opacity-50">
                    {getVernacularString("categoryBatteriesS3R4C3", userPreferences.language)}
                </div>

                <div className="tw-row-start-6 tw-col-start-1 tw-mx-2 tw-py-3 lg-text-icon tw-border-solid tw-border-b tw-border-secondary-900-dark tw-border-opacity-50 tw-text-secondary-900">
                    {getVernacularString("categoryBatteriesS3R5C1", userPreferences.language)}
                </div>

                {/* <div className="tw-row-start-6 tw-col-start-2 tw-mx-4 tw-py-3 tw-text-center tw-border-solid tw-border-b tw-border-secondary-300-dark tw-border-opacity-50">
                    {getVernacularString("categoryBatteriesS3R5C2", userPreferences.language)}
                </div> */}

                <div className="tw-row-start-6 tw-col-start-2 tw-mx-4 tw-py-3 tw-pb-8 tw-text-center tw-border-solid tw-border-b tw-border-secondary-100-dark tw-border-opacity-50">
                    {getVernacularString("categoryBatteriesS3R5C3", userPreferences.language)}
                </div>

                <div className="tw-row-start-7 tw-col-start-1 tw-mx-2 tw-py-3 tw-pb-8 lg-text-icon tw-text-secondary-900">
                    {getVernacularString("categoryBatteriesS3R6C1", userPreferences.language)}
                </div>

                {/* <div className="tw-row-start-7 tw-col-start-2 tw-mx-4 tw-py-3 tw-text-center">{getVernacularString("categoryBatteriesS3R6C2", userPreferences.language)}</div> */}

                <div className="tw-row-start-7 tw-col-start-2 tw-mx-4 tw-py-3 tw-pb-8 tw-text-center">{getVernacularString("categoryBatteriesS3R6C3", userPreferences.language)}</div>
            </div>
        </div>
    );
}

export function OurSuggestionsSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const [selectedBatteryTypeIndex, setSelectedBatteryTypeIndex] = useState(0);

    const sectionData: Array<{
        typeDescription: string;
        heading: string;
        description: string;
        specificationHeading: string;
        keySpecifications: Array<{keySpecificationTitle: string; keySpecificationContent: string; keySpecificationIconRelativePath: string}>;
        imagesRelativePath: string;
        link: string;
        exploreButton: string;
        relatedProductsHeading: string;
        relatedProducts: Array<string>;
    }> = [
        {
            typeDescription: `${getVernacularString("categoryBatteriesS4Slide1TypeDescription", userPreferences.language)}`,
            heading: `${getVernacularString("categoryBatteriesS4Slide1Heading", userPreferences.language)}`,
            description: `${getVernacularString("categoryBatteriesS4Slide1Description", userPreferences.language)}`,
            specificationHeading: `${getVernacularString("categoryBatteriesS4SpecificationHeading", userPreferences.language)}`,
            keySpecifications: [
                {
                    keySpecificationTitle: getVernacularString("categoryBatteriesS2KS1Title", userPreferences.language),
                    keySpecificationContent: getVernacularString("categoryBatteriesSlide1KS1Description", userPreferences.language),
                    keySpecificationIconRelativePath: "/livguard/icons/waranty.png",
                },
                {
                    keySpecificationTitle: getVernacularString("categoryBatteriesS2KS2Title", userPreferences.language),
                    keySpecificationContent: getVernacularString("categoryBatteriesSlide1KS2Description", userPreferences.language),
                    keySpecificationIconRelativePath: "/livguard/icons/battery_capacity.png",
                },
                {
                    keySpecificationTitle: getVernacularString("categoryBatteriesS2KS3Title", userPreferences.language),
                    keySpecificationContent: getVernacularString("categoryBatteriesSlide1KS3Description", userPreferences.language),
                    keySpecificationIconRelativePath: "/livguard/icons/3dGrid.png",
                },
                {
                    keySpecificationTitle: getVernacularString("categoryBatteriesS2KS4Title", userPreferences.language),
                    keySpecificationContent: getVernacularString("categoryBatteriesSlide1KS4Description", userPreferences.language),
                    keySpecificationIconRelativePath: "/livguard/icons/dimensions.png",
                },
            ],
            imagesRelativePath: "/livguard/products/batteries/",
            link: "/product/it1584tt",
            exploreButton: getVernacularString("categoryBatteriesS4BT", userPreferences.language),
            relatedProductsHeading: getVernacularString("categoryBatteriesS4RelatedProductsHeading", userPreferences.language),
            relatedProducts: ["it1550tt", "it1584tt", "it1642tt", "it1648tt", "it1672tt", "it1860tt", "it1872tt", "it2048tt", "it2060tt", "it2072tt", "it2272tt", "it2360tt", "it2672tt"],
        },
        {
            typeDescription: `${getVernacularString("categoryBatteriesS4Slide2TypeDescription", userPreferences.language)}`,
            heading: `${getVernacularString("categoryBatteriesS4Slide2Heading", userPreferences.language)}`,
            description: `${getVernacularString("categoryBatteriesS4Slide2Description", userPreferences.language)}`,
            specificationHeading: `${getVernacularString("categoryBatteriesS4SpecificationHeading", userPreferences.language)}`,
            keySpecifications: [
                {
                    keySpecificationTitle: getVernacularString("categoryBatteriesS2KS1Title", userPreferences.language),
                    keySpecificationContent: getVernacularString("categoryBatteriesSlide2KS1Description", userPreferences.language),
                    keySpecificationIconRelativePath: "/livguard/icons/waranty.png",
                },
                {
                    keySpecificationTitle: getVernacularString("categoryBatteriesS2KS2Title", userPreferences.language),
                    keySpecificationContent: getVernacularString("categoryBatteriesSlide2KS2Description", userPreferences.language),
                    keySpecificationIconRelativePath: "/livguard/icons/battery_capacity.png",
                },
                {
                    keySpecificationTitle: getVernacularString("categoryBatteriesS2KS3Title", userPreferences.language),
                    keySpecificationContent: getVernacularString("categoryBatteriesSlide2KS3Description", userPreferences.language),
                    keySpecificationIconRelativePath: "/livguard/icons/3dGrid.png",
                },
                {
                    keySpecificationTitle: getVernacularString("categoryBatteriesS2KS4Title", userPreferences.language),
                    keySpecificationContent: getVernacularString("categoryBatteriesSlide2KS4Description", userPreferences.language),
                    keySpecificationIconRelativePath: "/livguard/icons/dimensions.png",
                },
            ],
            imagesRelativePath: "/livguard/products/batteries/",
            link: "/product/it1048st",
            exploreButton: getVernacularString("categoryBatteriesS4BT", userPreferences.language),
            relatedProductsHeading: getVernacularString("categoryBatteriesS4RelatedProductsHeading", userPreferences.language),
            relatedProducts: ["it9048st"],
        },
        {
            typeDescription: `${getVernacularString("categoryBatteriesS4Slide3TypeDescription", userPreferences.language)}`,
            heading: `${getVernacularString("categoryBatteriesS4Slide3Heading", userPreferences.language)}`,
            description: `${getVernacularString("categoryBatteriesS4Slide3Description", userPreferences.language)}`,
            specificationHeading: `${getVernacularString("categoryBatteriesS4SpecificationHeading", userPreferences.language)}`,
            keySpecifications: [
                {
                    keySpecificationTitle: getVernacularString("categoryBatteriesS2KS1Title", userPreferences.language),
                    keySpecificationContent: getVernacularString("categoryBatteriesSlide3KS1Description", userPreferences.language),
                    keySpecificationIconRelativePath: "/livguard/icons/waranty.png",
                },
                {
                    keySpecificationTitle: getVernacularString("categoryBatteriesS2KS2Title", userPreferences.language),
                    keySpecificationContent: getVernacularString("categoryBatteriesSlide3KS2Description", userPreferences.language),
                    keySpecificationIconRelativePath: "/livguard/icons/battery_capacity.png",
                },
                {
                    keySpecificationTitle: getVernacularString("categoryBatteriesS2KS3Title", userPreferences.language),
                    keySpecificationContent: getVernacularString("categoryBatteriesSlide3KS3Description", userPreferences.language),
                    keySpecificationIconRelativePath: "/livguard/icons/3dGrid.png",
                },
                {
                    keySpecificationTitle: getVernacularString("categoryBatteriesS2KS4Title", userPreferences.language),
                    keySpecificationContent: getVernacularString("categoryBatteriesSlide3KS4Description", userPreferences.language),
                    keySpecificationIconRelativePath: "/livguard/icons/dimensions.png",
                },
            ],
            imagesRelativePath: "/livguard/products/batteries/",
            link: "/product/it1560stt",
            exploreButton: getVernacularString("categoryBatteriesS4BT", userPreferences.language),
            relatedProductsHeading: getVernacularString("categoryBatteriesS4RelatedProductsHeading", userPreferences.language),
            relatedProducts: ["it1172stt", "it1548stt"],
        },
    ];

    return (
        <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge", className)}>
            <div className="tw-flex tw-flex-col tw-items-center">
                <div className="lg-text-headline tw-text-center">
                    <DefaultTextAnimation>
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("categoryBatteriesS4HT1", userPreferences.language)}} />
                    </DefaultTextAnimation>
                    <DefaultTextAnimation>
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("categoryBatteriesS4HT2", userPreferences.language)}} />
                    </DefaultTextAnimation>
                </div>

                <VerticalSpacer className="tw-h-6" />

                {/* <DefaultTextAnimation>
                    <div className="lg-text-title2 tw-text-center">{getVernacularString("categoryBatteriesS4Heading", userPreferences.language)}</div>
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-h-4" /> */}

                <DefaultElementAnimation>
                    <div className="tw-w-full tw-grid tw-grid-cols-3 tw-gap-4 tw-items-center">
                        <ItemBuilder
                            items={["categoryBatteriesS4TT", "categoryBatteriesS4ST", "categoryBatteriesS4STT"]}
                            itemBuilder={(item, itemIndex) => (
                                <button
                                    type="button"
                                    className={concatenateNonNullStringsWithSpaces(
                                        "tw-col-start-1 tw-w-full tw-h-full tw-flex tw-justify-center tw-items-center tw-rounded-lg hover:tw-cursor-pointer tw-p-2 tw-gap-2",
                                        `${selectedBatteryTypeIndex == itemIndex ? "lg-bg-primary-500" : "lg-bg-secondary-100"} `,
                                        `tw-col-start-${itemIndex + 1}`,
                                    )}
                                    onClick={() => setSelectedBatteryTypeIndex(itemIndex)}
                                    key={itemIndex}
                                >
                                    <div
                                        className={concatenateNonNullStringsWithSpaces(
                                            "tw-text-body tw-text-center",
                                            `${selectedBatteryTypeIndex == itemIndex ? "tw-text-secondary-900-dark" : "lg-text-secondary-900"}`,
                                        )}
                                    >
                                        {getVernacularString(item, userPreferences.language)}
                                    </div>
                                </button>
                            )}
                        />
                    </div>
                </DefaultElementAnimation>

                <VerticalSpacer className="tw-h-4" />

                <div className="lg-bg-secondary-100 tw-opacity-60 tw-text-center tw-border tw-border-dashed tw-rounded-md tw-px-4 tw-py-2">{sectionData[selectedBatteryTypeIndex].typeDescription}</div>

                <VerticalSpacer className="tw-h-4" />

                <OurSuggestionsComponent
                    vernacularContent={sectionData[selectedBatteryTypeIndex]}
                    // className={selectedBatteryType == BatteryType.flat ? "lg-bg-secondary-300" : "lg-bg-secondary-100"}
                    className="lg-bg-secondary-100"
                />
            </div>
        </div>
    );
}

export function SideBySideOverviewSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const productOverview: Array<{
        heading: string;
        image: string;
        features: Array<{title: string; highlighted: boolean}>;
    }> = [
        {
            image: "",
            heading: `${getVernacularString("categoryBatteriesS5Slide1Heading", userPreferences.language)}`,
            features: [
                {
                    title: `${getVernacularString("categoryBatteriesS5F1Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryBatteriesS5F2Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryBatteriesS5F3Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryBatteriesS5F4Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryBatteriesS5F5Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryBatteriesS5F6Title", userPreferences.language)}`,
                    highlighted: true,
                },
            ],
        },
        {
            image: "",
            heading: `${getVernacularString("categoryBatteriesS5Slide2Heading", userPreferences.language)}`,
            features: [
                {
                    title: `${getVernacularString("categoryBatteriesS5F1Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryBatteriesS5F2Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryBatteriesS5F3Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryBatteriesS5F4Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryBatteriesS5F5Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryBatteriesS5F6Title", userPreferences.language)}`,
                    highlighted: true,
                },
            ],
        },
        {
            image: "",
            heading: `${getVernacularString("categoryBatteriesS5Slide3Heading", userPreferences.language)}`,
            features: [
                {
                    title: `${getVernacularString("categoryBatteriesS5F1Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryBatteriesS5F2Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryBatteriesS5F3Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryBatteriesS5F4Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryBatteriesS5F5Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryBatteriesS5F6Title", userPreferences.language)}`,
                    highlighted: true,
                },
            ],
        },
    ];

    return (
        <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge", className)}>
            <div className="tw-flex tw-flex-col">
                <div className="lg-text-headline tw-text-center">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("categoryBatteriesS5HT1", userPreferences.language)}} />
                </div>

                <VerticalSpacer className="tw-h-6" />

                <div className="tw-flex tw-flex-row tw-gap-3 tw-overflow-auto tw-w-full">
                    <ItemBuilder
                        items={productOverview}
                        itemBuilder={(productOverview, productIndex) => (
                            <ProductOverviewComponent
                                vernacularContent={productOverview}
                                className="tw-min-w-[40%]"
                                key={productIndex}
                            />
                        )}
                    />
                </div>
            </div>
        </div>
    );
}

export function SuggestedJodiSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const jodisData: Array<{
        title: string;
        imageRelativePath: string;
        buttonText: string;
        bestseller: boolean;
        link: string;
    }> = [
        {
            title: `${getVernacularString("categoryBatteriesS6Jodi1Title", userPreferences.language)}`,
            imageRelativePath: "/livguard/products/jodis/urban-jodi/thumbnail.png",
            buttonText: "categoryViewJodiButtontext",
            bestseller: false,
            link: `/product/urban-jodi`,
        },
        {
            title: `${getVernacularString("categoryBatteriesS6Jodi2Title", userPreferences.language)}`,
            imageRelativePath: "/livguard/products/jodis/peace-of-mind-jodi/thumbnail.png",
            buttonText: "categoryViewJodiButtontext",
            bestseller: true,
            link: `/product/peace-of-mind-jodi`,
        },
        {
            title: `${getVernacularString("categoryBatteriesS6Jodi3Title", userPreferences.language)}`,
            imageRelativePath: "/livguard/products/jodis/super-life-jodi/thumbnail.png",
            buttonText: "categoryViewJodiButtontext",
            bestseller: true,
            link: `/product/super-life-jodi`,
        },
        {
            title: `${getVernacularString("categoryBatteriesS6Jodi4Title", userPreferences.language)}`,
            imageRelativePath: "/livguard/products/jodis/hi-power-jodi/thumbnail.png",
            buttonText: "categoryViewJodiButtontext",
            bestseller: false,
            link: `/product/hi-power-jodi`,
        },
    ];

    return (
        <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge tw-flex tw-flex-col", className)}>
            <div className="tw-flex tw-flex-col">
                <div className="lg-text-headline tw-text-center">
                    <DefaultTextAnimation>
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("categoryBatteriesS6HT1", userPreferences.language)}} />
                    </DefaultTextAnimation>
                </div>
            </div>

            <VerticalSpacer className="tw-h-10" />

            <div className="tw-grid tw-grid-cols-[minmax(0,1fr),minmax(0,1fr)] tw-grid-rows-[minmax(0,1fr),minmax(0,1fr)] lg:tw-grid-rows-1 lg:tw-grid-cols-4 tw-gap-x-2 lg:tw-gap-x-4 tw-gap-y-10">
                <ItemBuilder
                    items={jodisData}
                    itemBuilder={(jodi, jodiIndex) => (
                        <div
                            className={`lg-bg-secondary-100 tw-rounded-lg`}
                            key={jodiIndex}
                        >
                            <ProductCardComponent
                                vernacularContent={jodi}
                                key={jodiIndex}
                                userPreferences={userPreferences}
                            />
                        </div>
                    )}
                />
            </div>

            <VerticalSpacer className="tw-h-4" />
        </div>
    );
}

export function ChooseBestInverterBattery({userPreferences, utmParameters, className}: {userPreferences: UserPreferences; utmParameters: {[searchParameter: string]: string}; className?: string}) {
    const sectionData: {
        description: string;
        downloadButtons: Array<{iconRelativePath: string; text: string; downloadLink: string; popup: boolean}>;
        buttonText: string;
    } = {
        description: `${getVernacularString("categoryBatteriesS8Description", userPreferences.language)}`,
        downloadButtons: [
            {
                iconRelativePath: "/livguard/icons/buyingGuide.png",
                text: `${getVernacularString("categoryBatteriesS8B1T", userPreferences.language)}`,
                downloadLink: "https://www.livguard.com/static-assets/livguard-buying-guide.pdf",
                popup: false,
            },
            {
                iconRelativePath: "/livguard/icons/downloadCatalogue.png",
                text: `${getVernacularString("categoryBatteriesS8B2T", userPreferences.language)}`,
                downloadLink: "https://www.livguard.com/static-assets/livguard-ib-leaflet.pdf",
                popup: false,
            },
        ],
        buttonText: `${getVernacularString("categoryBatteriesS8BT", userPreferences.language)}`,
    };

    return (
        <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge", className)}>
            <div className="tw-flex tw-flex-col">
                <h2 className="lg-text-headline tw-text-center">
                    <DefaultTextAnimation>
                        <div dangerouslySetInnerHTML={{__html: appendSpaceToString(getVernacularString("categoryBatteriesS8HT1", userPreferences.language))}} />
                    </DefaultTextAnimation>
                    <DefaultTextAnimation>
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("categoryBatteriesS8HT2", userPreferences.language)}} />
                    </DefaultTextAnimation>
                </h2>

                <VerticalSpacer className="tw-h-6" />

                <WhatsBestForYouComponent
                    vernacularContent={sectionData}
                    userPreferences={userPreferences}
                    utmParameters={utmParameters}
                />
            </div>
        </div>
    );
}

export function FaqSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const faqs = [
        {
            question: "categoryBatteryPageFAQQ1Q",
            answer: "categoryBatteryPageFAQQ1A",
        },
        {
            question: "categoryBatteryPageFAQQ2Q",
            answer: "categoryBatteryPageFAQQ2A",
        },
        {
            question: "categoryBatteryPageFAQQ3Q",
            answer: "categoryBatteryPageFAQQ3A",
        },
        {
            question: "categoryBatteryPageFAQQ4Q",
            answer: "categoryBatteryPageFAQQ4A",
        },
        {
            question: "categoryBatteryPageFAQQ5Q",
            answer: "categoryBatteryPageFAQQ5A",
        },
    ];

    return (
        <FaqSectionInternal
            faqs={faqs}
            userPreferences={userPreferences}
            className={className}
        />
    );
}
