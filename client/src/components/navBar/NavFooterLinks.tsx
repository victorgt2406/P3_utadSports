import { useContext } from "react";
import { CONTEXT } from "../../utils/Context";
import { Page } from "../../routes";
import News from "../../assets/icons/News.svg";
import NewsSelected from "../../assets/icons/NewsSelected.svg";
import Results from "../../assets/icons/Results.svg";
import ResultsSelected from "../../assets/icons/ResultsSelected.svg";
import Calendar from "../../assets/icons/Calendar.svg";
import CalendarSelected from "../../assets/icons/CalendarSelected.svg";
import OpenTeams from "../../assets/icons/OpenTeams.svg";
import OpenTeamsSelected from "../../assets/icons/OpenTeamsSelected.svg";
import useRouterContext from "../../utils/RouterContext";
import { ICONS_PAGE } from "../../utils/Icons";



function NavFooterItemImgIcon({ src, alt }: { src: string, alt: Page }) {
    return(
    <img
        src={src}
        alt={alt}
        style={{
            margin: "5px",
            width: "20px"
        }}
    />);
}

const icons: Partial<{ [key in Page]: string | JSX.Element }> = {
    // news: <NavFooterItemImgIcon src={News} alt={"news"} />,
    news: <span>{ICONS_PAGE["news"]}</span>,
    results: <span>{ICONS_PAGE["results"]}</span>,
    events: <span>{ICONS_PAGE["events"]}</span>,
    // openTeams: <NavFooterItemImgIcon src={OpenTeams} alt={"openTeams"} />
    openTeams: <span>{ICONS_PAGE["openTeams"]}</span>
}

{/* <i className="bi bi-newspaper text-primary"></i> */}

const iconsActive: Partial<{ [key in Page]: string | JSX.Element }> = {
    news: <span className="text-primary">{ICONS_PAGE["news"]}</span>,
    results: <span className="text-primary">{ICONS_PAGE["results"]}</span>,
    events: <span className="text-primary">{ICONS_PAGE["events"]}</span>,
    openTeams: <span className="text-primary">{ICONS_PAGE["openTeams"]}</span>
    // openTeams: <NavFooterItemImgIcon src={OpenTeamsSelected} alt={"openTeams"} />
}

function NavFooterItem({ page }: { page: Page }) {
    // const context = useContext(CONTEXT);
    const context = useRouterContext();
    // const context = getContext();
    const active = (context.page === page);
    const pageName = context.getText()[page];
    return (
        <li
            role="button"
            className={`col mx-1 nav-footer-item${active ? "-active" : ""} d-flex flex-column align-items-center justify-content-between`}
            onClick={() => {
                context.setPage(page);
                console.log(page);
            }}>
            <div className="fs-4">{active? iconsActive[page]:icons[page]}</div>
            <div 
            className="text-uppercase text-center text-wrap"
            style={{
                fontSize: "14px"
            }}
            >{pageName}</div>
        </li>
    );
}

export default function NavFooterLinks() {
    const pages: Page[] = ["news", "results", "events", "openTeams"];
    // const icons = [News, Results, Calendar, OpenTeams];
    // const iconsSelected = [NewsSelected, ResultsSelected, CalendarSelected, OpenTeamsSelected];
    let items = pages.map((p, i) => (
        <NavFooterItem
            page={p}
            key={p}
        />
    ));
    return (
        <ul className="nav justify-content-center">
            {items}
        </ul>
    );
}