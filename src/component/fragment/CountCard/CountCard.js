import React from 'react';

export default function CountCard({ name, bg, value }) {
  return (
    <div className="col-lg 4 col-md-6 col-sm-12 mt-2 ">
      <div className="card shadow rounded-3 border-0">
        <div className={'card-body bg-' + bg}>
          <h4 className="text-light">
            <strong>{name}</strong>
          </h4>
          <h1 className="text-white">
            <strong>{value}</strong>
          </h1>
        </div>
      </div>
    </div>
  );
}
