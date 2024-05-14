import { useRef } from 'react';

const Modal = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const websiteRef = useRef();

  const createPassword = async (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const website = websiteRef.current.value;

    console.log({ username, password, website });

    const resp = await fetch('/api/passwords/create', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        website,
        user_id: '123',
      }),
    });

    if (!resp.ok) {
      const error = await resp.json();
      console.log({ error });
      return; //todo: handle
    }

    const data = await resp.json();
    console.log(data);
  };

  return (
    <>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form>
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg text-center">
            Provide the credentials
          </h3>

          <form
            className="flex flex-col items-center space-y-6 my-4"
            onSubmit={createPassword}
          >
            <div className="flex gap-4">
              <img src="/icons/website.png" alt="" className="w-8 h-8" />
              <input
                type="text"
                placeholder="Website"
                className="my-input w-full"
                ref={websiteRef}
              />
            </div>
            <div className="flex gap-4">
              <img src="/icons/username.png" alt="" className="w-8 h-8" />
              <input
                type="text"
                placeholder="Username"
                className="my-input"
                ref={usernameRef}
              />
            </div>
            <div className="flex gap-4">
              <img src="/icons/password.png" alt="" className="w-8 h-8" />
              <input
                type="text"
                placeholder="Password"
                className="my-input"
                ref={passwordRef}
              />
            </div>

            <button className="my-btn bg-green-500 w-4/5" type="submit">
              Save Password
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default Modal;
