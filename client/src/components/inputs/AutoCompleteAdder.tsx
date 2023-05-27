import AutoComplete from "./AutoComplete";

type PillProps = {
    value: string;
    handleDelete: (index: number) => void;
    index: number;
}

function Pill({ value, handleDelete, index }: PillProps) {
    return (
        <div className="bg-primary text-white px-3 py-1 me-2 mt-2 rounded">
            {value}
            <span
                role="button"
                className="ms-2"
                onClick={() => handleDelete(index)}
            ><i className="bi bi-x-lg"></i></span>
        </div>
    );
}

type MyProps = {
    margin?: 1 | 2 | 3 | 4;
    value: string;
    setValue: (value: string) => void;
    values: string[];
    setValues: (values: string[]) => void;
    array: string[];
    placeholder?: string;
    components?: JSX.Element[];
    select?: boolean;
    repeat?: boolean;
    filter?: boolean;
    onSelect?: (item:string)=>void;
}

export default function ({ margin = 3, value, setValue, values, setValues, array, components, select = true, repeat = false, placeholder = "value", filter, onSelect }: MyProps) {

    const handleClick = (value: string) => {
        if (((select && array.includes(value)) || (!select))
            &&
            ((!repeat && !values.includes(value)) || (repeat))) {
            setValues([...values, value]);
        }
    }

    const handleDelete = (index: number) => {
        const newValues = values.filter((val, i) => index !== i);
        setValues(newValues);
    }

    return (
        <div className="d-flex flex-column w-100">
            <div className={`w-100 d-flex justify-content-between ${margin === undefined ? "" : `mt-${margin}`}`}>
                <AutoComplete {...{
                    array,
                    placeholder,
                    value,
                    setValue,
                    className: "col me-2",
                    filter,
                    onSelect
                }} />
                <button
                    type="button"
                    className="btn btn-primary col-1"
                    style={{ width: "fit-content", height: "fit-content" }}
                    onClick={() => handleClick(value)}
                ><i className="bi bi-plus-lg"></i></button>
            </div>
            <div className={`w-100 d-flex justify-content-start align-items-center flex-wrap ${margin === undefined ? "" : `mb-${margin}`}`}>
                {values.map((value, index) => <Pill key={index} {...{ handleDelete, value, index }} />)}
            </div>
        </div>
    );
}