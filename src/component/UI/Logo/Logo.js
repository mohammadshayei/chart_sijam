import './Logo.scss';
import { baseUrl } from '../../../constants/Config';
import { useTheme } from '../../../styles/ThemeProvider';

const Logo = props => {
  const themeState = useTheme();

  return (
    <div className={`Logo ${themeState.isDark && "white"}`}
      style={{
        ...props.style,
      }}>
      <img src={`${baseUrl}images/simamIcon.png`} alt="Logo" />
    </div>
  );
}

export default Logo;