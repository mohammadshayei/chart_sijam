import React, { } from "react";
import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
import { withSize } from "react-sizeme";
import "./BodyContent.scss";
import { useSelector } from "react-redux";
import Card from "../../../../component/Card/Card";
import { useTheme } from "../../../../styles/ThemeProvider";
import SkeletonCard from "../../../../component/Skeletons/SkeletonCard";
const BodyContent = (props) => {
    const chartsData = useSelector((state) => state.chart);
    const isLoading = useSelector((state) => state.chart.loading);
    const themeState = useTheme();
    const theme = themeState.computedTheme;
    const skeletonLayouts = {};
    return (
        chartsData.layouts &&
        chartsData.data && (
            <div
                className="body-container"
                style={{
                    backgroundColor: theme.background_color,
                    color: theme.on_background,
                }}
            >
                {!isLoading ? (
                    <ResponsiveGridLayout
                        className="layout"
                        layouts={chartsData.layouts}
                        isDraggable={chartsData.editMode ? true : false}
                        isRearrangeable
                        isResizable={chartsData.editMode ? true : false}
                        autoSize
                        isBounded
                        // onBreakpointChange={console.log({breakpoint})}
                        measureBeforeMount={true}
                        // useCSSTransforms={true}
                        margin={[30, 30]}
                        width={props.size.width}
                        rowHeight={60}
                        breakpoints={{ lg: 1280, md: 992, sm: 767, xs: 480, xxs: 0 }}
                        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                        // onLayoutChange={onLayoutChange}
                        style={{
                            backgroundImage: chartsData.editMode
                                ? `radial-gradient(${themeState.isDark ? theme.border_color : "#BBBBBB"
                                } 2px, transparent 2px)`
                                : theme.background_color,
                            backgroundSize: chartsData.editMode ? "50px 50px" : "0",
                        }}
                    >
                        {Object.entries(chartsData.data).map(([k, v]) => (
                            <div
                                className="card-container"
                                key={k}
                                style={{
                                    backgroundColor: theme.background_color,
                                }}
                            >
                                <Card chartId={k} item={v} />
                            </div>
                        ))}
                    </ResponsiveGridLayout>
                ) : (
                    <ResponsiveGridLayout
                        className="layout"
                        layouts={skeletonLayouts}
                        isDraggable={false}
                        isRearrangeable={false}
                        isResizable={false}
                        autoSize={false}
                        isBounded={false}
                        measureBeforeMount={true}
                        // useCSSTransforms={true}
                        margin={[30, 30]}
                        width={props.size.width}
                        rowHeight={60}
                        breakpoints={{ lg: 1280, md: 992, sm: 767, xs: 480, xxs: 0 }}
                        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                    // onLayoutChange={onLayoutChange}
                    >
                        {[1, 2].map((n) => (
                            <div key={n} data-grid={{ w: 6, h: 6, x: 6 * (n - 1), y: 0 }}>
                                <SkeletonCard id={n} />
                            </div>
                        ))}
                    </ResponsiveGridLayout>
                )}
            </div>
        )
    );
};
export default withSize()(BodyContent);
