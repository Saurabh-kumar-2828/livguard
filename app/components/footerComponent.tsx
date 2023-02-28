import {Dialog, Transition} from "@headlessui/react";
import {ArrowRightCircleIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import {Form, Link, useFetcher} from "@remix-run/react";
import React, {useEffect, useState} from "react";
import {Facebook, Google, Instagram, Linkedin, Twitter, Youtube} from "react-bootstrap-icons";
import {toast} from "react-toastify";
import {Accordion} from "~/components/accordian";
import {FixedHeightImage} from "~/global-common-typescript/components/fixedHeightImage";
import {ImageCdnProvider} from "~/global-common-typescript/components/growthJockeyImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {emailIdValidationPattern} from "~/global-common-typescript/utilities/validationPatterns";
import {FormSubmissionSuccess} from "~/routes/dealer-for-inverters-and-batteries";
import {UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";

export function FooterComponent({
    userPreferences,
    utmParameters,
}: {
    userPreferences: UserPreferences;
    utmParameters: {
        [searchParameter: string]: string;
    };
}) {
    // const [openDisclosureTitle, setOpenDisclosureTitle] = useState<string | null>(null);

    const fetcher = useFetcher();
    const isSubscriptionSuccess = fetcher.data != null && fetcher.data.error == null;

    const [isSubscribeSuccessDialogeOpen, setIsSubscribeSuccessDialogeOpen] = useState(false);

    useEffect(() => {
        if (fetcher.data == null) {
            return;
        }

        if (fetcher.data.error != null) {
            toast.error(fetcher.data.error);
            return;
        }

        setIsSubscribeSuccessDialogeOpen(isSubscriptionSuccess);
    }, [fetcher.data]);

    const aboutUsAccordianList = [
        {
            title: `${getVernacularString("footerDisclosure1T1", userPreferences.language)}`,
            link: "https://livguard.com/contact.php",
            target: true,
        },
        {
            title: `${getVernacularString("footerDisclosure1T2", userPreferences.language)}`,
            link: "https://livguard.com/global-reach.php",
            target: true,
        },
        {
            title: `${getVernacularString("footerDisclosure1T3", userPreferences.language)}`,
            link: "https://livguard.com/blog.php",
            target: true,
        },
        {
            title: `${getVernacularString("footerDisclosure1T4", userPreferences.language)}`,
            link: "https://livguard.com/privacy-policy.php",
            target: true,
        },
        {
            title: `${getVernacularString("footerDisclosure1T5", userPreferences.language)}`,
            link: "https://livguard.com/sales-return-policy.php",
            target: true,
        },
        {
            title: `${getVernacularString("footerDisclosure1T6", userPreferences.language)}`,
            link: "https://livguard.com/terms-and-conditions.php",
            target: true,
        },
        {
            title: `${getVernacularString("footerDisclosure1T7", userPreferences.language)}`,
            link: "https://www.livguard.com/pdf/CSR%20Policy%20(LBPL).pdf",
            target: true,
        },
        {
            title: `${getVernacularString("footerDisclosure1T8", userPreferences.language)}`,
            link: "https://livguard.com/video-galery.php",
            target: true,
        },
        {
            title: `${getVernacularString("footerDisclosure1T9", userPreferences.language)}`,
            link: "https://livguard.com/sitemap.xml",
            target: true,
        },
    ];

    const invertersAndBatteriesAccordianList = [
        {
            title: `${getVernacularString("footerDisclosure2T1", userPreferences.language)}`,
            link: "https://www.livguard.com/category/inverter-for-home",
            target: false,
        },
        {
            title: `${getVernacularString("footerDisclosure2T2", userPreferences.language)}`,
            link: "https://www.livguard.com/category/inverter-batteries",
            target: false,
        },
        {
            title: `${getVernacularString("footerDisclosure2T3", userPreferences.language)}`,
            link: "https://www.livguard.com/high-capacity-inverters/",
            target: true,
        },
    ];

    const automativeBatteriesAccordianList = [
        {
            title: `${getVernacularString("footerDisclosure3T1", userPreferences.language)}`,
            link: "https://www.livguard.com/three-wheeler-batteries/",
            target: true,
        },
        {
            title: `${getVernacularString("footerDisclosure3T2", userPreferences.language)}`,
            link: "https://www.livguard.com/tractor-batteries/",
            target: true,
        },
        {
            title: `${getVernacularString("footerDisclosure3T3", userPreferences.language)}`,
            link: "https://www.livguard.com/bus-and-truck-batteries/",
            target: true,
        },
        {
            title: `${getVernacularString("footerDisclosure3T4", userPreferences.language)}`,
            link: "https://www.livguard.com/tow-wheeler-batteries/",
            target: true,
        },
        {
            title: `${getVernacularString("footerDisclosure3T5", userPreferences.language)}`,
            link: "https://www.livguard.com/erickshaw-batteries/",
            target: true,
        },
    ];

    const solarSolutionsAccordianList = [
        {
            title: `${getVernacularString("footerDisclosure4T1", userPreferences.language)}`,
            link: "https://www.livguard.com/solar-panels-for-home/",
            target: true,
        },
        {
            title: `${getVernacularString("footerDisclosure4T2", userPreferences.language)}`,
            link: "https://www.livguard.com/solar-grid-interactive-series-for-home/",
            target: true,
        },
        {
            title: `${getVernacularString("footerDisclosure4T3", userPreferences.language)}`,
            link: "https://www.livguard.com/solar-panels-and-inverters-for-home/",
            target: true,
        },
        {
            title: `${getVernacularString("footerDisclosure4T4", userPreferences.language)}`,
            link: "https://www.livguard.com/solar-management-unit-for-home/",
            target: true,
        },
        {
            title: `${getVernacularString("footerDisclosure4T5", userPreferences.language)}`,
            link: "https://www.livguard.com/solar-charge-controller-for-home/",
            target: true,
        },
        {
            title: `${getVernacularString("footerDisclosure4T6", userPreferences.language)}`,
            link: "https://www.livguard.com/solar-led-street-light/",
            target: true,
        },
        {
            title: `${getVernacularString("footerDisclosure4T7", userPreferences.language)}`,
            link: "https://www.livguard.com/solar-battery-for-home/",
            target: true,
        },
    ];

    const stabelizersAccordianList = [
        {
            title: `${getVernacularString("footerDisclosure5T1", userPreferences.language)}`,
            link: "https://www.livguard.com/stabilizer-for-AC-and-TV.php",
            target: true,
        },
    ];

    const howCanWehelpAccordianList = [
        {
            title: `${getVernacularString("footerDisclosure6T1", userPreferences.language)}`,
            link: "https://www.livguard.com/battery-finder.php",
            target: true,
        },
        {
            title: `${getVernacularString("footerDisclosure6T2", userPreferences.language)}`,
            link: "https://www.livguard.com/dealer-locator-for-invertors-and-batteries",
            target: false,
        },
        {
            title: `${getVernacularString("footerDisclosure6T3", userPreferences.language)}`,
            link: "https://www.livguard.com/bmhr.php",
            target: true,
        },
        {
            title: `${getVernacularString("footerDisclosure6T4", userPreferences.language)}`,
            link: "https://www.livguard.com/register-and-warranty-for-inverters.php",
            target: true,
        },
        {
            title: `${getVernacularString("footerDisclosure6T5", userPreferences.language)}`,
            link: "https://www.livguard.com/contact.php",
            target: true,
        },
    ];

    const investersAccordianList = [
        {
            title: `${getVernacularString("footerDisclosure7T1", userPreferences.language)}`,
            link: "https://files.growthjockey.com/livguard/files/LBPL_Notice of Secured creditors meeting dt 01.04.2023.pdf",
            target: true,
        },
        {
            title: `${getVernacularString("footerDisclosure7T2", userPreferences.language)}`,
            link: "https://files.growthjockey.com/livguard/files/LBPL_Notice of Unsecured creditors meeting dt 01.04.2023.pdf",
            target: true,
        },
        {
            title: `${getVernacularString("footerDisclosure7T3", userPreferences.language)}`,
            link: "https://files.growthjockey.com/livguard/files/LETPL_Notice of Secured creditors meeting dt 01.04.2023.pdf",
            target: true,
        },
    ];

    return (
        <div className="lg-px-screen-edge lg:tw-px-[72px] xl:tw-px-[120px]">
            <VerticalSpacer className="tw-h-8" />

            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-rows-[auto_2rem_auto_2rem_auto_2rem_auto] lg:tw-grid-cols-[17.5rem_repeat(4,minmax(0,1fr))] lg:tw-gap-x-8">
                <div className="lg:tw-row-start-3 lg:tw-col-start-1">
                    <Link
                        to="/"
                        className="tw-block dark:tw-hidden"
                    >
                        <object
                            data="https://files.growthjockey.com/livguard/icons/logo-light.svg"
                            className="tw-h-6 lg:tw-h-12 tw-pointer-events-none"
                        />
                    </Link>

                    <Link
                        to="/"
                        className="dark:tw-block tw-hidden"
                    >
                        <object
                            data="https://files.growthjockey.com/livguard/icons/logo-dark.svg"
                            className="tw-h-6 lg:tw-h-12 tw-pointer-events-none"
                        />
                    </Link>

                    <VerticalSpacer className="tw-h-4 lg:tw-hidden" />
                </div>

                <div className="lg:tw-row-start-1 lg:tw-col-start-1 lg:tw-col-span-full tw-flex tw-flex-col lg:tw-flex-row lg:tw-justify-between lg:tw-items-center">
                    <div className="lg-text-secondary-900 lg-text-headline lg:tw-max-w-lg">{getVernacularString("footerSubscribeT1", userPreferences.language)}</div>

                    <VerticalSpacer className="tw-h-3 lg:tw-hidden" />

                    <fetcher.Form
                        method="post"
                        action="/subscribe"
                        className="tw-w-full lg:tw-max-w-sm"
                    >
                        <div className="tw-relative">
                            <input
                                type="text"
                                name="emailId"
                                id="signup_email"
                                pattern={emailIdValidationPattern}
                                placeholder={getVernacularString("footerSubscribeT2", userPreferences.language)}
                                className="lg-bg-secondary-300 lg-text-secondary-900 tw-w-full tw-p-4 tw-rounded-full"
                            />

                            <input
                                name="utmParameters"
                                className="tw-hidden"
                                readOnly
                                value={JSON.stringify(utmParameters)}
                            />
                            <button
                                type="submit"
                                className="tw-absolute tw-top-2.5 tw-right-2.5 tw-bottom-0 tw-w-8 tw-h-8 tw-rounded-full lg-bg-secondary-100 tw-border"
                            >
                                <ChevronRightIcon className="tw-w-8 tw-h-8" />
                            </button>
                        </div>
                    </fetcher.Form>

                    <SubscribeSuccessDialog
                        userPreferences={userPreferences}
                        isSuccessDialogOpen={isSubscribeSuccessDialogeOpen}
                        setSuccessDialogOpen={setIsSubscribeSuccessDialogeOpen}
                    />

                    <VerticalSpacer className="tw-h-3 lg:tw-hidden" />
                </div>

                <Accordion
                    title={getVernacularString("footerDisclosure1H", userPreferences.language)}
                    panelItem={
                        <ItemBuilder
                            items={aboutUsAccordianList}
                            itemBuilder={(item, itemIndex) => (
                                <div
                                    className="lg-text-secondary-900"
                                    key={itemIndex}
                                >
                                    <Link
                                        to={item.link}
                                        target="_blank"
                                    >
                                        {item.title}
                                    </Link>
                                </div>
                            )}
                        />
                    }
                    className="lg:tw-hidden"
                    // openDisclosureTitle={openDisclosureTitle}
                    // setOpenDisclosureTitle={setOpenDisclosureTitle}
                />

                <VerticalSpacer className="tw-h-3 lg:tw-hidden" />

                <Accordion
                    title={getVernacularString("footerDisclosure2H", userPreferences.language)}
                    panelItem={
                        <ItemBuilder
                            items={invertersAndBatteriesAccordianList}
                            itemBuilder={(item, itemIndex) => (
                                <div
                                    className="lg-text-secondary-900"
                                    key={itemIndex}
                                >
                                    <div className="lg-text-secondary-900">
                                        <Link to={item.link}>{item.title}</Link>
                                    </div>
                                </div>
                            )}
                        />
                    }
                    className="lg:tw-hidden"
                    // openDisclosureTitle={openDisclosureTitle}
                    // setOpenDisclosureTitle={setOpenDisclosureTitle}
                />

                <VerticalSpacer className="tw-h-3 lg:tw-hidden" />
                <Accordion
                    title={getVernacularString("footerDisclosure3H", userPreferences.language)}
                    panelItem={
                        <ItemBuilder
                            items={automativeBatteriesAccordianList}
                            itemBuilder={(item, itemIndex) => (
                                <div
                                    className="lg-text-secondary-900"
                                    key={itemIndex}
                                >
                                    <div
                                        className="lg-text-secondary-900"
                                        key={itemIndex}
                                    >
                                        <Link to={item.link}>{item.title}</Link>
                                    </div>
                                </div>
                            )}
                        />
                    }
                    className="lg:tw-hidden"
                    // openDisclosureTitle={openDisclosureTitle}
                    // setOpenDisclosureTitle={setOpenDisclosureTitle}
                />

                <VerticalSpacer className="tw-h-3 lg:tw-hidden" />

                <Accordion
                    title={getVernacularString("footerDisclosure4H", userPreferences.language)}
                    panelItem={
                        <ItemBuilder
                            items={solarSolutionsAccordianList}
                            itemBuilder={(item, itemIndex) => (
                                <div
                                    className="lg-text-secondary-900"
                                    key={itemIndex}
                                >
                                    <div
                                        className="lg-text-secondary-900"
                                        key={itemIndex}
                                    >
                                        <Link to={item.link}>{item.title}</Link>
                                    </div>
                                </div>
                            )}
                        />
                    }
                    className="lg:tw-hidden"
                    // openDisclosureTitle={openDisclosureTitle}
                    // setOpenDisclosureTitle={setOpenDisclosureTitle}
                />

                <VerticalSpacer className="tw-h-3 lg:tw-hidden" />

                <Accordion
                    title={getVernacularString("footerDisclosure5H", userPreferences.language)}
                    panelItem={
                        <ItemBuilder
                            items={stabelizersAccordianList}
                            itemBuilder={(item, itemIndex) => (
                                <div
                                    className="lg-text-secondary-900"
                                    key={itemIndex}
                                >
                                    <div
                                        className="lg-text-secondary-900"
                                        key={itemIndex}
                                    >
                                        <Link to={item.link}>{item.title}</Link>
                                    </div>
                                </div>
                            )}
                        />
                    }
                    className="lg:tw-hidden"
                    // openDisclosureTitle={openDisclosureTitle}
                    // setOpenDisclosureTitle={setOpenDisclosureTitle}
                />

                <VerticalSpacer className="tw-h-3 lg:tw-hidden" />

                <Accordion
                    title={getVernacularString("footerDisclosure6H", userPreferences.language)}
                    panelItem={
                        <ItemBuilder
                            items={howCanWehelpAccordianList}
                            itemBuilder={(item, itemIndex) => (
                                <div
                                    className="lg-text-secondary-900"
                                    key={itemIndex}
                                >
                                    <div
                                        className="lg-text-secondary-900"
                                        key={itemIndex}
                                    >
                                        <Link to={item.link}>{item.title}</Link>
                                    </div>
                                </div>
                            )}
                        />
                    }
                    className="lg:tw-hidden"
                    // openDisclosureTitle={openDisclosureTitle}
                    // setOpenDisclosureTitle={setOpenDisclosureTitle}
                />

                <VerticalSpacer className="tw-h-3 lg:tw-hidden" />

                <Accordion
                    title={getVernacularString("footerDisclosure7H", userPreferences.language)}
                    panelItem={
                        <ItemBuilder
                            items={investersAccordianList}
                            itemBuilder={(item, itemIndex) => (
                                <div
                                    className="lg-text-secondary-900"
                                    key={itemIndex}
                                >
                                    <div
                                        className="lg-text-secondary-900"
                                        key={itemIndex}
                                    >
                                        <Link
                                            to={item.link}
                                            target="_blank"
                                        >
                                            {item.title}
                                        </Link>
                                    </div>
                                </div>
                            )}
                        />
                    }
                    className="lg:tw-hidden"
                    // openDisclosureTitle={openDisclosureTitle}
                    // setOpenDisclosureTitle={setOpenDisclosureTitle}
                />

                <VerticalSpacer className="tw-h-5 lg:tw-hidden" />

                <div className="lg:tw-row-start-5 lg:tw-col-start-1 tw-flex tw-flex-col lg-text-secondary-900 tw-px-10 lg:tw-px-0 tw-text-center lg:tw-text-left">
                    <div>{getVernacularString("footerContactT1", userPreferences.language)}</div>

                    <VerticalSpacer className="tw-h-4" />

                    <div>{getVernacularString("footerContactT2", userPreferences.language)}</div>

                    <VerticalSpacer className="tw-h-3" />

                    <div className="tw-underline">
                        <a href="tel:18001025551">+91-124-4987 400</a>
                    </div>

                    <VerticalSpacer className="tw-h-3" />

                    <div className="tw-underline">
                        <a href="mailto:marketing@livguard.com">marketing@livguard.com</a>
                    </div>

                    <VerticalSpacer className="tw-h-3" />

                    <div className="tw-underline">
                        <a href="mailto:export@sar-group.com">export@sar-group.com</a>
                    </div>

                    <VerticalSpacer className="tw-h-3" />

                    <div>{getVernacularString("footerContactT3", userPreferences.language)}</div>

                    <VerticalSpacer className="tw-h-3 tw-hidden lg:tw-block" />

                    <SocialMediaIcons className="tw-hidden lg:tw-flex" />
                </div>

                <VerticalSpacer className="tw-h-2 lg:tw-hidden" />

                <FooterSocialLogosAndCopyright
                    userPreferences={userPreferences}
                    className="lg:tw-hidden"
                />

                <div className="tw-hidden lg:tw-flex lg:tw-flex-col lg:tw-row-start-3 lg:tw-col-start-2 lg:tw-row-span-3">
                    <div className="lg-text-body-bold">{getVernacularString("footerDisclosure1H", userPreferences.language)}</div>
                    <VerticalSpacer className="tw-h-1" />
                    <ItemBuilder
                        items={aboutUsAccordianList}
                        itemBuilder={(item, itemIndex) => (
                            <div
                                className="lg-text-secondary-900"
                                key={itemIndex}
                            >
                                {item.target ? (
                                    <Link
                                        to={item.link}
                                        target="_blank"
                                    >
                                        {item.title}
                                    </Link>
                                ) : (
                                    <Link to={item.link}>{item.title}</Link>
                                )}

                                <VerticalSpacer className="tw-h-1" />
                            </div>
                        )}
                    />
                </div>

                <div className="tw-hidden lg:tw-flex lg:tw-flex-col lg:tw-justify-between lg:tw-row-start-3 lg:tw-col-start-3 lg:tw-row-span-3">
                    <div className="tw-flex tw-flex-col">
                        <div className="lg-text-body-bold">{getVernacularString("footerDisclosure2H", userPreferences.language)}</div>
                        <VerticalSpacer className="tw-h-1" />
                        <ItemBuilder
                            items={invertersAndBatteriesAccordianList}
                            itemBuilder={(item, itemIndex) => (
                                <div
                                    className="lg-text-secondary-900"
                                    key={itemIndex}
                                >
                                    {item.target ? (
                                        <Link
                                            to={item.link}
                                            target="_blank"
                                        >
                                            {item.title}
                                        </Link>
                                    ) : (
                                        <Link to={item.link}>{item.title}</Link>
                                    )}

                                    <VerticalSpacer className="tw-h-1" />
                                </div>
                            )}
                        />
                    </div>
                    <div className="tw-flex tw-flex-col">
                        <div className="lg-text-body-bold">{getVernacularString("footerDisclosure6H", userPreferences.language)}</div>
                        <VerticalSpacer className="tw-h-1" />
                        <ItemBuilder
                            items={howCanWehelpAccordianList}
                            itemBuilder={(item, itemIndex) => (
                                <div
                                    className="lg-text-secondary-900"
                                    key={itemIndex}
                                >
                                    {item.target ? (
                                        <Link
                                            to={item.link}
                                            target="_blank"
                                        >
                                            {item.title}
                                        </Link>
                                    ) : (
                                        <Link to={item.link}>{item.title}</Link>
                                    )}

                                    <VerticalSpacer className="tw-h-1" />
                                </div>
                            )}
                        />
                    </div>
                </div>

                <div className="tw-hidden lg:tw-flex lg:tw-flex-col lg:tw-justify-between lg:tw-row-start-3 lg:tw-col-start-4 lg:tw-row-span-3">
                    <div className="tw-flex tw-flex-col">
                        <div className="lg-text-body-bold">{getVernacularString("footerDisclosure3H", userPreferences.language)}</div>
                        <VerticalSpacer className="tw-h-1" />
                        <ItemBuilder
                            items={automativeBatteriesAccordianList}
                            itemBuilder={(item, itemIndex) => (
                                <div
                                    className="lg-text-secondary-900"
                                    key={itemIndex}
                                >
                                    {item.target ? (
                                        <Link
                                            to={item.link}
                                            target="_blank"
                                        >
                                            {item.title}
                                        </Link>
                                    ) : (
                                        <Link to={item.link}>{item.title}</Link>
                                    )}

                                    <VerticalSpacer className="tw-h-1" />
                                </div>
                            )}
                        />
                    </div>
                    <VerticalSpacer className="tw-h-8" />
                    <div className="tw-flex tw-flex-col">
                        <div className="lg-text-body-bold">{getVernacularString("footerDisclosure7H", userPreferences.language)}</div>
                        <VerticalSpacer className="tw-h-1" />
                        <ItemBuilder
                            items={investersAccordianList}
                            itemBuilder={(item, itemIndex) => (
                                <div
                                    className="lg-text-secondary-900"
                                    key={itemIndex}
                                >
                                    {item.target ? (
                                        <Link
                                            to={item.link}
                                            target="_blank"
                                        >
                                            {item.title}
                                        </Link>
                                    ) : (
                                        <Link to={item.link}>{item.title}</Link>
                                    )}

                                    <VerticalSpacer className="tw-h-1" />
                                </div>
                            )}
                        />
                    </div>
                </div>

                <div className="tw-hidden lg:tw-flex lg:tw-flex-col lg:tw-justify-between lg:tw-row-start-3 lg:tw-col-start-5 lg:tw-row-span-3">
                    <div className="tw-flex tw-flex-col">
                        <div className="lg-text-body-bold">{getVernacularString("footerDisclosure4H", userPreferences.language)}</div>
                        <VerticalSpacer className="tw-h-1" />
                        <ItemBuilder
                            items={solarSolutionsAccordianList}
                            itemBuilder={(item, itemIndex) => (
                                <div
                                    className="lg-text-secondary-900"
                                    key={itemIndex}
                                >
                                    {item.target ? (
                                        <Link
                                            to={item.link}
                                            target="_blank"
                                        >
                                            {item.title}
                                        </Link>
                                    ) : (
                                        <Link to={item.link}>{item.title}</Link>
                                    )}

                                    <VerticalSpacer className="tw-h-1" />
                                </div>
                            )}
                        />
                    </div>
                    <div className="tw-flex tw-flex-col">
                        <div className="lg-text-body-bold">{getVernacularString("footerDisclosure5H", userPreferences.language)}</div>
                        <VerticalSpacer className="tw-h-1" />
                        <ItemBuilder
                            items={stabelizersAccordianList}
                            itemBuilder={(item, itemIndex) => (
                                <div
                                    className="lg-text-secondary-900"
                                    key={itemIndex}
                                >
                                    {item.target ? (
                                        <Link
                                            to={item.link}
                                            target="_blank"
                                        >
                                            {item.title}
                                        </Link>
                                    ) : (
                                        <Link to={item.link}>{item.title}</Link>
                                    )}

                                    <VerticalSpacer className="tw-h-1" />
                                </div>
                            )}
                        />
                    </div>
                </div>

                <div className="lg:tw-row-start-7 lg:tw-col-start-1 lg:tw-col-span-full tw-hidden lg:tw-block lg-text-body tw-py-4 tw-text-left">
                    {getVernacularString("footerCopyWriteText", userPreferences.language)}
                </div>
            </div>
        </div>
    );
}

export function FooterSocialLogosAndCopyright({userPreferences, className}: {userPreferences: UserPreferences, className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge", className)}>
            <VerticalSpacer className="tw-h-3" />

            <SocialMediaIcons />

            <VerticalSpacer className="tw-h-6" />

            <div className="lg-text-body tw-text-center">{getVernacularString("footerCopyWriteText", userPreferences.language)}</div>

            <VerticalSpacer className="tw-h-6" />
        </div>
    );
}

export function SubscribeSuccessDialog({
    userPreferences,
    isSuccessDialogOpen,
    setSuccessDialogOpen,
}: {
    userPreferences: UserPreferences;
    isSuccessDialogOpen: boolean;
    setSuccessDialogOpen: React.Dispatch<boolean>;
}) {
    function tryToCloseSuccessDialogOpen() {
        setSuccessDialogOpen(false);
    }

    return (
        <Transition
            show={isSuccessDialogOpen}
            as={React.Fragment}
        >
            <Dialog
                as="div"
                className="tw-relative tw-z-50"
                onClose={tryToCloseSuccessDialogOpen}
            >
                <Transition.Child
                    as={React.Fragment}
                    enter="tw-ease-out tw-transition-all tw-duration-200"
                    enterFrom="tw-opacity-0"
                    enterTo="tw-opacity-100"
                    leave="tw-ease-in tw-transition-all tw-duration-200"
                    leaveFrom="tw-opacity-100"
                    leaveTo="tw-opacity-0"
                >
                    <div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-[55%] tw-backdrop-blur" />
                </Transition.Child>

                <Dialog.Panel className="lg-px-screen-edge tw-fixed tw-inset-0 tw-grid tw-grid-rows-1 tw-grid-cols-1 tw-justify-center tw-items-center">
                    <Transition.Child
                        as="div"
                        enter="tw-ease-out tw-transition-all tw-duration-200"
                        enterFrom="tw-opacity-0"
                        enterTo="tw-opacity-full"
                        leave="tw-ease-in tw-transition-all tw-duration-200"
                        leaveFrom="tw-opacity-full"
                        leaveTo="tw-opacity-0"
                    >
                        <FormSubmissionSuccess
                            userPreferences={userPreferences}
                            tryToCloseDialog={tryToCloseSuccessDialogOpen}
                        />
                    </Transition.Child>
                </Dialog.Panel>
            </Dialog>
        </Transition>
    );
}

export function SocialMediaIcons({className}: {className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-flex tw-justify-evenly lg:tw-justify-center lg:tw-gap-10", className)}>
            <a
                href="https://www.facebook.com/LivguardEnergy/"
                target="_blank"
                id="facebook_button"
            >
                <Facebook className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
            </a>
            <a
                href="https://twitter.com/LivguardEnergy"
                target="_blank"
                id="twitter_button"
            >
                <Twitter className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
            </a>
            <a
                href="https://www.instagram.com/livguardenergy/"
                target="_blank"
                id="instagram_button"
            >
                <Instagram className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
            </a>
            <a
                href="https://www.linkedin.com/company/livguard-energy/"
                target="_blank"
                id="linkedin_button"
            >
                <Linkedin className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
            </a>
            <a
                href="https://www.youtube.com/@LivguardEnergy"
                target="_blank"
                id="youtube_button"
            >
                <Youtube className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
            </a>
        </div>
    );
}
