type myProps = {
    value: string,
    setValue: (value: string) => void,
    placeholder?: string, type?: React.HTMLInputTypeAttribute,
    handleCheck: () => boolean,
    check: boolean,
    error?: string
}

export default function InputText({ value, setValue, type = "text", placeholder = "", handleCheck, check = false, error }: myProps) {
    const errorComponent = (error !== undefined && check && !handleCheck()) ? (
            <div className="alert alert-danger mt-2" role="alert">
                {error}
            </div>
        )
        :
        (
            <></>
        )

    return (
        <>
            <input value={value} type={type} className={`form-control ${check ? (handleCheck() ? "is-valid" : "is-invalid") : ""}`} placeholder={placeholder} onChange={(event) => {
                setValue(event.target.value);
            }} />
            {errorComponent}
        </>
    );
}