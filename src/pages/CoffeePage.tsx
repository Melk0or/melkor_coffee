import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import NotFound from '../components/NotFound/NotFound';

interface CoffeeUnit {
    title: string;
    url: string;
}

const CoffeePage: FC = () => {
    const { id } = useParams();
    const [coffee, setCoffee] = useState<CoffeeUnit>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOneCoffee = async () => {
            try {
                const getData = await axios.get(
                    `https://655352b85449cfda0f2e8000.mockapi.io/mainItems/${id}`
                );
                setCoffee((prevState) => getData.data);
            } catch (e) {
                navigate('/');
                alert('Error with fetching coffee - ' + e);
            }
        };
        fetchOneCoffee();

        // return () => {
        //     effect
        // };
    }, []);

    console.log(coffee, 'cof');
    if (!coffee) {
        return <NotFound />;
    }

    return (
        <main className="main coffee">
            <div className="container">
                <div className="mainInner coffeeInner">
                    <h1>{coffee.title}</h1>
                    <img src={coffee.url} alt="" />
                </div>
            </div>
        </main>
    );
};
export default CoffeePage;
