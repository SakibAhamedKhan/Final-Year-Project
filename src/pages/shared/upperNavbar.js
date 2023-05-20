import { NavLink } from "react-router-dom";

function UpperNavbar(props) {
    const {show, setShow} = props;

    const changeShow = () => {
        setShow(!show);
    }
    return (
        <div className="bg-base-100 h-[50px] flex flex-row justify-between px-4">
            <div className="">
                <label onClick={changeShow} tabindex="0" class="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                </label>
            </div>
            <div className="lg:flex">
                <ul className="menu menu-horizontal px-1">
                <li><a>Item 1</a></li>
                <li tabIndex={0}>
                    <a>
                    Parent
                    <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
                    </a>
                    <ul className="p-2">
                    <li><a>Submenu 1</a></li>
                    <li><a>Submenu 2</a></li>
                    </ul>
                </li>
                <li><a>Item 3</a></li>
                </ul>
            </div>
            <div className="justify-self-end">
                <NavLink to='/profile' className="btn btn-ghost normal-case text-xl">Profile</NavLink>
            </div>
    </div>
    );
}

export default UpperNavbar;