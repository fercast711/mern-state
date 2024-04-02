import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getListings } from '../api/listing.api'
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules"
import 'swiper/css/bundle';
import ListingItem from "../components/ListingItem";


export default function Home() {
  SwiperCore.use([Navigation])
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  console.log(offerListings)
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await getListings('offer=true&limit=4');
        setOfferListings(res.data);
        fetchRentListings();
      } catch (error) {
        console.error(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await getListings('type=rent&limit=4');
        setRentListings(res.data);
        fetchSaleListings();
      } catch (error) {
        console.error(error?.response?.data?.message);
      }
    };
    const fetchSaleListings = async () => {
      try {
        const res = await getListings('type=sale&limit=4');
        setSaleListings(res.data);
      } catch (error) {
        console.error(error?.response?.data?.message);
      }
    }
    fetchOfferListings();
  }, [])
  return (
    <div>
      {/* top */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-slate-500'>perfect</span> <br />place with ease
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          Fercas Estate is the best place to find your next perfect place to live.
          <br />
          We have wide range of properties for you to choose from.
        </div>
        <Link to={"/search"} className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'>
          Lets get started..
        </Link>
      </div>

      {/* swiper */}
      <Swiper navigation>

        {
          offerListings && offerListings.length > 0 && offerListings.map((offerListing) => (
            <SwiperSlide key={offerListing._id}>
              <div style={{ background: `url(${offerListing.imageUrls[0]}) center no-repeat`, backgroundSize: 'cover' }} className='h-[500px]'>

              </div>
            </SwiperSlide>
          ))
        }
      </Swiper>
      {/* listing results for offer, sale and rent */}

      <div className='max-w-screen-2xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {
          offerListings && offerListings.length > 0 && (
            <div className=''>
              <div className='my-3'>
                <h2 className='text-2xl font-semibold text-slate-600'>Recent Offers</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={`/search?offer=true`}>
                  Show more offers
                </Link>
              </div>
              <div className='flex flex-wrap gap-4'>
                {
                  offerListings.map((offer) => (
                    <ListingItem key={offer._id} listing={offer} />
                  ))
                }
              </div>
            </div>
          )
        }
        {
          rentListings && rentListings.length > 0 && (
            <div className=''>
              <div className='my-3'>
                <h2 className='text-2xl font-semibold text-slate-600'>Recent Rents</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={`/search?offer=true`}>
                  Show more rents
                </Link>
              </div>
              <div className='flex flex-wrap gap-4'>
                {
                  rentListings.map((rent) => (
                    <ListingItem key={rent._id} listing={rent} />
                  ))
                }
              </div>
            </div>
          )
        }
        {
          saleListings && saleListings.length > 0 && (
            <div className=''>
              <div className='my-3'>
                <h2 className='text-2xl font-semibold text-slate-600'>Recent sales</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={`/search?offer=true`}>
                  Show more sales
                </Link>
              </div>
              <div className='flex flex-wrap gap-4'>
                {
                  saleListings.map((sale) => (
                    <ListingItem key={sale._id} listing={sale} />
                  ))
                }
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}
