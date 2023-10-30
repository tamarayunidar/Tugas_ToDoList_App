import React from 'react';
import Listdata from './components/listdata';

function App() {
  return (
      <div className="induk-form flex h-screen justify-center from-gray-400">
        <form className="min-w-max">
        <h1 className="judul text-2xl font-serif font-bold text-center my-16 text-indigo-500">
          What's the plan for today?
        </h1>
          <Listdata />
        </form>
      </div>
  );
}

export default App;
