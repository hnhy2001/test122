'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import { postRequest } from '@/hook/apiClient';



type ChatWindowProps = {
    username: string | string[] | undefined;
    role: string | string[] | undefined;
};
const ChatWindow = ({ username, role }: ChatWindowProps) => {
    const pusher = new Pusher('9f6ce14174e6af981fb5', {
        cluster: 'ap1',
    });
    const [chat, setChat] = useState<{ username: string; message: string }[]>([]);
    const [message, setMessage] = useState("");
    useEffect(() => {
        let mounted = true;
        if (mounted) {
            const channel = pusher.subscribe("Trade4go");
            channel.bind("MessageSent", (data: any) => {
                const { message, username } = data;
                setChat((prev: { username: any; message: any }[]) => [
                    ...prev,
                    { username, message },
                ]);
            });
        }
        return () => {
            pusher.unsubscribe("Trade4go");
            mounted = false;
        };
    }, []);
    const sendMessage = async (e: any) => {
        e.preventDefault();
        postRequest('/chat/send-message', {
            "message": "This is lamnv. I'\''m creating a sending message to another person",
            "target_user": "EMP-LKD876",
            "user_role": "SELLER"
        })
            .then(response => {
                setMessage("");
            });
    };
    return (
        <div className="chat-window">
            <div className="chat-window__chat-container">
                <div className="chat-window__chat-container__messages">
                    {
                        JSON.stringify(chat)
                    }
                    {/* {chat.map((chat: any, id: any) => {
                        if (chat.username === username) {
                            return (
                                <div
                                    key={id}
                                    className="chat-window__message chat-window__message--right"
                                >
                                    <p>me: {chat.message}</p>
                                </div>
                            );
                        } else {
                            return (
                                <div
                                    key={id}
                                    className="chat-window__message chat-window__message--left"
                                >
                                    <p>
                                        {chat.username}: {chat.message}
                                    </p>
                                </div>
                            );
                        }
                    })} */}
                </div>
                <form className="chat-window__form" onSubmit={sendMessage}>
                    <input
                        className="chat-window__form__input"
                        type="text"
                        placeholder="Type your message here"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button className="chat-window__form__button">Send</button>
                </form>
            </div>
        </div>
    );
};
export default ChatWindow;
