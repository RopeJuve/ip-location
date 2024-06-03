import { useIPtracker } from "../../context/IPtracker"

const PopupComponent = ({ city, region, country}) => {
    const { flag } = useIPtracker();
  return (
    <div className="flex flex-col gap-4">
        <img className="rounded-lg h-[120px]" src={flag ? flag : ''} alt='flag' />
        <h2 className="font-semibold">{city}, {region}, {country.name.common}</h2>
    </div>
  )
}

export default PopupComponent