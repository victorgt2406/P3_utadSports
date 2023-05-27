import { type } from "os";

type ItemRowProps = {
    left: JSX.Element;
    right: JSX.Element;
    white: boolean;
    leftCol?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    onClick?: () => void;
}

export default function ItemRow({ left, right, white, leftCol, onClick }: ItemRowProps) {
    const className: string = white ? "" : "bg-light-blue";
    return (
        <div
            role={onClick === undefined ? "complementary" : "button"}
            className={`${className} d-flex justify-content-between align-items-center flex-wrap p-4`}
            onClick={onClick === undefined ? () => { } : onClick}
        >
            <div className={`col-sm${leftCol !== undefined ? `-${leftCol}` : ""} col d-flex justify-content-start`}>{left}</div>
            <div className={`col-sm${leftCol !== undefined ? `-${12 - leftCol}` : ""} col d-flex justify-content-end`}>{right}</div>
        </div>
    );
}

export type { ItemRowProps };