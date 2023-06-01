import NavBarTemplate from "../templates/NavBarTemplate";
import { ICONS_BASIC, ICONS_NEWS } from "../utils/Icons";
import useRouterContext from "../utils/RouterContext";
import { useEffect, useState } from "react";
import axios from "axios";
import Message from "../models/Messages";

function BigNew({ className = "", ...message }: Message & { className?: string }) {
    const context = useRouterContext();
    const content = message.content[0];
    const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return (
        <div className={`d-flex flex-column ${className?className:""}`}>
            <div
                style={{
                    position: "relative",
                }}
            >
                <img src={content.image} className="rounded-md w-100" />
                <button
                    type="button"
                    className="btn btn-primary px-4"
                    style={{
                        position: "absolute",
                        bottom: "20px",
                        right: "30px",
                    }}
                >
                    ver más
                </button>
            </div>
            <div className="d-flex justify-content-between align-items-center mx-2 mt-2">
                <div className="col-9 d-flex justify-content-start align-items-center">
                    <svg className="icon-lg me-3">{ICONS_NEWS.info}</svg>
                    <div className="d-flex flex-column">
                        <span className="text-uppercase fw-bold fs-5 mb-2">
                            {content.title}
                        </span>
                        <span>{content.content}</span>
                    </div>
                </div>
                <div className="col-3 text-secondary d-flex flex-column align-items-end justify-content-center">
                    <span>
                        <svg className="icon-sm me-2">
                            {ICONS_BASIC.calendar}
                        </svg>
                        {new Date(message.createdAt!).toLocaleDateString(context.language === "en"?'en-US':"es-ES", dateOptions)}
                    </span>
                    <span>
                        <svg className="icon-sm me-2">
                            {ICONS_BASIC.location}
                        </svg>
                        U-tad
                    </span>
                </div>
            </div>
        </div>
    );
}

function New({ className = "", ...message }: Message & { className?: string }) {
    const context = useRouterContext();
    const content = message.content[0];
    const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return (
        <div className={`d-flex flex-column ${className}`}>
            <img src={content.image!} className="w-100 rounded-md" />
            <div className="d-flex justify-content-start align-items-center mt-2">
                <svg className="icon-md me-3">{ICONS_NEWS.info}</svg>
                <span className="text-uppercase fw-bold fs-5">
                    {content.title}
                </span>
            </div>
            <div className="mb-2 mt-1">{content.content}</div>
            <div className="d-flex justify-content-between alig-items-center mt-2">
                <div className="text-secondary d-flex flex-column align-items-start justify-content-center">
                    <span>
                        <svg className="icon-sm me-2">
                            {ICONS_BASIC.calendar}
                        </svg>
                        {new Date(message.createdAt!).toLocaleDateString(context.language === "en"?'en-US':"es-ES", dateOptions)}
                    </span>
                    <span>
                        <svg className="icon-sm me-2">
                            {ICONS_BASIC.location}
                        </svg>
                        U-tad
                    </span>
                </div>
                <button
                    type="button"
                    className="btn btn-primary px-4"
                    style={{
                        height: "fit-content",
                    }}
                >
                    ver más
                </button>
            </div>
        </div>
    );
}

export default function () {
    const { user, setPage, apiUrl } = useRouterContext();
    const [news, setNews] = useState<Message[]>([]);

    useEffect(() => {
        const getNews = async () => {
            try {
                const res = await axios.get(`${apiUrl}/messages/news`);
                console.log(res);
                setNews(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getNews();
    }, []);

    return (
        <NavBarTemplate>
            {user?.role === "admin" ? (
                <div className="d-flex justify-content-end my-3">
                    <button
                        className="btn btn-primary"
                        onClick={() => setPage("createNew")}
                    >
                        Create a new
                    </button>
                </div>
            ) : (
                <></>
            )}
            <div className="d-flex justify-content-center">
                {news.length>=1?<BigNew {...news[0]} className="col-sm-8 col" />:<></>}
            </div>
            <div className="my-3 d-flex justify-content-between flex-wrap">
                {/* <New className="col-sm col pe-4" />
                <New className="col-sm col ps-4" /> */}
                {news.map((value, index) => (
                    index!==0?<New className="col-sm col ps-4" key={value._id} {...value} />:<></>
                ))}
            </div>
        </NavBarTemplate>
    );
}
