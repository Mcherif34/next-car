"use client";
import Image from 'next/image';
import CustomButton from './CustomButton'

const Hero = () => {
    const handleScroll = () =>{}
  return (
    <div className='hero'>
        <div className='flex-1 pt-36 padding-x'>
            <h1 className='hero__title'>Trouvez, réservez et louez votre voiture !</h1>
            <p className='hero__subtitle'>Facilitez votre location de voiture avec notre processus de réservation simplifié et fluide.</p>

            <CustomButton 
                title="Découvrez notre sélection de voitures" 
                containerStyles="bg-primary-blue text-white rounded-full mt-10"
                handleClick={handleScroll}
            />
        </div>
        <div className='hero__image-container'>
            <div className='hero__image'>
                <Image src="/hero.png" alt="hero" fill className='object-contain' />
            </div>
            <div className="hero__image-overlay" />
        </div>
    </div>
  )
}

export default Hero