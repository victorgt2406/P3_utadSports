import React, { useState } from "react";

type MyProps = {
    pixels?: number;
    onChange?: (file:File)=>void,
    src?:string;
}


export default function GetIcon({ pixels = 152, onChange, src: source }: MyProps) {
    const [src, setSrc] = useState<string | undefined>(source);
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file: File = event.target.files![0];
        // console.log(file);
        const reader = new FileReader();
        var image = new Image();
        reader.onload = (event) => {
            image = new Image();
            image.onload = () => {
                const width = image.width;
                const height = image.height;
                // console.log(`Width: ${width}, Height: ${height}`);
                if(width === height){
                    setSrc(event.target!.result as string);
                    if(onChange){
                        onChange(file);
                    }
                }
                else{
                    alert("las imagenes tienen que ser cuadradas, NO rectangulares")
                }
            };
            image.src = event.target!.result as string;
            
        };
        reader.readAsDataURL(file);
    }

    const templateStyle: React.CSSProperties = {
        position: "relative",
        height: `${pixels}px`,
        width: `${pixels}px`,
        borderRadius: "100%",
        backgroundColor: "var(--bs-secondary)"
    };
    const buttonStyle: React.CSSProperties = {
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: `${pixels / 12}px`,
        top: `${pixels / 2}px`,
        right: "-1px",
        height: `${pixels / 2 + 2}px`,
        width: `${pixels + 2}px`,
        borderRadius: `0 0 ${pixels}px ${pixels}px`,
        backgroundColor: src===undefined?"var(--light-blue-opaque)":"rgba(255,255,255,0.5)",
    };

    const textStyle: React.CSSProperties = {
        marginTop: `-${pixels / 12}px`
    }

    const pictureStyle: React.CSSProperties = {
        borderRadius: "100%",
        width:"100%",
    }

    return (
        <div style={templateStyle}>
            {(src!==undefined)?<img style={pictureStyle}src={src}/>:<></>}
            <input
                type="file"
                id="file-upload"
                style={{ display: 'none' }}
                accept=".png, .jpg, .jpeg"
                onChange={handleFileUpload}
            />
            <div
                role="button"
                style={buttonStyle}
                className="shadow-sm"
                onClick={() => document.getElementById('file-upload')!.click()}
            >
                <span style={textStyle}>Cambiar de imagen</span>
            </div>
        </div>
    );
}