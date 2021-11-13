import React from 'react';
import LoadingOverlay from 'react-loading-overlay';
import './index.css';

const PageLoader = ({ loader, color, children }) => {
  return (
    <>
    <LoadingOverlay
      active={loader}
      spinner
      text="Loading..."
      className="loader_align"
      styles={{
        overlay: base => ({
          ...base,
          background: 'rgba(255, 255, 255, 0.89)',
          borderRadius: '40px'
        }),
        spinner: base => ({
          ...base,
          width: '50px',
          '& svg circle': {
            stroke: color ? color : '#44677b'
          }
        }),
        content: base => ({
          ...base,
          color: color ? color : '#44677b'
        })
      }}
    >
      {children}
    </LoadingOverlay>
    </>
  );
};

export default PageLoader;
