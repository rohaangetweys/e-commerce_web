import { FaSearch } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function Home() {
  const typeList: String[] = [
    "SALE 40% OFF",
    "Laptops",
    "PC & Computers",
    "Cell Phones",
    "Tablets",
    "Gaming & VR",
    "Networking",
    "Cameras",
    "Sounds",
    "Office",
    "Storage, USB",
    "Accessories",
    "Clearance"
  ];


  return (
    <div className="h-96 w-full bg-transparent text-black pt-[82px]">

      {/* search section */}
      <div className="w-full flex items-center px-8 h-[75px] bg-[#1ABA1A] rounded-xl justify-between">
        <div className="bg-white h-11 flex items-center rounded-full w-1/3 px-4">
          <div className="w-58 flex items-center">
            All Categories <MdKeyboardArrowDown className="ml-2 translate-y-1 inline-block mb-1" />
          </div>

          <input type="text" className="h-full w-full border-l px-4 outline-none" placeholder="Search any product..." />
          <FaSearch className="text-gray-500 text-xl ml-auto" />
        </div>

        <p className="text-white text-sm">FREE SHIPPING OVER $199</p>
        <p className="text-white text-sm">30 DAYS MONEY BACK</p>
        <p className="text-white text-sm">100% SECURE PAYMENT</p>
      </div>

      {/* section 1 */}
      <div className="w-full mt-4 h-[492px] flex items-center justify-between">
        <div className="py-5 px-14 rounded-xl w-1/4 bg-white">
          <h3 className="text-[#F1352B] text-sm font-bold">SALE 40% OFF</h3>
          {typeList.slice(1).map((type, index) => (
            <div key={index} className="mt-4">
              <p className="text-sm text-black hover:text-[#F1352B] cursor-pointer">{type}</p>
            </div>
          ))}
        </div>

        <div className="h-full w-1/2 bg-black"></div>

        <div></div>
      </div>

    </div>
  );
}
