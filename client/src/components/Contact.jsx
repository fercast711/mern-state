import { useEffect, useState } from "react"
import PropTypes from 'prop-types'
import { getUser } from "../api/user.api"
import { Link } from "react-router-dom";

const Contact = ({ listing }) => {
    const [landlord, setLandlord] = useState(null);
    const [message, setMessage] = useState('');
    const handleChange = (e) => {
        setMessage(e.target.value)
    }
    useEffect(() => {
        const fetchLandlord = async () => {
            try {
                const res = await getUser(listing.userRef)
                setLandlord(res.data)
            } catch (error) {
                console.error(error.response.data.message)
            }
        }
        fetchLandlord();
    }, [listing.userRef])
    return (
        <>
            {landlord && (
                <div className="flex flex-col gap-2">
                    <p>
                        Contact
                        <span className="font-semibold"> {landlord.username}</span> for
                        <span className="font-semibold"> {listing.name.toLowerCase()}</span>
                    </p>
                    <textarea
                        onChange={handleChange}
                        name="message"
                        value={message}
                        id="message"
                        rows={2}
                        placeholder="Enter you message here..."
                        className="w-full border p-3 rounded-lg"
                    >

                    </textarea>
                    <Link
                        to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
                        className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
                    >
                        Send Message
                    </Link>
                </div>
            )}
        </>
    )
}
Contact.propTypes = {
    listing: PropTypes.object.isRequired,
}
export default Contact