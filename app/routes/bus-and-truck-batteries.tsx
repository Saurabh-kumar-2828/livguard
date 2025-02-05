import {LoaderFunction, V2_MetaFunction} from "@remix-run/node";
import {Link, useLoaderData} from "@remix-run/react";
import React, {useContext, useEffect, useRef, useState} from "react";
import {useInView} from "react-intersection-observer";
import {getProductFromSlugAndLanguage} from "~/backend/product.server";
import {SubCategoryProductsInternal} from "~/components/automotive-batteries/subCategoryProductsInternal";
import {CarouselStyle5} from "~/components/carouselStyle5";
import {SocialHandles} from "~/components/category/common";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {FaqSectionInternal} from "~/components/faqs";
import {FullWidthImage} from "~/components/images/simpleFullWidthImage";
import {PageScaffold} from "~/components/pageScaffold";
import {ProductAndCategoryBottomBar} from "~/components/productAndCategoryBottomBar";
import {SecondaryNavigation} from "~/components/secondaryNavigation";
import {SecondaryNavigationControllerContext} from "~/contexts/secondaryNavigationControllerContext";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {ImageCdnProvider, ImageMetadata} from "~/common--type-definitions/typeDefinitions";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";
import {SecondaryNavigationController, useSecondaryNavigationController} from "~/hooks/useSecondaryNavigationController";
import {FormSelectComponent} from "~/livguard-common-typescript/scratchpad";
import {ProductDetails, ProductType, allProductDetails} from "~/productData.types";
import {DealerLocator} from "~/reusableSections/dealerLocator";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import type {UserPreferences} from "~/typeDefinitions";
import {Language} from "~/typeDefinitions";
import {getMetadataForImage, getRedirectToUrlFromRequest, getUrlFromRequest, secondaryNavThreshold} from "~/utilities";
import {getContentGenerator} from "~/vernacularProvider";
import {getVernacularFromBackend} from "~/backend/vernacularProvider.server";
import {ContentProviderContext} from "~/contexts/contentProviderContext";
import {getImageMetadataLibraryFromBackend, getMetadataForImageServerSide} from "~/backend/imageMetaDataLibrary.server";
import {ImageProviderContext} from "~/contexts/imageMetaDataContext";
import {AutomotiveTestimonials} from "~/routes/two-wheeler-batteries";
import { SocialMediaFeedsSection } from ".";

export const meta: V2_MetaFunction = ({data: loaderData}: {data: LoaderData}) => {
    const userPreferences: UserPreferences = loaderData.userPreferences;
    if (userPreferences.language == Language.English) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/bus-and-truck-batteries",
            },
            {
                title: "Limitless Journeys with Livguard's Robust Bus and Truck Batteries",
            },
            {
                name: "description",
                content: "Unleash uninterrupted journeys with dependable power! Explore our robust bus and truck batteries, designed for excellence every time",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/bus-and-truck-batteries",
            },
            {
                property: "og:title",
                content: "Limitless Journeys with Livguard's Robust Bus and Truck Batteries",
            },
            {
                property: "og:description",
                content: "Unleash uninterrupted journeys with dependable power! Explore our robust bus and truck batteries, designed for excellence every time",
            },
            {
                property: "og:site_name",
                content: "Livguard",
            },
            {
                property: "og:type",
                content: "Product",
            },
            {
                property: "og:image",
                content: loaderData.ogBanner,
            },
        ];
    } else if (userPreferences.language == Language.Hindi) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/bus-and-truck-batteries",
            },
            {
                title: "लिवगार्ड की मजबूत बस और ट्रक बैटरियों के साथ असीमित यात्राएँ",
            },
            {
                name: "description",
                content: "भरोसेमंद शक्ति के साथ निर्बाध यात्राएँ शुरू करें! हर बार उत्कृष्टता के लिए डिज़ाइन की गई हमारी मजबूत बस और ट्रक बैटरियों का अन्वेषण करें",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/bus-and-truck-batteries",
            },
            {
                property: "og:title",
                content: "लिवगार्ड की मजबूत बस और ट्रक बैटरियों के साथ असीमित यात्राएँ",
            },
            {
                property: "og:description",
                content: "भरोसेमंद शक्ति के साथ निर्बाध यात्राएँ शुरू करें! हर बार उत्कृष्टता के लिए डिज़ाइन की गई हमारी मजबूत बस और ट्रक बैटरियों का अन्वेषण करें",
            },
            {
                property: "og:site_name",
                content: "Livguard",
            },
            {
                property: "og:type",
                content: "Product",
            },
            {
                property: "og:image",
                content: loaderData.ogBanner,
            },
        ];
    } else {
        throw Error(`Undefined language ${userPreferences.language}`);
    }
};

type LoaderData = {
    userPreferences: UserPreferences;
    redirectTo: string;
    pageUrl: string;
    humraahiProducts: Array<ProductDetails>;
    xtralifeProducts: Array<ProductDetails>;
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

    const humraahiProductSlugs = ["lglff80r", "lglff80l", "lglff100l", "lglff100h29r", "lglnff130r", "lglnhd150r", "lglff180r"];
    const xtralifeProductSlugs = ["lghx8048r", "lghx8048l", "lghx10048l", "lghx10048r", "lghx10048h29r"];

    const humraahiProducts = humraahiProductSlugs.map((slug) => getProductFromSlugAndLanguage(slug, userPreferences.language));
    const xtralifeProducts = xtralifeProductSlugs.map((slug) => getProductFromSlugAndLanguage(slug, userPreferences.language));

    const vernacularData = getVernacularFromBackend("busAndTruckBatteriesPage", userPreferences.language);
    const imageMetaDataLibrary = getImageMetadataLibraryFromBackend("busAndTruckBatteriesPage");
    const ogBanner = getAbsolutePathForRelativePath(getMetadataForImageServerSide("/livguard/bus-and-truck/bus-and-truck-og-banner.jpg").finalUrl, ImageCdnProvider.Bunny, 764, null);

    const loaderData: LoaderData = {
        userPreferences: userPreferences,
        redirectTo: getRedirectToUrlFromRequest(request),
        pageUrl: getUrlFromRequest(request),
        humraahiProducts: humraahiProducts,
        xtralifeProducts: xtralifeProducts,
        vernacularData: vernacularData,
        imageMetaDataLibrary: imageMetaDataLibrary,
        ogBanner: ogBanner,
    };

    return loaderData;
};

export default () => {
    const {userPreferences, redirectTo, pageUrl, humraahiProducts, xtralifeProducts, vernacularData, imageMetaDataLibrary} = useLoaderData() as LoaderData;

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
                            {contentId: "530f4898-7fd2-474b-809b-905a2b722d83", link: "#"},
                        ]}
                        secondaryNavigationController={secondaryNavigationController}
                    >
                        <SecondaryNavigationControllerContext.Provider value={secondaryNavigationController}>
                            <BusAndTruckBatteriesPage
                                userPreferences={userPreferences}
                                utmParameters={utmSearchParameters}
                                pageUrl={pageUrl}
                                secondaryNavigationController={secondaryNavigationController}
                                humraahiProducts={humraahiProducts}
                                xtralifeProducts={xtralifeProducts}
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
};

function BusAndTruckBatteriesPage({
    userPreferences,
    utmParameters,
    pageUrl,
    secondaryNavigationController,
    humraahiProducts,
    xtralifeProducts,
}: {
    userPreferences: UserPreferences;
    utmParameters: {
        [searchParameter: string]: string;
    };
    pageUrl: string;
    secondaryNavigationController?: SecondaryNavigationController;
    humraahiProducts: Array<ProductDetails>;
    xtralifeProducts: Array<ProductDetails>;
}) {
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);
    return (
        <>
            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-x-16 tw-items-start tw-justify-center">
                <HeroSection
                    userPreferences={userPreferences}
                    className="tw-row-start-1 tw-col-start-1 lg:tw-col-span-full"
                />
                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-2 tw-col-start-1 lg:tw-col-span-full" />

                <SuperiorFeatures
                    userPreferences={userPreferences}
                    className="tw-row-start-4 tw-col-start-1 lg-px-screen-edge-2 lg:tw-px-0 tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-5 tw-col-start-1 lg:tw-col-span-full" />

                <ExploreOurBusAndTruckBatteries
                    userPreferences={userPreferences}
                    className="tw-row-start-6 lg:tw-col-span-full tw-w-full tw-max-w-7xl tw-mx-auto"
                    humraahiProducts={humraahiProducts}
                    xtralifeProducts={xtralifeProducts}
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-7 tw-col-start-1 lg:tw-col-span-full" />

                <div className="tw-row-start-8 tw-grid lg:tw-grid-cols-[minmax(0,1fr)_minmax(0,2fr)] tw-col-span-full lg:lg-px-screen-edge-2 tw-gap-x-5 tw-max-w-7xl tw-mx-auto">
                    <DealerLocator
                        userPreferences={userPreferences}
                        showCtaButton={true}
                        secondaryNavigationName="0cb6d442-7df4-4272-a36d-9f956bdd8a54"
                        className="tw-row-start-5 lg:tw-col-start-1 lg:tw-h-full"
                    />

                    <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-6 lg:tw-col-start-1 lg:tw-col-span-full lg:tw-hidden" />

                    <ChooseYourIdealBusAndTruckBattery
                        userPreferences={userPreferences}
                        className="tw-row-start-7 lg:tw-row-start-5 lg:tw-col-start-2"
                    />
                </div>

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-[9] tw-col-start-1 lg:tw-col-span-full" />

                <AutomotiveTestimonials
                    userPreferences={userPreferences}
                    className="tw-row-start-[10] lg:tw-col-start-1 lg:tw-col-span-full lg-px-screen-edge-2"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-[11] tw-col-start-1 lg:tw-col-span-full" />

                {/* <SocialHandlesSection
                    userPreferences={userPreferences}
                    className="tw-row-start-[12] tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px] tw-gap-[1rem] tw-max-w-7xl tw-mx-auto"
                /> */}
                <SocialMediaFeedsSection
                    userPreferences={userPreferences}
                    className="tw-row-start-[12] tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px] tw-gap-[1rem] tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-[13] tw-col-start-1 lg:tw-col-span-full" />

                <FaqSection
                    userPreferences={userPreferences}
                    className="tw-row-start-[14] lg:tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px] tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-[15] tw-col-start-1 lg:tw-col-span-full" />
            </div>
        </>
    );
}

function HeroSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-aspect-square lg:tw-aspect-[1280/380] tw-grid tw-grid-rows-[2rem_auto_auto_1rem_auto_1.5rem_minmax(0,1fr)] lg:tw-grid-rows-[4rem_auto_auto_1rem_auto_3.5rem_minmax(0,1fr)] tw-text-center lg:tw-text-left lg:tw-grid-cols-2",
                className,
            )}
        >
            <div className="tw-row-start-1 tw-col-start-1 tw-row-span-full tw-col-span-full tw-h-full tw-w-full tw-relative">
                {isScreenSizeBelow == null ? null : (
                    <>
                        <FullWidthImage
                            relativePath={isScreenSizeBelow ? "/livguard/bus-and-truck/1/banner-mobile.jpg" : "/livguard/bus-and-truck/1/banner-desktop.jpg"}
                            key={isScreenSizeBelow ? "/livguard/bus-and-truck/1/banner-mobile.jpg" : "/livguard/bus-and-truck/1/banner-desktop.jpg"}
                        />
                    </>
                )}
            </div>

            <DefaultTextAnimation className="tw-row-start-2 tw-col-start-1 lg-px-screen-edge-2 tw-z-[2]">
                <div className="lg-text-banner tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start">{contentData.getContent("67dd15a8-c016-43f0-8715-e7ba18ca5c38")}</div>
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-3 tw-col-start-1 lg-px-screen-edge-2 tw-z-[2]">
                <div className="lg-text-banner tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start">{contentData.getContent("7853d640-7e57-4678-af5d-8631f2ec6cf7")}</div>
            </DefaultTextAnimation>
        </div>
    );
}

function SuperiorFeatures({userPreferences, className}: {userPreferences: UserPreferences; className: string}) {
    const contentData = useContext(ContentProviderContext);
    const BatteryCard = ({title, description, imageRelativePath}: {title: string; description: string; imageRelativePath: string}) => {
        return (
            <div
                className={concatenateNonNullStringsWithSpaces(
                    "tw-place-self-center tw-grid tw-grid-rows-[auto_1rem_auto_1rem_auto_minmax(1rem,1fr)] tw-cols-[auto] tw-w-full tw-h-full tw-px-4 tw-py-4 lg-card tw-rounded-lg",
                )}
            >
                <div className="tw-row-start-1">
                    <FullWidthImage
                        relativePath={imageRelativePath}
                        className="tw-rounded-lg"
                    />
                </div>

                <div className="tw-row-start-3 tw-text-center lg-text-title1 lg-text-secondary-900">{title}</div>

                <div className="tw-row-start-5 tw-text-center lg-text-body lg-text-secondary-900">{description}</div>
            </div>
        );
    };

    const batteriesData: Array<{titleTextContentPiece: string; bodyTextContentPiece: string; imageRelativePath: string}> = [
        {
            titleTextContentPiece: "70f2a04d-bc31-4848-9509-f77f40137e84",
            bodyTextContentPiece: "fbba1481-db00-4e47-8a74-8382af5b4ac4",
            imageRelativePath: "/livguard/bus-and-truck/2/maintenance.jpg",
        },
        {
            titleTextContentPiece: "75c7f633-bbb4-4a79-bdcb-5b817da7c076",
            bodyTextContentPiece: "c5bf4b2a-a0a8-4d43-9b84-c25c048dd079",
            imageRelativePath: "/livguard/bus-and-truck/2/cranking.jpg",
        },
        {
            titleTextContentPiece: "3bed811b-de77-40ab-8181-86efbf684059",
            bodyTextContentPiece: "fc26240d-32c8-47bc-a2bf-c29c0a25e6af",
            imageRelativePath: "/livguard/bus-and-truck/2/battery-life.jpg",
        },
        {
            titleTextContentPiece: "6fe5a9f6-4817-4100-90ad-b05fefd330f5",
            bodyTextContentPiece: "2c278f68-8047-4a91-b53d-fe7c4e592781",
            imageRelativePath: "/livguard/bus-and-truck/2/weather-performance.jpg",
        },
        {
            titleTextContentPiece: "70f2a04d-bc31-4848-9509-f77f40137e84",
            bodyTextContentPiece: "fbba1481-db00-4e47-8a74-8382af5b4ac4",
            imageRelativePath: "/livguard/bus-and-truck/2/maintenance.jpg",
        },
        {
            titleTextContentPiece: "75c7f633-bbb4-4a79-bdcb-5b817da7c076",
            bodyTextContentPiece: "c5bf4b2a-a0a8-4d43-9b84-c25c048dd079",
            imageRelativePath: "/livguard/bus-and-truck/2/cranking.jpg",
        },
        {
            titleTextContentPiece: "3bed811b-de77-40ab-8181-86efbf684059",
            bodyTextContentPiece: "fc26240d-32c8-47bc-a2bf-c29c0a25e6af",
            imageRelativePath: "/livguard/bus-and-truck/2/battery-life.jpg",
        },
        {
            titleTextContentPiece: "6fe5a9f6-4817-4100-90ad-b05fefd330f5",
            bodyTextContentPiece: "2c278f68-8047-4a91-b53d-fe7c4e592781",
            imageRelativePath: "/livguard/bus-and-truck/2/weather-performance.jpg",
        },
    ];
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "superior-features": {
                humanReadableName: contentData.getContent("f19bea1b-ce21-4a14-af85-b49b68827611"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <>
            <div
                className={concatenateNonNullStringsWithSpaces("tw-w-full lg:tw-col-span-full", className)}
                id="superior-features"
                ref={sectionRef}
            >
                <DefaultTextAnimation className="tw-flex tw-flex-col tw-items-center lg-text-headline lg:lg-px-screen-edge-2 lg:tw-pl-0 lg:tw-pr-0 tw-text-center lg:tw-text-left">
                    <div dangerouslySetInnerHTML={{__html: contentData.getContent("853e41c9-26ed-409d-a636-03af2124e7bb")}} />
                    <div dangerouslySetInnerHTML={{__html: contentData.getContent("dcfc64d7-ca43-4e45-a11a-f0c4fe765152")}} />
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-h-4 lg:tw-h-8" />

                <CarouselStyle5
                    snapDotsDivisionFactor={2}
                    items={batteriesData.map((batteryData, batteryDataIndex) => (
                        <BatteryCard
                            title={contentData.getContent(batteryData.titleTextContentPiece)}
                            description={contentData.getContent(batteryData.bodyTextContentPiece)}
                            imageRelativePath={batteryData.imageRelativePath}
                            key={batteryDataIndex}
                        />
                    ))}
                    className="tw-mx-auto"
                    deselectedContainersClassName="tw-scale-[0.9] tw-h-full"
                    selectedContainerClassName="tw-h-full"
                    itemContainerClassName="lg:tw-px-0"
                />
            </div>
        </>
    );
}

function ExploreOurBusAndTruckBatteries({
    userPreferences,
    className,
    humraahiProducts,
    xtralifeProducts,
}: {
    userPreferences: UserPreferences;
    className?: string;
    humraahiProducts: Array<ProductDetails>;
    xtralifeProducts: Array<ProductDetails>;
}) {
    const contentData = useContext(ContentProviderContext);
    const featuredProducts = {
        Humraahi: {
            title: "a504cf0b-8c7c-4afe-b5e2-925f9576d1c0",
            vehicleImageRelativeUrl: "/livguard/bus-and-truck/3/truck.png",
            productImageRelativeUrl: "/livguard/bus-and-truck/3/truck-battery.png",
            products: humraahiProducts.map((product) => ({
                productType: ProductType.automotiveBattery,
                name: product.humanReadableModelNumber,
                slug: product.slug,
                capacity: product.specifications[2].value,
                warranty: product.specifications[1].value,
                price: product.price,
            })),
        },
        "Humraahi Xtralife": {
            title: "da25b231-d277-41c9-bd06-494ce7b53ae7",
            vehicleImageRelativeUrl: "/livguard/bus-and-truck/3/bus.png",
            productImageRelativeUrl: "/livguard/bus-and-truck/3/bus-battery.png",
            products: xtralifeProducts.map((product) => ({
                productType: ProductType.automotiveBattery,
                name: product.humanReadableModelNumber,
                slug: product.slug,
                capacity: product.specifications[2].value,
                warranty: product.specifications[1].value,
                price: product.price,
            })),
        },
    };

    function BatteryCard({
        slug,
        productType,
        userPreferences,
        isBestSeller,
        productName,
        productPrice,
        capacity,
        warranty,
    }: {
        slug: string;
        productType: ProductType;
        userPreferences: UserPreferences;
        isBestSeller?: boolean;
        productName: string;
        productPrice: string;
        capacity: string;
        warranty: string;
    }) {
        return (
            <Link
                to={`/product/${slug}`}
                className="tw-w-full tw-h-full tw-grid tw-grid-cols-1 tw-grid-flow-row tw-grid-rows-[max-content_auto] lg-bg-secondary-100 tw-rounded-lg"
            >
                {isBestSeller != null && isBestSeller === true ? (
                    <div className="tw-row-start-1 tw-h-6 lg-stabilizers-best-seller-gradient tw-rounded-tr-lg tw-place-self-end tw-self-start tw-text-xs tw-px-3 tw-py-1 lg:tw-px-4 tw-flex tw-flex-row tw-items-center !tw-text-secondary-900-dark">
                        <span>{contentData.getContent("f22a7acc-0168-4011-9eaf-6a8f3328f093")}</span>
                    </div>
                ) : (
                    <VerticalSpacer className="tw-h-6" />
                )}

                <div className="tw-p-4 tw-grid tw-grid-flow-row">
                    <FullWidthImage relativePath={`/product/${productType}/${slug}/thumbnail.png`} />

                    <div className="tw-w-full tw-text-center lg-text-body-bold lg-text-secondary-900">
                        {/* {convertProductInternalNameToPublicName(slug)} */}
                        {productName}
                    </div>

                    <VerticalSpacer className="tw-h-2" />

                    <div className="tw-place-self-center tw-grid tw-grid-cols-[minmax(0,1fr)_auto_0.5rem_70%_minmax(0,1fr)] tw-place-items-center tw-w-full">
                        <img
                            className="tw-col-start-2 tw-invert dark:tw-invert-0"
                            src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/two-wheeler/4/capacity.svg").finalUrl, ImageCdnProvider.Bunny, null, null)}
                        />
                        <span className="tw-col-start-4 tw-text-center">{capacity}</span>
                    </div>

                    <VerticalSpacer className="tw-h-2" />

                    <div className="tw-place-self-center tw-grid tw-grid-cols-[minmax(0,1fr)_auto_0.5rem_70%_minmax(0,1fr)] tw-place-items-center tw-w-full">
                        <img
                            className="tw-col-start-2 tw-invert dark:tw-invert-0"
                            src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/two-wheeler/4/warranty.svg").finalUrl, ImageCdnProvider.Bunny, null, null)}
                        />
                        <span className="tw-col-start-4 tw-text-center">{warranty}</span>
                    </div>

                    <VerticalSpacer className="tw-h-6" />

                    <div className="tw-w-full tw-text-center lg-text-secondary-700">
                        {`${contentData.getContent("48ad8c65-8ec7-4a35-be5f-e73180099178")}${productPrice}${contentData.getContent("584c3b75-5cd8-4b82-ba73-b105838035d6", userPreferences.language)}`}
                    </div>

                    <VerticalSpacer className="tw-h-4" />

                    <button className="lg-cta-outline-button lg-cta-outline-button-transition tw-w-full tw-text-center tw-px-1">
                        {contentData.getContent("063dc56b-910e-4a48-acb8-8f52668a4c72")}
                    </button>
                </div>
            </Link>
        );
    }

    const humraahiRef = useRef(null);
    const humraahiXtraLifeRef = useRef(null);

    const refs = [humraahiRef, humraahiXtraLifeRef];

    const [isViewMore, setIsViewMore] = useState(false);

    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "our-range": {
                humanReadableName: contentData.getContent("a2f95300-c1a1-45f4-a151-3f4b81b66e39"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);

    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-px-3", className)}
            id="our-range"
            ref={sectionRef}
        >
            <div className="tw-grid tw-grid-cols-1">
                <DefaultTextAnimation>
                    <h2
                        className="lg-text-headline tw-text-center"
                        dangerouslySetInnerHTML={{__html: contentData.getContent("537716c2-f2d4-48af-b779-46cfd71501d7")}}
                    />

                    <h2
                        className="lg-text-headline tw-text-center"
                        dangerouslySetInnerHTML={{__html: contentData.getContent("8ffe8884-7063-4944-98d1-a54fe742262d")}}
                    />
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-h-6 lg:tw-h-12" />

                <SubCategoryProductsInternal
                    userPreferences={userPreferences}
                    refs={refs}
                    featuredProducts={featuredProducts}
                    navigatorsContainerClassName="lg:tw-w-fit tw-grid tw-grid-rows-1 tw-grid-cols-2 lg:tw-grid-rows-1 lg:tw-grid-cols-[auto_auto] lg:tw-grid-flow-col lg:tw-justify-center tw-gap-4"
                    categoriesGridContainerClassName="tw-overflow-hidden"
                    vehicleImageClassName="lg:tw-absolute lg:tw-bottom-0 tw-w-[80%] tw-mx-auto lg:tw-w-[90%]"
                    vehicleImageLeftClassName="tw-left-[-2rem]"
                    vehicleImageRightClassName="tw-right-[-2rem]"
                    productImageClassName="tw-z-[2] tw-absolute tw-bottom-[-0.3125rem] tw-h-[40%] lg:tw-h-[30%]"
                    productImageLeftClassName="lg:tw-left-[5%] tw-left-[2.5rem]"
                    productImageRightClassName="lg:tw-right-[5%] tw-right-[1rem]"
                />
            </div>
        </div>
    );
}

function ChooseYourIdealBusAndTruckBattery({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "battery-finder": {
                humanReadableName: contentData.getContent("f37d67f3-63f7-477d-828b-6c8fac1b00b4"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_1rem_auto_1rem_auto_minmax(0,1fr)] ", className)}
            id="battery-finder"
            ref={sectionRef}
        >
            <div className="tw-row-start-2 tw-text-center lg-text-headline">{contentData.getContent("c46c205c-ffdc-4791-a3f9-b4a839925185")}</div>
            <div
                className="tw-row-start-3 tw-text-center lg-text-headline"
                dangerouslySetInnerHTML={{__html: contentData.getContent("ea7ce343-ef9d-447e-95ff-578d437bcd97")}}
            />
            <div className="tw-row-start-5 tw-text-center lg-px-screen-edge-2">{contentData.getContent("13754e87-5d5e-46f4-9f02-6f84770a8ec8")}</div>

            <div className="tw-row-start-7 tw-grid tw-p-4 tw-justify-center tw-w-full">
                <div className="tw-w-fit tw-grid tw-grid-rows-2 lg:tw-grid-rows-1 lg:tw-grid-cols-2 tw-gap-4 tw-grid-flow-col">
                    <a
                        href="https://www.livguard.com/static-assets/leaflet-commercial-vehicles.pdf"
                        download
                        target="_blank"
                        className="lg-cta-outline-button lg-cta-outline-button-category-section-transition tw-py-3 tw-rounded-full tw-grid tw-grid-cols-[auto_1rem_auto_minmax(0,1fr)] tw-group tw-h-full tw-px-4"
                    >
                        <img
                            className="tw-row-start-1 tw-col-start-1 tw-h-4 tw-w-4 lg:tw-h-6 lg:tw-w-6 tw-place-self-center tw-transition-colors tw-duration-200 group-hover:tw-brightness-0 group-hover:tw-invert"
                            src="https://www.livguard.com/static-assets/icons/stabilizer/download-catalogue.svg"
                        />
                        <div className="tw-row-start-1 tw-col-start-3 tw-flex tw-flex-row tw-items-center lg-text-body group-hover:!tw-text-secondary-100-light tw-transition-colors tw-duration-200">
                            {contentData.getContent("51ae4bbd-0f66-42bc-b031-cc3e9dc4dc26")}
                        </div>
                    </a>
                    <Link
                        to="/battery-finder"
                        className="tw-h-full tw-w-full tw-grid tw-place-items-center"
                    >
                        <div className="tw-h-full tw-w-full tw-grid tw-items-center lg-cta-button tw-place-self-center">{contentData.getContent("1271cac7-693c-48bc-850f-16199416dd0e")}</div>
                    </Link>
                </div>
            </div>

            <VerticalSpacer className="lg:tw-row-start-8 tw-hidden lg:tw-block lg:tw-h-12" />
        </div>
    );
}

function FaqSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const faqs = [
        {
            question: "2b84c09e-60d6-4590-9f2a-a8b058c94087",
            answer: "0acdb496-94a8-487b-a73d-829546437963",
        },
        {
            question: "3db5b6a7-0861-41ff-8d90-2ffbac60bf69",
            answer: "4023e870-1e78-41f9-a528-2640381c5288",
        },
        {
            question: "7f21538b-0330-4a9b-a3fc-937390f6967a",
            answer: "e0581f37-46a0-472c-94e6-c7205e04d466",
        },
        {
            question: "df814438-bb8d-441c-85b2-55609037be4f",
            answer: "e4e5ac1d-e5a5-4ae8-8a8b-3e05d9264d1b",
        },
        {
            question: "ad3d0c4f-7438-4436-b607-322798870bf8",
            answer: "64eb212f-e988-4ec9-8cd9-c8af0bdb1f63",
        },
    ];
    return (
        <div className={className}>
            <FaqSectionInternal
                faqs={faqs}
                userPreferences={userPreferences}
                className="tw-h-full tw-w-full"
            />
        </div>
    );
}

export function FilterDialog({
    userPreferences,
    isContactUsDialogOpen,
    setIsContactUsDialogOpen,
    brandBatteries,
    selectedBrand,
    setSelectedBrand,
    appliedBrand,
    setAppliedBrand,
    selectedSegment,
    setSelectedSegment,
    appliedSegment,
    setAppliedSegment,
    selectedModel,
    setSelectedModel,
    appliedModel,
    setAppliedModel,
    setApplyChanges,
}: {
    userPreferences: UserPreferences;
    isContactUsDialogOpen: boolean;
    setIsContactUsDialogOpen: React.Dispatch<boolean>;
    brandBatteries: any;
    selectedBrand: string;
    setSelectedBrand: React.Dispatch<string>;
    appliedBrand: string;
    setAppliedBrand: React.Dispatch<string>;
    selectedSegment: string;
    setSelectedSegment: React.Dispatch<string>;
    appliedSegment: string;
    setAppliedSegment: React.Dispatch<string>;
    selectedModel: string;
    setSelectedModel: React.Dispatch<string>;
    appliedModel: string;
    setAppliedModel: React.Dispatch<string>;
    setApplyChanges: React.Dispatch<boolean>;
}) {
    function tryToCloseContactUsDialog() {
        setIsContactUsDialogOpen(false);
    }
    const contentData = useContext(ContentProviderContext);
    return (
        <>
            <LivguardDialog
                isDialogOpen={isContactUsDialogOpen}
                tryToCloseDialog={tryToCloseContactUsDialog}
                title={contentData.getContent("0dc1ec96-3b51-4314-ab45-9b5b542f66c5")}
                showCloseIcon={true}
            >
                <div className="tw-place-self-center tw-w-full tw-grid tw-grid-flow-row tw-gap-y-6">
                    <div>
                        <FormSelectComponent
                            items={Object.keys(brandBatteries)}
                            itemBuilder={(item) => {
                                return item == "" ? contentData.getContent("51d56374-4d1d-46c1-8ef1-f72396e12e6a") : item;
                            }}
                            value={selectedBrand}
                            setValue={(item) => {
                                setApplyChanges(false);
                                setSelectedSegment("");
                                setSelectedModel("");
                                if (item != "") {
                                    setSelectedBrand(item);
                                    return;
                                }

                                setSelectedBrand("");
                            }}
                            buttonClassName="disabled:tw-bg-[#aeaeae]"
                        />
                    </div>
                    <div>
                        <FormSelectComponent
                            items={selectedBrand == "" ? [] : Object.keys(brandBatteries[selectedBrand])}
                            itemBuilder={(item) => {
                                return item == "" ? contentData.getContent("5793b8a3-16b1-4c11-bc37-ef5062160855") : item;
                            }}
                            value={selectedSegment}
                            setValue={(item) => {
                                setApplyChanges(false);
                                setSelectedModel("");
                                if (item != "") {
                                    setSelectedSegment(item);
                                    return;
                                }

                                setSelectedSegment("");
                            }}
                            disabled={selectedBrand == ""}
                            buttonClassName="disabled:tw-bg-[#aeaeae]"
                        />
                    </div>
                    <div>
                        <FormSelectComponent
                            items={selectedBrand == "" || selectedSegment == "" ? [] : Object.keys(brandBatteries[selectedBrand][selectedSegment])}
                            itemBuilder={(item) => {
                                return item == "" ? contentData.getContent("97f3fc31-1116-46f6-a385-d4df5e25bde1") : item;
                            }}
                            value={selectedModel}
                            setValue={(item) => {
                                setApplyChanges(false);
                                if (item != "") {
                                    setSelectedModel(item);
                                    return;
                                }

                                setSelectedModel("");
                            }}
                            disabled={selectedBrand == "" || selectedSegment == ""}
                            buttonClassName="disabled:tw-bg-[#aeaeae]"
                        />
                    </div>

                    <div
                        onClick={() => {
                            setApplyChanges(true);
                            tryToCloseContactUsDialog();
                        }}
                    >
                        <button
                            className="lg-cta-button tw-w-full"
                            // disabled={selectedBrand == "" || selectedSegment == "" || selectedModel == ""}
                            onClick={() => {
                                setApplyChanges(true);
                                setAppliedBrand(selectedBrand);
                                setAppliedSegment(selectedSegment);
                                setAppliedModel(selectedModel);
                            }}
                        >
                            {contentData.getContent("3231d38a-1950-46eb-be3b-76bd8bce6998")}
                        </button>
                    </div>
                </div>
            </LivguardDialog>
        </>
    );
}

function SocialHandlesSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className={concatenateNonNullStringsWithSpaces("", className)}>
            <SocialHandles
                userPreferences={userPreferences}
                heading={{text1: "b0a3aa40-4b00-4bdd-88e0-67085fafa92b", text2: `c0f802cc-902b-4328-b631-a3fad8fc7d18`}}
            />
        </div>
    );
}
