import { useSelector } from "react-redux";
import "./AccessTreeView.scss"

const AccessTreeView = ({ items }) => {

    const holdingDetail = useSelector((state) => state.holdingDetail);

    return <div className="access-tree-view">
        {holdingDetail.name}
        {console.log(items)}
    </div>;
};

export default AccessTreeView;
