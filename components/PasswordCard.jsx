import Image from 'next/image';
import FacebookImg from '@/assets/facebook.png';

const PasswordCard = ({ password }) => {
  return (
    <div className="p-6 shadow-lg flex flex-col justify-center items-center">
      <p className="text-lg font-semibold text-gray-700 tracking-wider">
        {password.website}
      </p>
      <Image
        src={FacebookImg}
        width={100}
        height={100}
        className="w-14 h-14 my-3"
        alt="Facebook"
      />

      <div className="my-2 space-y-8 flex flex-col justify-center">
        <div className="flex gap-4">
          <img src="/icons/username.png" alt="" className="w-10" />
          <input type="text" value={password.username} className="my-input" />
        </div>

        <div className="flex gap-4">
          <img src="/icons/password.png" alt="" className="w-10" />
          <input
            type="password"
            value={password.password}
            className="my-input"
          />
        </div>

        <div className="w-full flex justify-between mt-20">
          <button className="my-btn bg-red-400">Delete</button>
          <button className="my-btn bg-green-500">Update</button>
        </div>
      </div>
    </div>
  );
};

export default PasswordCard;
