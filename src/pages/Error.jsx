import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../components/MainLayout';

export default function Error() {
  return (
    <div>
      <MainLayout>
        <div className="pb-10 p-10 md:p-16 lg:p-24 h-96">
          <h1 className="text-3xl">404: Not Found</h1>
          <Link to={"/"} className=''>Return to Home</Link>
        </div>
      </MainLayout>
    </div>
  );
}
