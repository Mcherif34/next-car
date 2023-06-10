"use client";
import {Fragment} from 'react'
import { CarProps } from '@/types';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { convertMPGtoKPH, generateCarImageUrl } from '@/utils';


interface CarDetailsProps { 
    isOpen: boolean;
    closeModal : () =>void;
    car: CarProps;
}

const CarDetails = ({isOpen, closeModal, car} : CarDetailsProps) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className="relative z-10" onClose={closeModal}>
          <Transition.Child 
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom="opacity-0"
            enterTo='opacity-100'
            leave="ease-in duration-200"
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
               <Transition.Child 
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom="opacity-0 scale-95"
            enterTo='opacity-100 scale-100'
            leave="ease-in duration-200"
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <Dialog.Panel className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white text-left shadow-xl p-6 transition-all flex flex-col gap-5">
              <button type='button' onClick={closeModal} className='absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full'>
                <Image src="/close.svg" alt='close' width={20} height={20} className='object-contain' />
              </button>
              <div className="flex-1 flex flex-col gap-3">
                <div className='relative w-full h-40 bg-pattern bg-cover bg-center rounded-lg'>
                  <Image src={generateCarImageUrl(car)} alt="car model" fill priority className='object-contain' />
                </div>

                <div className="flex gap-3">
                  <div className='flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg'>
                    <Image src={generateCarImageUrl(car, '29')} alt="car model" fill priority className='object-contain' />
                  </div>
                  <div className='flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg'>
                    <Image src={generateCarImageUrl(car, '33')} alt="car model" fill priority className='object-contain' />
                  </div>
                  <div className='flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg'>
                    <Image src={generateCarImageUrl(car, '13')} alt="car model" fill priority className='object-contain' />
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <h2 className="font-semibold text-xl capitalize">{car.make} {car.model}</h2>

                {/* <div className='mt-3 flex flex-wrap gap-4'>
                  {Object.entries(car).map(([key, value]) => (
                    <div className='flex justify-between gap-5 w-full text-right' key={key}>
                      <h4>{key}</h4>
                      <p>{value}</p>
                    </div>
                  ))}
                </div> */}

                <div className='mt-3 flex flex-wrap gap-4'>
                  
                    <div className='flex justify-between gap-5 w-full text-right'>
                      <h4 className='text-grey'>Marque</h4>
                      <p className='capitalize text-black-100 font-semibold'>{car.make}</p>
                    </div>
                    <div className='flex justify-between gap-5 w-full text-right'>
                      <h4 className='text-grey'>Modèle</h4>
                      <p className='capitalize text-black-100 font-semibold'>{car.model}</p>
                    </div>
                    <div className='flex justify-between gap-5 w-full text-right'>
                      <h4 className='text-grey'>Type de voiture</h4>
                      <p className='capitalize text-black-100 font-semibold'>{car.class}</p>
                    </div>
                    <div className='flex justify-between gap-5 w-full text-right'>
                      <h4 className='text-grey'>Année de fabrication</h4>
                      <p className='capitalize text-black-100 font-semibold'>{car.year}</p>
                    </div>
                    <div className='flex justify-between gap-5 w-full text-right'>
                      <h4 className='text-grey'>Cheveaux</h4>
                      <p className='capitalize text-black-100 font-semibold'>{car.cylinders}</p>
                    </div>
                    <div className='flex justify-between gap-5 w-full text-right'>
                      <h4 className='text-grey'>Consommation min en ville</h4>
                      <p className='capitalize text-black-100 font-semibold'>{car.city_mpg} MPG</p>
                    </div>
                    <div className='flex justify-between gap-5 w-full text-right'>
                      <h4 className='text-grey'>Transmission</h4>
                      <p className='capitalize text-black-100 font-semibold'>{car.transmission === 'a' ? 'Automatique' : 'Manuelle'}</p>
                    </div>
                    <div className='flex justify-between gap-5 w-full text-right'>
                      <h4 className='text-grey'>Type de carburant</h4>
                      <p className='capitalize text-black-100 font-semibold'>{car.fuel_type}</p>
                    </div>
                  
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
            </div>
          </div>
        </Dialog>

      </Transition>
    </>
  )
}

export default CarDetails