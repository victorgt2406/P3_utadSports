import { useState } from "react";
import NavBarTemplate from "../templates/NavBarTemplate";
import { ICONS_BASIC, ICONS_NEWS } from "../utils/Icons";

export default function () {
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [imageLink, setImageLink] = useState("");
    const [image, setImage] = useState<string | null>(null);

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
                    <label htmlFor="floatingInput">Title</label>
                </div>

                <div className="d-flex justify-content-between mt-3 flex-wrap">
                    {/* image preview */}
                    <div className="col pe-3">
                        {image ? (
                            <img src={image} className="col" />
                        ) : (
                            <div
                                className="bg-secondary rounded"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    // backgroundColor: "var(--bs-secondary)",
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
                            <label htmlFor="floatingTextarea">Content</label>
                        </div>
                    </div>
                    <div className="w-100"></div>
                    {/* image button */}
                    <div className="col d-flex justify-content-center align-items-center mt-2">
                        <div className="form-floating pe-2 col">
                            <input type="text" className="form-control" />
                            <label htmlFor="floatingInput">Image link</label>
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
                                <div className="me-2 fw-light">number of characters:</div>
                                <div className="fw-bold">{content.length}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center my-4">
                    <button type="button" className="btn btn-primary">
                        Create new <i className="bi bi-upload"></i>
                    </button>
                </div>
            </div>
            <div className="mt-3"></div>
        </NavBarTemplate>
    );
}
