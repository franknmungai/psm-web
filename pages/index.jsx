import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import toast from 'react-hot-toast';

const Home = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleAuth = (e) => {
    setLoading(true);
    e.preventDefault();
    const username = usernameRef.current.value === 'maryann01';
    const password = passwordRef.current.value === '@CyberTech_2024';

    console.log('username: ' + usernameRef.current.value);
    console.log('pass: ' + passwordRef.current.value);
    if (!username || !password) {
      toast.error('Invalid credentials');
      setLoading(false);
      return;
    }

    setLoading(false);
    router.push('/vault');
  };

  return (
    <div className="w-full h-[95vh] container flex items-center justify-center">
      <div
        className="max-w-lg mx-auto shadow-xl rounded-lg flex flex-col items-center 
      justify-center space-y-8 p-8"
      >
        <Image
          src="/bg-1.jpg"
          width={500}
          height={500}
          className="w-1/2 h-1/2"
          alt="background"
        />

        <p className="text-xl font-semibold">One Password to Secure you</p>
        <p className="text-sm">Keep all your passwords safe and secure</p>

        <form
          className="w-full flex flex-col items-center space-y-4"
          onSubmit={handleAuth}
        >
          <input
            type="text"
            className="input input-bordered input-md w-3/4"
            placeholder="Username"
            ref={usernameRef}
          />
          <input
            type="password"
            className="input input-bordered input-md w-3/4"
            placeholder="Key Password"
            ref={passwordRef}
          />

          <button className="btn bg-green-500 text-white w-3/4">
            {loading ? <span className="loading-dots"></span> : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
