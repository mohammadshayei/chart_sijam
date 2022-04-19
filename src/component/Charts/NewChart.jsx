import React, { useLayoutEffect, useState } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import am5themes_Dark from "@amcharts/amcharts5/themes/Dark";
import am5themes_Dataviz from "@amcharts/amcharts5/themes/Dataviz";
import am5themes_Frozen from "@amcharts/amcharts5/themes/Frozen";
import am5themes_Moonrise from "@amcharts/amcharts5/themes/Moonrise";
import am5themes_Spirited from "@amcharts/amcharts5/themes/Spirited";
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
import { useTheme } from '../../styles/ThemeProvider';
import { useSelector } from 'react-redux';

function NewChart({ chartId, chartProps }) {
    const themeState = useTheme();
    const [createdChart, setCreatedChart] = useState({
        chart: null,
        applyedTheme: null,
        legendMethod: null,
        xAxis: null,
        yAxis: null,
        series: null
    });

    const { data, options, type } = chartProps;
    const addChartData = useSelector((state) => state.addChart);

    useLayoutEffect(() => {
        let updatedCreatedChart = { ...createdChart }
        let root = am5.Root.new(`${chartId}`);

        const responsive = am5themes_Responsive.new(root);
        var exporting = am5plugins_exporting.Exporting.new(root, {
            dataSource: data,
            menu: am5plugins_exporting.ExportingMenu.new(root, {})
        });

        switch (options.theme) {
            case "dataviz":
                updatedCreatedChart.applyedTheme = am5themes_Dataviz.new(root);
                break;
            case "dark":
                updatedCreatedChart.applyedTheme = am5themes_Dark.new(root);
                break;
            case "frozen":
                updatedCreatedChart.applyedTheme = am5themes_Frozen.new(root);
                break;
            case "moonrisekingdom":
                updatedCreatedChart.applyedTheme = am5themes_Moonrise.new(root);
                break;
            case "spiritedaway":
                updatedCreatedChart.applyedTheme = am5themes_Spirited.new(root);
                break;
            default:
                updatedCreatedChart.applyedTheme = options.theme;

                break;
        }
        if (themeState.isDark)
            updatedCreatedChart.applyedTheme = am5themes_Dark.new(root);

        switch (options.legend.position) {
            case "top":
                updatedCreatedChart.legendMethod = "unshift"
                break;
            case "right":
                updatedCreatedChart.legendMethod = "push"
                break;
            case "bottom":
                updatedCreatedChart.legendMethod = "push"
                break;
            case "left":
                updatedCreatedChart.legendMethod = "unshift"
                break;

            default:
                break;
        }

        responsive.addRule({
            relevant: am5themes_Responsive.heightM,
            applying: function () {
                if (options.legend.position === "top" || options.legend.position === "bottom")
                    legend.setAll({
                        visible: false
                    })
                if (type === "Line" || type === "Column")
                    updatedCreatedChart.xAxis.set("visible", false);

            },
            removing: function () {
                if (options.legend.position === "top" || options.legend.position === "bottom")
                    legend.setAll({
                        visible: true
                    })
                if (type === "Line" || type === "Column")
                    updatedCreatedChart.xAxis.set("visible", true);
            }
        });

        responsive.addRule({
            relevant: am5themes_Responsive.widthL,
            applying: function () {
                if (type == "Line" || type === "Column") {
                    updatedCreatedChart.yAxis.set("visible", false)
                    if (options.legend.position === "right" || options.legend.position === "left")
                        legend.setAll({
                            visible: false
                        })
                };
            },
            removing: function () {
                if (type == "Line" || type === "Column") {
                    updatedCreatedChart.yAxis.set("visible", true);
                    if (options.legend.position === "right" || options.legend.position === "left")
                        legend.setAll({
                            visible: true
                        })
                }
            }
        });

        responsive.addRule({
            relevant: function (width, height) {
                return width < 700 || height < 400;
            },
            applying: function () {
                if (type == "Pie") {
                    updatedCreatedChart.series.labels.template.setAll({
                        forceHidden: true
                    });
                    updatedCreatedChart.series.ticks.template.set("visible", false);
                }
            },
            removing: function () {
                if (type == "Pie") {
                    updatedCreatedChart.series.labels.template.setAll({
                        forceHidden: false
                    });
                    updatedCreatedChart.series.ticks.template.set("visible", true);
                }
            }
        });


        if (updatedCreatedChart.applyedTheme === options.theme)
            root.setThemes([
                am5themes_Animated.new(root),
                responsive,
            ]);
        else
            root.setThemes([
                am5themes_Animated.new(root),
                responsive,
                updatedCreatedChart.applyedTheme
            ]);

        let seriesType;
        switch (type) {
            case "Line":
            case "Column":
                updatedCreatedChart.chart = root.container.children.push(
                    am5xy.XYChart.new(root, {
                        layout: options.legend.position === "top" || options.legend.position === "bottom" ?
                            root.verticalLayout : root.horizontalLayout,
                        panX: addChartData.isFullscreen ? true : false,
                        panY: false,
                    })
                );
                if (addChartData.isFullscreen)
                    updatedCreatedChart.chart.set("wheelY", "zoomX")
                seriesType = `${type}Series`
                if (type === "Line" && options.series.smooth)
                    seriesType = "SmoothedXLineSeries"
                break;
            case "Pie":
                updatedCreatedChart.chart = root.container.children.push(
                    am5percent.PieChart.new(root, {
                        layout: options.legend.position === "top" || options.legend.position === "bottom" ?
                            root.verticalLayout : root.horizontalLayout,
                        innerRadius: am5.percent(options.innerRadius)
                    })
                );
                seriesType = "PieSeries"
                break;

            default:

                break;
        }

        let legend;
        if (options.legend.display) {
            // Add legend
            legend = updatedCreatedChart.chart.children[updatedCreatedChart.legendMethod](am5.Legend.new(root, {
                layout: options.legend.position === "top" || options.legend.position === "bottom" ?
                    root.gridLayout : root.verticalLayout,
                centerY: options.legend.position === "top" ? am5.percent(0) : options.legend.position === "bottom" ? am5.percent(100)
                    : am5.percent(50),
                y: options.legend.position === "top" ? am5.percent(0) : options.legend.position === "bottom" ? am5.percent(100)
                    : am5.percent(50),
                centerX: options.legend.position === "left" ? am5.percent(0) : options.legend.position === "right" ? am5.percent(100)
                    : am5.percent(50),
                x: options.legend.position === "left" ? am5.percent(0) : options.legend.position === "right" ? am5.percent(100)
                    : am5.percent(50),
                height: options.legend.position === "left" || options.legend.position === "right" ? am5.percent(80) : am5.percent(10),
                verticalScrollbar: am5.Scrollbar.new(root, {
                    orientation: "vertical"
                }),
            }));
            legend.labels.template.setAll({
                marginRight: 10,
                fontFamily: "IRANSans",
            });
            legend.itemContainers.template.setAll({
                reverseChildren: true
            });
        }

        if (type === "Line" || type === "Column") {
            // Create Y-axis
            updatedCreatedChart.yAxis = updatedCreatedChart.chart.yAxes.push(
                am5xy.ValueAxis.new(root, {
                    maxDeviation: 0.3,
                    logarithmic: options.axes.yAxes.break.active,
                    treatZeroAs: 0.000001,
                    renderer: am5xy.AxisRendererY.new(root, {
                    })
                })
            );

            updatedCreatedChart.yAxis.get("renderer").labels.template.setAll({
                fontFamily: "IRANSans",
            });


            // Create X-Axis
            updatedCreatedChart.xAxis = updatedCreatedChart.chart.xAxes.push(
                am5xy.CategoryAxis.new(root, {
                    maxDeviation: 0.3,
                    renderer: am5xy.AxisRendererX.new(root, {
                        minGridDistance: 15
                    }),
                    categoryField: "category",
                })
            );

            updatedCreatedChart.xAxis.get("renderer").labels.template.setAll({
                fontSize: "0.8rem",
                fontFamily: "IRANSans",
                rotation: options.axes.xAxes.rotation ? 315 : 0,
                centerY: am5.p50,
                centerX: am5.p100,
                paddingRight: 5
            });

            updatedCreatedChart.xAxis.data.setAll(data);

            for (const name in options.fieldNames) {
                // Create series
                updatedCreatedChart.series = updatedCreatedChart.chart.series.push(
                    am5xy[seriesType].new(root, {
                        name: options.fieldNames[name],
                        xAxis: updatedCreatedChart.xAxis,
                        yAxis: updatedCreatedChart.yAxis,
                        valueYField: `${name}`,
                        categoryXField: "category",
                        sequencedInterpolation: true,
                        stacked: options.series.stacked,
                        legendLabelText: `[bold #888]{categoryX}[/] : ${options.legend.colorize ? "[{stroke}]" : ""}{name}[/] `,
                        legendRangeLabelText: `${options.legend.colorize ? "[{stroke}]" : ""}{name}[/]  `,
                        legendValueText: `[bold ${options.legend.colorize ? "{stroke}" : ""}]{valueY}[/]`,
                        legendRangeValueText: `${options.legend.colorize ? "[{stroke}]" : ""}{valueYClose}[/]`,
                        tooltip: am5.Tooltip.new(root, {
                            labelText: "{valueY}"
                        })
                    })
                );
                if (type === "Column")
                    updatedCreatedChart.series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5 });
                updatedCreatedChart.series.data.setAll(data);
                updatedCreatedChart.series.appear();    // ba animation miyad
            }

            if (legend)
                legend.data.setAll(updatedCreatedChart.chart.series.values);

            // Add cursor
            updatedCreatedChart.chart.set("cursor", am5xy.XYCursor.new(root, {}));

        } else if (type === "Pie") {

            for (const name in options.fieldNames) {
                // Create series
                updatedCreatedChart.series = updatedCreatedChart.chart.series.push(
                    am5percent.PieSeries.new(root, {
                        name: options.fieldNames[name],
                        categoryField: "category",
                        valueField: `${name}`,
                        // alignLabels: false
                    })
                );

                updatedCreatedChart.series.labels.template.setAll({
                    text: options.series.labels.text,
                    forceHidden: options.series.labels.disabled
                });
                updatedCreatedChart.series.ticks.template.set("visible", !options.series.labels.disabled);

                updatedCreatedChart.series.data.setAll(data);
                updatedCreatedChart.series.appear();    // ba animation miyad

                if (legend)
                    legend.data.setAll(updatedCreatedChart.series.dataItems);
            }

        }
        setCreatedChart(updatedCreatedChart)

        return () => {
            root.dispose();
        };
    }, [chartId, options, type, themeState.isDark]);

    return (
        <div id={`${chartId}`} style={{ width: "100%", height: "100%" }}></div>
    );
}
export default NewChart;