import {LinksFunction, LoaderFunction, MetaFunction, V2_MetaFunction} from "@remix-run/node";
import {Link, useLoaderData} from "@remix-run/react";
import {useResizeDetector} from "react-resize-detector";
import {Facebook, Instagram, Linkedin, Twitter, Youtube} from "react-bootstrap-icons";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {CoverImage} from "~/components/images/coverImage";
import {PageScaffold} from "~/components/pageScaffold";
import {FaqSectionInternal} from "~/components/faqs";
import {EmbeddedYoutubeVideo} from "~/components/embeddedYoutubeVideo";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import {Language, Theme, UserPreferences} from "~/typeDefinitions";
import {getContentGenerator} from "~/vernacularProvider";
import {getMetadataForImage, getRedirectToUrlFromRequest, getUrlFromRequest, secondaryNavThreshold} from "~/utilities";
import {CarouselStyle5} from "~/components/carouselStyle5";
import {FullWidthImage} from "~/components/images/simpleFullWidthImage";
import {CarouselStyle3} from "~/components/carouselStyle3";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import React, {useContext, useEffect} from "react";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {ImageCdnProvider, ImageMetadata} from "~/common--type-definitions/typeDefinitions";
import {FormSelectComponent} from "~/livguard-common-typescript/scratchpad";
import {StickyBottomBar} from "~/components/bottomBar";
import {ProductDetails, ProductType, allProductDetails} from "~/productData.types";
import {ProductAndCategoryBottomBar} from "~/components/productAndCategoryBottomBar";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";
import {DealerLocator} from "~/reusableSections/dealerLocator";
import {SecondaryNavigationController, useSecondaryNavigationController} from "~/hooks/useSecondaryNavigationController";
import {SecondaryNavigationControllerContext} from "~/contexts/secondaryNavigationControllerContext";
import {useInView} from "react-intersection-observer";
import {SecondaryNavigation} from "~/components/secondaryNavigation";
import {getProductFromSlugAndLanguage} from "~/backend/product.server";
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
                href: "https://www.livguard.com/e-rickshaw-batteries",
            },
            {
                title: "Efficiency in Every Move with Livguard E-Rickshaw Batteries",
            },
            {
                name: "description",
                content: "Power your e-rickshaw with the best battery for supreme performance. Maximize mileage, life, and reliability. Low-maintenance and faster charging",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/e-rickshaw-batteries",
            },
            {
                property: "og:title",
                content: "Efficiency in Every Move with Livguard E-Rickshaw Batteries",
            },
            {
                property: "og:description",
                content: "Power your e-rickshaw with the best battery for supreme performance. Maximize mileage, life, and reliability. Low-maintenance and faster charging",
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
                href: "https://www.livguard.com/e-rickshaw-batteries",
            },
            {
                title: "लिवगार्ड ई-रिक्शा बैटरी के साथ हर चाल में कार्यक्षमता",
            },
            {
                name: "description",
                content: "श्रेष्ठ प्रदर्शन के लिए अपने ई-रिक्शा को सबसे अच्छी बैटरी से संचालित करें। यात्रा, उम्र, और विश्वसनीयता को अधिकतम करें। कम रखरखाव और तेज़ चार्जिंग से लाभ उठाएं",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/e-rickshaw-batteries",
            },
            {
                property: "og:title",
                content: "लिवगार्ड ई-रिक्शा बैटरी के साथ हर चाल में कार्यक्षमता",
            },
            {
                property: "og:description",
                content: "श्रेष्ठ प्रदर्शन के लिए अपने ई-रिक्शा को सबसे अच्छी बैटरी से संचालित करें। यात्रा, उम्र, और विश्वसनीयता को अधिकतम करें। कम रखरखाव और तेज़ चार्जिंग से लाभ उठाएं",
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
    products: Array<ProductDetails>;
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

    const slugs = ["lgb0erfp1500", "lgc0ertu1800", "lgd0ertu2300", "lgd0ertu2500"];

    const products = slugs.map((slug) => getProductFromSlugAndLanguage(slug, userPreferences.language));

    const vernacularData = getVernacularFromBackend("eRickshawBatteriesPage", userPreferences.language);
    const imageMetaDataLibrary = getImageMetadataLibraryFromBackend("eRickshawBatteriesPage");
    const ogBanner = getAbsolutePathForRelativePath(getMetadataForImageServerSide("/livguard/e-rickshaw-batteries/e-rickshaw-batteries-og-banner.jpg").finalUrl, ImageCdnProvider.Bunny, 764, null);

    const loaderData: LoaderData = {
        userPreferences: userPreferences,
        redirectTo: getRedirectToUrlFromRequest(request),
        pageUrl: getUrlFromRequest(request),
        products: products,
        vernacularData: vernacularData,
        imageMetaDataLibrary: imageMetaDataLibrary,
        ogBanner: ogBanner,
    };

    return loaderData;
};

export default () => {
    const {userPreferences, redirectTo, pageUrl, products, vernacularData, imageMetaDataLibrary} = useLoaderData() as LoaderData;

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
                            {contentId: "b8b98109-dcab-45bf-873e-db9da7c798eb", link: "#"},
                        ]}
                        secondaryNavigationController={secondaryNavigationController}
                    >
                        <SecondaryNavigationControllerContext.Provider value={secondaryNavigationController}>
                            <ERickshawBatteriesPage
                                userPreferences={userPreferences}
                                utmParameters={utmSearchParameters}
                                pageUrl={pageUrl}
                                secondaryNavigationController={secondaryNavigationController}
                                products={products}
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

function ERickshawBatteriesPage({
    userPreferences,
    utmParameters,
    pageUrl,
    secondaryNavigationController,
    products,
}: {
    userPreferences: UserPreferences;
    utmParameters: {
        [searchParameter: string]: string;
    };
    pageUrl: string;
    secondaryNavigationController?: SecondaryNavigationController;
    products: Array<ProductDetails>;
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

                <OurRangeToEmpowerYourGrowth
                    userPreferences={userPreferences}
                    className="tw-row-start-6 tw-col-start-1 lg:tw-col-span-full tw-w-full"
                    products={products}
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-7 tw-col-start-1 lg:tw-col-span-full" />

                <DiscoverMore
                    userPreferences={userPreferences}
                    className="tw-row-start-8 tw-col-start-1 lg:tw-col-span-full tw-w-full tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-9 tw-col-start-1 lg:tw-col-span-full" />

                <div className="tw-row-start-10 tw-grid lg:tw-grid-cols-[minmax(0,1fr)_minmax(0,2fr)] tw-col-span-full lg:lg-px-screen-edge-2 tw-gap-x-5 tw-max-w-7xl tw-mx-auto">
                    <DealerLocator
                        userPreferences={userPreferences}
                        showCtaButton={true}
                        secondaryNavigationName="0cb6d442-7df4-4272-a36d-9f956bdd8a54"
                        className="tw-row-start-5 lg:tw-col-start-1 lg:tw-h-full"
                    />

                    <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-6 lg:tw-col-start-1 lg:tw-col-span-full lg:tw-hidden" />

                    <ChooseTheRightBattery
                        userPreferences={userPreferences}
                        className="tw-row-start-7 lg:tw-row-start-5 lg:tw-col-start-2"
                    />
                </div>

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-[11] tw-col-start-1 lg:tw-col-span-full" />

                <AutomotiveTestimonials
                    userPreferences={userPreferences}
                    className="tw-row-start-[12] lg:tw-col-start-1 lg:tw-col-span-full lg-px-screen-edge-2"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-[13] tw-col-start-1 lg:tw-col-span-full" />

                <SocialMediaFeedsSection
                    userPreferences={userPreferences}
                    className="tw-row-start-[14] tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px] tw-gap-[1rem] tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-[15] tw-col-start-1 lg:tw-col-span-full" />

                <OemPartners className="tw-row-start-[16] tw-col-start-1 tw-col-span-full" />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-[17] tw-col-start-1 lg:tw-col-span-full" />

                <FaqSection
                    userPreferences={userPreferences}
                    className="tw-row-start-[18] lg:tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px] tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-[19] tw-col-start-1 lg:tw-col-span-full" />
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
                "tw-aspect-square lg:tw-aspect-[1280/380] tw-grid tw-grid-rows-[2rem_auto_0.5rem_auto_minmax(0,1fr)] lg:tw-grid-rows-[minmax(0,1fr)_auto_0.5rem_auto_minmax(0,1fr)] tw-text-center lg:tw-text-left lg:tw-grid-cols-2",
                className,
            )}
        >
            <div className="tw-row-start-1 tw-col-start-1 tw-row-span-full tw-col-span-full tw-h-full tw-w-full tw-relative">
                {isScreenSizeBelow == null ? null : (
                    <>
                        <FullWidthImage
                            relativePath={isScreenSizeBelow ? "/livguard/e-rickshaw-batteries/1/banner-mobile.jpg" : "/livguard/e-rickshaw-batteries/1/banner-desktop.jpg"}
                            key={isScreenSizeBelow ? "/livguard/e-rickshaw-batteries/1/banner-mobile.jpg" : "/livguard/e-rickshaw-batteries/1/banner-desktop.jpg"}
                        />
                    </>
                )}
            </div>

            <DefaultTextAnimation className="tw-row-start-2 tw-col-start-1 lg-px-screen-edge-2 tw-place-self-center lg:tw-place-self-start tw-z-[2]">
                <div className="lg-text-banner tw-text-secondary-900-dark tw-text-center lg:tw-text-left">{contentData.getContent("67f761e4-5c9d-4ef7-87fa-df19fc2b92aa")}</div>
            </DefaultTextAnimation>

            <div className="tw-row-start-4 tw-col-start-1 lg-px-screen-edge-2 tw-place-self-center lg:tw-place-self-start tw-z-[2] tw-grid">
                <img
                    className="tw-w-full md:tw-w-3/5 md:tw-place-self-center lg:tw-place-self-start"
                    src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/e-rickshaw-batteries/1/e-shakti.png").finalUrl, ImageCdnProvider.Bunny, null, null)}
                />
            </div>
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

                <div className="tw-row-start-3 tw-text-center lg-text-title1">{title}</div>

                <div className="tw-row-start-5 tw-text-center lg-text-body">{description}</div>
            </div>
        );
    };

    const batteriesData: Array<{titleTextContentPiece: string; bodyTextContentPiece: string; imageRelativePath: string}> = [
        {
            titleTextContentPiece: "75c8e077-526b-4517-a52a-36a858dbb06e",
            bodyTextContentPiece: "61b03b16-b490-4ae2-95ff-ffd4ef994b9b",
            imageRelativePath: "/livguard/e-rickshaw-batteries/2/maximum-mileage.jpg",
        },
        {
            titleTextContentPiece: "d660f7e7-4945-4d60-ac65-ee35d44644c4",
            bodyTextContentPiece: "ea91df06-eee3-4f24-bac2-b4d0484c9c26",
            imageRelativePath: "/livguard/e-rickshaw-batteries/2/battery-life.jpg",
        },
        {
            titleTextContentPiece: "bbdf4cee-9f7c-475a-a464-ef1ef26204b8",
            bodyTextContentPiece: "24233427-5ce6-4924-bea6-56eef727ef86",
            imageRelativePath: "/livguard/e-rickshaw-batteries/2/maintenance.jpg",
        },
        {
            titleTextContentPiece: "8a8c6ad0-848e-4cdc-8570-3fc2d05abf5e",
            bodyTextContentPiece: "2dd6ceca-eaa9-4b31-89a2-60d1b54a1237",
            imageRelativePath: "/livguard/e-rickshaw-batteries/2/reliable.jpg",
        },
        {
            titleTextContentPiece: "8b08775f-905e-4826-a595-9001b888bead",
            bodyTextContentPiece: "48127946-a89e-46bc-95ec-1baf8e68b072",
            imageRelativePath: "/livguard/e-rickshaw-batteries/2/faster-charging.jpg",
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
                    <div dangerouslySetInnerHTML={{__html: contentData.getContent("3e08230a-fc5d-4191-abfa-6b6be76e983f")}} />
                    <div dangerouslySetInnerHTML={{__html: contentData.getContent("eb77dfed-047e-4fb7-bfb2-bbe06d128a93")}} />
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-h-4 lg:tw-h-8" />

                <CarouselStyle5
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

function OurRangeToEmpowerYourGrowth({userPreferences, className, products}: {userPreferences: UserPreferences; className?: string; products: Array<ProductDetails>}) {
    const contentData = useContext(ContentProviderContext);
    const batteriesData = products.map((product) => ({
        batterySlug: product.slug,
        name: product.humanReadableModelNumber,
        description: product.description,
        warranty: product.specifications[1].value,
        capacity: product.specifications[2].value,
        grid: product.specifications[3].value,
        dimensions: product.specifications[4].value,
        productType: ProductType.automotiveBattery,
    }));
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "our-range": {
                humanReadableName: contentData.getContent("f455acf2-de2a-48bb-afa1-c1b400f1fc09"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-w-full tw-grid tw-grid-flow-row lg-bg-our-suggestions", className)}
            id="our-range"
            ref={sectionRef}
        >
            <VerticalSpacer className="tw-h-6 lg:tw-h-10" />

            <div
                className="lg-text-headline tw-place-self-center"
                dangerouslySetInnerHTML={{__html: contentData.getContent("368be9b9-37b1-4c94-9b54-9c7b8bbea351")}}
            />
            <div className="lg-text-headline tw-place-self-center">{contentData.getContent("e102bc0e-f831-4631-abb2-60f166440bbe")}</div>

            <VerticalSpacer className="tw-h-4 lg:tw-h-6" />

            <CarouselStyle5
                // @ts-ignore
                items={batteriesData.map((battery, batteryIndex) => {
                    return (
                        <BatteryCard
                            userPreferences={userPreferences}
                            batterySlug={battery.batterySlug}
                            imageRelativeUrl={`/product/${battery.batterySlug}`}
                            name={battery.name}
                            description={battery.description}
                            warranty={battery.warranty}
                            capacity={battery.capacity}
                            grid={battery.grid}
                            dimensions={battery.dimensions}
                            key={batteryIndex}
                        />
                    );
                })}
                slidesContainerClassName="!tw-auto-cols-[100%] lg:!tw-auto-cols-max tw-place-self-center tw-items-center"
                selectedContainerClassName="tw-h-full"
                deselectedContainersClassName="tw-scale-[0.9] tw-h-full"
                autoplayDelay={null}
            />

            <VerticalSpacer className="tw-h-4 lg:tw-h-10" />
        </div>
    );
}

function BatteryCard({
    userPreferences,
    batterySlug,
    imageRelativeUrl,
    name,
    description,
    warranty,
    capacity,
    grid,
    dimensions,
}: {
    userPreferences: UserPreferences;
    batterySlug: string;
    imageRelativeUrl: string;
    name: string;
    description: string;
    warranty: string;
    capacity: string;
    grid: string;
    dimensions: string;
}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className="tw-max-w-3xl tw-mx-auto tw-grid tw-grid-cols-1 lg:tw-grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:tw-gap-x-2 lg-bg-new-background-500 lg-card tw-rounded-lg tw-px-4 tw-py-3 lg:tw-py-6 lg:tw-px-8">
            <div className="tw-col-start-1 tw-grid tw-grid-flow-row tw-place-items-center">
                <div className="lg:tw-hidden lg-bg-primary-500 tw-text-secondary-900-dark tw-p-2">{contentData.getContent("3ae8e96f-5ed1-4f8c-8e2f-194f16674982")}</div>
                <div className="tw-w-full tw-h-full">
                    <FullWidthImage relativePath={`/livguard/products/${batterySlug}/thumbnail.png`} />
                </div>

                <Link
                    className="tw-hidden lg:tw-block"
                    to={`/product/${batterySlug}`}
                >
                    <button className="lg-cta-button">{contentData.getContent("063dc56b-910e-4a48-acb8-8f52668a4c72")}</button>
                </Link>
            </div>

            <div className="tw-col-start-1 lg:tw-col-start-2 tw-grid tw-grid-flow-row">
                <div className="lg-text-title1 tw-text-center lg:tw-text-left">{name}</div>
                <div className="lg-text-title1 tw-text-center lg:tw-text-left">{batterySlug.toUpperCase()}</div>

                <VerticalSpacer className="tw-h-2" />

                <div className="lg-text-body tw-text-center lg:tw-text-left">{description}</div>

                <VerticalSpacer className="tw-h-4" />

                <div className="tw-grid tw-grid-rows-[auto_auto_minmax(0,1fr)] md:max-lg:tw-grid-cols-1 md:max-lg:tw-grid-flow-row md:max-lg:tw-place-items-center md:max-lg:tw-place-self-center md:max-lg:tw-w-fit tw-grid-cols-2 tw-gap-x-4 tw-gap-y-8">
                    <div className="tw-row-start-1 tw-col-start-1 md:max-lg:tw-w-full tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-x-2 lg:tw-place-self-start">
                        <div className="tw-place-self-center tw-row-start-1 tw-col-start-1 tw-h-10 tw-w-10 lg-bg-primary-500 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-p-1">
                            <img src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/e-rickshaw-batteries/3/3.warranty-icon.svg").finalUrl, ImageCdnProvider.Bunny, null, null)} />
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)]">
                            <div className="tw-row-start-2">{contentData.getContent("b384b853-774d-4227-b7e5-03dd24f5f1aa")}</div>
                            <div className="tw-row-start-3">{warranty}</div>
                        </div>
                    </div>

                    <div className="tw-row-start-1 tw-col-start-2 md:max-lg:tw-w-full md:max-lg:tw-row-start-2 md:max-lg:tw-col-start-1 tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-x-2">
                        <div className="tw-place-self-center tw-row-start-1 tw-col-start-1 tw-h-10 tw-w-10 lg-bg-primary-500 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-p-1">
                            <img src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/e-rickshaw-batteries/3/3.capacity-icon.svg").finalUrl, ImageCdnProvider.Bunny, null, null)} />
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)]">
                            <div className="tw-row-start-2">{contentData.getContent("b6a49b1c-fa41-4958-a2ed-79f87707416c")}</div>
                            <div className="tw-row-start-3">{capacity}</div>
                        </div>
                    </div>

                    <div className="tw-row-start-2 tw-col-start-1 md:max-lg:tw-w-full md:max-lg:tw-row-start-3 md:max-lg:tw-col-start-1 tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-x-2">
                        <div className="tw-place-self-center tw-row-start-1 tw-col-start-1 tw-h-10 tw-w-10 lg-bg-primary-500 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-p-1">
                            <img src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/icons/technology.png").finalUrl, ImageCdnProvider.Bunny, 22, 22)} />
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)]">
                            <div className="tw-row-start-2">{contentData.getContent("2d4c7020-d295-4227-a8bf-c4ba7e047228")}</div>
                            <div className="tw-row-start-3">{grid}</div>
                        </div>
                    </div>

                    <div className="tw-row-start-2 tw-col-start-2 md:max-lg:tw-w-full md:max-lg:tw-row-start-4 md:max-lg:tw-col-start-1 tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-x-2">
                        <div className="tw-place-self-center tw-row-start-1 tw-col-start-1 tw-h-10 tw-w-10 lg-bg-primary-500 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-p-1">
                            <img src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/e-rickshaw-batteries/3/3.dimensions-icon.svg").finalUrl, ImageCdnProvider.Bunny, null, null)} />
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)]">
                            <div className="tw-row-start-2">{contentData.getContent("151dfac3-66f4-4aa0-be1a-d92228015ee2")}</div>
                            <div className="tw-row-start-3">{dimensions}</div>
                        </div>
                    </div>
                </div>

                <VerticalSpacer className="tw-h-4 lg:tw-hidden" />

                <Link
                    className="tw-place-self-center lg:tw-hidden"
                    to={`/product/${batterySlug}`}
                >
                    <button className="lg-cta-button">{contentData.getContent("063dc56b-910e-4a48-acb8-8f52668a4c72")}</button>
                </Link>

                <VerticalSpacer className="tw-h-4 lg:tw-hidden" />
            </div>
        </div>
    );
}

function DiscoverMore({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "video-guide": {
                humanReadableName: contentData.getContent("067bdc8d-d3a5-4f85-b579-4655b69b6a16"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-flow-row lg-px-screen-edge-2", className)}
            id="video-guide"
            ref={sectionRef}
        >
            <DefaultTextAnimation className="tw-place-self-center">
                <div className="lg-text-headline">{contentData.getContent("98c90c88-6fc4-4786-b130-a52ce614d5d0")}</div>
            </DefaultTextAnimation>
            <DefaultTextAnimation className="tw-place-self-center">
                <div
                    className="lg-text-headline"
                    dangerouslySetInnerHTML={{__html: contentData.getContent("73095405-033a-4718-b6de-e4d0b6dbc0f6")}}
                />
            </DefaultTextAnimation>

            <VerticalSpacer className="tw-h-6" />

            <EmbeddedYoutubeVideo
                id="GYrIEB_WpBw"
                style={{aspectRatio: "560/315", borderRadius: "0.5rem"}}
            />
        </div>
    );
}

function ChooseTheRightBattery({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "e-rickshaw-charger": {
                humanReadableName: contentData.getContent("361b437f-a453-40f8-8ea5-1d89d31ed8aa"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_1rem_auto_1rem_auto_minmax(0,1fr)] ", className)}
            id="e-rickshaw-charger"
            ref={sectionRef}
        >
            <div
                className="tw-row-start-2 tw-text-center lg-text-headline"
                dangerouslySetInnerHTML={{__html: contentData.getContent("c52ecf6e-bc7d-4934-88d1-43660af8fe2d")}}
            />
            <div
                className="tw-row-start-3 tw-text-center lg-text-headline"
                dangerouslySetInnerHTML={{__html: contentData.getContent("bdd593f6-18f6-47d2-af26-af2a71693731")}}
            />
            <div className="tw-row-start-5 tw-text-center lg-px-screen-edge-2">{contentData.getContent("66e82d76-b469-46b4-87fe-0e2b1a73118e")}</div>

            <div className="tw-row-start-7 tw-grid tw-p-4 tw-justify-center tw-w-full">
                <div className="tw-w-fit tw-grid tw-grid-rows-2 lg:tw-grid-rows-1 lg:tw-grid-cols-2 tw-gap-4 tw-grid-flow-col">
                    <a
                        href="https://www.livguard.com/static-assets/leaflet-e-rickshaw.pdf"
                        download
                        target="_blank"
                        className="lg-cta-outline-button lg-cta-outline-button-category-section-transition-ops tw-py-3 tw-rounded-full tw-grid tw-grid-cols-[auto_1rem_auto_minmax(0,1fr)] tw-group tw-h-full tw-px-4"
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
                        to="/e-rickshaw-charger"
                        className="tw-h-full tw-w-full tw-grid tw-place-items-center"
                    >
                        <div className="tw-h-full tw-w-full tw-grid tw-items-center lg-cta-button tw-place-self-center">{contentData.getContent("df2ff393-aa90-47f1-a4cf-04f0b5ace0fc")}</div>
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
            question: "776ff25b-884a-49fe-95c3-14259b57457f",
            answer: "d2911eda-5053-41b1-beef-31190f078898",
        },
        {
            question: "66024269-4422-4f91-9438-3289aa23974b",
            answer: "d7cf1178-d4a1-4ae8-8e99-1ae3f9c8cb4e",
        },
        {
            question: "3e059e92-d43a-40cc-aa7e-41406e08c588",
            answer: "e9a3a3eb-9d61-40c0-97f5-3c0631f07058",
        },
        {
            question: "57d2fe3b-cc4d-44d4-b2b0-114da19d9ee7",
            answer: "8eefb5af-6bcc-4d2f-abe8-f9c68f0220f6",
        },
        {
            question: "dfaf9877-03ba-4cce-bd13-3404faf8ca9f",
            answer: "e1d62905-4e93-4b94-a0d3-db4774a9303e",
        },
    ];
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full tw-h-full", className)}>
            <FaqSectionInternal
                faqs={faqs}
                userPreferences={userPreferences}
                className=""
            />
        </div>
    );
}

function SocialHandles({userPreferences, heading, className}: {userPreferences: UserPreferences; heading: {text1: string; text2: string}; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    const embeddedVideos = [
        <EmbeddedYoutubeVideo
            id="b6gqLXTnZnw"
            style={{aspectRatio: "560/315"}}
        />,
        <EmbeddedYoutubeVideo
            id="CRabeGp9800"
            style={{aspectRatio: "560/315"}}
        />,
        <EmbeddedYoutubeVideo
            id="tFj9GJcjq6s"
            style={{aspectRatio: "560/315"}}
        />,
    ];
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "social-handles": {
                humanReadableName: contentData.getContent("01553562-bafd-4ad3-a18c-7b6cc113f03f"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces("[@media(max-width:1024px)]:lg-px-screen-edge tw-w-full tw-max-w-7xl tw-mx-auto", className)}
            id="social-handles"
            ref={sectionRef}
        >
            <div className="tw-flex tw-flex-col lg-bg-secondary-100 tw-rounded-lg tw-text-center lg-px-screen-edge lg:tw-hidden">
                <VerticalSpacer className="tw-h-4 lg:tw-hidden" />

                <div className="lg-text-headline">
                    <div dangerouslySetInnerHTML={{__html: contentData.getContent(heading.text1)}} />

                    <div dangerouslySetInnerHTML={{__html: contentData.getContent(heading.text2)}} />
                </div>

                <VerticalSpacer className="tw-h-4" />

                <CarouselStyle3 items={embeddedVideos} />

                <VerticalSpacer className="tw-h-4" />

                <div className="lg-text-body">{contentData.getContent("homeS11T2")}</div>

                <VerticalSpacer className="tw-h-2" />

                <div className="tw-flex tw-justify-evenly">
                    <a
                        href="https://www.facebook.com/LivguardEnergy/"
                        target="_blank"
                    >
                        <Facebook className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                    </a>
                    <a
                        href="https://twitter.com/LivguardEnergy"
                        target="_blank"
                    >
                        <Twitter className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                    </a>
                    <a
                        href="https://www.instagram.com/livguardenergy/"
                        target="_blank"
                    >
                        <Instagram className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                    </a>
                    <a
                        href="https://www.linkedin.com/company/livguard-energy/"
                        target="_blank"
                    >
                        <Linkedin className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                    </a>
                    <a
                        href="https://www.youtube.com/@LivguardEnergy"
                        target="_blank"
                    >
                        <Youtube className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                    </a>
                </div>

                <VerticalSpacer className="tw-h-4" />
            </div>

            <div className="tw-hidden lg:tw-flex tw-flex-col tw-justify-center tw-text-center">
                <VerticalSpacer className="tw-h-4 lg:tw-hidden" />

                <div className="lg-text-headline">
                    <div dangerouslySetInnerHTML={{__html: contentData.getContent(heading.text1)}} />

                    <div dangerouslySetInnerHTML={{__html: contentData.getContent(heading.text2)}} />
                </div>

                <VerticalSpacer className="tw-h-8" />

                <div className="tw-grid tw-grid-cols-3 tw-gap-4">
                    <ItemBuilder
                        items={embeddedVideos}
                        itemBuilder={(video, videoIndex) => (
                            <div
                                className="tw-flex tw-flex-col lg-bg-secondary-100 tw-rounded-lg tw-pb-4 tw-overflow-hidden"
                                key={videoIndex}
                            >
                                {video}

                                <VerticalSpacer className="tw-h-2" />

                                <div className="lg-text-body">{contentData.getContent("homeS11T2")}</div>

                                <div className="tw-flex tw-justify-evenly">
                                    <a
                                        href="https://www.facebook.com/LivguardEnergy/"
                                        target="_blank"
                                    >
                                        <Facebook className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                                    </a>
                                    <a
                                        href="https://twitter.com/LivguardEnergy"
                                        target="_blank"
                                    >
                                        <Twitter className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                                    </a>
                                    <a
                                        href="https://www.instagram.com/livguardenergy/"
                                        target="_blank"
                                    >
                                        <Instagram className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/company/livguard-energy/"
                                        target="_blank"
                                    >
                                        <Linkedin className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                                    </a>
                                    <a
                                        href="https://www.youtube.com/@LivguardEnergy"
                                        target="_blank"
                                    >
                                        <Youtube className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                                    </a>
                                </div>
                            </div>
                        )}
                    />
                </div>
            </div>
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

function OemPartners({className}: {className?: string}) {
    const contentData = useContext(ContentProviderContext);
    const logos = [
        {
            image: "/livguard/e-rickshaw-batteries/4/c-1.png",
        },
        {
            image: "/livguard/e-rickshaw-batteries/4/c-2.png",
        },
        {
            image: "/livguard/e-rickshaw-batteries/4/c-3.png",
        },
        {
            image: "/livguard/e-rickshaw-batteries/4/c-4.png",
        },
        {
            image: "/livguard/e-rickshaw-batteries/4/c-5.png",
        },
        {
            image: "/livguard/e-rickshaw-batteries/4/c-6.png",
        },
        {
            image: "/livguard/e-rickshaw-batteries/4/c-7.png",
        },
        {
            image: "/livguard/e-rickshaw-batteries/4/c-8.png",
        },
        {
            image: "/livguard/e-rickshaw-batteries/4/c-9.png",
        },
    ];
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "oem-partners": {
                humanReadableName: contentData.getContent("f754b360-ca73-4b3c-a709-3e60470da0de"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-max-w-7xl tw-mx-auto lg-px-screen-edge-2", className)}
            id="oem-partners"
            ref={sectionRef}
        >
            <div className="lg-text-headline tw-text-center">{contentData.getContent("81064037-a0db-4016-b8c9-364f933f29df")}</div>
            <VerticalSpacer className="tw-h-6" />
            <div className="tw-flex tw-flex-wrap tw-gap-4 tw-justify-center">
            <ItemBuilder
                items={logos}
                itemBuilder={(item, itemIndex) => (
                    <div className="tw-min-w-[40%] tw-max-w-[45%] sm:tw-min-w-[7rem] sm:tw-max-w-[9rem] lg:tw-min-w-[10rem] lg:tw-max-w-[12rem]">
                        <FullWidthImage relativePath={item.image} className="tw-aspect-video"/>
                    </div>
                )}
            />
            </div>
        </div>
    );
}
