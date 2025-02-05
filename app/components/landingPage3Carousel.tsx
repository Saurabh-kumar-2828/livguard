import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import Autoplay from "embla-carousel-autoplay";
import {useContext} from "react";
import {EmpowerYourHomeComponent} from "~/components/category/common";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import {DefaultImageAnimation} from "~/components/defaultImageAnimation";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {ContentProviderContext} from "~/contexts/contentProviderContext";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useEmblaCarouselWithIndex} from "~/hooks/useEmblaCarouselWithIndex";
import {UserPreferences} from "~/typeDefinitions";

export function LandingPage3Carousel({
    userPreferences,
    items,
}: {
    userPreferences: UserPreferences;
    items: Array<{imageRelativePath: string; titleTextContentPiece: string; bodyTextContentPiece: string}>;
}) {
    const {emblaRef, emblaApi, selectedIndex} = useEmblaCarouselWithIndex({loop: true}, 8000);
    const contentData = useContext(ContentProviderContext);

    return (
        <div
            className="tw-overflow-hidden tw-w-full"
            ref={emblaRef}
        >
            <div className="tw-grid tw-grid-flow-col tw-auto-cols-[100%]">
                <ItemBuilder
                    items={items}
                    itemBuilder={(item, itemIndex) => (
                        <div
                            className="lg-px-screen-edge"
                            key={itemIndex}
                        >
                            <div
                                className="tw-w-full tw-h-full tw-flex tw-flex-col tw-items-center tw-text-center"
                                key={itemIndex}
                            >
                                <DefaultElementAnimation>
                                    <div className="tw-row-start-2 lg:tw-col-start-1 tw-text-center lg:te-text-left">
                                        <DefaultTextAnimation>
                                            <div className="lg-text-title1" dangerouslySetInnerHTML={{__html:contentData.getContent(item.titleTextContentPiece)}} />
                                        </DefaultTextAnimation>

                                        <div className="tw-h-2" />

                                        <DefaultTextAnimation className="tw-flex-1">
                                            <div className="lg-text-body lg-text-secondary-700 tw-flex-1">{contentData.getContent(item.bodyTextContentPiece)}</div>
                                        </DefaultTextAnimation>
                                    </div>
                                    <VerticalSpacer className="tw-h-4" />
                                    <div className="tw-row-start-1 lg:tw-col-start-2 lg:tw-row-start-1">
                                        <DefaultImageAnimation className="tw-w-full">
                                            <FullWidthImage
                                                relativePath={item.imageRelativePath}
                                                className="tw-rounded-lg tw-w-full"
                                            />
                                        </DefaultImageAnimation>
                                    </div>
                                </DefaultElementAnimation>

                                <VerticalSpacer className="tw-h-4" />

                                <div className="tw-w-full tw-flex tw-flex-row tw-justify-between tw-items-center">
                                    <button
                                        type="button"
                                        className="tw-rounded-full tw-p-1 tw-border tw-border-solid tw-border-secondary-900-light dark:tw-border-secondary-900-dark"
                                        onClick={() => emblaApi?.scrollPrev()}
                                    >
                                        <ChevronLeftIcon className="tw-w-6 tw-h-6" />
                                    </button>

                                    <div className="tw-flex tw-flex-row tw-gap-x-2">
                                        <ItemBuilder
                                            items={items}
                                            itemBuilder={(_, scrollSnapIndex) => (
                                                <div
                                                    className={concatenateNonNullStringsWithSpaces(
                                                        "tw-w-2 tw-h-2 tw-rounded-full",
                                                        scrollSnapIndex == selectedIndex ? "lg-bg-secondary-900" : "lg-bg-secondary-300",
                                                    )}
                                                    key={scrollSnapIndex}
                                                />
                                            )}
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        className="tw-rounded-full tw-p-1 tw-border tw-border-solid tw-border-secondary-900-light dark:tw-border-secondary-900-dark"
                                        onClick={() => emblaApi?.scrollNext()}
                                    >
                                        <ChevronRightIcon className="tw-w-6 tw-h-6" />
                                    </button>
                                </div>
                            </div>

                            <VerticalSpacer className="tw-h-4" />
                        </div>
                    )}
                />
            </div>
        </div>
    );
}
