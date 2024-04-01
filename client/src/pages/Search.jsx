import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { getListings } from "../api/listing.api";

const Search = () => {
    const navigate = useNavigate()
    const [sidebardata, setSidebardata] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'createdAt',
        order: 'desc'
    })
    const [listings,setListings] = useState([])
    const [loading, setLoading] = useState(false)
    const handleChange = (e) => {
        if (e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale') {
            setSidebardata({ ...sidebardata, type: e.target.id })
        }

        if (e.target.id === 'searchTerm') {
            setSidebardata({ ...sidebardata, searchTerm: e.target.value })
        }

        if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
            setSidebardata({ ...sidebardata, [e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false })
        }

        if(e.target.id === 'sort_order') {
            const sort = e.target.value.split('_')[0] || 'createdAt'
            const order = e.target.value.split('_')[1] || 'desc'

            setSidebardata({...sidebardata, sort, order})
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams()
        urlParams.set('searchTerm',sidebardata.searchTerm)
        urlParams.set('type',sidebardata.type)
        urlParams.set('parking',sidebardata.parking)
        urlParams.set('furnished',sidebardata.furnished)
        urlParams.set('offer',sidebardata.offer)
        urlParams.set('sort',sidebardata.sort)
        urlParams.set('order',sidebardata.order)

        const searchQuery = urlParams.toString()
        navigate(`/search?${searchQuery}`)

    };
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const searchTermFromUrl = urlParams.get('searchTerm') || ''
        const typeFromUrl = urlParams.get('type') || 'all'
        const parkingFromUrl = urlParams.get('parking') === 'true' ? true : false
        const furnishedFromUrl = urlParams.get('furnished') === 'true' ? true : false
        const offerFromUrl = urlParams.get('offer') === 'true' ? true : false
        const sortFromUrl = urlParams.get('sort') || 'createdAt'
        const orderFromUrl = urlParams.get('order') || 'desc'

        setSidebardata({
            searchTerm: searchTermFromUrl,
            type: typeFromUrl,
            parking: parkingFromUrl,
            furnished: furnishedFromUrl,
            offer: offerFromUrl,
            sort: sortFromUrl,
            order: orderFromUrl
        })

        const fetchListings = async () => {
            try {
                setLoading(true)
                const res = await getListings(urlParams.toString());
                setListings(res.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error(error.response.data.message);
            }
        }
        fetchListings();
    }, [location.search])
    return (
        <div className="flex flex-col md:flex-row">
            <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                    <div className="flex items-center gap-2">
                        <label
                            className="whitespace-nowrap font-semibold"
                        >
                            Search Term:
                        </label>
                        <input
                            type="text"
                            id="searchTerm"
                            placeholder="Search..."
                            className="border rounded-lg p-3 w-full"
                            onChange={handleChange}
                            value={sidebardata.searchTerm}
                        />
                    </div>
                    <div className="flex gap-2 flex-wrap items-center">
                        <label className="font-semibold">
                            Type:
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                id="all"
                                className="w-5"
                                onChange={handleChange}
                                checked={sidebardata.type === 'all'}
                            />
                            <span>Rent & Sale</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="rent" className="w-5"
                                onChange={handleChange}
                                checked={sidebardata.type === 'rent'}
                            />
                            <span>Rent</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="sale" className="w-5"
                                onChange={handleChange}
                                checked={sidebardata.type === 'sale'}
                            />
                            <span>Sale</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="offer" className="w-5"
                                onChange={handleChange}
                                checked={sidebardata.offer}
                            />
                            <span>Offer</span>
                        </div>
                        <div className="flex gap-2 flex-wrap items-center">
                            <label className="font-semibold">
                                Amenities:
                            </label>
                            <div className="flex gap-2">
                                <input type="checkbox" id="parking" className="w-5"
                                    onChange={handleChange}
                                    checked={sidebardata.parking}
                                />
                                <span>Parking</span>
                            </div>
                            <div className="flex gap-2">
                                <input type="checkbox" id="furnished" className="w-5"
                                    onChange={handleChange}
                                    checked={sidebardata.furnished}
                                />
                                <span>Furnished</span>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <label className="font-semibold">
                            Sort:
                        </label>
                        <select
                            onChange={handleChange}
                            defaultValue={'createdAt_desc'}
                            id="sort_order"
                            className="border rounded-lg p-3"
                        >
                            <option value='regularPrice_desc'>
                                Price high to low
                            </option>
                            <option value='regularPrice_asc'>
                                Price low to high
                            </option>
                            <option value='createdAt_desc'>
                                Latest
                            </option>
                            <option value='createdAt_asc'>
                                Oldest
                            </option>
                        </select>
                    </div>
                    <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">Search</button>
                </form>
            </div>
            <div>
                <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">Listing results:</h1>
            </div>
        </div>
    )
}

export default Search