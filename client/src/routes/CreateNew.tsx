import { useState } from "react";
import NavBarTemplate from "../templates/NavBarTemplate";
import useRouterContext from "../utils/RouterContext";
import notify from "../utils/notify";
import axios from "axios";

export default function () {
    const context = useRouterContext();
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [imageInternet, setImageInternet] = useState("");
    const [imageFile, setImageFile] = useState<File | undefined>(undefined);
    const [image, setImage] = useState<string | null>(null);

    const handleCreate = async()=>{
        try{
            const res = await axios.post(`${context.apiUrl}/messages`,{
                type: "news",
                content: [{
                    lang: "es",
                    title,
                    content,
                    image
                }]

            }, {
                headers: {
                    Authorization: await context.token?.token,
                    "Content-Type": "application/json",
                },
            });
            console.log(res);
            notify("Created!!","new created", "The new was created succesfully");
        }
        catch(err){
            console.log(err);
            notify("ERROR","create new", "new could not be updated");
        }
    }

    return (
        <NavBarTemplate>
            <div className="d-flex flex-column mt-3">
                <div className="form-floating mb-3">
                    <input
                        className="form-control"
                        onChange={(event: React.ChangeEvent<any>) => {
                            setTitle(event.target.value);
                        }}
                        value={title}
                    />
                    <label htmlFor="floatingInput">Título</label>
                </div>

                <div className="d-flex justify-content-between mt-3 flex-wrap">
                    {/* image preview */}
                    <div className="col pe-3">
                        {image ? (
                            <div
                                className="d-flex justify-content-center"
                                style={{
                                    width: "100%",
                                    height: "200px",
                                }}
                            >
                                <img src={image} style={{ height: "100%" }} />
                            </div>
                        ) : (
                            <div
                                className="bg-secondary rounded"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                }}
                            ></div>
                        )}
                    </div>
                    {/* content */}
                    <div className="col">
                        <div className="form-floating">
                            <textarea
                                className="form-control"
                                style={{ height: "200px" }}
                                onChange={(event: React.ChangeEvent<any>) => {
                                    setContent(event.target.value);
                                }}
                                value={content}
                            ></textarea>
                            <label htmlFor="floatingTextarea">Contenido</label>
                        </div>
                    </div>
                    <div className="w-100"></div>
                    {/* image button */}
                    <div className="col d-flex justify-content-center align-items-center mt-2">
                        <div className="form-floating pe-2 col">
                            <input
                                type="text"
                                className="form-control"
                                onChange={(event: React.ChangeEvent<any>) => {
                                    const val = event.target.value;
                                    setImageInternet(val);
                                    if (val === "") {
                                        setImage(null);
                                    } else {
                                        setImage(val);
                                    }
                                }}
                                value={imageInternet}
                            />
                            <label htmlFor="floatingInput">Url de imagen</label>
                        </div>
                        <button
                            type="button"
                            className="btn btn-primary p-3 col-1"
                        >
                            <i className="bi bi-upload"></i>
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger p-3 col-1 ms-1"
                        >
                            <i className="bi bi-x-lg"></i>
                        </button>
                    </div>
                    {/* content data */}
                    <div className="col d-flex justify-content-end mt-2">
                        <div className="card">
                            <div className="card-body d-flex">
                                <div className="me-2 fw-light">
                                    number of characters:
                                </div>
                                <div className="fw-bold">{content.length}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center my-4">
                    <button type="button" className="btn btn-primary" onClick={handleCreate}>
                        Create new
                    </button>
                </div>
            </div>
            <div className="mt-3"></div>
        </NavBarTemplate>
    );
}
