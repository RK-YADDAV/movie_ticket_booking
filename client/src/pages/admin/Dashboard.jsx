import { ChartLineIcon, CircleDollarSignIcon, PlayCircleIcon, StarIcon, UserIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { dummyBookingData } from '../../assets/assets';
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import { dateFormat } from '../../lib/dateFormat';
import BlurCircle from '../../components/BlurCircle'; 
import { useAppContext } from '../../context/AppContext';


const Dashboard = () => {

  const {axios, getToken, user, image_base_url } = useAppContext()

  const currency = import.meta.env.VITE_CURRENCY 

  const [DashboardData, setDashboardData] = useState({
    totalBookings:0,
    totalRevenue: 0,
    activeShows:[],
    totalUser: 0
  });

  const [loading, setLoading] = useState(true);

  const DashboardCards = [
    {title:"Total Bookings", value: DashboardData.totalBookings || "0", icon: ChartLineIcon},
    {title:"Total Revenue", value:DashboardData.totalRevenue || "0", icon: CircleDollarSignIcon},
    {title:"Active Shows", value:(DashboardData.activeShows?.length || "0"), icon: PlayCircleIcon},
    {title:"Total Users", value:DashboardData.totalUser || "0", icon: UserIcon},
  ]

  const fetchDashboardData = async ()=>{
    try {
      const {data} = await axios.get("/api/admin/dashboard",{header: {
        Authorization: `Bearer ${await getToken()}`
      }})
      if(data.success){
        setDashboardData(data.dashboardData)
        setLoading(false)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
        toast.error("Error fetching dashboard data:",error)
    }
  };

  useEffect(() => {
    if(user){
      fetchDashboardData();
    }
  }, [user]);

  return !loading ? (
    <>
    <Title text1="Admin" text2="Dashboard"/>
    <div className='relative flex flex-wrap gap-4 mt-6'>
      <BlurCircle top="-100px" left="0" />
      <div className='flex flex-wrap gap-4 w-full'>
        {DashboardCards.map((card, index) => (
          <div key={index} className='flex items-center justify-between px-4 py-3 bg-primary/10 border border-primary/20 
          rounded-md max-w-50 w-full'>
            <div>
              <h1 className='text-sm'>{card.title}</h1>
              <p className='text-xl font-medium mt-1'>{card.value}</p>
            </div>
              <card.icon className="w-6 h-6"/>
          </div>
          ))}
      </div>
    </div>
    <p className='mt-10 text-lg font-medium'>Active Shows</p>
    <div className='relative flex flex-wrap gap-6 mt-4 max-w-5xl'>
      <BlurCircle top="100px" left="-10%" />
      {DashboardData.activeShows.map((show) => ( 
        <div key={show._id} className='w-55 rounded-lg overflow-hidden h-full pb-3 bg-primary/10 
        border border-primary/20 hover:-translate-y-1 transition duration-300'>
          <img src={image_base_url + show.movie.poster_path} alt='' className='h-60 w-full object-cover'/>
          <p className='font-medium p-2 truncate'>{show.movie.title}</p>
          <div className='flex items-center justify-between px-2'>
            <p className='text-lg font-medium'>{currency} {show.showPrice}</p>
            <p className='flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1'>
              <StarIcon className='w-4 h-4 text-primary fill-primary'/>
              {show.movie.vote_average.toFixed(1)}
            </p>
          </div>
          <p className='px-2 pt-2 text-sm text-gray-500'>{dateFormat(show.showDateTime)}</p>
        </div>
      ))}
    </div>
    </>
  ) : <Loading/>
}

export default Dashboard
