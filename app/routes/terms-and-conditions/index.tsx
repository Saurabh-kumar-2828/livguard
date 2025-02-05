import type {LoaderFunction, V2_MetaFunction} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {PageScaffold} from "~/components/pageScaffold";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {ImageCdnProvider, ImageMetadata} from "~/common--type-definitions/typeDefinitions";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import type {UserPreferences} from "~/typeDefinitions";
import {Language} from "~/typeDefinitions";
import {getMetadataForImage, getRedirectToUrlFromRequest, getUrlFromRequest} from "~/utilities";
import {getContentGenerator} from "~/vernacularProvider";
import {useContext} from "react";
import {getVernacularFromBackend} from "~/backend/vernacularProvider.server";
import {ContentProviderContext} from "~/contexts/contentProviderContext";
import {getImageMetadataLibraryFromBackend, getMetadataForImageServerSide} from "~/backend/imageMetaDataLibrary.server";
import {ImageProviderContext} from "~/contexts/imageMetaDataContext";

export const meta: V2_MetaFunction = ({data: loaderData}: {data: LoaderData}) => {
    const userPreferences: UserPreferences = loaderData.userPreferences;
    if (userPreferences.language == Language.English) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/terms-and-conditions",
            },
            {
                title: "Inverter, Car Battery, Solar Panel at Best Price in India - Livguard",
            },
            {
                name: "description",
                content:
                    "Get the best inverter for your home today. With unlimited energy power up your spaces. Livguard's wide range of inverters are especially built to deliver high performance in our fast paced lives..",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/terms-and-conditions",
            },
            {
                property: "og:title",
                content: "Inverter, Car Battery, Solar Panel at Best Price in India - Livguard",
            },
            {
                property: "og:description",
                content:
                    "Get the best inverter for your home today. With unlimited energy power up your spaces. Livguard's wide range of inverters are especially built to deliver high performance in our fast paced lives..",
            },
            {
                property: "og:site_name",
                content: "Livguard",
            },
            {
                property: "og:type",
                content: "Website",
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
                href: "https://www.livguard.com/terms-and-conditions",
            },
            {
                title: "Inverter, Car Battery, Solar Panel at Best Price in India - Livguard",
            },
            {
                name: "description",
                content:
                    "Get the best inverter for your home today. With unlimited energy power up your spaces. Livguard's wide range of inverters are especially built to deliver high performance in our fast paced lives..",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/terms-and-conditions",
            },
            {
                property: "og:title",
                content: "Inverter, Car Battery, Solar Panel at Best Price in India - Livguard",
            },
            {
                property: "og:description",
                content:
                    "Get the best inverter for your home today. With unlimited energy power up your spaces. Livguard's wide range of inverters are especially built to deliver high performance in our fast paced lives..",
            },
            {
                property: "og:site_name",
                content: "Livguard",
            },
            {
                property: "og:type",
                content: "Website",
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

    const vernacularData = getVernacularFromBackend("termsAndConditionsPage", userPreferences.language);
    const imageMetaDataLibrary = getImageMetadataLibraryFromBackend("termsAndConditionsPage");
    const ogBanner = getAbsolutePathForRelativePath(getMetadataForImageServerSide("/livguard/terms-and-conditions/og-banner.jpg").finalUrl, ImageCdnProvider.Bunny, 764, null);

    const loaderData: LoaderData = {
        userPreferences: userPreferences,
        redirectTo: getRedirectToUrlFromRequest(request),
        pageUrl: getUrlFromRequest(request),
        vernacularData: vernacularData,
        imageMetaDataLibrary: imageMetaDataLibrary,
        ogBanner: ogBanner,
    };

    return loaderData;
};

export default () => {
    const {userPreferences, redirectTo, pageUrl, vernacularData, imageMetaDataLibrary} = useLoaderData() as LoaderData;
    const utmSearchParameters = useUtmSearchParameters();

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
                            {contentId: "10963071-3787-457b-a98b-79067ec8a07c", link: "#"},
                        ]}
                    >
                        <TermsAndConditionsPage userPreferences={userPreferences} />
                    </PageScaffold>
                </ContentProviderContext.Provider>
            </ImageProviderContext.Provider>
        </>
    );
};

function TermsAndConditionsPage({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div>
            <HeroSection userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <TermsAndConditions
                className="tw-max-w-7xl tw-mx-auto"
                userPreferences={userPreferences}
            />

            <VerticalSpacer className=" tw-h-10" />

            <OnlineStorTerms
                className="tw-max-w-7xl tw-mx-auto"
                userPreferences={userPreferences}
            />

            <VerticalSpacer className=" tw-h-10" />

            <GeneralConditions
                className="tw-max-w-7xl tw-mx-auto"
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="tw-h-10" />

            <AccuracyCompleteness
                className="tw-max-w-7xl tw-mx-auto"
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="tw-h-10" />

            <ModificationsPrices
                className="tw-max-w-7xl tw-mx-auto"
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="tw-h-10" />

            <ProductOfServices
                className="tw-max-w-7xl tw-mx-auto"
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="tw-h-10" />

            <AccuracyOfBilling
                className="tw-max-w-7xl tw-mx-auto"
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="tw-h-10" />

            <OptionalTools
                className="tw-max-w-7xl tw-mx-auto"
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="tw-h-10" />

            <ThirdPartyLinks
                className="tw-max-w-7xl tw-mx-auto"
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="tw-h-10" />

            <UserComments
                className="tw-max-w-7xl tw-mx-auto"
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="tw-h-10" />

            <PersonalInformation
                className="tw-max-w-7xl tw-mx-auto"
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="tw-h-10" />

            <ErrorsInaccuracies
                className="tw-max-w-7xl tw-mx-auto"
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="tw-h-10" />

            <ProhibitedUses
                className="tw-max-w-7xl tw-mx-auto"
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="tw-h-10" />

            <DisclaimerOfWarranties
                className="tw-max-w-7xl tw-mx-auto"
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="tw-h-10" />

            <Indemnification
                className="tw-max-w-7xl tw-mx-auto"
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="tw-h-10" />

            <Severability
                className="tw-max-w-7xl tw-mx-auto"
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="tw-h-10" />

            <Termination
                className="tw-max-w-7xl tw-mx-auto"
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="tw-h-10" />

            <EntireAgreement
                className="tw-max-w-7xl tw-mx-auto"
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="tw-h-10" />

            <GoverningLaw
                className="tw-max-w-7xl tw-mx-auto"
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="tw-h-10" />

            <ChangesToTerms
                className="tw-max-w-7xl tw-mx-auto"
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="tw-h-10" />

            <ContactInformation
                className="tw-max-w-7xl tw-mx-auto"
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="tw-h-20" />
        </div>
    );
}

function HeroSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);

    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-aspect-square lg:tw-aspect-[1280/380] tw-grid tw-grid-rows-[minmax(0,1fr)_auto_5rem] lg:tw-grid-rows-[minmax(0,1fr)_auto_1rem_auto_minmax(0,1fr)] tw-text-center lg:tw-text-left tw-items-center",
                className,
            )}
        >
            <div className="tw-row-start-1 tw-col-start-1 tw-row-span-full">
                {isScreenSizeBelow == null ? null : (
                    <FullWidthImage
                        relativePath={isScreenSizeBelow ? "/livguard/terms-and-conditions/1/mobile-banner.jpg" : "/livguard/terms-and-conditions/1/desktop-banner.jpg"}
                        key={isScreenSizeBelow ? "/livguard/terms-and-conditions/1/mobile-banner.jpg" : "/livguard/terms-and-conditions/1/desktop-banner.jpg"}
                    />
                )}
            </div>
            <DefaultTextAnimation className="tw-row-start-2 tw-col-start-1">
                <div className="lg-text-banner lg-px-screen-edge-2 tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start">
                    {contentData.getContent("c20f3105-e059-40f5-8fbf-4f607adf08a9")}
                </div>
            </DefaultTextAnimation>
        </div>
    );
}

function TermsAndConditions({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div className="tw-grid tw-grid-flow-row tw-gap-[1rem]">
                <div
                    className="lg-text-headline lg-text-secondary-900"
                    dangerouslySetInnerHTML={{__html: contentData.getContent("8f4b0d15-62bd-48ed-afed-1ba749177561")}}
                ></div>
                <div className="tw-grid tw-grid-flow-row tw-gap-[1rem]">
                    <div className="lg-text-body  lg-text-secondary-900">{contentData.getContent("731f1433-da78-405f-8bc5-e7351f120dd5")}</div>

                    <div className="lg-text-body lg-text-secondary-900">{contentData.getContent("2122f878-eff2-4af4-8510-94913a31665f")}</div>

                    <div className="lg-text-body  lg-text-secondary-900">{contentData.getContent("7936f9fd-37f1-462c-b128-a35148d65307")}</div>

                    <div className="lg-text-body  lg-text-secondary-900">{contentData.getContent("f0a60c22-e48c-49ae-bbc5-c2fbaa8a4079")}</div>
                </div>
            </div>
        </div>
    );
}

function OnlineStorTerms({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div className="tw-grid tw-grid-flow-row tw-gap-[1rem]">
                <div
                    className="lg-text-title1 lg-text-secondary-900"
                    dangerouslySetInnerHTML={{__html: contentData.getContent("44121e27-31a6-4f36-b919-e897da7e6ff4")}}
                ></div>
                <div className="tw-pl-[3rem] lg-text-body lg-text-secondary-900">{contentData.getContent("b619e5ee-6ee2-4d16-910f-4c2889c941b0")}</div>
            </div>
        </div>
    );
}

function GeneralConditions({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div className="tw-grid tw-grid-flow-row tw-gap-[1rem]">
                <div
                    className="lg-text-title1 lg-text-secondary-900"
                    dangerouslySetInnerHTML={{__html: contentData.getContent("34f3e534-f601-41b4-b1a7-9e9a4d1e13e5")}}
                ></div>
                <div className="tw-pl-[3rem] lg-text-body lg-text-secondary-900">{contentData.getContent("086f8701-8e5a-47bc-89b0-185ff2986841")}</div>
            </div>
        </div>
    );
}

function AccuracyCompleteness({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div className="tw-grid tw-grid-flow-row tw-gap-[1rem]">
                <div
                    className="lg-text-title1 lg-text-secondary-900"
                    dangerouslySetInnerHTML={{__html: contentData.getContent("8cddd0be-4dd4-4bba-9ae0-69c0adee74b8")}}
                ></div>
                <div className="tw-pl-[3rem] lg-text-body lg-text-secondary-900">{contentData.getContent("f4d35c89-f150-4460-aca6-ce00dfb2d36a")}</div>
            </div>
        </div>
    );
}

function ModificationsPrices({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div className="tw-grid tw-grid-flow-row tw-gap-[1rem]">
                <div
                    className="lg-text-title1 lg-text-secondary-900"
                    dangerouslySetInnerHTML={{__html: contentData.getContent("c506fce1-6d8d-41a9-bfc2-7bb5cb2d954a")}}
                ></div>
                <div
                    className="tw-pl-[3rem] lg-text-body lg-text-secondary-900"
                    dangerouslySetInnerHTML={{__html: contentData.getContent("677f57ae-75b0-4440-aca1-3eb9cfe86407")}}
                ></div>
            </div>
        </div>
    );
}

function ProductOfServices({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div className="tw-grid tw-grid-flow-row tw-gap-[1rem]">
                <div
                    className="lg-text-title1 lg-text-secondary-900"
                    dangerouslySetInnerHTML={{__html: contentData.getContent("e8c5a78d-46cd-405e-b3f8-fa1903a15a55")}}
                ></div>
                <div
                    className="tw-pl-[3rem] lg-text-body lg-text-secondary-900"
                    dangerouslySetInnerHTML={{__html: contentData.getContent("04db7675-e412-4294-bfd0-24d54520d02c")}}
                ></div>
            </div>
        </div>
    );
}

function AccuracyOfBilling({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div className="tw-grid tw-grid-flow-row tw-gap-[1rem]">
                <div
                    className="lg-text-title1 lg-text-secondary-900"
                    dangerouslySetInnerHTML={{__html: contentData.getContent("8eb8744c-b87e-4fee-a31e-cb5cb0c05720")}}
                ></div>
                <div className="tw-pl-[3rem] lg-text-body lg-text-secondary-900">{contentData.getContent("da28284e-6a67-4d6b-ab94-88264a236dae")}</div>
            </div>
        </div>
    );
}

function OptionalTools({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div className="tw-grid tw-grid-flow-row tw-gap-[1rem]">
                <div
                    className="lg-text-title1 lg-text-secondary-900"
                    dangerouslySetInnerHTML={{__html: contentData.getContent("a141932c-d082-4ea8-bd52-152d0172acff")}}
                ></div>
                <div className="tw-pl-[3rem] lg-text-body lg-text-secondary-900">{contentData.getContent("85802f96-057c-4bda-bbab-41bcaa744eb0")}</div>
            </div>
        </div>
    );
}

function ThirdPartyLinks({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div className="tw-grid tw-grid-flow-row tw-gap-[1rem]">
                <div
                    className="lg-text-title1 lg-text-secondary-900"
                    dangerouslySetInnerHTML={{__html: contentData.getContent("8ba6e093-1965-478a-bebb-2ce8a976a7e4")}}
                ></div>
                <div
                    className="tw-pl-[3rem] lg-text-body lg-text-secondary-900"
                    dangerouslySetInnerHTML={{__html: contentData.getContent("f4b935d3-198d-4799-9e63-bb9862c62409")}}
                ></div>
            </div>
        </div>
    );
}

function UserComments({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div className="tw-grid tw-grid-flow-row tw-gap-[1rem]">
                <div
                    className="lg-text-title1 lg-text-secondary-900"
                    dangerouslySetInnerHTML={{__html: contentData.getContent("507846b5-9418-4892-b2b5-edff14a15c51")}}
                ></div>
                <div className="tw-pl-[3rem] lg-text-body lg-text-secondary-900">{contentData.getContent("1abda71d-9e0b-49d4-9966-49df5769e93e")}</div>
            </div>
        </div>
    );
}

function PersonalInformation({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div className="tw-grid tw-grid-flow-row tw-gap-[1rem]">
                <div
                    className="lg-text-title1 lg-text-secondary-900"
                    dangerouslySetInnerHTML={{__html: contentData.getContent("ef253e42-d84f-44bf-9516-43ea3810563c")}}
                ></div>
                <div className="tw-pl-[3rem] lg-text-body lg-text-secondary-900">{contentData.getContent("e917e6fd-9d24-4031-bee1-68e7b19877f8")}</div>
            </div>
        </div>
    );
}

function ErrorsInaccuracies({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div className="tw-grid tw-grid-flow-row tw-gap-[1rem]">
                <div
                    className="lg-text-title1 lg-text-secondary-900"
                    dangerouslySetInnerHTML={{__html: contentData.getContent("28f8227f-c1a6-4376-88e7-0bfff6a5a8db")}}
                ></div>
                <div
                    className="tw-pl-[3rem] lg-text-body lg-text-secondary-900"
                    dangerouslySetInnerHTML={{__html: contentData.getContent("db22183d-e38b-4d36-9dbd-1e2235e09ee2")}}
                ></div>
            </div>
        </div>
    );
}

function ProhibitedUses({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div className="tw-grid tw-grid-flow-row tw-gap-[1rem]">
                <div
                    className="lg-text-title1 lg-text-secondary-900"
                    dangerouslySetInnerHTML={{__html: contentData.getContent("a13e2f28-5049-4032-bb25-cb70035f7eb2")}}
                ></div>
                <div className="tw-pl-[3rem] lg-text-body lg-text-secondary-900">{contentData.getContent("bce2466f-c797-4faa-b6d1-1837739aa55d")}</div>
            </div>
        </div>
    );
}

function DisclaimerOfWarranties({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div className="tw-grid tw-grid-flow-row tw-gap-[1rem]">
                <div
                    className="lg-text-title1 lg-text-secondary-900"
                    dangerouslySetInnerHTML={{__html: contentData.getContent("b0f9c01f-a82d-45a7-8546-685567cd7591")}}
                ></div>
                <div className="tw-pl-[3rem] lg-text-body lg-text-secondary-900">{contentData.getContent("7dba2dc9-b153-4216-bbf6-d965332c0e12")}</div>
            </div>
        </div>
    );
}

function Indemnification({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div className="tw-grid tw-grid-flow-row tw-gap-[1rem]">
                <div
                    className="lg-text-title1 lg-text-secondary-900"
                    dangerouslySetInnerHTML={{__html: contentData.getContent("3b74dadf-3333-4c76-acbd-5c1ecd7deb7f")}}
                ></div>
                <div className="tw-pl-[3rem] lg-text-body lg-text-secondary-900">{contentData.getContent("e3304f79-e46e-4eef-aebb-f57b637f2b14")}</div>
            </div>
        </div>
    );
}

function Severability({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div className="tw-grid tw-grid-flow-row tw-gap-[1rem]">
                <div
                    className="lg-text-title1 lg-text-secondary-900"
                    dangerouslySetInnerHTML={{__html: contentData.getContent("a7084225-0803-48c7-b01a-a4afbf547313")}}
                ></div>
                <div className="tw-pl-[3rem] lg-text-body lg-text-secondary-900">{contentData.getContent("e9700119-8143-4956-81dc-fa03ff519f80")}</div>
            </div>
        </div>
    );
}

function Termination({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div className="tw-grid tw-grid-flow-row tw-gap-[1rem]">
                <div
                    className="lg-text-title1 lg-text-secondary-900"
                    dangerouslySetInnerHTML={{__html: contentData.getContent("5f5fc2cb-35c1-4f59-8974-5fcb014eb17f")}}
                ></div>
                <div
                    className="tw-pl-[3rem] lg-text-body lg-text-secondary-900"
                    dangerouslySetInnerHTML={{__html: contentData.getContent("9394bd5d-8e93-41b3-ac77-993ceb0ded94")}}
                ></div>
            </div>
        </div>
    );
}

function EntireAgreement({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div className="tw-grid tw-grid-flow-row tw-gap-[1rem]">
                <div
                    className="lg-text-title1 lg-text-secondary-900"
                    dangerouslySetInnerHTML={{__html: contentData.getContent("c484926d-4b74-49b7-a48c-6de59678fdf6")}}
                ></div>
                <div
                    className="tw-pl-[3rem] lg-text-body lg-text-secondary-900"
                    dangerouslySetInnerHTML={{__html: contentData.getContent("4519b623-bbc3-4576-a1b9-26c6254dd47e")}}
                ></div>
            </div>
        </div>
    );
}

function GoverningLaw({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div className="tw-grid tw-grid-flow-row tw-gap-[1rem]">
                <div
                    className="lg-text-title1 lg-text-secondary-900"
                    dangerouslySetInnerHTML={{__html: contentData.getContent("1af3f0bb-75d3-4d8f-8661-a03e8d9c569d")}}
                ></div>
                <div className="tw-pl-[3rem] lg-text-body lg-text-secondary-900">{contentData.getContent("c27d7e42-b4a3-4e93-8c2d-c7d12cd6010e")}</div>
            </div>
        </div>
    );
}

function ChangesToTerms({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div className="tw-grid tw-grid-flow-row tw-gap-[1rem]">
                <div
                    className="lg-text-title1 lg-text-secondary-900"
                    dangerouslySetInnerHTML={{__html: contentData.getContent("3f67f49f-92ab-434c-b9eb-8d4e9d75a115")}}
                ></div>
                <div
                    className="tw-pl-[3rem] lg-text-body lg-text-secondary-900"
                    dangerouslySetInnerHTML={{__html: contentData.getContent("34a39f63-6f7d-430d-9c6c-7eefe5e9bf33")}}
                ></div>
            </div>
        </div>
    );
}

function ContactInformation({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div className="tw-grid tw-grid-flow-row tw-gap-[1rem]">
                <div
                    className="lg-text-title1 lg-text-secondary-900"
                    dangerouslySetInnerHTML={{__html: contentData.getContent("508d2a70-f673-4119-8776-4405f6987780")}}
                ></div>
                <div className="tw-pl-[3rem] lg-text-body lg-text-secondary-900">{contentData.getContent("82ce1187-230a-4182-9090-a0a42cc54ef0")}</div>
            </div>
        </div>
    );
}
