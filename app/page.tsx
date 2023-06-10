"use client";

import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from '@/components'
import { fuels, yearsOfProduction } from '@/constants';
import { fetchCars } from '@/utils'
import Image from 'next/image'
import { useEffect, useState } from 'react';

export default function Home() {
  const [allCars, setallCars] = useState([]);
  const [loading, setloading] = useState(false);

  const [manufacturer, setmanufacturer] = useState("");
  const [model, setModel] = useState("");

  const [fuel, setfuel] = useState("");
  const [year, setyear] = useState(new Date().getFullYear()-1);

  const [limit, setlimit] = useState(10);

  const getCars = async () => {
    setloading(true);
    try {
        const result = await fetchCars({
            manufacturer: manufacturer || '',
            model: model || '',
            fuel: fuel || '',
            limit: limit ,
            year: year
            });
            setallCars(result);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  }
  
  useEffect(() => {

    getCars();
  }, [fuel, year, limit, manufacturer, model])
  

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className='mt-12 padding-x padding-y max-width' id="discover">
        <div className="home__text-container">
          <h1 className='text-4xl font-extrabold'>Catalogue des voitures</h1>
          <p>Découvrez les voitures qui pourraient vous plaire</p>
        </div>

        <div className='home__filters'>
          <SearchBar setManufacturer={setmanufacturer} setModel={setModel} />

          <div className='home__filter-container'>
            <CustomFilter  title="Carburant" options={fuels} setFilter={setfuel} />
            <CustomFilter title="Année" options={yearsOfProduction} setFilter={setyear} />
          </div>
        </div>

        {allCars.length > 0 ? (
          <section>
            <div className='home__cars-wrapper'>
              {allCars?.map((car) => <CarCard  car={car} />)}
            </div>

            {loading && (
              <div className='mt-16 w-full flex-center'>
                <Image 
                  src="/loader.svg"
                  alt="loader"
                  width={50}
                  height={50}
                  className='object-contain'
                />
              </div>
            )}

            <ShowMore
              pageNumber={limit / 10} 
              isNext={limit  > allCars.length}
              setLimit={setlimit}
              />
          </section>
        ) : (
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>
              Oops, aucun resultats...
            </h2>
            <p>{allCars?.message}</p>
          </div>
        )

        }

      </div>
    </main>
  )
}
