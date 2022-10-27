import * as alias from './func.mjs'
import { sideBarBtn } from './user-side-btn.js';

window.addEventListener("DOMContentLoaded", () => {
    alias.setUser();
    alias.logoutAct();
    alias.scrollPage();
    alias.moveCart();
    alias.countCart();
    alias.moveContact();
    sideBarBtn();
})