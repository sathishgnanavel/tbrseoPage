export function LogoMark({ size = 180 }: { size?: number }) {
  return (
    <img
      src="/threebestratedFooter.png"
      alt=""
      width={size}
      height={size}
      aria-hidden="true"
      style={{ display: 'block', objectFit: 'contain' }}
    />
  )
}

export function Logo() {
  return (
    <a className="logo" href="/" aria-label="ThreeBestRated home">
      <LogoMark />
      {/* <span className="logo__word">ThreeBestRated</span> */}
    </a>
  )
}