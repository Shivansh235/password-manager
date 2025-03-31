import  { useRef, useState, useEffect } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordref = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  const getpasswords = async () => {
    const req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    setpasswordArray(passwords);
    console.log(passwords);
  };

  useEffect(() => {
    getpasswords();
  }, []);

  const showPassword = () => {
    if (passwordref.current.type === "password") {
      passwordref.current.type = "text";
      ref.current.src = "/Crosseye.svg";
    } else {
      passwordref.current.type = "password";
      ref.current.src = "/Eye.svg";
    }
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast("Copied to clipboard!", { position: "top-right", autoClose: 3000, transition: Bounce });
  };

  const savePassword = async () => {
    if(form.site.length >3 && form.username.length >3 && form.password.length >3){

      //If any such id is exist in db,delete it
      await fetch("http://localhost:3000/", {
        method: "DELETE", headers: {
          
          'Content-Type': 'application/json',
        }, body: JSON.stringify({  id: form.id})
      })


    setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]); 

    await fetch("http://localhost:3000/", {
      method: "POST", headers: {
        'Content-Type': 'application/json',
      }, body: JSON.stringify({ ...form, id: uuidv4() })
    })

    console.log([...passwordArray, form]); // evry change in form it store the value as it is array.
    setform({ site: "", username: "", password: "" });
    toast("Saved Successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };
  }
  const editPassword = (id) => {
    console.log("Edit all the content of that id:", id);
    setform({...passwordArray.filter((i) => i.id === id)[0], id:id});
    setpasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const deletePassword = async (id) => {
    console.log("delete all the content of that id:", id);
    const c = confirm("Are you sure to delete the password!");
    if (c) {
      setpasswordArray(passwordArray.filter((item) => item.id !== id)); 
      await fetch("http://localhost:3000/", {
        method: "DELETE", headers: {
          
          'Content-Type': 'application/json',
        }, body: JSON.stringify({  id: id})
      })
    
    
  
    toast("Deleted Successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };
};

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    


<div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
  <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
</div>

<div className="mycontainer px-4">

  {/* Heading Section */}
  <div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center">
    <h1 className="text-blue-700 font-semibold text-3xl sm:text-4xl">
      <span className="text-purple-900">&lt;</span>Pass
      <span className="text-purple-900">OP/&gt;</span>
    </h1>
    <p className="text-blue-700 font-medium text-lg">Your Own Password Manager</p>
  </div>


  {/* Input Fields */}
  <div className="flex flex-col px-4 py-14 gap-4 sm:gap-8 max-w-lg mx-auto">
    <input
      value={form.site}
      onChange={handleChange}
      placeholder="Enter website URL"
      className="rounded-full border-purple-950 w-full px-4 py-2 border-2"
      type="text"
      name="site"
      id="site"
    />


    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
      <input
        value={form.username || ""}
        onChange={handleChange}
        placeholder="Enter Username"
        className="rounded-full border-purple-950 w-full px-4 py-2 border-2"
        type="text"
        name="username"
        id="username"
      />


      <div className="relative w-full">
        <input
          ref={passwordref}
          value={form.password || ""}
          onChange={handleChange}
          placeholder="Enter Password"
          className="rounded-full border-purple-950 w-full px-4 py-2 border-2"
          type="password"
          name="password"
          id="password"
        />
        <span
          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          onClick={showPassword}
        >
          <img ref={ref} width={22} src="/Eye.svg" alt="Eye" />
        </span>
      </div>
    </div>
  </div>

  {/* Add Password Button */}
  <div
    onClick={savePassword}
    className="flex items-center justify-center gap-2 bg-purple-300 border-2 border-purple-600 rounded-full py-2 px-4 w-fit mx-auto hover:bg-purple-400 cursor-pointer"
  >
    <lord-icon
      src="https://cdn.lordicon.com/sbnjyzil.json"
      trigger="hover"
      stroke="bold"
      state="hover-swirl"
      colors="primary:#4030e8,secondary:#8930e8"
    ></lord-icon>
    <button className="text-blue-700 text-md font-semibold">Add Password</button>
  </div>

  {/* Passwords Table */}
  <div className="passwords mt-8">
    <h2 className="font-bold text-2xl py-2 text-center text-purple-900">Your Passwords</h2>

    {passwordArray.length === 0 ? (
      <div className="text-center text-base text-purple-800">No passwords to show</div>
    ) : (
      <div className="overflow-x-auto">
        <table className="table-auto w-full rounded-md overflow-hidden mb-4 border border-purple-800">
          <thead className="bg-purple-800 text-blue-300">
            <tr>
              <th className="px-3 sm:px-5 py-2 text-left">Site</th>
              <th className="px-3 sm:px-5 py-2 text-center">Username</th>
              <th className="px-3 sm:px-5 py-2 text-center">Password</th>
              <th className="px-3 sm:px-5 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="bg-purple-100">
            {passwordArray.map((item, index) => (
              <tr key={index}>
                <td className="border border-white px-3 py-2 flex items-center">
                  <a href={item.site} target="_blank" rel="noopener noreferrer">
                    {item.site}
                  </a>
                  <img
                    onClick={() => copyText(item.site)}
                    className="invert hover:bg-green-950 cursor-pointer mx-2 w-5"
                    src="/copy.svg"
                    alt="Copy"
                  />
                </td>

                <td className="border border-white text-center px-3 py-2">
                  <div className="flex justify-center items-center">
                    <span>{item.username}</span>
                    <img
                      onClick={() => copyText(item.username)}
                      className="invert hover:bg-green-950 cursor-pointer mx-2 w-5"
                      src="/copy.svg"
                      alt="Copy"
                    />
                  </div>
                </td>

                <td className="border border-white text-center px-3 py-2">
                  <div className="flex justify-center items-center">
                    <span>{"*".repeat(item.password.length)}</span>
                    <img
                      onClick={() => copyText(item.password)}
                      className="invert hover:bg-green-950 cursor-pointer mx-2 w-5"
                      src="/copy.svg"
                      alt="Copy"
                    />
                  </div>
                </td>

                <td className="border border-white text-center px-3 py-2">
                  <div className="flex justify-center items-center">
                    <span className="cursor-pointer mx-1" onClick={() => editPassword(item.id)}>
                      <lord-icon
                        src="https://cdn.lordicon.com/exymduqj.json"
                        trigger="hover"
                        colors="primary:#4f1091,secondary:#2516c7"
                        style={{ height: "25px", width: "28px" }}
                      ></lord-icon>
                    </span>
                    <span className="cursor-pointer mx-1" onClick={() => deletePassword(item.id)}>
                      <lord-icon
                        src="https://cdn.lordicon.com/hwjcdycb.json"
                        trigger="hover"
                        colors="primary:#4f1091,secondary:#2516c7"
                        style={{ height: "25px", width: "28px" }}
                      ></lord-icon>
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
 
    )}
       </div>
       </div>
</>
  )};
export default Manager;

