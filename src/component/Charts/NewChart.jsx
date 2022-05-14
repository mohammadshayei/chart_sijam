import { useLayoutEffect, useState } from 'react';
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

const NewChart = ({ chartId, chartProps }) => {
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

    // let data = [{
    //     "category": "شهید دستغیب",
    //     "در اختیار مستاجر": 2.5,
    //     "در حال تعمیر": 2.5,
    //     "آماده تحویل": 2.1,
    //     "رزرو کمیسیون اسکان": 1,
    //     "تخلیه": 0.8,
    //     "در اختیار معاونت فرهنگی": 0.4
    // }, {
    //     "category": "شیهد هاشمی نژاد",
    //     "در اختیار مستاجر": 2.6,
    //     "در حال تعمیر": 2.7,
    //     "آماده تحویل": 2.2,
    //     "رزرو کمیسیون اسکان": 0.5,
    //     "تخلیه": 0.4,
    //     "در اختیار معاونت فرهنگی": 0.3
    // }, {
    //     "category": "شهید صدوقی",
    //     "در اختیار مستاجر": 2.8,
    //     "در حال تعمیر": 2.9,
    //     "آماده تحویل": 2.4,
    //     "رزرو کمیسیون اسکان": 0.3,
    //     "تخلیه": 0.9,
    //     "در اختیار معاونت فرهنگی": 0.5
    // }]

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
                if (type === "Pie" || type === "Doughnut") {
                    updatedCreatedChart.series.labels.template.setAll({
                        forceHidden: true
                    });
                    updatedCreatedChart.series.ticks.template.set("visible", false);
                }
            },
            removing: function () {
                if (type === "Pie" || type === "Doughnut") {
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
            case "Doughnut":
                updatedCreatedChart.chart = root.container.children.push(
                    am5percent.PieChart.new(root, {
                        layout: options.legend.position === "top" || options.legend.position === "bottom" ?
                            root.verticalLayout : root.horizontalLayout,
                        innerRadius: type === "Doughnut" ? am5.percent(50) : am5.percent(0.0001)
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
            let categoryExist = false;
            let fieldExist = false;
            if (Array.isArray(data)) {
                for (const key in data[0]) {
                    if (key === "category")
                        categoryExist = true
                    if (key === "field1")
                        fieldExist = true
                }
            }
            if (categoryExist && fieldExist) {
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
                            minGridDistance: 10
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
            } else if (categoryExist && !fieldExist) {
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
                            minGridDistance: 10
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

                // clustered series 
                function makeSeries(name, fieldName) {
                    updatedCreatedChart.series = updatedCreatedChart.chart.series.push(am5xy[seriesType].new(root, {
                        name: name,
                        xAxis: updatedCreatedChart.xAxis,
                        yAxis: updatedCreatedChart.yAxis,
                        valueYField: fieldName,
                        categoryXField: "category"
                    }));

                    if (type === "Column")
                        updatedCreatedChart.series.columns.template.setAll({
                            tooltipText: "{valueY} : {categoryX} - {name}",
                            width: am5.percent(90),
                            tooltipY: 0
                        });

                    updatedCreatedChart.series.data.setAll(data);
                    updatedCreatedChart.series.appear();

                    updatedCreatedChart.series.bullets.push(function () {
                        return am5.Bullet.new(root, {
                            locationY: 0,
                            sprite: am5.Label.new(root, {
                                text: "{valueY}",
                                fill: root.interfaceColors.get("alternativeText"),
                                centerY: 0,
                                centerX: am5.p50,
                                populateText: true
                            })
                        });
                    });

                    if (legend)
                        legend.data.push(updatedCreatedChart.series);
                }

                const filtered = Object.entries(data[0]).filter(([key, value]) =>
                    key !== 'category' &&
                    key !== 'field1' &&
                    key !== 'field2' &&
                    key !== 'field3' &&
                    key !== 'field4' &&
                    key !== 'field5' &&
                    key !== 'field6' &&
                    key !== 'field7' &&
                    key !== 'field8'
                );
                for (const key in Object.fromEntries(filtered)) {
                    makeSeries(key, key);
                }
            } else if (!categoryExist && !fieldExist) {

                // ----------------------  seprate groups ------------------------------

                // let legendData = [];
                // // Create axes
                // let xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
                // xRenderer.labels.template.setAll({ text: "{realName}" });

                // updatedCreatedChart.xAxis = updatedCreatedChart.chart.xAxes.push(
                //     am5xy.CategoryAxis.new(root, {
                //         maxDeviation: 0,
                //         categoryField: "category",
                //         renderer: xRenderer,
                //         tooltip: am5.Tooltip.new(root, {
                //             labelText: "{realName}"
                //         })
                //     })
                // );

                // updatedCreatedChart.xAxis.get("renderer").labels.template.setAll({
                //     fontSize: "0.8rem",
                //     fontFamily: "IRANSans",
                // });

                // updatedCreatedChart.yAxis = updatedCreatedChart.chart.yAxes.push(
                //     am5xy.ValueAxis.new(root, {
                //         maxDeviation: 0.3,
                //         renderer: am5xy.AxisRendererY.new(root, {})
                //     })
                // );

                // updatedCreatedChart.yAxis.get("renderer").labels.template.setAll({
                //     fontFamily: "IRANSans",
                // });

                // // Create series
                // updatedCreatedChart.series = updatedCreatedChart.chart.series.push(
                //     am5xy.ColumnSeries.new(root, {
                //         name: "series",
                //         xAxis: updatedCreatedChart.xAxis,
                //         yAxis: updatedCreatedChart.yAxis,
                //         valueYField: "value",
                //         sequencedInterpolation: true,
                //         categoryXField: "category",
                //         tooltip: am5.Tooltip.new(root, {
                //             labelText: "{provider} - {realName} : {valueY}"
                //         })
                //     })
                // );

                // updatedCreatedChart.series.columns.template.setAll({
                //     fillOpacity: 0.9,
                //     strokeOpacity: 0
                // });
                // updatedCreatedChart.series.columns.template.adapters.add("fill", (fill, target) => {
                //     return updatedCreatedChart.chart.get("colors").getIndex(updatedCreatedChart.series.columns.indexOf(target));
                // });

                // updatedCreatedChart.series.columns.template.adapters.add("stroke", (stroke, target) => {
                //     return updatedCreatedChart.chart.get("colors").getIndex(updatedCreatedChart.series.columns.indexOf(target));
                // });

                // let chartData = [], index = 0;

                // // process data ant prepare it for the chart
                // for (var providerName in data) {
                //     let providerData = data[providerName];

                //     // add data of one provider to temp array
                //     let tempArray = [];
                //     // add items
                //     for (var itemName in providerData) {
                //         // we generate unique category for each column (providerName + "_" + itemName) and store realName
                //         tempArray.push({
                //             category: providerName + "_" + itemName,
                //             realName: itemName,
                //             value: providerData[itemName],
                //             provider: providerName
                //         });
                //     }

                //     // push to the final data
                //     am5.array.each(tempArray, function (item) {
                //         chartData.push(item);
                //     });

                //     // create range (the additional label at the bottom)

                //     let range = updatedCreatedChart.xAxis.makeDataItem({});
                //     updatedCreatedChart.xAxis.createAxisRange(range);

                //     range.set("category", tempArray[0].category);
                //     range.set("endCategory", tempArray[tempArray.length - 1].category);

                //     let label = range.get("label");

                //     label.setAll({
                //         fill: updatedCreatedChart.chart.get("colors").getIndex(index),
                //         text: tempArray[0].provider,
                //         dy: 40,
                //         fontSize: "1rem",
                //         fontWeight: "bold",
                //         tooltipText: tempArray[0].provider
                //     });

                //     let tick = range.get("tick");
                //     tick.setAll({ visible: true, strokeOpacity: 1, length: 50, location: 0 });

                //     let grid = range.get("grid");
                //     grid.setAll({ strokeOpacity: 1 });

                //     index++;
                // }

                // // add range for the last grid
                // let range = updatedCreatedChart.xAxis.makeDataItem({});
                // updatedCreatedChart.xAxis.createAxisRange(range);
                // range.set("category", chartData[chartData.length - 1].category);
                // let tick = range.get("tick");
                // tick.setAll({ visible: true, strokeOpacity: 1, length: 50, location: 1 });

                // let grid = range.get("grid");
                // grid.setAll({ strokeOpacity: 1, location: 1 });

                // updatedCreatedChart.xAxis.data.setAll(chartData);
                // updatedCreatedChart.series.data.setAll(chartData);


                // ----------------------  stacked group ------------------------------
                // Create axes
                updatedCreatedChart.xAxis = updatedCreatedChart.chart.xAxes.push(am5xy.CategoryAxis.new(root, {
                    categoryField: "group",
                    renderer: am5xy.AxisRendererX.new(root, {
                        cellStartLocation: 0.1,
                        cellEndLocation: 0.9
                    }),
                    tooltip: am5.Tooltip.new(root, {
                        themeTags: ["axis"],
                        animationDuration: 200
                    })
                }));

                updatedCreatedChart.xAxis.data.setAll(data);

                updatedCreatedChart.yAxis = updatedCreatedChart.chart.yAxes.push(am5xy.ValueAxis.new(root, {
                    renderer: am5xy.AxisRendererY.new(root, {})
                }));

                // Add series
                function makeSeries(name, fieldName, index) {
                    updatedCreatedChart.series = updatedCreatedChart.chart.series.push(am5xy.ColumnSeries.new(root, {
                        name: name,
                        xAxis: updatedCreatedChart.xAxis,
                        yAxis: updatedCreatedChart.yAxis,
                        stacked: true,
                        valueYField: fieldName,
                        categoryXField: "group",
                        maskBullets: false
                    }));

                    updatedCreatedChart.series.columns.template.setAll({
                        fill: updatedCreatedChart.chart.get("colors").getIndex(index * 3),
                        stroke: updatedCreatedChart.chart.get("colors").getIndex(index * 3),
                        tooltipText: "{categoryX} - {name} : {valueY}",
                        width: am5.percent(90),
                        tooltipY: 0
                    });

                    updatedCreatedChart.series.data.setAll(data);

                    // Make stuff animate on load
                    updatedCreatedChart.series.appear();

                    updatedCreatedChart.series.bullets.push(function () {
                        return am5.Bullet.new(root, {
                            locationX: 0.5,
                            locationY: 1,
                            sprite: am5.Circle.new(root, {
                                radius: 12,
                                fill: am5.color(0xffffff),
                                opacity: 0.9
                            })
                        });
                    });

                    updatedCreatedChart.series.bullets.push(function () {
                        return am5.Bullet.new(root, {
                            locationX: 0.5,
                            locationY: 1,
                            sprite: am5.Label.new(root, {
                                text: "{valueY}",
                                fill: root.interfaceColors.get(0x000000),
                                centerX: am5.percent(50),
                                centerY: am5.percent(50),
                                textAlign: "center",
                                populateText: true
                            })
                        });
                    });

                    legend.data.push(updatedCreatedChart.series);
                }
                let series = []
                data.forEach(obj => {
                    for (const key in obj) {
                        if (key !== "group" && !series.includes(key))
                            series = [...series, key]
                    }
                });
                series.forEach((name, index) => {
                    makeSeries(name, name, index)
                });

            }

            // Add cursor
            updatedCreatedChart.chart.set("cursor", am5xy.XYCursor.new(root, {}));

        } else if (type === "Pie" || type === 'Doughnut') {
            let percentY, idx = 0;
            for (const name in options.fieldNames) {
                percentY = Object.entries(options.fieldNames).length === 1 ? 50 :
                    100 - ((100 / (Object.entries(options.fieldNames).length - 1)) * idx);
                // Create series
                updatedCreatedChart.series = updatedCreatedChart.chart.series.push(
                    am5percent.PieSeries.new(root, {
                        name: options.fieldNames[name],
                        categoryField: "category",
                        valueField: `${name}`,
                        legendLabelText: `  : ${options.legend.colorize ? "[{fill}]" : ""}{category}[/]`,
                        legendValueText: `[bold${options.legend.colorize ? " {fill}" : ""}]{value}[/]`,
                        // alignLabels: false,
                    })
                );

                updatedCreatedChart.series.labels.template.setAll({
                    text: options.series.labels.text,
                    forceHidden: options.series.labels.disabled,
                    // textType: "circular",
                    // centerX: 0,
                    // centerY: 0
                });
                updatedCreatedChart.series.ticks.template.set("visible", !options.series.labels.disabled);

                updatedCreatedChart.series.data.setAll(data);
                updatedCreatedChart.series.appear();    // ba animation miyad

                if (legend)
                    legend.data.setAll(updatedCreatedChart.series.dataItems);

                if (options.insideLabel)
                    updatedCreatedChart.series.children.push(am5.Label.new(root, {
                        text: "[bold]{valueSum}",
                        fontSize: 30,
                        centerX: am5.percent(50),
                        centerY: am5.percent(percentY),
                        populateText: true
                    }));
                idx++;
            }


        }
        setCreatedChart(updatedCreatedChart)

        return () => {
            root.dispose();
        };
    }, [chartId, options, type, themeState.isDark, data]);

    return (
        <div id={`${chartId}`} style={{ width: "100%", height: "100%" }}></div>

    );
}
export default NewChart;