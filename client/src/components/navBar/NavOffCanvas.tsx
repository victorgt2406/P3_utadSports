import { useContext, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { Page } from "../../routes";
import { CONTEXT } from "../../utils/Context";
import { ICONS_BASIC, ICONS_PAGE } from "../../utils/Icons";
import useRouterContext from "../../utils/RouterContext";

function NavOffCambasItem({ handleClose, page }: { handleClose: () => void, page: Page }) {
    const { setPage, getText, page: contextPage } = useRouterContext(); //useContext(CONTEXT);
    // const { setPage, getText, page:contextPage } = getContext();
    const active = (page === contextPage);
    return (
        <div
            role="button"
            className={`my-4 d-flex flex-column justify-content-center align-items-center 
            text-capitalize nav-offcambas-item
            ${active ? "text-secondary" : ""}`}
            onClick={() => {
                setPage(page);
                handleClose();
            }}
        >
            <svg style={{ width: "40px", height: "40px" }} className="fs-3">{page==="news"?ICONS_BASIC.start:ICONS_PAGE[page]}</svg>
            <div>{page==="news"?getText().start:getText()[page]}</div>
        </div>
    );
}

export default function NavOffCanvas() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const pages: Page[] = ["news", "activities", "tournaments", "teams"];
    let items = pages.map((p) =>
        <NavOffCambasItem
            page={p}
            handleClose={handleClose}
            key={p}
        />
    );

    return (
        <div>
            <div className="nav-header-item" role="button" onClick={handleShow}>
                <i className="bi bi-list" style={{ fontSize: '3rem' }}></i>
            </div>
            <Offcanvas show={show} onHide={handleClose} className="bg-black text-white">
                <Offcanvas.Body>
                    <div className="d-flex flex-column justify-content-center mt-4">
                        {items}
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div>

    );
}