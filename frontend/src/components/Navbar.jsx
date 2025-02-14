
const Navbar = () => {
  
  return (
    <div className="navbar bg-base-100">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">ShortURL</a>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1 flex gap-1">
      <li><a href="/login"><button className="btn btn-outline btn-primary">Login</button></a></li>
      <li><a href="/signup"><button className="btn btn-active btn-primary">SignUp</button></a></li>
    </ul>
  </div>
</div>
  )
}

export default Navbar