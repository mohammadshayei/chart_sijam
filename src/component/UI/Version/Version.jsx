import { useEffect, useState } from "react";
import "./Version.scss"
import { useTheme } from "../../../styles/ThemeProvider";
import Hint from "../Hint/Hint";
import { FaQuestion } from "react-icons/fa";
import { stringFa } from "../../../assets/strings/stringFaCollection";

const Version = () => {
    const [hintShow, setHintShow] = useState(false);
    const [hover, setHover] = useState(false);

    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const onMouseEnter = () => {
        setHover(true);
    };
    const onMouseLeave = () => {
        setHover(false);
    };

    useEffect(() => {
        if (hover) {
            const timer = setTimeout(() => {
                setHintShow(true);
            }, 200);
            return () => {
                setHintShow(false);
                return clearTimeout(timer);
            };
        }
    }, [hover]);

    return (
        <div className="version"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={{ color: theme.on_primary }}>
            <FaQuestion />
            {hintShow &&
                <Hint
                    show={hintShow}
                    hint={stringFa.version}
                    tooltipStyle={{ fontSize: "0.8rem", fontWegith: "bolder" }} />}
        </div>
    )
}

export default Version