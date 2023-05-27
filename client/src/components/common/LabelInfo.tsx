import React from "react";

type MyProps = {
    children: React.ReactNode;
    label?: string;
    className?: string,
    labelClassName?: string
}
export default function ({ label = "", children, className, labelClassName }: MyProps) {
    return (
        <div className="p-2">
            <div className={`pb-3 ${labelClassName!==undefined?labelClassName:""}`}>{label}</div>
            <div className={`p-2 form-control ${className!==undefined?className:""}`}>
                {children}
            </div>
        </div>
    );
}