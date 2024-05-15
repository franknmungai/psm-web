import Image from 'next/image';
// import FacebookImg from '@/assets/icons/website.png';
import { useState } from 'react';
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md';
import toast from 'react-hot-toast';

const PasswordCard = ({ password: passwordData }) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(passwordData.username);
  const [password, setPassword] = useState(passwordData.password);

  const updatePassword = async () => {
    setLoading(true);
    try {
      const resp = await fetch('/api/passwords/edit', {
        method: 'POST',
        body: JSON.stringify({ ...passwordData, username, password }),
      });

      const data = await resp.json();

      setLoading(false);

      if (!resp.ok) {
        console.error(data);
        toast.error('Could not update password');
        return;
      }

      toast.success('Password updated successfully 🎊');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-6 shadow-lg flex flex-col justify-center items-center rounded-lg">
      <p className="text-lg font-semibold text-gray-700 tracking-wider capitalize">
        {passwordData.website}
      </p>
      <Image
        src="/icons/security.png"
        width={100}
        height={100}
        className="w-12 h-12 my-3"
        alt="Facebook"
      />

      <div className="my-2 space-y-8 flex flex-col justify-center">
        <div className="flex gap-4">
          <img src="/icons/username.png" alt="" className="w-10" />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="my-input focus:outline-green-400"
          />
        </div>

        <div className="flex gap-4 items-center">
          <img src="/icons/password.png" alt="" className="w-10" />
          <input
            type={visible ? 'text' : 'password'}
            value={password}
            className="my-input focus:outline-green-400"
            onChange={(e) => setPassword(e.target.value)}
          />
          {visible ? (
            <MdOutlineVisibilityOff
              onClick={() => setVisible(false)}
              className="cursor-pointer"
            />
          ) : (
            <MdOutlineVisibility
              onClick={() => setVisible(true)}
              className="cursor-pointer"
            />
          )}
        </div>

        <div className="w-full flex justify-between mt-20">
          <button className="my-btn bg-red-400">Delete</button>
          <button
            className="my-btn bg-green-500"
            onClick={updatePassword}
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-dots loading-md"></span>
            ) : (
              'Update'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordCard;
