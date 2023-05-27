import React from "react";


export default function ({icon1, icon2, label=""}:{icon1:string, icon2:string, label?:React.ReactNode}){
    const width = "100"
    return (
        <div className=" w-100 d-flex justify-content-center align-items-center pb-5">
            <img className="pe-1" src={icon1} width={width} height={width}/>
            <img className="ps-1" src={icon2} width={width} height={width}/>
            <div className="ms-2">{label}</div>
        </div>
    );
}