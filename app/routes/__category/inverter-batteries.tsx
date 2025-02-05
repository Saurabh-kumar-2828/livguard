import {ChevronDoubleDownIcon} from "@heroicons/react/20/solid";
import type {LoaderFunction, V2_MetaFunction} from "@remix-run/node";
import {useParams} from "@remix-run/react";
import {useContext, useEffect, useRef, useState} from "react";
import {Clock, HandThumbsUpFill, Lightning, Wallet} from "react-bootstrap-icons";
import {useInView} from "react-intersection-observer";
import {useResizeDetector} from "react-resize-detector";
import {useLoaderData} from "react-router";
import {number} from "zod";
import {CarouselStyle4} from "~/components/carouselStyle4";
import {OurSuggestionsComponent, ProductOverviewComponent, SocialHandles, WhatsBestForYouComponent} from "~/components/category/common";
import {CategoryCarousel1} from "~/components/categoryCarousel1";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {FaqSectionInternal} from "~/components/faqs";
import {CoverImage} from "~/components/images/coverImage";
import {FixedWidthImage} from "~/components/images/fixedWidthImage";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {PageScaffold} from "~/components/pageScaffold";
import {ProductAndCategoryBottomBar} from "~/components/productAndCategoryBottomBar";
import {SecondaryNavigation} from "~/components/secondaryNavigation";
import {SecondaryNavigationControllerContext} from "~/contexts/secondaryNavigationControllerContext";
import {EmptyFlexFiller} from "~/global-common-typescript/components/emptyFlexFiller";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {getStringFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {concatenateNonNullStringsWithSpaces, distinct} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";
import {SecondaryNavigationController, useSecondaryNavigationController} from "~/hooks/useSecondaryNavigationController";
import {AccessoriesSubType, AutomotiveSubType, BatterySubType, ComboSubType, InverterSubType, ProductDetails, ProductType} from "~/productData.types";
import {DealerLocator} from "~/reusableSections/dealerLocator";
import {SuggestedComboSection} from "~/routes/__category/inverter-for-home";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import type {UserPreferences} from "~/typeDefinitions";
import {Language} from "~/typeDefinitions";

import {
    appendSpaceToString,
    getDownloadCatalogueLink,
    getMetadataForImage,
    getProductNameFromProductTypeAndSubtype,
    getRedirectToUrlFromRequest,
    getUrlFromRequest,
    secondaryNavThreshold,
} from "~/utilities";
import {getContentGenerator} from "~/vernacularProvider";
import batteryFinder from "../battery-finder";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {ImageCdnProvider, ImageMetadata} from "~/common--type-definitions/typeDefinitions";
import {getProductFromSlugAndLanguage} from "~/backend/product.server";
import {getVernacularFromBackend} from "~/backend/vernacularProvider.server";
import {ContentProviderContext} from "~/contexts/contentProviderContext";
import {getImageMetadataLibraryFromBackend, getMetadataForImageServerSide} from "~/backend/imageMetaDataLibrary.server";
import {ImageProviderContext} from "~/contexts/imageMetaDataContext";
import {SocialMediaFeedsSection} from "..";

export const meta: V2_MetaFunction = ({data: loaderData}: {data: LoaderData}) => {
    const userPreferences: UserPreferences = loaderData.userPreferences;
    if (userPreferences.language == Language.English) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/inverter-batteries/",
            },
            {
                title: "Empower your home with Livguard strong Inverter Batteries",
            },
            {
                name: "description",
                content: "Experience the power of Livguard's strong inverter batteries and empower your home with a reliable and uninterrupted energy supply",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/inverter-batteries/",
            },
            {
                property: "og:title",
                content: "Empower your home with Livguard strong Inverter Batteries",
            },
            {
                property: "og:description",
                content: "Experience the power of Livguard's strong inverter batteries and empower your home with a reliable and uninterrupted energy supply",
            },
            {
                property: "og:site_name",
                content: "Livguard",
            },
            {
                property: "og:type",
                content: "product",
            },
            {
                property: "og:image",
                content: loaderData.ogBanner,
            },
            {
                "script:ld+json": {
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    itemListElement: [
                        {
                            "@type": "ListItem",
                            position: 1,
                            name: "LivGuard",
                            item: "https://www.livguard.com/",
                            description:
                                " We Are One of A Kind With Livguard, you are always in trusted hands. In just 9 years, Livguard has become the fastest-growing Energy Storage Solutions brand. Our zeal to develop a complete and connected ecosystem of happy customers, committed partners, & the best quality every time has made us the choice of people nationwide.",
                            image: [" https://www.livguard.com/static-assets/icons/logo-dark.svg"],
                        },
                        {
                            "@type": "ListItem",
                            position: 2,
                            name: "Inverters Batteries",
                            item: "https://www.livguard.com/inverter-batteries",
                            description: " Inverter batteries with a powerful backup, made to empower your home with limitless energy whenever you need",
                            image: ["https://growthjockey.imgix.net/livguard/category/batteries/2/3.jpg?w=714.7166748046875"],
                        },
                        {
                            "@type": "SiteNavigationElement",
                            name: "Livguard",
                            url: "https://www.livguard.com/",
                            description:
                                " We Are One of A Kind With Livguard, you are always in trusted hands. In just 9 years, Livguard has become the fastest-growing Energy Storage Solutions brand. Our zeal to develop a complete and connected ecosystem of happy customers, committed partners, & the best quality every time has made us the choice of people nationwide.",
                            image: ["https://www.livguard.com/static-assets/icons/logo-dark.svg"],
                        },
                        {
                            "@type": "SiteNavigationElement",
                            name: "Inverters Batteries",
                            url: "https://www.livguard.com/inverter-batteries",
                            description: "Inverter batteries with a powerful backup, made to empower your home with limitless energy whenever you need",
                            image: ["https://growthjockey.imgix.net/livguard/category/batteries/2/3.jpg?w=714.7166748046875"],
                        },
                    ],
                },
            },
        ];
    } else if (userPreferences.language == Language.Hindi) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/inverter-batteries/",
            },
            {
                title: "लिवगार्ड की मजबूत इन्वर्टर बैटरियों से अपने घर को सशक्त बनाएं",
            },
            {
                name: "description",
                content: "लिवगार्ड की मजबूत इन्वर्टर बैटरियों की शक्ति का अनुभव करें और अपने घर को विश्वसनीय और निर्बाध ऊर्जा आपूर्ति से सशक्त बनाएं",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/inverter-batteries/",
            },
            {
                property: "og:title",
                content: "लिवगार्ड की मजबूत इन्वर्टर बैटरियों से अपने घर को सशक्त बनाएं",
            },
            {
                property: "og:description",
                content: "लिवगार्ड की मजबूत इन्वर्टर बैटरियों की शक्ति का अनुभव करें और अपने घर को विश्वसनीय और निर्बाध ऊर्जा आपूर्ति से सशक्त बनाएं",
            },
            {
                property: "og:site_name",
                content: "Livguard",
            },
            {
                property: "og:type",
                content: "product",
            },
            {
                property: "og:image",
                content: loaderData.ogBanner,
            },
            {
                "script:ld+json": {
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    itemListElement: [
                        {
                            "@type": "ListItem",
                            position: 1,
                            name: "LivGuard",
                            item: "https://www.livguard.com/",
                            description:
                                " We Are One of A Kind With Livguard, you are always in trusted hands. In just 9 years, Livguard has become the fastest-growing Energy Storage Solutions brand. Our zeal to develop a complete and connected ecosystem of happy customers, committed partners, & the best quality every time has made us the choice of people nationwide.",
                            image: [" https://www.livguard.com/static-assets/icons/logo-dark.svg"],
                        },
                        {
                            "@type": "ListItem",
                            position: 2,
                            name: "Inverters Batteries",
                            item: "https://www.livguard.com/inverter-batteries",
                            description: " Inverter batteries with a powerful backup, made to empower your home with limitless energy whenever you need",
                            image: ["https://growthjockey.imgix.net/livguard/category/batteries/2/3.jpg?w=714.7166748046875"],
                        },
                        {
                            "@type": "SiteNavigationElement",
                            name: "Livguard",
                            url: "https://www.livguard.com/",
                            description:
                                " We Are One of A Kind With Livguard, you are always in trusted hands. In just 9 years, Livguard has become the fastest-growing Energy Storage Solutions brand. Our zeal to develop a complete and connected ecosystem of happy customers, committed partners, & the best quality every time has made us the choice of people nationwide.",
                            image: ["https://www.livguard.com/static-assets/icons/logo-dark.svg"],
                        },
                        {
                            "@type": "SiteNavigationElement",
                            name: "Inverters Batteries",
                            url: "https://www.livguard.com/inverter-batteries",
                            description: "Inverter batteries with a powerful backup, made to empower your home with limitless energy whenever you need",
                            image: ["https://growthjockey.imgix.net/livguard/category/batteries/2/3.jpg?w=714.7166748046875"],
                        },
                    ],
                },
            },
        ];
    } else {
        throw Error(`Undefined language ${userPreferences.language}`);
    }
};

export type HumanReadableModelNumbersForSuggestions = {[slug: string]: string};

type LoaderData = {
    userPreferences: UserPreferences;
    redirectTo: string;
    pageUrl: string;
    id: string | null;
    humanReadableModelNumbersForSuggestions: HumanReadableModelNumbersForSuggestions;
    vernacularData: {
        [id: string]: string;
    };
    imageMetaDataLibrary: {
        [relativePath: string]: ImageMetadata | undefined;
    };
    ogBanner: string;
};

export const loader: LoaderFunction = async ({request}) => {
    const userPreferences = await getUserPreferencesFromCookiesAndUrlSearchParameters(request);
    if (userPreferences instanceof Error) {
        throw userPreferences;
    }

    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    const slugs = [
        "it1048st",
        "it1560stt",
        "it1550tt",
        "it1584tt",
        "it1642tt",
        "it1648tt",
        "it1672tt",
        "it1860tt",
        "it1872tt",
        "it2048tt",
        "it2060tt",
        "it2072tt",
        "it2272tt",
        "it2360tt",
        "it2672tt",
        "it1172stt",
        "it1548stt",
        "it9048st",
    ];
    let humanReadableModelNumbersForSuggestionsObj: HumanReadableModelNumbersForSuggestions = {};
    slugs.forEach((slug) => {
        humanReadableModelNumbersForSuggestionsObj[slug] = getProductFromSlugAndLanguage(slug, userPreferences.language).humanReadableModelNumber;
    });

    const vernacularData = getVernacularFromBackend("inverterBatteriesPage", userPreferences.language);
    const imageMetaDataLibrary = getImageMetadataLibraryFromBackend("inverterBatteriesPage");
    const ogBanner = getAbsolutePathForRelativePath(getMetadataForImageServerSide("/livguard/inverter-batteries/inverter-batteries-og-banner.jpg").finalUrl, ImageCdnProvider.Bunny, 764, null);

    const loaderData: LoaderData = {
        userPreferences: userPreferences,
        redirectTo: getRedirectToUrlFromRequest(request),
        pageUrl: getUrlFromRequest(request),
        id: id,
        humanReadableModelNumbersForSuggestions: humanReadableModelNumbersForSuggestionsObj,
        vernacularData: vernacularData,
        imageMetaDataLibrary: imageMetaDataLibrary,
        ogBanner: ogBanner,
    };

    return loaderData;
};

export default function () {
    const {userPreferences, redirectTo, pageUrl, id, humanReadableModelNumbersForSuggestions, vernacularData, imageMetaDataLibrary} = useLoaderData() as LoaderData;

    const utmSearchParameters = useUtmSearchParameters();

    const secondaryNavigationController = useSecondaryNavigationController();

    return (
        <>
            <ImageProviderContext.Provider value={imageMetaDataLibrary}>
                <ContentProviderContext.Provider
                    value={{
                        getContent: getContentGenerator(vernacularData),
                    }}
                >
                    <PageScaffold
                        userPreferences={userPreferences}
                        redirectTo={redirectTo}
                        showMobileMenuIcon={true}
                        utmParameters={utmSearchParameters}
                        pageUrl={pageUrl}
                        breadcrumbs={[
                            {contentId: "cfab263f-0175-43fb-91e5-fccc64209d36", link: "/"},
                            {contentId: "09b8631b-98e0-4ae8-bafb-65bb57001872", link: "#"},
                        ]}
                        secondaryNavigationController={secondaryNavigationController}
                    >
                        <SecondaryNavigationControllerContext.Provider value={secondaryNavigationController}>
                            <CategoryPage
                                userPreferences={userPreferences}
                                utmParameters={utmSearchParameters}
                                pageUrl={pageUrl}
                                secondaryNavigationController={secondaryNavigationController}
                                id={id}
                                humanReadableModelNumbersForSuggestions={humanReadableModelNumbersForSuggestions}
                            />
                        </SecondaryNavigationControllerContext.Provider>
                    </PageScaffold>

                    <ProductAndCategoryBottomBar
                        userPreferences={userPreferences}
                        utmParameters={utmSearchParameters}
                        pageUrl={pageUrl}
                    />
                </ContentProviderContext.Provider>
            </ImageProviderContext.Provider>
        </>
    );
}

function CategoryPage({
    userPreferences,
    utmParameters,
    pageUrl,
    secondaryNavigationController,
    id,
    humanReadableModelNumbersForSuggestions,
}: {
    userPreferences: UserPreferences;
    utmParameters: {[searchParameter: string]: string};
    pageUrl: string;
    secondaryNavigationController?: SecondaryNavigationController;
    id?: string | null;
    humanReadableModelNumbersForSuggestions: HumanReadableModelNumbersForSuggestions;
}) {
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);
    return (
        <>
            <HeroSection
                userPreferences={userPreferences}
                utmParameters={utmParameters}
                pageUrl={pageUrl}
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            <BatteriesAreMeantToLast
                userPreferences={userPreferences}
                className="lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            <div>
                <OurBatteriesSection
                    userPreferences={userPreferences}
                    className="lg:tw-px-[72px] xl:tw-px-[120px]"
                />
            </div>

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            <OurSuggestionsSection
                userPreferences={userPreferences}
                id={id}
                className="lg:tw-px-[72px] xl:tw-px-[120px]"
                humanReadableModelNumbersForSuggestions={humanReadableModelNumbersForSuggestions}
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            <div className="tw-grid tw-grid-cols-1 tw-grid-rows-2 lg:tw-items-center lg:tw-grid-cols-[minmax(0,2fr),minmax(0,3fr)] lg:tw-grid-rows-1 tw-gap-y-10 lg:tw-gap-x-4 lg:tw-px-[72px] xl:tw-px-[120px] tw-max-w-7xl tw-mx-auto">
                <DealerLocator
                    userPreferences={userPreferences}
                    showCtaButton={true}
                    secondaryNavigationName="0cb6d442-7df4-4272-a36d-9f956bdd8a54"
                    className="tw-row-start-1 tw-col-start-1 lg:tw-row-span-full lg:tw-col-start-1 lg:tw-h-full lg:tw-min-h-[36rem]"
                />

                <ChooseBestInverterBattery
                    userPreferences={userPreferences}
                    utmParameters={utmParameters}
                    className="tw-row-start-2 lg:tw-col-start-2 lg:tw-row-start-1"
                />
            </div>

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            {/* <AboutLivguard
                userPreferences={userPreferences}
                className="lg:tw-px-[72px] xl:tw-px-[120px]"
            /> */}

            <SocialMediaFeedsSection
                userPreferences={userPreferences}
                className="lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            <FaqSection
                userPreferences={userPreferences}
                className="lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />
        </>
    );
}

function HeroSection({
    userPreferences,
    utmParameters,
    className,
    pageUrl,
}: {
    userPreferences: UserPreferences;
    utmParameters: {
        [searchParameter: string]: string;
    };
    className?: string;
    pageUrl: string;
}) {
    const contentData = useContext(ContentProviderContext);
    const {width: containerWidth, height: containerHeight, ref} = useResizeDetector();
    // const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    // const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    // useEffect(() => {
    // secondaryNavigationController.setSections((previousSections) => ({
    // ...previousSections,
    // top: {
    // humanReadableName: contentData.getContent("9fc64723-0e15-4211-983a-ba03cf9a4d41"),
    // isCurrentlyVisible: sectionInView,
    // },
    // }));
    // }, [sectionRef, sectionInView]);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-h-[calc(100vh-var(--lg-header-height)-var(--lg-mobile-ui-height))-4.5rem] lg:tw-h-[calc(100vh-var(--lg-header-height)-var(--lg-mobile-ui-height))] tw-min-h-[calc(100vw*7/16)] tw-overflow-hidden",
                className,
            )}
            // id="top"
            // ref={sectionRef}
        >
            <div
                className="tw-w-full tw-h-full tw-grid tw-grid-rows-[1.5rem_3rem_minmax(0,1fr)_auto_0.5rem_auto_1rem_auto_1rem_minmax(0,1fr)_auto_1.5rem] tw-justify-items-center tw-text-center tw-items-stretch"
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
                    <div className="lg-text-banner lg-px-screen-edge tw-text-secondary-900-dark">{contentData.getContent("categoryBatteriesS1T1")}</div>
                </DefaultTextAnimation>

                <DefaultTextAnimation className="tw-row-start-6 tw-col-start-1">
                    <div className="lg-text-title1 lg-px-screen-edge tw-text-secondary-900-dark">{contentData.getContent("categoryBatteriesS1T2")}</div>
                </DefaultTextAnimation>

                <DefaultTextAnimation className="tw-row-start-[8] tw-col-start-1">
                    <h2 className="lg-text-body lg-px-screen-edge !tw-text-secondary-900-dark">{contentData.getContent("categoryBatteriesS1T3")}</h2>
                </DefaultTextAnimation>

                <ChevronDoubleDownIcon className="tw-row-[11] tw-col-start-1 tw-w-12 tw-h-12 lg-text-primary-500 tw-animate-bounce" />
            </div>
        </div>
    );
}

function BatteriesAreMeantToLast({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
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
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            features: {
                humanReadableName: contentData.getContent("8bb57774-d155-41f1-bf07-6906c1026203"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-flex tw-flex-col", className)}
            id="features"
            ref={sectionRef}
        >
            <h2 className="lg-text-headline tw-text-center">
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: appendSpaceToString(contentData.getContent("categoryBatteriesS2HT1"))}} />
                </DefaultTextAnimation>
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: contentData.getContent("categoryBatteriesS2HT2")}} />
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
//                         <div dangerouslySetInnerHTML={{__html: contentData.getContent("categoryBatteriesS3HT1")}} />
//                     </DefaultTextAnimation>
//                     <DefaultTextAnimation>
//                         <div dangerouslySetInnerHTML={{__html: contentData.getContent("categoryBatteriesS3HT2")}} />
//                     </DefaultTextAnimation>
//                 </div>

//                 <VerticalSpacer className="tw-h-6" />

//                 <DefaultTextAnimation>
//                     <div className="lg-text-title2 tw-text-center">{contentData.getContent("categoryBatteriesS4Heading")}</div>
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
//                                 {contentData.getContent("categoryBatteriesS4BTFlat")}
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
//                                 {contentData.getContent("categoryBatteriesS4BTTubular")}
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
//                     <div className="lg-cta-button ">{contentData.getContent("categoryBatteriesS4BT")}</div>
//                 </DefaultElementAnimation>
//             </div>
//         </div>
//     );
// }

export function OurBatteriesSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    const highlightedBatteries = [
        {name: "Tall Tubular", image: "/livguard/products/it1584tt/thumbnail.png"},
        {name: "Short Tubular", image: "/livguard/products/it1048st/thumbnail.png"},
        {name: "Short Tall Tubular", image: "/livguard/products/it1560stt/thumbnail.png"},
        {name: "Short Tubular Jumbo", image: "/livguard/products/it1636stj/thumbnail.png"},
    ];
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "our-batteries": {
                humanReadableName: contentData.getContent("32d2e95f-02b6-49fe-b1c3-cee4542e202b"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);

    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-cols-1 tw-justify-items-center lg-px-screen-edge tw-max-w-7xl tw-mx-auto", className)}
            id="our-batteries"
            ref={sectionRef}
        >
            <h2 className="lg-text-headline tw-text-center">
                <div dangerouslySetInnerHTML={{__html: appendSpaceToString(contentData.getContent("categoryBatteriesS3T1"))}} />
                <div dangerouslySetInnerHTML={{__html: contentData.getContent("categoryBatteriesS3T2")}} />
            </h2>

            <VerticalSpacer className="tw-h-6" />

            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-rows-[auto_auto_auto] lg:tw-grid-cols-[minmax(0,2fr),minmax(0,3fr)] tw-items-center tw-justify-items-center lg:tw-justify-items-start lg-card lg:tw-p-4 lg:tw-rounded-lg">
                <div className="tw-row-start-1 tw-col-start-1 lg:tw-row-start-1 lg:tw-col-start-2 lg-text-title1 tw-text-center">{contentData.getContent("8f342209-314d-41f9-ac39-3370d9d96fcb")}</div>

                <VerticalSpacer className="tw-h-6 tw-hidden lg:tw-block" />

                {/* 31ca68bd-891d-47f3-b0ef-32b21bd9017f: Temporary hack until we can get a proper cropped-thumbnail image for each product */}
                <div className="tw-row-start-2 tw-col-start-1 lg:tw-row-start-1 lg:tw-col-start-1 lg:tw-row-span-2 tw-w-full tw-aspect-[4/3] tw-justify-self-center tw-self-start tw-max-w-[30rem]">
                    <CoverImage relativePath="/livguard/products/it1560stt/thumbnail.png" />
                </div>
                {/* /31ca68bd-891d-47f3-b0ef-32b21bd9017f */}

                <div className="tw-row-start-3 tw-col-start-1 lg:tw-row-start-2 lg:tw-col-start-2 tw-flex tw-flex-col">
                    <VerticalSpacer className="tw-h-4" />

                    <div>{contentData.getContent("dd873e80-f5f5-48a6-8429-04efadff2720")}</div>

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
                                    <div className="tw-w-12 tw-h-12 lg-card tw-rounded-full tw-p-3 tw-flex tw-justify-center tw-items-center">
                                        <item.iconComponent className="tw-w-6 tw-h-6" />
                                    </div>
                                    <div>{contentData.getContent(item.contentId)}</div>
                                </div>
                            )}
                        />
                    </div>
                </div>

                <VerticalSpacer className="tw-row-start-4 tw-col-start-1 tw-h-6 lg:tw-hidden" />

                <CarouselStyle4
                    items={highlightedBatteries.map((item, itemIndex) => (
                        <div
                            className="tw-w-full tw-h-full lg-card tw-rounded-lg tw-flex lg:tw-max-w-[200px] tw-flex-col tw-p-4 tw-gap-y-2 lg:tw-justify-center lg:tw-items-center"
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
                                className="tw-w-full tw-h-full lg-card tw-rounded-lg tw-flex lg:tw-max-w-[200px] tw-flex-col tw-p-4 tw-gap-y-2 lg:tw-justify-center lg:tw-items-center"
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
    const contentData = useContext(ContentProviderContext);
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
                        <FullWidthImage relativePath="/livguard/products/it1584tt/thumbnail.png" />
                    </div>
                    <div className="tw-hidden lg:tw-flex tw-justify-center tw-items-center">
                        <FixedWidthImage
                            relativePath="/livguard/products/it1584tt/thumbnail.png"
                            width="10rem"
                        />
                    </div>
                </div>

                {/* <div className="tw-row-start-2 tw-col-start-2 tw-px-4 lg-text-title2 tw-pb-3 tw-text-center">{contentData.getContent("categoryBatteriesS3R1C2")}</div> */}

                <div className="tw-row-start-2 tw-col-start-2 tw-px-4 lg-text-title2 tw-pb-3 tw-text-center">{contentData.getContent("categoryBatteriesS3R1C3")}</div>

                <div className="tw-row-start-3 tw-col-start-1 tw-mx-2 tw-py-3 lg-text-icon tw-border-solid tw-border-b tw-border-secondary-900-dark tw-border-opacity-50 tw-text-secondary-900">
                    {contentData.getContent("categoryBatteriesS3R2C1")}
                </div>

                {/* <div className="tw-row-start-3 tw-col-start-2 tw-mx-4 tw-py-3 tw-text-center tw-border-solid tw-border-b tw-border-secondary-300-dark tw-border-opacity-50">
                    {contentData.getContent("categoryBatteriesS3R2C2")}
                </div> */}

                <div className="tw-row-start-3 tw-col-start-2 tw-mx-4 tw-py-3 tw-text-center tw-border-solid tw-border-b tw-border-secondary-100-dark tw-border-opacity-50">
                    {contentData.getContent("categoryBatteriesS3R2C3")}
                </div>

                <div className="tw-row-start-4 tw-col-start-1 tw-mx-2 tw-py-3 lg-text-icon tw-border-solid tw-border-b tw-border-secondary-900-dark tw-border-opacity-50 tw-text-secondary-900">
                    {contentData.getContent("categoryBatteriesS3R3C1")}
                </div>

                {/* <div className="tw-row-start-4 tw-col-start-2 tw-mx-4 tw-py-3 tw-text-center tw-border-solid tw-border-b tw-border-secondary-300-dark tw-border-opacity-50">
                    {contentData.getContent("categoryBatteriesS3R3C2")}
                </div> */}

                <div className="tw-row-start-4 tw-col-start-2 tw-mx-4 tw-py-3 tw-text-center tw-border-solid tw-border-b tw-border-secondary-100-dark tw-border-opacity-50">
                    {contentData.getContent("categoryBatteriesS3R3C3")}
                </div>

                <div className="tw-row-start-5 tw-col-start-1 tw-mx-2 tw-py-3 lg-text-icon tw-border-solid tw-border-b tw-border-secondary-900-dark tw-border-opacity-50 tw-text-secondary-900">
                    {contentData.getContent("categoryBatteriesS3R4C1")}
                </div>

                {/* <div className="tw-row-start-5 tw-col-start-2 tw-mx-4 tw-py-3 tw-text-center tw-border-solid tw-border-b tw-border-secondary-300-dark tw-border-opacity-50">
                    {contentData.getContent("categoryBatteriesS3R4C2")}
                </div> */}

                <div className="tw-row-start-5 tw-col-start-2 tw-mx-4 tw-py-3 tw-text-center tw-border-solid tw-border-b tw-border-secondary-100-dark tw-border-opacity-50">
                    {contentData.getContent("categoryBatteriesS3R4C3")}
                </div>

                <div className="tw-row-start-6 tw-col-start-1 tw-mx-2 tw-py-3 lg-text-icon tw-border-solid tw-border-b tw-border-secondary-900-dark tw-border-opacity-50 tw-text-secondary-900">
                    {contentData.getContent("categoryBatteriesS3R5C1")}
                </div>

                {/* <div className="tw-row-start-6 tw-col-start-2 tw-mx-4 tw-py-3 tw-text-center tw-border-solid tw-border-b tw-border-secondary-300-dark tw-border-opacity-50">
                    {contentData.getContent("categoryBatteriesS3R5C2")}
                </div> */}

                <div className="tw-row-start-6 tw-col-start-2 tw-mx-4 tw-py-3 tw-pb-8 tw-text-center tw-border-solid tw-border-b tw-border-secondary-100-dark tw-border-opacity-50">
                    {contentData.getContent("categoryBatteriesS3R5C3")}
                </div>

                <div className="tw-row-start-7 tw-col-start-1 tw-mx-2 tw-py-3 tw-pb-8 lg-text-icon tw-text-secondary-900">{contentData.getContent("categoryBatteriesS3R6C1")}</div>

                {/* <div className="tw-row-start-7 tw-col-start-2 tw-mx-4 tw-py-3 tw-text-center">{contentData.getContent("categoryBatteriesS3R6C2")}</div> */}

                <div className="tw-row-start-7 tw-col-start-2 tw-mx-4 tw-py-3 tw-pb-8 tw-text-center">{contentData.getContent("categoryBatteriesS3R6C3")}</div>
            </div>
        </div>
    );
}

export function OurSuggestionsSection({
    userPreferences,
    className,
    id,
    humanReadableModelNumbersForSuggestions,
}: {
    userPreferences: UserPreferences;
    className?: string;
    id?: string | null;
    humanReadableModelNumbersForSuggestions: HumanReadableModelNumbersForSuggestions;
}) {
    const contentData = useContext(ContentProviderContext);
    const [selectedBatteryTypeIndex, setSelectedBatteryTypeIndex] = useState(0);

    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});

    useEffect(() => {
        if (id != null && ["0", "1", "2"].includes(id)) {
            setSelectedBatteryTypeIndex(Number(id));
            document.getElementById("suggestions-section")?.scrollIntoView({behavior: "smooth", block: "start"});
        }
    }, [id]);

    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "suggested-batteries": {
                humanReadableName: contentData.getContent("0620b5a6-a7bb-4d55-84fb-6a3202439edb"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);

    const sectionData: Array<{
        typeDescription: string;
        heading: string;
        description: string;
        specificationHeading: string;
        keySpecifications: Array<{keySpecificationTitle: string; keySpecificationContent: string; keySpecificationIconRelativePath: string}>;
        imagesRelativePath: string;
        link: string;
        modelNumber: string;
        exploreButton: string;
        relatedProductsHeading: string;
        relatedProducts: Array<string>;
    }> = [
        {
            typeDescription: `${contentData.getContent("categoryBatteriesS4Slide1TypeDescription")}`,
            heading: `${contentData.getContent("categoryBatteriesS4Slide1Heading")}`,
            description: `${contentData.getContent("categoryBatteriesS4Slide1Description")}`,
            specificationHeading: `${contentData.getContent("categoryBatteriesS4SpecificationHeading")}`,
            keySpecifications: [
                {
                    keySpecificationTitle: contentData.getContent("categoryBatteriesS2KS1Title"),
                    keySpecificationContent: contentData.getContent("categoryBatteriesSlide1KS1Description"),
                    keySpecificationIconRelativePath: "/livguard/inverter-batteries/4/home-warranty.svg",
                },
                {
                    keySpecificationTitle: contentData.getContent("categoryBatteriesS2KS2Title"),
                    keySpecificationContent: contentData.getContent("categoryBatteriesSlide1KS2Description"),
                    keySpecificationIconRelativePath: "/livguard/inverter-batteries/4/home-capacity.svg",
                },
                {
                    keySpecificationTitle: contentData.getContent("categoryBatteriesS2KS3Title"),
                    keySpecificationContent: contentData.getContent("categoryBatteriesSlide1KS3Description"),
                    keySpecificationIconRelativePath: "/livguard/inverter-batteries/4/home-charging.svg",
                },
                {
                    keySpecificationTitle: contentData.getContent("categoryBatteriesS2KS4Title"),
                    keySpecificationContent: contentData.getContent("categoryBatteriesSlide1KS4Description"),
                    keySpecificationIconRelativePath: "/livguard/inverter-batteries/4/home-dimensions.svg",
                },
            ],
            imagesRelativePath: "/livguard/products/",
            link: "/product/it1048st",
            modelNumber: "it1048st",
            exploreButton: contentData.getContent("categoryBatteriesS4BT"),
            relatedProductsHeading: contentData.getContent("categoryBatteriesS4RelatedProductsHeading"),
            relatedProducts: ["it1642tt", "it1648tt", "it2048tt", "it9048st", "it1548stt"],
        },
        {
            typeDescription: `${contentData.getContent("categoryBatteriesS4Slide2TypeDescription")}`,
            heading: `${contentData.getContent("categoryBatteriesS4Slide2Heading")}`,
            description: `${contentData.getContent("categoryBatteriesS4Slide2Description")}`,
            specificationHeading: `${contentData.getContent("categoryBatteriesS4SpecificationHeading")}`,
            keySpecifications: [
                {
                    keySpecificationTitle: contentData.getContent("categoryBatteriesS2KS1Title"),
                    keySpecificationContent: contentData.getContent("categoryBatteriesSlide2KS1Description"),
                    keySpecificationIconRelativePath: "/livguard/icons/waranty.png",
                },
                {
                    keySpecificationTitle: contentData.getContent("categoryBatteriesS2KS2Title"),
                    keySpecificationContent: contentData.getContent("categoryBatteriesSlide2KS2Description"),
                    keySpecificationIconRelativePath: "/livguard/icons/battery_capacity.png",
                },
                {
                    keySpecificationTitle: contentData.getContent("categoryBatteriesS2KS3Title"),
                    keySpecificationContent: contentData.getContent("categoryBatteriesSlide2KS3Description"),
                    keySpecificationIconRelativePath: "/livguard/icons/3dGrid.png",
                },
                {
                    keySpecificationTitle: contentData.getContent("categoryBatteriesS2KS4Title"),
                    keySpecificationContent: contentData.getContent("categoryBatteriesSlide2KS4Description"),
                    keySpecificationIconRelativePath: "/livguard/icons/dimensions.png",
                },
            ],
            imagesRelativePath: "/livguard/products/",
            link: "/product/it1560stt",
            modelNumber: "it1560stt",
            exploreButton: contentData.getContent("categoryBatteriesS4BT"),
            relatedProductsHeading: contentData.getContent("categoryBatteriesS4RelatedProductsHeading"),
            relatedProducts: ["it1550tt", "it1860tt", "it2060tt", "it2360tt"],
        },
        {
            typeDescription: `${contentData.getContent("categoryBatteriesS4Slide3TypeDescription")}`,
            heading: `${contentData.getContent("categoryBatteriesS4Slide3Heading")}`,
            description: `${contentData.getContent("categoryBatteriesS4Slide3Description")}`,
            specificationHeading: `${contentData.getContent("categoryBatteriesS4SpecificationHeading")}`,
            keySpecifications: [
                {
                    keySpecificationTitle: contentData.getContent("categoryBatteriesS2KS1Title"),
                    keySpecificationContent: contentData.getContent("categoryBatteriesSlide3KS1Description"),
                    keySpecificationIconRelativePath: "/livguard/icons/waranty.png",
                },
                {
                    keySpecificationTitle: contentData.getContent("categoryBatteriesS2KS2Title"),
                    keySpecificationContent: contentData.getContent("categoryBatteriesSlide3KS2Description"),
                    keySpecificationIconRelativePath: "/livguard/icons/battery_capacity.png",
                },
                {
                    keySpecificationTitle: contentData.getContent("categoryBatteriesS2KS3Title"),
                    keySpecificationContent: contentData.getContent("categoryBatteriesSlide3KS3Description"),
                    keySpecificationIconRelativePath: "/livguard/icons/3dGrid.png",
                },
                {
                    keySpecificationTitle: contentData.getContent("categoryBatteriesS2KS4Title"),
                    keySpecificationContent: contentData.getContent("categoryBatteriesSlide3KS4Description"),
                    keySpecificationIconRelativePath: "/livguard/icons/dimensions.png",
                },
            ],
            imagesRelativePath: "/livguard/products/",
            link: "/product/it1560stt",
            modelNumber: "it1560stt",
            exploreButton: contentData.getContent("categoryBatteriesS4BT"),
            relatedProductsHeading: contentData.getContent("categoryBatteriesS4RelatedProductsHeading"),
            relatedProducts: ["it1172stt", "it1584tt", "it1672tt", "it1872tt", "it2072tt", "it2272tt", "it2672tt"],
        },
    ];

    return (
        <div
            className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge", className)}
            id="suggested-batteries"
            ref={sectionRef}
        >
            <div className="tw-flex tw-flex-col tw-items-center tw-relative">
                <div
                    id="suggestions-section"
                    className="tw-h-[3.5rem] lg:tw-h-[4.2rem] tw-w-full tw-absolute -tw-top-[3.5rem] lg:-tw-top-[4.2rem]"
                ></div>
                <div className="lg-text-headline tw-text-center">
                    <DefaultTextAnimation>
                        <div dangerouslySetInnerHTML={{__html: contentData.getContent("categoryBatteriesS4HT1")}} />
                    </DefaultTextAnimation>
                    <DefaultTextAnimation>
                        <div dangerouslySetInnerHTML={{__html: contentData.getContent("categoryBatteriesS4HT2")}} />
                    </DefaultTextAnimation>
                </div>

                <VerticalSpacer className="tw-h-6" />

                {/* <DefaultTextAnimation>
                    <div className="lg-text-title2 tw-text-center">{contentData.getContent("categoryBatteriesS4Heading")}</div>
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
                                        `${selectedBatteryTypeIndex == itemIndex ? "lg-bg-primary-500" : "lg-card"} `,
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
                                        {contentData.getContent(item)}
                                    </div>
                                </button>
                            )}
                        />
                    </div>
                </DefaultElementAnimation>

                <VerticalSpacer className="tw-h-4" />

                <div className="lg-card tw-opacity-60 tw-text-center tw-border tw-border-dashed tw-rounded-md tw-px-4 tw-py-2">{sectionData[selectedBatteryTypeIndex].typeDescription}</div>

                <VerticalSpacer className="tw-h-4" />

                <OurSuggestionsComponent
                    vernacularContent={sectionData[selectedBatteryTypeIndex]}
                    // className={selectedBatteryType == BatteryType.flat ? "lg-bg-secondary-300" : "lg-bg-secondary-100"}
                    userPreferences={userPreferences}
                    className="lg-card"
                    humanReadableModelNumbersForSuggestions={humanReadableModelNumbersForSuggestions}
                />
            </div>

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            <SuggestedComboSection
                userPreferences={userPreferences}
                className=""
                humanReadableModelNumbersForSuggestions={humanReadableModelNumbersForSuggestions}
                items={sectionData[selectedBatteryTypeIndex].relatedProducts}
                vernacHeading="fbe6bb56-2584-4d9a-b759-cf83f5459033"
                secondaryNavVernac="33fe96aa-63fb-4f68-9192-aa902d499967"
            />

            {/* <VerticalSpacer className="tw-h-10 lg:tw-h-20" /> */}
        </div>
    );
}

// export function SideBySideOverviewSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
//     const productOverview: Array<{
//         heading: string;
//         image: string;
//         features: Array<{title: string; highlighted: boolean}>;
//     }> = [
//         {
//             image: "",
//             heading: `${contentData.getContent("categoryBatteriesS5Slide1Heading")}`,
//             features: [
//                 {
//                     title: `${contentData.getContent("categoryBatteriesS5F1Title")}`,
//                     highlighted: true,
//                 },
//                 {
//                     title: `${contentData.getContent("categoryBatteriesS5F2Title")}`,
//                     highlighted: true,
//                 },
//                 {
//                     title: `${contentData.getContent("categoryBatteriesS5F3Title")}`,
//                     highlighted: true,
//                 },
//                 {
//                     title: `${contentData.getContent("categoryBatteriesS5F4Title")}`,
//                     highlighted: true,
//                 },
//                 {
//                     title: `${contentData.getContent("categoryBatteriesS5F5Title")}`,
//                     highlighted: true,
//                 },
//                 {
//                     title: `${contentData.getContent("categoryBatteriesS5F6Title")}`,
//                     highlighted: true,
//                 },
//             ],
//         },
//         {
//             image: "",
//             heading: `${contentData.getContent("categoryBatteriesS5Slide2Heading")}`,
//             features: [
//                 {
//                     title: `${contentData.getContent("categoryBatteriesS5F1Title")}`,
//                     highlighted: true,
//                 },
//                 {
//                     title: `${contentData.getContent("categoryBatteriesS5F2Title")}`,
//                     highlighted: true,
//                 },
//                 {
//                     title: `${contentData.getContent("categoryBatteriesS5F3Title")}`,
//                     highlighted: true,
//                 },
//                 {
//                     title: `${contentData.getContent("categoryBatteriesS5F4Title")}`,
//                     highlighted: true,
//                 },
//                 {
//                     title: `${contentData.getContent("categoryBatteriesS5F5Title")}`,
//                     highlighted: true,
//                 },
//                 {
//                     title: `${contentData.getContent("categoryBatteriesS5F6Title")}`,
//                     highlighted: true,
//                 },
//             ],
//         },
//         {
//             image: "",
//             heading: `${contentData.getContent("categoryBatteriesS5Slide3Heading")}`,
//             features: [
//                 {
//                     title: `${contentData.getContent("categoryBatteriesS5F1Title")}`,
//                     highlighted: true,
//                 },
//                 {
//                     title: `${contentData.getContent("categoryBatteriesS5F2Title")}`,
//                     highlighted: true,
//                 },
//                 {
//                     title: `${contentData.getContent("categoryBatteriesS5F3Title")}`,
//                     highlighted: true,
//                 },
//                 {
//                     title: `${contentData.getContent("categoryBatteriesS5F4Title")}`,
//                     highlighted: true,
//                 },
//                 {
//                     title: `${contentData.getContent("categoryBatteriesS5F5Title")}`,
//                     highlighted: true,
//                 },
//                 {
//                     title: `${contentData.getContent("categoryBatteriesS5F6Title")}`,
//                     highlighted: true,
//                 },
//             ],
//         },
//     ];
//     const contentData = useContext(ContentProviderContext);
//     return (
//         <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge", className)}>
//             <div className="tw-flex tw-flex-col">
//                 <div className="lg-text-headline tw-text-center">
//                     <div dangerouslySetInnerHTML={{__html: contentData.getContent("categoryBatteriesS5HT1")}} />
//                 </div>

//                 <VerticalSpacer className="tw-h-6" />

//                 <div className="tw-flex tw-flex-row tw-gap-3 tw-overflow-auto tw-w-full">
//                     <ItemBuilder
//                         items={productOverview}
//                         itemBuilder={(productOverview, productIndex) => (
//                             <ProductOverviewComponent
//                                 vernacularContent={productOverview}
//                                 className="tw-min-w-[40%]"
//                                 key={productIndex}
//                             />
//                         )}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// }

export function ChooseBestInverterBattery({
    userPreferences,
    utmParameters,
    className,
    productType,
    productSubType,
}: {
    userPreferences: UserPreferences;
    utmParameters: {[searchParameter: string]: string};
    className?: string;
    productType?: ProductType;
    productSubType?: InverterSubType | BatterySubType | ComboSubType | AutomotiveSubType | AccessoriesSubType;
}) {
    const contentData = useContext(ContentProviderContext);
    const sectionData: {
        description: string;
        downloadButtons: Array<{iconRelativePath: string; text: string; downloadLink: string; popup: boolean}>;
        buttonText: string;
    } = {
        description: `${contentData.getContent("categoryBatteriesS8Description")}`,
        downloadButtons: [
            {
                iconRelativePath: "/livguard/icons/buyingGuide.png",
                text: `${contentData.getContent("categoryBatteriesS8B1T")}`,
                downloadLink: "https://www.livguard.com/static-assets/livguard-buying-guide.pdf",
                popup: false,
            },
            {
                iconRelativePath: "/livguard/icons/downloadCatalogue.png",
                text: `${contentData.getContent("categoryBatteriesS8B2T")}`,
                downloadLink: getDownloadCatalogueLink(productType, productSubType),
                popup: false,
            },
        ],
        buttonText: `${contentData.getContent("categoryBatteriesS8BT")}`,
    };
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "plan-your-power": {
                humanReadableName: contentData.getContent("774db10b-9d90-42dd-bf81-8a1b389178d3"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge", className)}
            id="plan-your-power"
            ref={sectionRef}
        >
            <div className="tw-flex tw-flex-col">
                <h2 className="tw-grid lg-text-headline tw-text-center">
                    <DefaultTextAnimation>
                        <div dangerouslySetInnerHTML={{__html: appendSpaceToString(contentData.getContent("categoryBatteriesS8HT1"))}} />
                    </DefaultTextAnimation>
                    <DefaultTextAnimation>
                        {productType != undefined ? (
                            <div dangerouslySetInnerHTML={{__html: contentData.getContent(getProductNameFromProductTypeAndSubtype(productType, productSubType))}} />
                        ) : (
                            <div dangerouslySetInnerHTML={{__html: contentData.getContent("categoryBatteriesS8HT2")}} />
                        )}
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
        <div className="">
            <FaqSectionInternal
                faqs={faqs}
                userPreferences={userPreferences}
                className={className}
            />
        </div>
    );
}

function SuggestedCombo({
    userPreferences,
    className,
    humanReadableModelNumbersForSuggestions,
    items,
}: {
    userPreferences: UserPreferences;
    className?: string;
    humanReadableModelNumbersForSuggestions: HumanReadableModelNumbersForSuggestions;
    items: Array<string>;
}) {
    const contentData = useContext(ContentProviderContext);
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "suggested-combo": {
                humanReadableName: contentData.getContent("5270f2b4-c38b-45b7-8dac-0434f3e7bfcf"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            className="lg:tw-px-[6.8rem] tw-px-0"
            id="suggested-combo"
            ref={sectionRef}
        >
            <SuggestedComboSection
                userPreferences={userPreferences}
                className=""
                humanReadableModelNumbersForSuggestions={humanReadableModelNumbersForSuggestions}
                items={items}
            />
        </div>
    );
}

function AboutLivguard({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className="lg:tw-px-[6.8rem] tw-px-0">
            <SocialHandles
                userPreferences={userPreferences}
                heading={{text1: "dealerLocatorSocialHT1", text2: "dealerLocatorSocialHT2"}}
            />
        </div>
    );
}
