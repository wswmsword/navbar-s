import styles from "./index.module.css";
import { forwardRef } from "react";
import { Head, Tail, MiniTail } from "hanav";

export default forwardRef(function FocusFlySlate({ dynamicWidth, t, className, miniBack, ...propsFromN }, ref) {
  const contentItemStyle = {
    width: dynamicWidth ? 480 : "100%",
    flexShrink: 0,
  };
  return <>{miniBack && <div className={styles.bkWrapper}>{miniBack}</div>}<ul
    ref={ref}
    className={`${styles.wrapper} ${className}`}
    {...propsFromN}
    style={{ ...propsFromN.style, ...contentItemStyle }}>
    <li>
      {miniBack ?
        <DemoSlate
          id="f-first"
          href="https://wswmsword.github.io/examples/focus-fly/#h-hot"
          t={t("s_ffly_t1")} d={t("s_ffly_d1")} /> :
        <Head><DemoSlate
          id="f-first"
          href="https://wswmsword.github.io/examples/focus-fly/#h-hot"
          t={t("s_ffly_t1")} d={t("s_ffly_d1")} /></Head>}
    </li>
    <li>
      <DemoSlate
        href="https://wswmsword.github.io/examples/focus-fly/#h-dialog"
        t={t("s_ffly_t2")}
        d={t("s_ffly_d2")} />
    </li>
    <li>
      <DemoSlate
        href="https://wswmsword.github.io/examples/focus-fly/#h-nav"
        t={t("s_ffly_t3")} d={t("s_ffly_d3")} />
    </li>
    <li>
      <DemoSlate
        href="https://wswmsword.github.io/examples/focus-fly/#h-tabs"
        t={t("s_ffly_t4")} d={t("s_ffly_d4")} />
    </li>
    <li>
      <DemoSlate
        href="https://wswmsword.github.io/examples/focus-fly/#h-player"
        t={t("s_ffly_t5")} d={t("s_ffly_d5")} />
    </li>
    <li>
      {miniBack ?
        <MiniTail>
          <DemoSlate
            id="f-last"
            href="https://wswmsword.github.io/examples/focus-fly/#h-scroll"
            t={t("s_ffly_t6")} d={t("s_ffly_d6")} />
        </MiniTail> :
        <Tail>
          <DemoSlate
            id="f-last"
            href="https://wswmsword.github.io/examples/focus-fly/#h-scroll"
            t={t("s_ffly_t6")} d={t("s_ffly_d6")} />
        </Tail>}
    </li>
  </ul></>;
})

const DemoSlate = forwardRef(function DemoSlate({ href, t, d, id }, ref) {
  return <a href={href} ref={ref} id={id}>
    <div className={styles.title}>{t}</div>
    <div className={styles.desc}>{d}</div>
  </a>
})