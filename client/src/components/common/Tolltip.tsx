import { OverlayTrigger, Tooltip as Tt } from "react-bootstrap";


export default function Tooltip({ msg, children, style = { width: "fit-content" } }: { msg: string, children: JSX.Element, style?: React.CSSProperties }) {
    return (
        <>
            <OverlayTrigger
                placement={"bottom"}
                overlay={
                    <Tt id={`tooltip-bottom`}>
                        {msg}
                    </Tt>
                }
            >
                <div style={style}>{children}</div>
            </OverlayTrigger>
        </>
    );
}