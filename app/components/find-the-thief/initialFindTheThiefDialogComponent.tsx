import {CoverImage} from "~/components/images/coverImage";
import {FullHeightImage} from "~/components/images/fullHeightImage";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";
import {UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";
import {Thief} from "./thiefComponent";
import {Link} from "@remix-run/react";

export function InitialFindTheThiefDialogComponent({userPreferences, buttonClickFunction}: {userPreferences: UserPreferences; buttonClickFunction: React.MouseEventHandler<HTMLButtonElement>}) {
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);

    return (
        <div className="tw-rounded-lg tw-h-full lg:tw-max-w-4xl tw-grid tw-place-self-center tw-items-center tw-justify-center tw-grid-rows-[auto_auto] lg:tw-grid-rows-1 lg:tw-grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg-bg-secondary-100 tw-relative">
            <div className="tw-overflow-hidden tw-absolute tw-w-full tw-h-full tw-z-10 dark:tw-opacity-[30%]">
                <CoverImage
                    imageClassName="tw-rounded-lg"
                    relativePath="/livguard/find-the-thief/step-1-pattern.svg"
                />
            </div>
            <div className="max-lg:tw-rounded-t-lg lg:tw-rounded-l-lg tw-overflow-hidden tw-row-start-1 lg:tw-col-start-1 tw-grid tw-grid-flow-row tw-grid-rows-1 tw-h-full tw-z-20">
                {isScreenSizeBelow ? (
                    <FullWidthImage
                        className="tw-rounded-t-lg lg:tw-rounded-tl-lg"
                        relativePath="/livguard/find-the-thief/step-1-mobile.jpg"
                    />
                ) : (
                    <FullWidthImage relativePath="/livguard/find-the-thief/step-1-desktop.jpg" />
                )}
            </div>

            <div className="tw-rounded-lg tw-row-start-2 lg:tw-row-start-1 lg:tw-col-start-2 tw-grid tw-grid-flow-row tw-grid-rows-[auto_auto_auto] lg:tw-grid-rows-2 tw-px-4 tw-pt-4 lg:tw-px-8 lg:tw-pt-8 max-lg:tw-text-center tw-z-20">
                <div className="tw-row-start-1 tw-grid tw-pb-4 tw-grid-flow-row">
                    <div className="lg-text-headline !tw-text-secondary-900-light dark:!tw-text-secondary-900-dark">
                        {getVernacularString("58790af6-e242-4064-9f92-8c7af56524f9", userPreferences.language)}
                    </div>
                    <div
                        className="lg-text-title2 !tw-text-secondary-900-light dark:!tw-text-secondary-900-dark"
                        dangerouslySetInnerHTML={{__html: getVernacularString("474f66f2-b713-4581-85de-39cad89f813f", userPreferences.language)}}
                    />

                    <VerticalSpacer className="tw-h-6" />

                    <div
                        className="lg-text-body"
                        dangerouslySetInnerHTML={{__html: getVernacularString("a8794019-66aa-4fa3-bd6d-4376e703626e", userPreferences.language)}}
                    />
                </div>
                <div className="tw-row-start-2 tw-grid tw-content-start tw-place-items-center">
                    <div className="tw-flex">
                        <div
                            className="lg-text-body lg-card tw-p-6 tw-w-[65%] tw-place-self-start lg-bg-secondary-100"
                            dangerouslySetInnerHTML={{__html: getVernacularString("850e8c45-a6a4-428b-9e11-4acd93205160", userPreferences.language)}}
                        />
                        <div className="tw-relative tw-right-2">
                            <Thief
                                currentThiefLocation={1}
                                thiefShowLocation={1}
                                thiefClassName=""
                                direction="left"
                            />
                            <div className="tw-relative tw-left-[80%] tw-top-[40%] lg:tw-top-[60%]">
                                <div className="">
                                    <FullWidthImage relativePath="/livguard/find-the-thief/arrow.svg" />
                                </div>
                                <div
                                    className="lg-text-body tw-text-end tw-relative tw-left-4"
                                    dangerouslySetInnerHTML={{__html: getVernacularString("eb76fa52-9cc6-4ce5-b570-2bbd8f606dac", userPreferences.language)}}
                                />
                            </div>
                        </div>
                    </div>

                    <VerticalSpacer className="tw-h-4" />

                    <button
                        onClick={buttonClickFunction}
                        className="lg-cta-button max-lg:tw-place-self-center tw-w-fit lg:tw-px-14 lg:tw-py-4"
                    >
                        {getVernacularString("f3abeab1-a2c7-46c1-8111-72c3145fd5c7", userPreferences.language)}
                    </button>
                </div>
                <div className="tw-row-start-3 tw-grid">
                    <VerticalSpacer className="tw-h-2" />
                    <Link
                        to="/terms-and-conditions/social-media"
                        target="_blank"
                        rel="noopener noreferrer"
                        className=" tw-text-center lg-text-icon hover:lg-text-primary-500 tw-place-self-center"
                    >
                        {getVernacularString("5614a9cb-7935-49de-a887-d129b9bd27a4", userPreferences.language)}
                    </Link>
                </div>
            </div>
        </div>
    );
}