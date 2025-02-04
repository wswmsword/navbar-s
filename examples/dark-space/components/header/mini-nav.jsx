import styles from "./index.module.css";
import { MiniNavBar, MiniTrigger, MiniItem, MiniContent, MiniMenu, MiniToggle, MiniBack, MiniHead } from "hanav";
import NavbarSlate from "../navbar-slate";
import MobileForeverSlate from "../mobile-forever-slate";
import FocusFlySlate from "../focus-fly-slate"
import Link from "next/link";

/** 窄屏状态下的导航栏，如移动端 */
export default function MiniNav({ mini, lowerCaseLng, t }) {
  return <MiniNavBar className={`${styles.miniNav} ${mini == null ? "" : mini ? styles.showFlex : styles.hide}`}>
    <a className={styles.logoLink} href="https://github.com/wswmsword/hanav">Hanav Repo</a>
    <div className={styles.right}>
      {lowerCaseLng === "en" ?
        <Link href="/zh-cn" className={styles.lang_switch} lang="zh-CN">🌐 简体中文</Link> :
        <Link href="/en" className={styles.lang_switch} lang="en">🌐 English</Link>}
      <MiniToggle className={styles.toggle}>
        {opened => <span className={`${styles.toggleIcon} ${opened ? styles.opened : ""}`}></span>}
      </MiniToggle>
    </div>
    <MiniMenu className={styles.miniMenu}>
      <MiniTrigger className={styles.miniTriggerWrapper}>
        <MiniItem><button className={styles.miniTrigger}>Hanav</button></MiniItem>
        <MiniItem><button>Postcss-Mobile-Forever</button></MiniItem>
        <MiniItem><button>Focus-Fly</button></MiniItem>
      </MiniTrigger>
      <MiniContent className={styles.miniContent}>
        <MiniItem><NavbarSlate t={t} miniBack={miniBack("Hanav")} /></MiniItem>
        <MiniItem>{(p, head, tail) => <MobileForeverSlate p={p} head={head} tail={tail} t={t} miniBack={miniBack("Mobile-Forever")} />}</MiniItem>
        <MiniItem><FocusFlySlate t={t} miniBack={miniBack("Focus-Fly")} /></MiniItem>
      </MiniContent>
    </MiniMenu>
  </MiniNavBar>;

  function miniBack(txt) {
    return <MiniHead>
      <MiniBack className={styles.miniBack}><span className={styles.backIcon} />{txt}</MiniBack>
    </MiniHead>;
  }
}