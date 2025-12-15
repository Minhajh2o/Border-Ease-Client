import { Link } from 'react-router';
import { Tooltip } from 'react-tooltip';
import { 
    HiOutlineClock, 
    HiOutlineCurrencyDollar, 
    HiOutlineCalendar,
    HiOutlineGlobeAlt,
    HiOutlineArrowRight
} from 'react-icons/hi';

const VisaCard = ({ visa }) => {
    const {
        _id,
        countryName,
        countryImage,
        visaType,
        processingTime,
        fee,
        validity,
        applicationMethod
    } = visa;

    return (
        <div className="card bg-base-100 border border-base-300/50 shadow-md card-hover overflow-hidden group">
            {/* Country Image */}
            <figure className="relative h-48 overflow-hidden">
                {countryImage ? (
                    <img 
                        src={countryImage} 
                        alt={countryName}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <HiOutlineGlobeAlt className="w-16 h-16 text-primary/40" />
                    </div>
                )}
                
                {/* Visa Type Badge */}
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-primary text-white shadow-lg">
                        {visaType}
                    </span>
                </div>

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </figure>

            {/* Card Body */}
            <div className="card-body p-5">
                {/* Country Name */}
                <h3 className="card-title text-lg font-semibold">
                    {countryName}
                </h3>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-3 mt-3">
                    <div 
                        className="flex items-center gap-2 text-sm text-base-content/70"
                        data-tooltip-id={`processing-${_id}`}
                        data-tooltip-content="Processing Time"
                    >
                        <HiOutlineClock className="w-4 h-4 text-primary shrink-0" />
                        <span className="truncate">{processingTime}</span>
                    </div>
                    <Tooltip id={`processing-${_id}`} place="top" />

                    <div 
                        className="flex items-center gap-2 text-sm text-base-content/70"
                        data-tooltip-id={`fee-${_id}`}
                        data-tooltip-content="Visa Fee"
                    >
                        <HiOutlineCurrencyDollar className="w-4 h-4 text-success shrink-0" />
                        <span className="truncate">${fee}</span>
                    </div>
                    <Tooltip id={`fee-${_id}`} place="top" />

                    <div 
                        className="flex items-center gap-2 text-sm text-base-content/70"
                        data-tooltip-id={`validity-${_id}`}
                        data-tooltip-content="Validity Period"
                    >
                        <HiOutlineCalendar className="w-4 h-4 text-secondary shrink-0" />
                        <span className="truncate">{validity}</span>
                    </div>
                    <Tooltip id={`validity-${_id}`} place="top" />

                    <div 
                        className="flex items-center gap-2 text-sm text-base-content/70"
                        data-tooltip-id={`method-${_id}`}
                        data-tooltip-content="Application Method"
                    >
                        <HiOutlineGlobeAlt className="w-4 h-4 text-accent shrink-0" />
                        <span className="truncate">{applicationMethod}</span>
                    </div>
                    <Tooltip id={`method-${_id}`} place="top" />
                </div>

                {/* Action Button */}
                <div className="card-actions mt-4">
                    <Link 
                        to={`/visa/${_id}`}
                        className="btn btn-primary btn-sm w-full gap-2 group/btn"
                    >
                        See Details
                        <HiOutlineArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default VisaCard;
