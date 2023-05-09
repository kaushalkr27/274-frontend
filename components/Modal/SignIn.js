import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dialog } from '@headlessui/react';
import Circle from '@/assets/circle.png';
import Image from 'next/image';
import Load from '@/assets/load.gif';
import { isLoadingFalse, isLoadingTrue, setToken } from '@/store';
import fetcher from '@/pages/api/request';
import { successNotification, errorNotification } from '@/utils/Notification';
import { useRouter } from "next/router";
import { SET_IS_LOADING, SET_TOKEN} from '@/types';


export default function SignIn({ show, setSignInModelOpenFalse }) {
    const [isOpen, setIsOpen] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const Router = useRouter();

    useEffect(() => {
        setIsOpen(show);
    }, [show]);

    const closeModal = () => {
        setIsOpen(false);
        setSignInModelOpenFalse();
    };

    const handleSubmit = async () => {
        dispatch({ type: SET_IS_LOADING, payload: true });
        const response = await fetcher('/login', {
            method: 'POST',
            body: {
                email: email,
                password: password,
            },
        });
        if(response.status == 200){
            successNotification("Login successful!")
            dispatch({ type: SET_TOKEN, payload: response.token });
            localStorage.setItem("token", response.token);
            setIsOpen(false)
            Router.replace("/dashboard");
        } else {
            errorNotification(response.status + " " + response.message)
        }
        dispatch({ type: SET_IS_LOADING, payload: false });
    };

    return (
        <Dialog
            open={isOpen}
            onClose={() => closeModal()}
            className="relative z-40"
        >
            <div className="fixed inset-0 flex items-center justify-center p-4 bg-white bg-opacity-25">
                <Dialog.Panel className="mx-auto w-full max-w-4xl h-full max-h-[32rem]">
                    <div className="fixed p-8 flex items-center text-sm leading-3">
                        <Image src={Load} width={15} height={15} alt="GIF" />
                        <div className="ml-2">Live</div>
                    </div>
                    <div className="flex h-full rounded-xl shadow-2xl overflow-hidden">
                        <div className="p-4 w-1/2 h-full bg-white flex items-center justify-center">
                            <div className="w-full flex flex-col items-center justify-center">
                                <div className="text-gray-500 text-2xl">
                                    Welcome!
                                </div>
                                <div className="text-gray-500 mb-8">
                                    Please enter your details
                                </div>
                                <div className="py-2 w-3/4 mx-auto">
                                    <div className="text-gray-500 text-sm mb-1">
                                        Email:
                                    </div>
                                    <div className="flex flex-col justify-center items-start">
                                        <input
                                            type="text"
                                            name="name"
                                            className="border border-gray-200 rounded py-2 px-2 w-full outline-none text-sm"
                                            placeholder="Enter your email"
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="py-2 w-3/4 mx-auto">
                                    <div className="text-gray-500 text-sm mb-1">
                                        Password:
                                    </div>
                                    <div className="flex flex-col justify-center items-start">
                                        <input
                                            type="password"
                                            name="name"
                                            className="border border-gray-200 rounded py-2 px-2 w-full outline-none text-sm"
                                            placeholder="Enter your password"
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="py-2 w-3/4 flex items-center justify-between">
                                    <div></div>
                                    <div className="text-purple text-sm">
                                        Forgot password?
                                    </div>
                                </div>
                                <div className="py-2 w-3/4">
                                    <button
                                        onClick={handleSubmit}
                                        className="bg-purple w-full py-2 rounded text-white font-medium"
                                    >
                                        Sign In
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 w-1/2 h-full bg-something flex items-center justify-center">
                            <Image
                                src={Circle}
                                alt="Circle"
                                width={250}
                                height={250}
                            />
                        </div>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}
