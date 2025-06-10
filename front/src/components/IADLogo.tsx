interface IADLogoProps {
  size?: string;
}

export default function IADLogo({size = "h-8"}: IADLogoProps): React.ReactElement {
  return (
    <a target="_blank" href="https://www.iadpress.com.au/">
      <img
        src="/IADPress_logo_200x_output.png"
        alt="IADPress Logo"
        className={`${size}`}
      />
    </a>
  );
}
