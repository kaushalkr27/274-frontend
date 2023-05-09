import { MutatingDots } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import React from 'react';

export default function Loader() {
    const isLoading = useSelector((state) => state.isLoadingReducer.isLoading);

    return (
            <div className={`h-screen w-screen fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 ${isLoading ? "flex justify-center items-center backdrop-blur-sm" : "hidden"}`}>
                <MutatingDots
                    height="100"
                    width="100"
                    color= "#7C54D5" // "#7C54D5"
                    secondaryColor= "#7C54D5" // "#7C54D5" C29CC2
                    radius="12.5"
                    ariaLabel="mutating-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={isLoading}
                    className="absolute"
                />
            </div>
    );
}
