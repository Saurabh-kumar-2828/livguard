import {ToastContainer} from "react-toastify";
import {FooterComponent} from "~/components/footerComponent";
import {HeaderComponent} from "~/components/headerComponent";
import {UserPreferences} from "~/typeDefinitions";

export function PageScaffold({userPreferences, children, redirectTo, showMobileMenuIcon}: {userPreferences: UserPreferences; children: any; redirectTo: string; showMobileMenuIcon: boolean}) {
    return (
        <>
            {/* tw-grid tw-grid-rows-[auto_1fr_auto] tw-grid-flow-col tw-min-h-screen */}
            <div className="tw-flex tw-flex-col tw-items-stretch tw-min-h-screen">
                <HeaderComponent
                    userPreferences={userPreferences}
                    redirectTo={redirectTo}
                    showMobileMenuIcon={showMobileMenuIcon}
                />

                {children}
                <div className="tw-flex-grow" />

                <FooterComponent userPreferences={userPreferences} />
            </div>

            <ToastContainer
                position="top-right"
                autoClose={false}
                theme="dark"
            />
        </>
    );
}
