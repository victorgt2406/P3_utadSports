import { useEffect, useState } from "react"
import Tolltip from "../common/Tolltip";

type MyProps = {
    placeholder?: string,
    value: string,
    setValue: (value: string) => void,
    array: string[],
    components?: JSX.Element[],
    onSelect?: (item: string) => void,
    className?: string,
    select?: boolean,
    max?: number;
    filter?: boolean;
}

function AutoCompleteItem({ children, handleClick, selected }: { children: string, handleClick: (find: string) => void, selected: boolean }) {
    return (
        <li
            className={`list-group-item autocomplete-item${selected ? "-active" : ""}`}
            onClick={() => handleClick(children)}
        >
            {children}
        </li>
    );
}

export default function AutoComplete({ value, setValue, placeholder = "", max = 10, className = "", select = false, array, components = undefined, onSelect = (item) => { }, filter }: MyProps) {
    array = (array === undefined) ? [] : array;
    filter = (filter === undefined) ? false : filter;
    const itemsCustom = (components === undefined);

    const [items, setItems] = useState<string[]>(array);
    const [focus, setFocus] = useState<boolean>(false);
    const [selected, setSelected] = useState<number>(0);

    const loadItems = (value: string) => {
        const newItems = ((value === "") || !filter) ? array : array.filter((val) => val.toLowerCase().includes(value.toLowerCase()));
        setItems(newItems);
    }
    useEffect(() => {
        loadItems(value);
    }, [array])



    const handleOnChange = (value: string) => {
        setValue(value);
        loadItems(value);
    };

    const handleSelect = (item: string) => {
        onSelect(item);
    };

    const handleClick = (item: string) => {
        handleOnChange(item);
        setFocus(false);
        handleSelect(item);
    };

    // mover con las flechas del teclado
    const handleDown = () => {
        if (selected >= items.length - 1) {
            setSelected(0);
        }
        else {
            setSelected(selected + 1);
        }
    };

    const handleUp = () => {
        if (selected <= 0) {
            setSelected(items.length - 1);
        }
        else {
            setSelected(selected - 1);
        }
    };

    // enter presionado
    const handleEnter = () => {
        if (items.length >= 1) {
            const item = items[selected]
            handleOnChange(item);
            handleSelect(item);
        }
    }

    // el dato es correcto si es select
    let okay: boolean = select ? items.includes(value) || value == "" : true;

    // renderizo las respuestas
    const itemsComp = (items.slice(0, max).map((item, index) => (
        itemsCustom ? (
            <AutoCompleteItem
                key={index}
                handleClick={handleClick}
                selected={index == selected}
            >{item}
            </AutoCompleteItem>
        ) : (
            components[index]
        )
    )));

    return (
        <div className={`autocomplete d-flex flex-column ${className}`} style={{ position: "relative" }}>


            {/* input */}
            <input
                value={value}
                className={`form-control ${okay ? "" : "is-invalid"}`}
                type="text"
                placeholder={placeholder}
                onFocus={() => setFocus(true)}
                onBlur={() => setTimeout(setFocus, 200, false)}
                onChange={(event: React.ChangeEvent<any>) => {
                    handleOnChange(event.target.value);
                }}
                onKeyDown={(event) => {
                    if (event.code === "ArrowUp") {
                        handleUp();
                    }
                    else if (event.code === "ArrowDown") {
                        handleDown();
                    }
                    else if (event.code === "Enter") {
                        handleEnter();
                    }
                }}
            />


            {/* clear button */}
            <div style={{ position: "absolute", top: 7, right: 40 }}>
                <i role="button" className="bi bi-x-lg autocomplete-clear" onClick={() => {
                    handleOnChange("");
                }}></i>
            </div>



            {/* options */}
            <ul className={`autocomplete-items mt-2 p-2 list-group ${focus ? "" : "d-none"}`}
                style={{
                    position: "absolute",
                    width: "100%",
                    zIndex: "10",
                    top: "40px"
                }}>
                {
                    itemsComp.length >= 1 ? itemsComp :
                        <li className={`list-group-item ${select ? "list-group-item-danger" : "list-group-item-warning"}`}>
                            No results
                        </li>
                }
            </ul>
        </div>
    );
}