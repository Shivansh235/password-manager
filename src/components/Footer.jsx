
const Footer = () => {
  return (
    <div className="fixed bottom-0 bg-purple-300 w-full">
      <div className="logo font-bold text-blue-700 mx-8 flex justify-center items-center">
        <span className="text-purple-900 text-xl">&lt;</span>
        <span className="text-xl">Pass</span>
        <span className="text-purple-900 text-xl">OP/&gt;</span>
      </div>

      <div className="flex justify-center items-center text-xl font-medium text-blue-800">
        Created with <img className="w-8" src="/love4.png" alt="love" /> by
        &quot;SHIVANSH&quot;
      </div>
    </div>
  );
};

export default Footer;
