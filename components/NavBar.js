import { useEffect, useState } from 'react';
import SignIn from './Modal/SignIn';
import SignUn from './Modal/SignUp';
import Circle from '@/assets/circle-crop.png';
import Image from 'next/image';
import getRequest from '../pages/api/request';
import { useSelector, useDispatch } from 'react-redux';
import { SET_TOKEN } from '@/types';

export default function NavBar() {
    const token = useSelector((state) => state.isLoadingReducer.token);
    const dispatch = useDispatch();

    const [signInModelOpen, setSignInModelOpen] = useState(false);
    const [signUpModelOpen, setSignUpModelOpen] = useState(false);

    const setSignInModelOpenTrue = () => {
        setSignInModelOpen(true);
    };

    const setSignInModelOpenFalse = () => {
        setSignInModelOpen(false);
    };

    const setSignUpModelOpenTrue = () => {
        setSignUpModelOpen(true);
    };

    const setSignUpModelOpenFalse = () => {
        setSignUpModelOpen(false);
    };

    const handleLogout = () => {
        dispatch({ type: SET_TOKEN, payload: '' });
    };

    return (
        <div className="sticky flex items-center justify-between h-16 px-8">
            <div className="flex items-center text-black font-bold text-xl">
                <Image src={Circle} alt="LOGO" width={40} className="mr-4" />{' '}
                Interactive
            </div>
            {token == '' ? (
                <div>
                    <button
                        className="mx-2 border-2 border-purple hover:bg-purple px-8 py-2 rounded-lg text-purple hover:text-white font-semibold"
                        onClick={setSignInModelOpenTrue}
                    >
                        Sign in
                    </button>
                    <button
                        className="mx-2 border-2 border-purple hover:bg-purple px-8 py-2 rounded-lg text-purple hover:text-white font-semibold"
                        onClick={setSignUpModelOpenTrue}
                    >
                        Sign up
                    </button>
                </div>
            ) : (
                <div>
                    <button
                        className="shadow-lg mx-2 border-2 border-purple hover:bg-purple px-8 py-2 rounded-lg text-purple hover:text-white font-semibold"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            )}

            <SignIn
                show={signInModelOpen}
                setSignInModelOpenFalse={setSignInModelOpenFalse}
            />
            <SignUn
                show={signUpModelOpen}
                setSignInModelOpenFalse={setSignUpModelOpenFalse}
            />
        </div>
    );
}
