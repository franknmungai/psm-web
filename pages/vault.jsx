import React, { useState } from 'react';
import PasswordCard from '@/components/PasswordCard';
import Modal from '@/components/Modal';
import prisma from '@/utils/db';

//NEXT.JS TAILWINDCSS
const Vault = (props) => {
  console.log(JSON.parse(props.passwordData));

  const [passwords, setPasswords] = useState(JSON.parse(props.passwordData));

  return (
    <div className="containter w-full">
      <div className="p-12 flex justify-between">
        <h1 className="text-2xl ">SafePass</h1>
        <div>
          <button
            className="my-btn1 px-8 py-3 rounded-full bg-neutral-900"
            onClick={() => document.getElementById('my_modal_3').showModal()}
          >
            Save New Password
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {passwords.map((password) => (
            <PasswordCard password={password} />
          ))}

          {!passwords.length && (
            <div className="flex flex-col justify-center items-center">
              <img src="/icons/no-pass.jpg" alt="" className="w-84" />

              <p className="text-2xl font-light text-center">
                No password saved. Get started by saving a new password
              </p>
            </div>
          )}
        </div>
      </div>

      <Modal onClick={() => {}} />
    </div>
  );
};

export default Vault;

export async function getServerSideProps() {
  try {
    const resp = await fetch('http://localhost:3000/api/passwords/get');

    let passwordData = await resp.json();
    passwordData = JSON.stringify(passwordData);

    return {
      props: {
        passwordData,
      },
    };
  } catch (error) {
    console.log('________ERROR FETCHING PASSWORDS__________');
    console.log(error);

    // return {
    //   props: {
    //     passwordData: '[]',
    //   },
    // };
  }
}
