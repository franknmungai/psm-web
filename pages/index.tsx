import Image from 'next/image';

const Home = () => {
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

        <form className="w-full flex flex-col items-center space-y-4">
          <input
            type="text"
            className="input input-bordered input-md w-3/4"
            placeholder="Username"
          />
          <input
            type="password"
            className="input input-bordered input-md w-3/4"
            placeholder="Key Password"
          />

          <button className="btn bg-green-500 text-white w-3/4">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
