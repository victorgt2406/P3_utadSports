import { Page } from "../../routes";
import { ICONS_BASIC } from "../../utils/Icons";
import useRouterContext from "../../utils/RouterContext"

type MyProps = {
    filters: string[],
    filter: string,
    setFilter: (filter: string) => void,
    create: Page
}

export default function ({ filters, filter, setFilter, create }: MyProps) {
    const context = useRouterContext();

    const options = filters.map((option, index) => (
        <li className="m-2" key={`${option}_${index}`}>
            <div
                role="button"
                className="dropdown-item"
                onClick={()=>setFilter(option)}
            >
                {option}
            </div>
        </li>));

    const handleClick = () => {
        context.setPage(create);
    };

    return (
        <div className="d-flex justify-content-between align-items-center mb-3 mx-4">
            {/* left */}
            <div className="col d-flex justify-content-start">
                <div className="dropdown">
                    <button className="btn btn-light-blue d-flex align-items-center" type="button" data-bs-toggle="dropdown">
                        <span className="me-2">{filter}</span>
                        <svg style={{width:"30px", height:"30px"}}>{ICONS_BASIC.expand}</svg>
                    </button>
                    <ul className="dropdown-menu">
                        {options}
                    </ul>
                </div>
            </div>
            {/* right */}
            <div className="col d-flex justify-content-end align-items-center">
                <div role="button" onClick={handleClick} style={{ fontSize: "40px" }}>{ICONS_BASIC.add}</div>
            </div>
        </div>
    );
}