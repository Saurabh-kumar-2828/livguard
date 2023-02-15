import {ChevronDoubleDownIcon} from "@heroicons/react/20/solid";
import {LoaderFunction} from "@remix-run/node";
import {useState} from "react";
import {useLoaderData} from "react-router";
import {PageScaffold} from "~/components/pageScaffold";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {getUserPreferencesFromCookies} from "~/server/userPreferencesCookieHelper.server";
import {UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";
import {Facebook, Google, Instagram, Linkedin, Twitter, Youtube} from "react-bootstrap-icons";

type LoaderData = {
    userPreferences: UserPreferences;
};

export const loader: LoaderFunction = async ({request}) => {
    const userPreferences = await getUserPreferencesFromCookies(request);
    if (userPreferences instanceof Error) {
        throw userPreferences;
    }

    const loaderData: LoaderData = {
        userPreferences: userPreferences,
    };

    return loaderData;
};

export default function () {
    const {userPreferences} = useLoaderData() as LoaderData;

    return (
        <PageScaffold userPreferences={userPreferences}>
            <HomePage userPreferences={userPreferences} />
        </PageScaffold>
    );
}

function HomePage({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <>
            <HeroSection userPreferences={userPreferences} />

            <Section1 userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-6" />

            <WeAreOneOfAKind userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-6" />

            <PowerPlanner userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-6" />

            <TransformingLives userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-6" />

            <SolarSolutions userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-6" />

            <MeetOurLeadership userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-6" />

            <FAQs userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-6" />

            <DealerLocator userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-6" />

            <ShowerSomeLoveOnSocialHandles userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-6" />

            <PowerfulPurposePowerfulImpact userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-6" />

            <StickyBottomBar userPreferences={userPreferences} />
        </>
    );
}

function HeroSection({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div className="tw-h-[calc(100vh-var(--lg-header-height)-8.5rem-4.75rem)] tw-grid tw-grid-rows-[minmax(0,1fr)]">
            <img src="https://images.growthjockey.com/livguard/home/hero.jpg" className="tw-row-start-1 tw-col-start-1 tw-w-full tw-h-full lg-bg-secondary-500 tw-object-cover" />

            <div className="tw-row-start-1 tw-col-start-1 lg-px-screen-edge tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-center">
                <div className="lg-text-banner">{getVernacularString("homeS1T1", userPreferences.language)}</div>

                <VerticalSpacer className="tw-h-2" />

                <div className="lg-text-title1">{getVernacularString("homeS1T2", userPreferences.language)}</div>

                <VerticalSpacer className="tw-h-4" />

                <div className="lg-cta-button">{getVernacularString("homeS1T3", userPreferences.language)}</div>

                <VerticalSpacer className="tw-h-4" />
            </div>

            <div className="tw-row-start-1 tw-col-start-1 tw-flex tw-flex-col tw-justify-end tw-items-center">
                <ChevronDoubleDownIcon className="tw-w-12 tw-h-12 lg-text-primary-500" />
                <VerticalSpacer className="tw-h-6" />
            </div>
        </div>
    );
}

function StickyBottomBar({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div className="tw-sticky tw-bottom-0 lg-bg-secondary-300 tw-rounded-t-lg tw-grid tw-grid-cols-[2fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr_auto_2fr] tw-py-[0.8125rem]">
            <div className="tw-row-start-1 tw-col-start-2 tw-flex tw-flex-col tw-items-center tw-text-center">
                <div className="tw-w-8 tw-h-8 tw-rounded-full lg-bg-primary-500" />
                <div className="lg-text-icon">Something</div>
            </div>

            <div className="tw-row-start-1 tw-col-start-4 tw-flex tw-flex-col tw-items-center">
                <div className="tw-w-8 tw-h-8 tw-rounded-full lg-bg-primary-500" />
                <div className="lg-text-icon">Something</div>
            </div>

            <div className="tw-row-start-1 tw-col-start-6 tw-flex tw-flex-col tw-items-center">
                {/* <div className="tw-w-16 tw-h-16 tw-rounded-full lg-bg-primary-500" /> */}
                <div className="lg-text-icon">Something</div>
            </div>

            <div className="tw-row-start-1 tw-col-start-8 tw-flex tw-flex-col tw-items-center">
                <div className="tw-w-8 tw-h-8 tw-rounded-full lg-bg-primary-500" />
                <div className="lg-text-icon">Something</div>
            </div>

            <div className="tw-row-start-1 tw-col-start-10 tw-flex tw-flex-col tw-items-center">
                <div className="tw-w-8 tw-h-8 tw-rounded-full lg-bg-primary-500" />
                <div className="lg-text-icon">Something</div>
            </div>
        </div>
    );
}

function Section1({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div>
            <div className="tw-flex tw-flex-col tw-items-center tw-py-8 lg-text-headline">
                <div className="lg-text-highlighted">{getVernacularString("homeS2T1", userPreferences.language)}</div>
                <div>{getVernacularString("homeS2T2", userPreferences.language)}</div>
            </div>
            test
            <br />
            test
            <br />
            test
            <br />
            test
            <br />
            test
            <br />
        </div>
    );
}

export function WeAreOneOfAKind({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div className="lg-px-screen-edge">
            <div className="tw-flex tw-flex-col tw-bg-gradient-to-b tw-from-[#3A3A3A] tw-to-[#000000] tw-px-4 tw-py-6 tw-rounded-lg">
                <VerticalSpacer className="tw-h-4" />

                <div className="tw-flex tw-flex-col lg-text-headline tw-text-center">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS4H1T1", userPreferences.language)}} />
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS4H1T2", userPreferences.language)}} />

                    {/* <div>{getVernacularString("homeS5H1T2", userPreferences.language)}</div> */}
                </div>

                <VerticalSpacer className="tw-h-6" />

                <div className="lg-text-title2 tw-text-center">{getVernacularString("homeS4T2", userPreferences.language)}</div>

                <VerticalSpacer className="tw-h-6" />

                <div className="lg-text-body tw-text-center">{getVernacularString("homeS4T3", userPreferences.language)}</div>

                <VerticalSpacer className="tw-h-6" />

                <div className="tw-w-full tw-h-[300px] lg-bg-secondary-500"></div>
            </div>
        </div>
    );
}

export function PowerPlanner({userPreferences}: {userPreferences: UserPreferences}) {
    const [selectedPropertyType, setSelectedPropertyType] = useState<string | null>(null);

    return (
        <div className="lg-px-screen-edge">
            <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-center">
                <div className="tw-flex tw-flex-col lg-text-headline tw-text-center">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS5H1T1", userPreferences.language)}} />
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS5H1T2", userPreferences.language)}} />
                </div>

                <VerticalSpacer className="tw-h-4" />

                <div className="lg-text-bodyText">{getVernacularString("homeS5T2", userPreferences.language)}</div>

                <VerticalSpacer className="tw-h-4" />

                <div className="lg-text-title2 lg-bg-secondary-500 tw-w-full tw-h-[150px]"></div>

                <VerticalSpacer className="tw-h-4" />

                <div className="lg-text-title2">{getVernacularString("homeS5T3", userPreferences.language)}</div>

                <VerticalSpacer className="tw-h-4" />

                <div className="tw-flex tw-flex-col tw-gap-4">
                    <ItemBuilder
                        items={[
                            {
                                icon: "",
                                stepIndex: `${getVernacularString("homeS5Step1T1", userPreferences.language)}`,
                                stepContent: `${getVernacularString("homeS5Step1T2", userPreferences.language)}`,
                            },
                            {
                                icon: "",
                                stepIndex: `${getVernacularString("homeS5Step2T1", userPreferences.language)}`,
                                stepContent: `${getVernacularString("homeS5Step2T2", userPreferences.language)}`,
                            },
                            {
                                icon: "",
                                stepIndex: `${getVernacularString("homeS5Step3T1", userPreferences.language)}`,
                                stepContent: `${getVernacularString("homeS5Step3T2", userPreferences.language)}`,
                            },
                        ]}
                        itemBuilder={(item, itemIndex) => (
                            <div className="lg-bg-secondary-100 tw-rounded-lg tw-p-2 tw-grid tw-grid-cols-[auto,minmax(0,1fr)] tw-grid-rows-[auto,auto] tw-gap-x-2" key={itemIndex}>
                                <div className="tw-row-start-1 tw-col-start-1 tw-row-span-2">
                                    <div className="lg-bg-secondary-300 tw-h-10 tw-w-10 tw-rounded-full"></div>
                                </div>
                                <div className="tw-row-start-1 tw-col-start-2">
                                    <div className="lg-text-title2 tw-text-left">{item.stepIndex}</div>
                                </div>
                                <div className="tw-row-start-2 tw-col-start-2">
                                    <div className="lg-text-body tw-text-left">{item.stepContent}</div>
                                </div>
                            </div>
                        )}
                    />
                </div>

                <VerticalSpacer className="tw-h-4" />

                <div className="lg-text-title2 tw-text-center">{getVernacularString("homeS5T5P1", userPreferences.language)}</div>
                <div className="lg-text-body tw-text-center">{getVernacularString("homeS5T5P2", userPreferences.language)}</div>

                <VerticalSpacer className="tw-h-4" />

                <div className="tw-grid tw-grid-cols-[minmax(0,1fr),minmax(0,1fr),minmax(0,1fr)] tw-grid-roes-[auto,auto] tw-gap-2">
                    <ItemBuilder
                        items={[
                            {
                                icon: "",
                                content: "1 BHK",
                                value: "1_bhk",
                            },
                            {
                                icon: "",
                                content: "2 BHK",
                                value: "2_bhk",
                            },
                            {
                                icon: "",
                                content: "3 BHK",
                                value: "3_bhk",
                            },
                            {
                                icon: "",
                                content: "4 BHK",
                                value: "4_bhk",
                            },
                            {
                                icon: "",
                                content: "Villa",
                                value: "villa",
                            },
                            {
                                icon: "",
                                content: "Custom",
                                value: "custom",
                            },
                        ]}
                        itemBuilder={(item, itemIndex) => (
                            <div
                                className={concatenateNonNullStringsWithSpaces(
                                    "tw-rounded-md tw-flex tw-gap-2 tw-py-3 tw-px-2 hover:tw-cursor-pointer",
                                    `tw-row-start-${itemIndex / 3 + 1} tw-col-start-${(itemIndex % 3) + 1}`,
                                    item.value == selectedPropertyType ? "lg-bg-primary-500" : "lg-bg-secondary-500",
                                )}
                                key={itemIndex}
                                onClick={() => setSelectedPropertyType(item.value)}
                            >
                                <div className="lg-bg-secondary-700 tw-rounded-full tw-w-6 tw-h-6"></div>
                                <div className="lg-text-bodyText">{item.content}</div>
                            </div>
                        )}
                    />
                </div>

                <VerticalSpacer className="tw-h-4" />

                <div className="lg-cta-button">{getVernacularString("homeS5T6", userPreferences.language)}</div>
            </div>
        </div>
    );
}

export function TransformingLives({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div className="lg-px-screen-edge">
            <div className="tw-flex tw-flex-col">
                <div className="lg-text-headline tw-text-center">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS11H1T1", userPreferences.language)}} />
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS11H1T2", userPreferences.language)}} />
                </div>
            </div>
        </div>
    );
}

export function SolarSolutions({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div className="lg-px-screen-edge">
            <div className="tw-flex tw-flex-col lg-bg-secondary-100 tw-rounded-lg tw-justify-center tw-text-center lg-px-screen-edge">
                <VerticalSpacer className="tw-h-6" />

                <div className="lg-text-headline">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS7H1T1", userPreferences.language)}} />
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS7H1T2", userPreferences.language)}} />
                </div>

                <VerticalSpacer className="tw-h-4" />

                <div className="lg-text-body">{getVernacularString("homeS7T2", userPreferences.language)}</div>

                <VerticalSpacer className="tw-h-4" />

                <div className="lg-text-title2">{getVernacularString("homeS7T3", userPreferences.language)}</div>

                <VerticalSpacer className="tw-h-4" />

                <div className="lg-bg-secondary-500 tw-w-full tw-h-[400px] tw-rounded-lg"></div>

                <VerticalSpacer className="tw-h-4" />

                <div className="lg-cta-button">{getVernacularString("homeS7T4", userPreferences.language)}</div>

                <VerticalSpacer className="tw-h-6" />
            </div>
        </div>
    );
}

export function MeetOurLeadership({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div className="lg-px-screen-edge">
            <div className="tw-flex tw-flex-col">
                <VerticalSpacer className="tw-h-4" />

                <div className="lg-text-headline tw-text-center">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS8H1T1", userPreferences.language)}} />
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS8H1T2", userPreferences.language)}} />
                </div>

                <VerticalSpacer className="tw-h-8" />

                <div className="tw-relative tw-bg-gradient-to-l tw-from-[#F25F60] tw-to-[#EB2A2B] lg-px-screen-edge tw-rounded-lg">
                    <div className="tw-absolute tw-left-5 -tw-top-5">
                        <div className="tw-h-32 tw-w-32 lg-bg-secondary-500 tw-rounded-full"></div>
                    </div>

                    <div className="tw-flex tw-flex-col">
                        <VerticalSpacer className="tw-h-32" />

                        <div className="lg-text-headline">{getVernacularString("homeS8Slide1T1", userPreferences.language)}</div>

                        <VerticalSpacer className="tw-h-1" />

                        <div className="lg-text-title2">{getVernacularString("homeS8Slide1T2", userPreferences.language)}</div>

                        <VerticalSpacer className="tw-h-4" />

                        <div className="lg-text-body">{getVernacularString("homeS8Slide1T3", userPreferences.language)}</div>

                        <VerticalSpacer className="tw-h-6" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export function FAQs({userPreferences}: {userPreferences: UserPreferences}) {
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

                <div className="tw-w-full tw-h-[200px] lg-bg-secondary-500 tw-rounded-lg" />

                <VerticalSpacer className="tw-h-4" />

                <div className="lg-text-body tw-text-center">
                    <div>{getVernacularString("homeS9T3P1", userPreferences.language)}</div>
                    <div>{getVernacularString("homeS9T3P2", userPreferences.language)}</div>
                </div>
            </div>
        </div>
    );
}

export function DealerLocator({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div className="lg-px-screen-edge">
            <div className="tw-relative lg-bg-secondary-100 tw-rounded-lg tw-h-[350px]">
                <div className="tw-flex tw-flex-col tw-absolute tw-m-auto tw-top-0 tw-left-0 tw-right-0 tw-bottom-0 tw-justify-center tw-items-center">
                    <div className="lg-text-headline tw-text-center">
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS10H1T1", userPreferences.language)}} />
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS10H1T2", userPreferences.language)}} />
                    </div>

                    <VerticalSpacer className="tw-h-1" />

                    <div className="lg-text-title2">{getVernacularString("homeS10T2", userPreferences.language)}</div>

                    <VerticalSpacer className="tw-h-6" />

                    <div className="lg-cta-button">{getVernacularString("homeS10T3", userPreferences.language)}</div>
                </div>
            </div>
        </div>
    );
}

export function ShowerSomeLoveOnSocialHandles({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div className="lg-px-screen-edge">
            <div className="tw-flex tw-flex-col lg-bg-secondary-100 tw-rounded-lg tw-text-center lg-px-screen-edge">
                <VerticalSpacer className="tw-h-4" />

                <div className="lg-text-headline ">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS11H1T1", userPreferences.language)}} />
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS11H1T2", userPreferences.language)}} />
                </div>

                <VerticalSpacer className="tw-h-4" />

                <div className="tw-w-full tw-h-[200px] lg-bg-secondary-500 tw-rounded-lg" />

                <VerticalSpacer className="tw-h-4" />

                <div className="lg-text-body">{getVernacularString("homeS11T2", userPreferences.language)}</div>

                <VerticalSpacer className="tw-h-2" />

                <div className="tw-flex tw-justify-evenly">
                    <Facebook className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px]" />
                    <Twitter className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px]" />
                    <Instagram className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px]" />
                    <Linkedin className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px]" />
                    <Google className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px]" />
                    <Youtube className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px]" />
                </div>

                <VerticalSpacer className="tw-h-4" />
            </div>
        </div>
    );
}

export function PowerfulPurposePowerfulImpact({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div className="lg-px-screen-edge">
            <div className="tw-flex tw-flex-col lg-bg-secondary-100 tw-px-4 tw-py-5 tw-rounded-lg">
                <VerticalSpacer className="tw-h-6" />

                <div className="lg-text-headline">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS12H1T1", userPreferences.language)}} />
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS12H1T2", userPreferences.language)}} />
                </div>

                <VerticalSpacer className="tw-h-4" />

                <div className="lg-text-body">{getVernacularString("homeS12T2", userPreferences.language)}</div>

                <VerticalSpacer className="tw-h-4" />

                <ul className="tw-list-disc tw-ml-5">
                    <li>
                        <div className="lg-text-body">{getVernacularString("homeS12T3P1", userPreferences.language)}</div>
                    </li>
                    <li>
                        <div className="lg-text-body">{getVernacularString("homeS12T3P2", userPreferences.language)}</div>
                    </li>
                    <li>
                        <div className="lg-text-body">{getVernacularString("homeS12T3P3", userPreferences.language)}</div>
                    </li>
                    <li>
                        <div className="lg-text-body">{getVernacularString("homeS12T3P4", userPreferences.language)}</div>
                    </li>
                </ul>

                <VerticalSpacer className="tw-h-4" />

                <div className="lg-bg-secondary-500 tw-w-full tw-h-[200px] tw-rounded-lg"></div>
            </div>
        </div>
    );
}

export function dummy({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div className="lg-px-screen-edge">
            <div className="tw-flex tw-flex-col">
                <div className="lg-text-headline">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS11H1T1", userPreferences.language)}} />
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS11H1T2", userPreferences.language)}} />
                </div>
            </div>
        </div>
    );
}
