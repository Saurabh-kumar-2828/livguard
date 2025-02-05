import {Link} from "@remix-run/react";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {AccessoriesSubType, AutomotiveSubType, BatterySubType, ComboSubType, InverterSubType, ProductType} from "~/productData.types";
import {UserPreferences} from "~/typeDefinitions";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {getMetadataForImage} from "~/utilities";
import {ImageCdnProvider} from "~/common--type-definitions/typeDefinitions";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {useContext} from "react";
import {ContentProviderContext} from "~/contexts/contentProviderContext";

export type ProductCardTwoDetailsType = {
    slug: string;
    productType: ProductType;
    isBestSeller: boolean;
    imageRelativeUrl: string;
    productName: string;
    productPrice: string;
    specification1Icon: string;
    specification1: string;
    specification2Icon: string;
    specification2: string;
};

export function ProductCardTwoDetails({
    slug,
    productType,
    exploreProduct,
    userPreferences,
    isBestSeller,
    imageRelativeUrl,
    productName,
    productPrice,
    specification1,
    specification2,
    specification1Icon,
    specification2Icon,
}: {
    slug: string;
    productType: ProductType;
    exploreProduct?: boolean;
    userPreferences: UserPreferences;
    isBestSeller?: boolean;
    imageRelativeUrl: string;
    productName: string;
    productPrice: string;
    specification1: string;
    specification2: string;
    specification1Icon?: string;
    specification2Icon?: string;
}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <Link
            to={`/product/${slug}`}
            className="tw-w-full tw-h-full tw-grid tw-grid-cols-1 lg-card tw-rounded-lg"
        >
            {isBestSeller != null && isBestSeller === true ? (
                <div className="tw-row-start-1 tw-h-1rem lg-stabilizers-best-seller-gradient tw-rounded-tr-lg tw-place-self-end tw-text-xs tw-px-3 tw-py-1 lg:tw-px-4 tw-flex tw-flex-row tw-items-center !tw-text-secondary-900-dark">
                    <span>{contentData.getContent("14e0e286-5fd7-43aa-a6f3-5b3b9a0ec71f")}</span>
                </div>
            ) : (
                <VerticalSpacer className="tw-h-[1.5rem]" />
            )}

            <div className="tw-p-4 tw-grid tw-grid-flow-row">
                <FullWidthImage relativePath={imageRelativeUrl} />

                <div className="tw-w-full tw-text-center lg-text-body-bold lg-text-secondary-900">{productName}</div>
                <div className="tw-w-full tw-text-center lg-text-body-bold lg-text-secondary-900">{slug.toUpperCase()}</div>

                <VerticalSpacer className="tw-h-2" />

                <div className="tw-place-self-center tw-grid tw-grid-cols-[minmax(0,1fr)_auto_0.5rem_70%_minmax(0,1fr)] tw-items-center tw-w-full">
                    <img
                        className="tw-col-start-2 tw-invert dark:tw-invert-0"
                        src={getAbsolutePathForRelativePath(
                            getMetadataForImage(specification1Icon == null ? "/livguard/car-and-suv/4/capacity.svg" : specification1Icon).finalUrl,
                            ImageCdnProvider.Bunny,
                            null,
                            null,
                        )}
                    />
                    <span className="tw-col-start-4 tw-text-center lg-text-icon lg:lg-text-body lg:!lg-text-secondary-900">{specification1}</span>
                </div>

                <VerticalSpacer className="tw-h-2" />

                <div className="tw-place-self-center tw-grid tw-grid-cols-[minmax(0,1fr)_auto_0.5rem_70%_minmax(0,1fr)] tw-items-center tw-w-full">
                    <img
                        className="tw-col-start-2 tw-invert dark:tw-invert-0"
                        src={getAbsolutePathForRelativePath(
                            getMetadataForImage(specification2Icon == null ? "/livguard/car-and-suv/4/warranty.svg" : specification2Icon).finalUrl,
                            ImageCdnProvider.Bunny,
                            null,
                            null,
                        )}
                    />
                    <span className="tw-col-start-4 tw-text-center lg-text-icon lg:lg-text-body lg:!lg-text-secondary-900">{specification2}</span>
                </div>

                <VerticalSpacer className="tw-h-6" />

                <div className="tw-w-full tw-text-center lg-text-secondary-700">
                    {productPrice == null
                        ? contentData.getContent("ccfce5e6-08ac-44b9-84ad-ef7891d7661b")
                        : `${contentData.getContent("abce92ec-fd9a-4578-ab56-ddfd9fdafe72")}${productPrice}${contentData.getContent("0044b486-6eca-4e3a-abf0-102eede6e10c", userPreferences.language)}`}
                </div>

                <VerticalSpacer className="tw-h-4" />

                <button className="lg-cta-outline-button lg-cta-outline-button-transition tw-w-full tw-text-center tw-px-1 tw-text-primary-500-light dark:tw-text-secondary-900-dark">
                    {exploreProduct ? contentData.getContent("d4e9cca1-8968-4759-b83b-0e5b5354934e") : contentData.getContent("063dc56b-910e-4a48-acb8-8f52668a4c72")}
                </button>
            </div>
        </Link>
    );
}
