import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import withAuth from '@/utils/Auth';
import NumberCard from '@/components/NumberCard';
import fetcher from './api/request';
import { isLoadingFalse, isLoadingTrue, setToken } from '@/store';
import { successNotification, errorNotification } from '@/utils/Notification';
import { useSelector } from 'react-redux';
import { SET_IS_LOADING, SET_TOKEN } from '@/types';
import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import NavBar from '@/components/NavBar';

function Dashboard() {
    const token = useSelector((state) => state.isLoadingReducer.token);
    const [tab, setTab] = useState(1);
    const [topProducts, setTopProducts] = useState([]);
    const [topReorders, setTopReorders] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState('');
    const [selectedUserId, setSelectedUserId] = useState('');
    const [res, setRes] = useState(null);
    const [respo, setRespo] = useState('Please enter details and submit.');

    useEffect(() => {
        if (res == null) {
            setRespo('Please enter details and submit!');
        } else if (res.length == 0) {
            setRespo('User has never ordered the product!');
        } else {
            if (res[0].predicted_reordered == 1) {
                setRespo('User is likely to reorder this product!');
            } else {
                setRespo('User is not likely to reorder this product!');
            }
        }
    }, [res]);

    const dispatch = useDispatch();
    useEffect(() => {
        async function fetchData() {
            dispatch({ type: SET_IS_LOADING, payload: true });
            const response = await fetcher('/top-products', {
                method: 'GET',
                headers: {
                    Authorization: token,
                },
            });
            const responseForTopReorders = await fetcher('/reorders', {
                method: 'GET',
                headers: {
                    Authorization: token,
                },
            });
            const responseForAllProducts = await fetcher('/all-products', {
                method: 'GET',
                headers: {
                    Authorization: token,
                },
            });
            if (response.status == 200) {
                // successNotification(response.status + ' Login successful!');
                setTopProducts(response.data);
            } else {
                // errorNotification(response.status + ' ' + response.message);
            }
            if (responseForTopReorders.status == 200) {
                setTopReorders(responseForTopReorders.data);
            }
            if (responseForAllProducts.status == 200) {
                setAllProducts(responseForAllProducts.data);
            }
            dispatch({ type: SET_IS_LOADING, payload: false });
        }
        fetchData();
    }, []);

    const handleSubmit = async () => {
        dispatch({ type: SET_IS_LOADING, payload: true });
        const response = await fetcher(
            '/predict?user_id=' +
                selectedUserId +
                '&product_id=' +
                selectedProductId,
            {
                method: 'GET',
                headers: {
                    Authorization: token,
                },
            }
        );
        if (response.status == 200) {
            setRes(response.data);
        }
        dispatch({ type: SET_IS_LOADING, payload: false });
    };

    return (
        <div className="home-background h-screen w-screen">
            <div className="container">
                <NavBar />
                <div className="w-full flex justify-center items-center my-5">
                    <div className="shadow-lg flex w-1/2 justify-center items-center border-2 border-solid border-gray rounded-lg">
                        <div
                            onClick={() => setTab(1)}
                            className={`font-bold m-2 rounded-lg cursor-pointer w-1/2 px-10 py-4 text-center ${
                                tab == 1 ? 'bg-purple text-white' : ''
                            }`}
                        >
                            DASHBOARD
                        </div>
                        <div
                            onClick={() => setTab(2)}
                            className={`font-bold m-2 rounded-lg cursor-pointer w-1/2 px-10 py-4 text-center ${
                                tab == 2 ? 'bg-purple text-white' : ''
                            }`}
                        >
                            PREDICTIONS
                        </div>
                    </div>
                </div>
                {tab == 1 ? (
                    <>
                        <div className="flex justify-between items-center">
                            <NumberCard title={'Aisles'} number={134} />
                            <NumberCard title={'Departments'} number={21} />
                            <NumberCard title={'Products'} number={'49,688'} />
                            <NumberCard title={'Orders'} number={'3,421,083'} />
                        </div>
                        <div className="flex justify-between items-center">
                            <div
                                style={{ height: '400px' }}
                                className="mr-2 shadow-lg w-1/2 mt-10 flex flex-col justify-center items-center border-2 border-solid border-gray p-4 rounded-lg"
                            >
                                <div className="text-xl font-bold">
                                    Top Ordered Products
                                </div>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        width={500}
                                        height={300}
                                        data={topProducts}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey="product_name"
                                            textAnchor="end"
                                            sclaeToFit="true"
                                            verticalAnchor="start"
                                            angle="-25"
                                            interval={0}
                                        />
                                        <YAxis
                                            domain={['auto', 'auto']}
                                            dataKey="count"
                                        />
                                        <Tooltip />
                                        <Legend />
                                        <Bar
                                            dataKey="count"
                                            fill="#7C54D5"
                                            legendType="none"
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div
                                style={{ height: '400px' }}
                                className="ml-2 shadow-lg w-1/2 mt-10 flex flex-col justify-center items-center border-2 border-solid border-gray p-4 rounded-lg"
                            >
                                <div className="text-xl font-bold">
                                    Top Re-ordered Products
                                </div>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        width={500}
                                        height={300}
                                        data={topReorders}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey="product_name"
                                            textAnchor="end"
                                            sclaeToFit="true"
                                            verticalAnchor="start"
                                            angle="-25"
                                            interval={0}
                                        />
                                        <YAxis domain={[0.85, 0.95]} />
                                        {/* dataKey="count" */}
                                        <Tooltip />
                                        <Legend />
                                        <Bar
                                            dataKey="proportion_reordered"
                                            fill="#7C54D5"
                                            legendType="none"
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="h-full w-full flex justify-center items-center">
                            <div className="w-full">
                                <div className="py-2 w-1/3 mx-auto">
                                    <div className="text-gray-500 text-sm mb-1">
                                        User ID:
                                    </div>
                                    <div className="flex flex-col justify-center items-start">
                                        <input
                                            type="text"
                                            name="name"
                                            className="border border-gray rounded py-2 px-2 w-full outline-none text-sm shadow-md"
                                            placeholder="User ID (0 - 45000)"
                                            onChange={(e) =>
                                                setSelectedUserId(
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="py-2 w-1/3 mx-auto">
                                    <div className="text-gray-500 text-sm mb-1">
                                        Product:
                                    </div>
                                    <div className="flex flex-col justify-center items-start">
                                        <select
                                            name="cars"
                                            id="cars"
                                            onChange={(e) =>
                                                setSelectedProductId(
                                                    e.target.value
                                                )
                                            }
                                            className="border border-gray rounded py-2 px-2 w-full outline-none text-sm shadow-md"
                                        >
                                            <option disabled selected value>
                                                {' '}
                                                -- select an option --{' '}
                                            </option>
                                            <option value="17668">
                                                Unsweetened Chocolate Almond
                                                Breeze Almond Milk
                                            </option>
                                            <option value="248">
                                                Dried Sweetened Cranberries
                                            </option>
                                            {allProducts.map((item) => {
                                                return (
                                                    <option
                                                        key={item.product_id}
                                                        value={item.product_id}
                                                    >
                                                        {item.product_name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </div>

                                <div className="py-4 w-1/3 mx-auto">
                                    <button
                                        onClick={handleSubmit}
                                        className="bg-purple w-full py-2 rounded text-white font-medium shadow-md"
                                    >
                                        Submit
                                    </button>
                                </div>
                                <div className="mx-auto w-1/3 py-2 px-4 rounded shadow-md">
                                    {respo}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default withAuth(Dashboard);
