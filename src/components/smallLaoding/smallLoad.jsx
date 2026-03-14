const SmallLoad = () => {
  return (
    <>
      <span className="loader"></span>
      <style jsx="true">{`
        .loader {
          width: 15px;
          height: 15px;
          border: 2px solid transparent;
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          display: inline-block;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};

export default SmallLoad;
