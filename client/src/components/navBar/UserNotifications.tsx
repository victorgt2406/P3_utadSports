import React, { useEffect, useState } from "react";
import PopOver from "../common/PopOver";
import axios from "axios";
import useRouterContext from "../../utils/RouterContext";
import Message from "../../models/Messages";

function MessageComponent({
    children,
    deleteMessage,
}: {
    children: React.ReactNode;
    deleteMessage: () => void;
}) {
    const context = useRouterContext();
    return (
        <div role="button" className="card p-3 my-2" onClick={deleteMessage}>
            {children}
        </div>
    );
}

export default function () {
    const [open, setOpen] = useState(false);
    const [myinterval, setMyinterval] = useState<NodeJS.Timer | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const context = useRouterContext();

    useEffect(() => {
        const getNotifications = async () => {
            try {
                const res = await axios.get(`${context.apiUrl}/messages`, {
                    headers: {
                        Authorization: context.token?.token,
                        "Content-Type": "application/json",
                    },
                });
                // console.log(res);
                setMessages(res.data);
            } catch (err) {
                console.log(err);
                setMessages([]);
            }
        };
        if (!myinterval) {
            getNotifications();
            setMyinterval(setInterval(getNotifications, 10000));
        }
    }, []);

    const deleteMessage = (id: string) => {
        axios.delete(`${context.apiUrl}/messages/${id}`, {
            headers: {
                Authorization: context.token?.token,
                "Content-Type": "application/json",
            },
        });
        setMessages(messages.filter((message)=>message._id === id));
    };

    return (
        <PopOver
            body={
                <div className="me-2 card p-1">
                    {messages.length >= 1 ? (
                        messages.map((message, index) => (
                            <MessageComponent
                                key={index}
                                deleteMessage={() => deleteMessage(message._id)}
                            >
                                {message.content[0].content}
                            </MessageComponent>
                        ))
                    ) : (
                        <div className="card p-3">No notifications</div>
                    )}
                </div>
            }
        >
            <div
                role="button"
                className="nav-header-item ms-2"
                onClick={() => setOpen(!open)}
            >
                <i className={`bi bi-bell-fill`}></i>
            </div>
        </PopOver>
    );
}
