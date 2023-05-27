import React from "react";
import { Page } from "../routes";
import BackTab from "../components/tabs/BackTab";
import NavBar from "../components/navBar";
import CreateTab from "../components/tabs/CreateTab";

type MyProps = {
    children: React.ReactNode;
    parentPage?: Page;
    page?: Page,
    info?: Page;
    filters?: string[];
    filter?: string;
    setFilter?: (filter: string) => void;
    create?: Page;
    container?:boolean;
}

export default function NavBarTemplate({ children, parentPage, page, info, filters, filter, setFilter, create, container }: MyProps) {
    const backComponent = (parentPage === undefined || page === undefined) ?
        (
            <></>
        )
        :
        (
            <div className="m-2 mt-3">
                <BackTab {...{ parentPage, page }} />
            </div>
        );
    const createComponent = (
        filters === undefined
        || filter === undefined
        || setFilter === undefined
        || create === undefined) ?
        (
            <></>
        ) : (
            <CreateTab {...{ filters, filter, setFilter, create }} />
        );

    container = (container === undefined)?true:container;

    return (
        <>
            <NavBar {...{ info }} />
            <div className={`mb-4 ${container?"container":""}`}>
                {createComponent}
                {backComponent}
                {children}
            </div>
        </>
    );
}