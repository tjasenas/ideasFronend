import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from "../../store/AuthCtx";
import logo from "../../assets/img/logo.svg";
import { createPortal } from "react-dom";

export default function Header() {
  const { isUserLoggedIn, userEmail, role, logout } = useAuthContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  function logoutUser() {
    openMenuHnadler();
    logout();
  }

  function openMenuHnadler() {
    setIsMenuOpen((prev) => !prev);
  }
  function openCartHnadler() {
    setIsCartOpen((prev) => !prev);
  }

  return (
    <header className="my-4">
      {isMenuOpen && createPortal(<div onClick={openMenuHnadler} className="overlay"></div>, document.body)}
      {isCartOpen && createPortal(<div onClick={openCartHnadler} className="overlay"></div>, document.body)}
      <div className="container flex justify-between items-center">
        <a className="text-2xl" href="">
          <svg className="hrt-disp-block hrt-gfm-logo" fill="none" height="36" viewBox="0 0 105 36" width="105" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <path
              clip-rule="evenodd"
              d="m4.8556 19.4183c1.28303 0 2.73375.5394 3.50113 1.6066h.09587v-1.3308h3.4771v10.9465c0 3.6329-2.99735 5.3594-5.97097 5.3594-2.88923 0-5.70701-1.6425-5.731072-4.7238h3.453002c.08403 1.3785 1.07907 2.0141 2.23031 2.0141 1.15088 0 2.32582-.7074 2.32582-2.458v-1.6783h-.09588c-.77922.935-2.08631 1.4385-3.28531 1.4385-2.91329 0-4.8556-2.7815-4.8556-5.623s1.94231-5.5512 4.8556-5.5512zm34.4819.264v6.1986c0 .9232.7193 1.6665 1.6184 1.6665.8992 0 1.6188-.7433 1.6188-1.6665v-6.1986h3.6925v6.1386c0 3.1413-2.1581 5.0596-5.3113 5.0596-3.0932 0-5.3113-1.8465-5.3113-5.0596v-6.1386zm59.8271-.288c3.2134 0 5.7674 2.398 5.7674 5.7551 0 .3128-.029.5774-.053.7494l-.007.0539h-7.7093c.1318 1.4026 1.0069 2.194 2.0741 2.194.5951 0 1.2012-.2401 1.7242-.8148l.074-.0843h3.561c-.923 2.4698-3.177 3.6206-5.4314 3.6206-2.8892 0-5.7669-1.906-5.7669-5.7188 0-3.3571 2.5538-5.7551 5.7669-5.7551zm-79.6456-.0959c3.3453 0 6.0787 2.3621 6.0787 5.767 0 3.4052-2.7334 5.7669-6.0787 5.7669-3.333 0-6.0305-2.338-6.0305-5.7669 0-3.429 2.6975-5.767 6.0305-5.767zm53.1373-6.2345v17.5286h-3.477v-1.4508h-.0959c-.9473 1.0673-2.2662 1.6666-3.597 1.6666-2.9973 0-4.9878-2.7334-4.9878-5.6948s1.9905-5.6833 4.9878-5.6833c1.1509 0 2.5298.4316 3.3812 1.4629h.0958v-7.8292zm-40.3325-.3117c.6833 0 1.3907.0837 2.0023.2277v2.9854c-.2758-.0718-.4916-.1081-.7315-.1081-.995 0-1.8583.408-1.8583 1.7265v2.1104h2.254v2.9855h-2.254v7.9129h-3.6929v-7.9129h-1.6065v-2.9855h1.6065v-2.8774c0-2.7219 1.9305-4.0645 4.2804-4.0645zm22.684 6.6421c2.0382 0 3.9324 1.4388 3.9324 4.2444v6.9538h-3.6925v-6.1864c0-1.0913-.7315-1.8224-1.6547-1.8224s-1.6547.7552-1.6547 1.8224v6.1864h-3.6925v-10.8984h3.4767v1.3667h.0959c.8273-1.1268 2.1462-1.6665 3.1894-1.6665zm33.019 0c1.9541 0 3.8128 1.4629 3.8128 4.2085v6.9897h-3.6929v-6.3182c0-1.0195-.6715-1.6906-1.5107-1.6906-.8514 0-1.5229.6833-1.5229 1.6906v6.3182h-3.6925v-6.3182c0-1.0195-.6715-1.6906-1.5107-1.6906-.8514 0-1.5229.6833-1.5229 1.6906v6.3182h-3.6929v-10.8984h3.4771v1.3667h.0959c.7315-1.1031 1.9664-1.6543 3.1413-1.6543 1.139 0 2.3262.5993 3.0454 1.8823h.0959c.9114-1.3071 2.2181-1.8945 3.4771-1.8945zm-21.4732 3.2731c-1.3548 0-2.458 1.1031-2.458 2.4579 0 1.3549 1.1032 2.4698 2.458 2.4698s2.4576-1.1149 2.4576-2.4698c0-1.3548-1.1028-2.4579-2.4576-2.4579zm-47.0105-.0837c-1.3308 0-2.4099 1.1028-2.4099 2.4817s1.0791 2.482 2.4099 2.482 2.4098-1.1031 2.4098-2.482-1.079-2.4817-2.4098-2.4817zm-13.59622.0837c-1.29488 0-2.34988 1.0431-2.34988 2.338s1.055 2.3499 2.34988 2.3499 2.33803-1.055 2.33803-2.3499-1.04315-2.338-2.33803-2.338zm93.24182-.5634c-.971 0-1.7983.6233-2.0741 1.8705h4.0884c-.228-1.2231-1.043-1.8705-2.0143-1.8705zm3.9303-6.085.681 2.0015.676-2.0015h.456v2.3673h-.307v-1.3974c0-.0482.002-.1281.004-.2399s.003-.2317.003-.3595l-.676 1.9968h-.318l-.682-1.9968v.0726c0 .0581.002.1462.005.265.003.1189.005.2059.005.2618v1.3974h-.307v-2.3673zm-.746 0v.2821h-.798v2.0852h-.324v-2.0852h-.798v-.2821zm-49.9072-5.6385c4.1515 0 7.7733 2.2566 9.7131 5.6085h-19.4258c1.9397-3.3519 5.5615-5.6085 9.7127-5.6085zm11.1571-5.37831c.7196-.71962 1.8968-.71962 2.616 0 .7197.71925.7197 1.89641 0 2.61604l-2.7881 2.78817c-.7193.7192-1.8964.7192-2.6161 0l-.0634-.0667c-.6551-.72385-.634-1.85189.0634-2.54934zm-24.8532-.06344c.7239-.65552 1.8519-.63438 2.5494.06344l2.7885 2.78817c.7193.71925.7193 1.89641 0 2.61604-.7196.7192-1.8968.7192-2.616 0l-2.7886-2.78817c-.7192-.71963-.7192-1.89679 0-2.61604zm13.6728-4.93875.0799.00171783c.9809.04222747 1.7699.85758817 1.7699 1.84842217v3.94275c0 1.01761-.8322 1.85014-1.8498 1.85014-1.0173 0-1.8498-.83253-1.8498-1.85014v-3.94275c0-1.017614.8325-1.85014 1.8498-1.85014z"
              fill="#02a95c"
              fill-rule="evenodd"
            ></path>
          </svg>
        </a>

        <div className="flex gap-4">
          <ul>
            <NavLink className={"px-4 py-2 hover:bg-slate-500 hover:text-white "} to={"/"}>
              Pagrindinis
            </NavLink>
            <NavLink className={"px-4 py-2 hover:bg-slate-500 hover:text-white "} to={"/addIdea"}>
              Pridėti istoriją/idėją
            </NavLink>
          </ul>

          <div className="flex gap-4">
            <div className="relative">
              <i onClick={openMenuHnadler} className="fa-regular fa-user text-xl cursor-pointer text-gray-500 "></i>
              {isMenuOpen && (
                <ul className="absolute right-0 top-full flex flex-col bg-gray-100 z-20 w-[220px]">
                  {!isUserLoggedIn && (
                    <>
                      <Link onClick={openMenuHnadler} className={"px-4 py-2 hover:bg-slate-500 hover:text-white "} to={"/login"}>
                        <i className="fa-solid fa-user mr-2"></i> Prisijungimas
                      </Link>

                      {/* <Link onClick={openMenuHnadler} className={"px-4 py-2 hover:bg-slate-500 hover:text-white "} to={"/register"}>
                        <i className="fa-solid fa-user-plus mr-2"></i> Reagistracija
                      </Link> */}
                    </>
                  )}
                  {isUserLoggedIn && (
                    <>
                      <li className={"px-4 py-2 "} href="">
                        <i className="fa-solid fa-user mr-2"></i> {userEmail}
                      </li>
                      {role === "admin" && (
                        <Link onClick={openMenuHnadler} className={"px-4 py-2 hover:bg-slate-500 hover:text-white "} to={"/ideasList"}>
                          <i className="fa-solid fa-plus mr-2"></i> Idėju sąrašas
                        </Link>
                      )}
                      <button onClick={logoutUser} type="button" className={"px-4 py-2 text-left hover:bg-slate-500 hover:text-white "}>
                        <i className="fa-solid fa-arrow-left mr-2"></i> Atsjungti
                      </button>
                    </>
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
