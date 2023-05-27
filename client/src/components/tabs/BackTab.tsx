import { Page } from "../../routes"
import useRouterContext from "../../utils/RouterContext"

type MyProps = {
    parentPage: Page,
    page: Page
}

export default function ({ parentPage, page }: MyProps) {
    const context = useRouterContext();

    const handleClick = () => {
        context.setPage(parentPage);
    };

    return (
        <div className="text-uppercase d-flex align-items-center" style={{ fontSize: "30px" }}>
            <div
                role="button"
                onClick={handleClick}
                className="me-3 p-2 px-3 back-btn"
            >
                <i className="bi bi-arrow-left"></i>
            </div>
            <span style={{ fontSize: "20px", paddingBottom: "2px" }}>{context.getText()[page]}</span>
        </div>
    );
}