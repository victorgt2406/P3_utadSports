import { CSSProperties, useState } from 'react';
import { Placement } from 'react-bootstrap/esm/types';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

type MyProps = { body: JSX.Element, children: JSX.Element, placement?: Placement, style?: CSSProperties, show?: boolean }

export default function PopOver({ body, children, placement = "bottom", style = { width: "fit-content" }, show: inititalShow = false }: MyProps) {
    const popover = (
        <Popover id="popover-basic">
            {body}
        </Popover>
    );

    return (
        <div style={style}>
            <OverlayTrigger trigger="click" placement={placement} overlay={popover} rootClose={true}>
                {children}
            </OverlayTrigger>
        </div>
    );
}