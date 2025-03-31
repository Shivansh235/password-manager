
const Navbar = () => {
  return (
    <nav className='bg-purple-300 w-full '>
      <div className="mycontainer flex flex-col md:flex-row justify-between items-center px-4 py-2">
        <div className="logo font-bold text-blue-700 mx-4 md:mx-8">
          <span className='text-purple-900 text-xl'>&lt;</span>
          <span className='text-xl'>Pass</span>
          <span className='text-purple-900 text-xl'>OP/&gt;</span>
        </div>

        {/* Uncomment and modify if needed */}
        {/* <ul className="flex flex-col md:flex-row gap-4 mt-2 md:mt-0">
          <li><a className='hover:font-bold text-purple-900' href="/">Home</a></li>
          <li><a className='hover:font-bold text-purple-900' href="/">Contact</a></li>
          <li><a className='hover:font-bold text-purple-900' href="/">About Us</a></li>
        </ul> */}
        <a href="https://github.com/Shivansh235">
        <button className='flex gap-2 items-center bg-purple-900 rounded-full py-1 px-3 hover:bg-purple-950  md:mt-0'>
          <img className='invert w-5 h-5' src="/github_icon.png" alt="GitHub logo" />
          <span className='text-blue-400 text-sm md:text-base'>GitHub</span>
        </button></a>
      </div>
    </nav>
  )
}

export default Navbar;

