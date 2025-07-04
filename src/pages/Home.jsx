import React from 'react'
import HeroSection from '../components/HeroSection'
import FeaturedSection from '../components/FeaturedSection'
import TrailerSection from '../components/TrailerSection'
import MovieDetails from './MovieDetails'

const Home = () => {
  return (
    <>
      <HeroSection />
      <FeaturedSection/>
      <TrailerSection/>
    </>
  )
}

export default Home

