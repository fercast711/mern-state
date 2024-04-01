import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { MdLocationOn } from 'react-icons/md'

const ListingItem = ({ listing }) => {
    return (
        <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
            <Link to={`/listing/${listing._id}`}>
                <img
                    src={listing.imageUrls[0]}
                    alt='listing cover'
                    className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
                />
                <div className='p-3'>
                    <p className='text-lg font-semibold text-slate-700 truncate'>{listing.name}</p>
                    <div className='flex items-center gap-1'>
                        <MdLocationOn className='h-4 w-4 text-green-600 truncate' />
                        <p className='text-sm text-gray-600 truncate'>{listing.address}</p>
                    </div>
                    <p className='text-sm text-gray-600 line-clamp-3'>{listing.description}</p>
                    <p className='text-slate-500 mt-2 font-semibold'>$
                        {listing.offer ? 
                        listing.discountPrice.toLocaleString('en-US') : 
                        listing.regularPrice.toLocaleString('en-US')
                         }
                         {
                            listing.type==='rent' && ' / month'
                        }
                    </p>
                    <div className='text-slate-700 flex gap-4'>
                        <div className='font-bold text-xs'>
                            {listing.bedrooms}{listing.bedrooms > 1 ? ` beds`: ' bed'}
                        </div>
                        <div className='font-bold text-xs'>
                            {listing.bathrooms}{listing.bedrooms > 1 ? ` baths`: ' bath'}
                        </div>
                    </div>
                </div>
            </Link>

        </div>
    )
}

ListingItem.propTypes = {
    listing: PropTypes.object.isRequired
}
export default ListingItem